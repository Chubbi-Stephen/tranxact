const express = require('express');
const router = express.Router();
const savingsController = require('../controllers/savingsController');
const { authenticate } = require('../middlewares/authMiddleware');
const idempotency = require('../middlewares/idempotencyMiddleware');

router.use(authenticate);

router.get('/', savingsController.getSafelocks);
router.post('/', idempotency, savingsController.createSafelock);
router.post('/:id/withdraw', savingsController.withdrawMatured);

module.exports = router;
