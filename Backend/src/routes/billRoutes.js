const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const { authenticate } = require('../middlewares/authMiddleware');
const idempotency = require('../middlewares/idempotencyMiddleware');

router.use(authenticate);

router.post('/airtime', idempotency, billController.payAirtime);
router.post('/data', idempotency, billController.payData);
router.post('/electricity', idempotency, billController.payElectricity);
router.post('/cable', idempotency, billController.payCableTV);

module.exports = router;
