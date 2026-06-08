const Transaction = require('../models/Transaction');
const User = require('../models/User');

class BillService {
    // ── Airtime & Data ────────────────────────────────────────────────────────
    async purchaseAirtime(userId, { phoneNumber, network, amount }) {
        const user = await User.findById(userId);
        if (user.balance < amount) throw new Error('Insufficient balance');

        user.balance -= amount;
        await user.save();

        return await Transaction.create({
            user: userId,
            amount,
            type: 'debit',
            category: 'Bills',
            description: `${network} Airtime purchase for ${phoneNumber}`,
            status: 'completed'
        });
    }

    async purchaseData(userId, { phoneNumber, network, plan, amount }) {
        const user = await User.findById(userId);
        if (user.balance < amount) throw new Error('Insufficient balance');

        user.balance -= amount;
        await user.save();

        return await Transaction.create({
            user: userId,
            amount,
            type: 'debit',
            category: 'Bills',
            description: `${network} ${plan} Data purchase for ${phoneNumber}`,
            status: 'completed'
        });
    }

    // ── Electricity ───────────────────────────────────────────────────────────
    async payElectricity(userId, { meterNumber, provider, amount, type }) {
        // type: 'prepaid' or 'postpaid'
        const user = await User.findById(userId);
        if (user.balance < amount) throw new Error('Insufficient balance');

        user.balance -= amount;
        await user.save();

        // In a real app, we'd call a vendor like VTPass here to get a TOKEN
        const mockToken = Math.random().toString().slice(2, 14).toUpperCase();

        return await Transaction.create({
            user: userId,
            amount,
            type: 'debit',
            category: 'Bills',
            description: `${provider} Electricity (${type}) - Meter: ${meterNumber}`,
            metadata: { token: mockToken },
            status: 'completed'
        });
    }

    // ── Cable TV ──────────────────────────────────────────────────────────────
    async payCableTV(userId, { smartcardNumber, provider, plan, amount }) {
        const user = await User.findById(userId);
        if (user.balance < amount) throw new Error('Insufficient balance');

        user.balance -= amount;
        await user.save();

        return await Transaction.create({
            user: userId,
            amount,
            type: 'debit',
            category: 'Bills',
            description: `${provider} ${plan} Subscription - SC: ${smartcardNumber}`,
            status: 'completed'
        });
    }
}

module.exports = new BillService();
