const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_production';
const JWT_EXPIRES_IN = '7d';

class AuthService {
    async register(userData) {
        const { username, email, password, firstName = '', lastName = '' } = userData;

        // Check for existing user
        const existing = await User.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            throw new Error('A user with that email or username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return { user: newUser, token };
    }

    async login(credentials) {
        const { email, username, password } = credentials;

        // Allow login by email OR username
        const user = await User.findOne(email ? { email } : { username });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return { user, token };
    }

    async logout(userId) {
        // JWT is stateless — client discards the token.
        // For production, maintain a token blacklist in Redis.
        return { message: 'Logged out successfully' };
    }

    async refreshToken(body) {
        const { token } = body;
        if (!token) throw new Error('Token is required');
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const newToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            return { token: newToken };
        } catch (err) {
            throw new Error('Invalid or expired token');
        }
    }

    async getUserById(userId) {
        return await User.findById(userId).select('-password');
    }
}

module.exports = new AuthService();