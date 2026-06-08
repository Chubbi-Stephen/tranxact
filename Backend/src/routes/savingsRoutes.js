const express = require('express');
const router = express.Router();
const savingsController = require('../controllers/savingsController');
const { authenticate } = require('../middlewares/authMiddleware');
const idempotency = require('../middlewares/idempotencyMiddleware');

router.use(authenticate);

router.get('/', savingsController.getSafelocks);
router.post('/', idempotency, savingsController.createSafelock);
router.post('/:id/withdraw', savingsController.withdrawMatured);

// T-Vault Flexible Savings
router.get('/vault', savingsController.getTVault);
router.post('/vault/invest', idempotency, savingsController.invest);
router.post('/vault/withdraw', idempotency, savingsController.withdraw);

module.exports = router;
