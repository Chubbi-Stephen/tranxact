const TransactionService = require('../services/transactionService');
const { emitTransactionUpdate } = require('../utils/realTime');

const createTransaction = async (req, res) => {
    try {
        const transaction = await TransactionService.createTransaction(req.user._id, req.body);
        // Emit real-time update to the user's room
        emitTransactionUpdate(req.user._id, transaction);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error: error.message });
    }
};

const getUserTransactions = async (req, res) => {
    try {
        const transactions = await TransactionService.getTransactionsByUser(req.user._id, req.query);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const transaction = await TransactionService.getTransactionById(req.params.id, req.user._id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving transaction', error: error.message });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const transaction = await TransactionService.updateTransaction(req.params.id, req.user._id, req.body);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error updating transaction', error: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const deleted = await TransactionService.deleteTransaction(req.params.id, req.user._id);
        if (!deleted) return res.status(404).json({ message: 'Transaction not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting transaction', error: error.message });
    }
};

const getSpendingSummary = async (req, res) => {
    try {
        const summary = await TransactionService.getSpendingSummary(req.user._id);
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving spending summary', error: error.message });
    }
};

module.exports = {
    createTransaction,
    getUserTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getSpendingSummary,
};