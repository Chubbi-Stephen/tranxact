const AIService = require('../services/aiService');

class AIController {
    constructor() {
        this.aiService = AIService;
    }

    async analyzeSpending(req, res) {
        try {
            const analysis = await this.aiService.analyzeSpending(req.user.id, req.body);
            res.status(200).json({ analysis });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async predictBudget(req, res) {
        try {
            const prediction = await this.aiService.predictBudget(req.user.id, req.body);
            res.status(200).json({ prediction });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async recommendSavings(req, res) {
        try {
            const recommendations = await this.aiService.recommendSavings(req.user.id, req.body);
            res.status(200).json({ recommendations });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AIController();