const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Token verification
router.get('/verify', authMiddleware.authenticate, authController.verifyToken);

module.exports = router;