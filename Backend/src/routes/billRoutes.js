const express = require('express');
const { buyAirtime, buyData } = require('../controllers/billController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/airtime', authenticate, buyAirtime);
router.post('/data', authenticate, buyData);

module.exports = router;
