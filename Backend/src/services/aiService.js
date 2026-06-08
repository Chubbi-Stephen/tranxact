const { GoogleGenerativeAI } = require("@google/generative-ai");
const Transaction = require("../models/Transaction");

class AIService {
	constructor() {
		const apiKey = process.env.AI_API_KEY;
		if (apiKey && apiKey !== "your_ai_api_key_here" && apiKey !== "") {
			this.genAI = new GoogleGenerativeAI(apiKey);
			this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
		}
	}

	async analyzeTransactions(userId) {
		// 1. Fetch last 30 transactions for context
		const transactions = await Transaction.find({ user: userId })
			.sort({ createdAt: -1 })
			.limit(30)
			.lean();

		if (!transactions || transactions.length === 0) {
			return {
				healthScore: 100,
				forecast: "No data yet. Start transacting to see your AI forecast!",
				recommendation: "Try adding some funds to get started.",
				insights: [],
				totalSpent: 0
			};
		}

		// 2. Prepare data for summary (always available even without Gemini)
		const debits = transactions.filter(t => t.type === 'debit');
		const totalSpent = debits.reduce((acc, t) => acc + t.amount, 0);
		
		const categoriesMap = {};
		debits.forEach(t => {
			categoriesMap[t.category] = (categoriesMap[t.category] || 0) + t.amount;
		});

		const insights = Object.entries(categoriesMap).map(([category, amount]) => ({
			category,
			amount,
			percentage: totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0
		})).sort((a, b) => b.amount - a.amount);

		// 3. AI Analysis (Rule-based Fallback)
		let aiAdvise = {
			healthScore: 85,
			forecast: "Your spending seems stable based on your recent activity.",
			recommendation: "Keep tracking your expenses to maintain your financial health."
		};

		// 4. Gemini AI Enhancement (If configured)
		if (this.model) {
			try {
				const prompt = `
					Act as a Senior Financial Advisor. Analyze these recent transactions for a user:
					${JSON.stringify(transactions.map(t => ({ amount: t.amount, type: t.type, category: t.category, date: t.createdAt })))}
					
					Current Total Spending in this period: $${totalSpent.toFixed(2)}.
					
					Return a JSON object ONLY with these fields (no markdown):
					{
						"healthScore": number (0-100),
						"forecast": "string (short prediction for next 7 days)",
						"recommendation": "string (one specific actionable tip)"
					}
				`;

				const result = await this.model.generateContent(prompt);
				const response = await result.response;
				const text = response.text();
				
				// Clean JSON formatting from AI response
				const jsonMatch = text.match(/\{[\s\S]*\}/);
				if (jsonMatch) {
					aiAdvise = JSON.parse(jsonMatch[0]);
				}
			} catch (error) {
				console.error("[AI Service] Gemini Error:", error.message);
			}
		}

		return {
			...aiAdvise,
			insights,
			totalSpent: parseFloat(totalSpent.toFixed(2))
		};
	}
}

module.exports = new AIService();