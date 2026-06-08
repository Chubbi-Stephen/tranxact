const SavingsService = require('../services/savingsService');

const createSafelock = async (req, res) => {
    try {
        const lock = await SavingsService.createSafelock(req.user.id, req.body);
        res.status(201).json(lock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSafelocks = async (req, res) => {
    try {
        const locks = await SavingsService.getSafelocks(req.user.id);
        res.status(200).json(locks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const withdrawMatured = async (req, res) => {
    try {
        const result = await SavingsService.withdrawMatured(req.user.id, req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createSafelock, getSafelocks, withdrawMatured };
