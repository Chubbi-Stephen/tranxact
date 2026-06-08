const SavingsService = require('../services/savingsService');

// ── TVault Controllers ──────────────────────────────────────────
const getTVault = async (req, res) => {
    try {
        const vault = await SavingsService.getTVault(req.user._id);
        res.json(vault);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const invest = async (req, res) => {
    try {
        const result = await SavingsService.invest(req.user._id, req.body.amount);
        res.json({ message: 'Funds moved to T-Vault', ...result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const withdraw = async (req, res) => {
    try {
        const result = await SavingsService.withdraw(req.user._id, req.body.amount);
        res.json({ message: 'Funds withdrawn to wallet', ...result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ── Safelock Controllers ────────────────────────────────────────
const createSafelock = async (req, res) => {
    try {
        const safelock = await SavingsService.createSafelock(req.user._id, req.body);
        res.status(201).json(safelock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSafelocks = async (req, res) => {
    try {
        const safelocks = await SavingsService.getSafelocks(req.user._id);
        res.json(safelocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const withdrawMatured = async (req, res) => {
    try {
        const safelock = await SavingsService.withdrawMatured(req.user._id, req.params.id);
        res.json(safelock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { 
    getTVault, 
    invest, 
    withdraw, 
    createSafelock, 
    getSafelocks, 
    withdrawMatured 
};
