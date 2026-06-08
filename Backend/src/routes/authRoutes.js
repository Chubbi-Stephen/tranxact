const express = require('express');
const {
    register,
    login,
    logout,
    refreshToken,
    verifyToken,
    getProfile,
    verifyEmail,
    forgotPassword,
    resetPassword,
} = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/refresh-token', refreshToken);
router.get('/verify', authenticate, verifyToken);
router.get('/profile', authenticate, getProfile);
router.post('/verify-email/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;