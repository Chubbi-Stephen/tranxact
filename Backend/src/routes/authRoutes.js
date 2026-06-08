const express = require('express');
const {
    register,
    login,
    logout,
    refreshToken,
    verifyToken,
    getProfile,
} = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/refresh-token', refreshToken);
router.get('/verify', authenticate, verifyToken);
router.get('/profile', authenticate, getProfile);

module.exports = router;