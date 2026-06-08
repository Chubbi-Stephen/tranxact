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
    upgradeKyc,
    updateProfile,
    updateSettings,
    changePassword,
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
router.post('/upgrade-kyc', authenticate, upgradeKyc);
router.put('/update-profile', authenticate, updateProfile);
router.put('/update-settings', authenticate, updateSettings);
router.put('/change-password', authenticate, changePassword);

module.exports = router;