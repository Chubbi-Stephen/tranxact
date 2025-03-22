const express = require('express');
const TransactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const transactionController = new TransactionController();

// Create a new transaction
router.post('/', authMiddleware.authenticate, transactionController.createTransaction);

// Get all transactions for a user
router.get('/', authMiddleware.authenticate, transactionController.getUserTransactions);

// Get a specific transaction by ID
router.get('/:id', authMiddleware.authenticate, transactionController.getTransactionById);

// Update a transaction by ID
router.put('/:id', authMiddleware.authenticate, transactionController.updateTransaction);

// Delete a transaction by ID
router.delete('/:id', authMiddleware.authenticate, transactionController.deleteTransaction);

module.exports = router;