const AuthService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { user, token } = await AuthService.register(req.body);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { token, user } = await AuthService.login(req.body);
        res.status(200).json({ token, user });
    } catch (error) {
        const status = error.message === 'User not found' ? 404 : 401;
        res.status(status).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const result = await AuthService.logout(req.user._id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { token } = await AuthService.refreshToken(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const verifyToken = async (req, res) => {
    // authMiddleware already verified + attached req.user
    res.status(200).json({ user: req.user });
};

const verifyEmail = async (req, res) => {
	try {
		const user = await AuthService.verifyEmail(req.params.token);
		res.status(200).json({ message: 'Email verified successfully', user });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const forgotPassword = async (req, res) => {
	try {
		await AuthService.forgotPassword(req.body.email);
		res.status(200).json({ message: 'Reset email sent' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const resetPassword = async (req, res) => {
	try {
		await AuthService.resetPassword(req.params.token, req.body.password);
		res.status(200).json({ message: 'Password reset successful' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getProfile = async (req, res) => {
    try {
        const user = await AuthService.getUserById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login, logout, refreshToken, verifyToken, getProfile, verifyEmail, forgotPassword, resetPassword };