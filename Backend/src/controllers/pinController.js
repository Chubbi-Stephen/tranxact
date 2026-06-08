const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.setPin = async (req, res) => {
    try {
        const { pin } = req.body;
        const userId = req.user.id;

        if (!/^\d{4}$/.test(pin)) {
            return res.status(400).json({ message: 'PIN must be 4 digits' });
        }

        const hashedPin = await bcrypt.hash(pin, 10);
        await User.findByIdAndUpdate(userId, { 
            transactionPin: hashedPin,
            isPinSet: true 
        });

        res.json({ message: 'Transaction PIN set successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.verifyPin = async (req, res) => {
	try {
		const { pin } = req.body;
		const userId = req.user.id;

		const user = await User.findById(userId).select('+transactionPin');
		if (!user.transactionPin) {
			return res.status(400).json({ message: 'PIN not set' });
		}

		const isMatch = await bcrypt.compare(pin, user.transactionPin);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid PIN' });
		}

		res.json({ message: 'PIN verified' });
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};
