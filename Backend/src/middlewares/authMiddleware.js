const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    // Support both "Bearer <token>" and raw token formats
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'change_this_in_production');
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid.' });
    }
};

module.exports = { authenticate };