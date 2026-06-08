const Transaction = require('../models/Transaction');
const User = require('../models/User');
const TVault = require('../models/TVault');

class AIService {
    async analyzeTransactions(userId) {
        const user = await User.findById(userId);
        const vault = await TVault.findOne({ user: userId });
        const transactions = await Transaction.find({ user: userId }).limit(50);

        // 1. Calculate Financial IQ Score (0-100)
        let score = 50; // Base score

        // Reward for having money in T-Vault (Saving habit)
        if (vault && vault.balance > 0) score += 15;
        if (vault && vault.balance > (user.balance * 0.5)) score += 10;

        // Reward for KYC verification (Financial Security)
        if (user.kycLevel === 'tier2') score += 5;
        if (user.kycLevel === 'tier3') score += 10;

        // Penalty for too many daily transactions (High spending frequency)
        const today = new Date();
        today.setHours(0,0,0,0);
        const dailyTxCount = transactions.filter(tx => tx.createdAt >= today).length;
        if (dailyTxCount > 5) score -= 5;

        // Cap score at 100
        score = Math.min(score, 100);

        // 2. Generate Insight & Recommendation
        let status = "Moderate";
        let recommendation = "Start putting small amounts into T-Vault to earn 15% interest.";
        let forecast = "Neutral";

        if (score > 80) {
            status = "Elite";
            recommendation = "Impressive habits! Your money is working hard in the Vault.";
            forecast = "Upward";
        } else if (score > 60) {
            status = "Stable";
            recommendation = "You're doing well. Increase your T-Vault stake to reach Elite status.";
            forecast = "Positive";
        }

        return {
            score,
            status,
            recommendation,
            forecast,
            lastAnalysis: new Date(),
            metrics: {
                savingsRatio: vault ? (vault.balance / (user.balance + vault.balance)) * 100 : 0,
                kycStatus: user.kycLevel
            }
        };
    }
}

module.exports = new AIService();