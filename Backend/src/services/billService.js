const Transaction = require('../models/Transaction');
const User = require('../models/User');

class BillService {
    /**
     * Simulates a call to a real VTU Aggregator (e.g., Flutterwave or VTpass)
     * In production, this would use axios to hit their API.
     */
    async purchaseAirtime(userId, { phone, amount, carrier, pin }) {
        const user = await User.findById(userId).select('+transactionPin');
        if (!user) throw new Error('User not found');

        // 1. PIN Security Check
        const isPinValid = await user.verifyPin(pin);
        if (!isPinValid) throw new Error('Invalid Transaction PIN');

        // 2. Balance Check
        if (user.balance < amount) throw new Error('Insufficient balance');

        // 3. Process Transaction (Simulate Aggregator Call)
        // const response = await vtpass.purchase(phone, amount, carrier);
        const success = true; // Simulating success

        if (success) {
            user.balance -= amount;
            await user.save();

            const transaction = await Transaction.create({
                user: userId,
                type: 'debit',
                amount,
                category: 'Bills',
                description: `Airtime Recharge: ${carrier} - ${phone}`,
                status: 'completed',
                reference: `AIR-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            });

            return { transaction, newBalance: user.balance };
        } else {
            throw new Error('Service provider is currently unavailable');
        }
    }

    async purchaseData(userId, { phone, plan, amount, pin }) {
        console.log('PurchaseData payload:', { phone, plan, amount, pin: '****' });
        const user = await User.findById(userId).select('+transactionPin');
        if (!user) throw new Error('User not found');

        const isPinValid = await user.verifyPin(pin);
        console.log('PIN valid?', isPinValid);
        if (!isPinValid) throw new Error('Invalid Transaction PIN');

        if (user.balance < amount) throw new Error('Insufficient balance');

        user.balance -= amount;
        await user.save();

        const transaction = await Transaction.create({
            user: userId,
            type: 'debit',
            amount,
            category: 'Data',
            description: `Data Bundle: ${plan} - ${phone}`,
            status: 'completed',
            reference: `DAT-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        });

        return { transaction, newBalance: user.balance };
    }
}

module.exports = new BillService();
