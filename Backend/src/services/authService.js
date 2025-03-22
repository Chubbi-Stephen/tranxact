import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthService {
    async register(userData) {
        const { username, password, email } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();
        return newUser;
    }

    async login(credentials) {
        const { username, password } = credentials;
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }
}

export default new AuthService();