const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authenticate } = require('../middlewares/authMiddleware');
const idempotency = require('../middlewares/idempotencyMiddleware');

// Apply authentication to all routes
router.use(authenticate);

// Transactions routes
router.get('/', transactionController.getUserTransactions);
router.post('/', idempotency, transactionController.createTransaction);
router.get('/summary', transactionController.getSpendingSummary);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;