const express = require('express');
const router = express.Router();
const pinController = require('../controllers/pinController');
const { authenticate } = require('../middlewares/authMiddleware');

router.use(authenticate);

router.post('/set', pinController.setPin);
router.post('/verify', pinController.verifyPin);

module.exports = router;
