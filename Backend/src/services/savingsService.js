const TVault = require('../models/TVault');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const SavingsGoal = require('../models/SavingsGoal');

class SavingsService {
    // ── TVault Logic ────────────────────────────────────────────────────────
    async getTVault(userId) {
        let account = await TVault.findOne({ user: userId });
        if (!account) {
            account = await TVault.create({ user: userId });
        }
        return account;
    }

    async invest(userId, amount) {
        const numAmount = parseFloat(amount);
        const user = await User.findById(userId);
        if (user.balance < numAmount) throw new Error('Insufficient wallet balance');

        const vault = await this.getTVault(userId);
        
        user.balance -= numAmount;
        vault.balance += numAmount;

        await user.save();
        await vault.save();

        await Transaction.create({
            user: userId,
            amount: numAmount,
            type: 'debit',
            category: 'Savings',
            description: 'Transferred to T-Vault',
            status: 'completed'
        });

        return { user, vault };
    }

    async withdraw(userId, amount) {
        const numAmount = parseFloat(amount);
        const vault = await this.getTVault(userId);
        if (vault.balance < numAmount) throw new Error('Insufficient T-Vault balance');

        const user = await User.findById(userId);
        
        vault.balance -= numAmount;
        user.balance += numAmount;

        await user.save();
        await vault.save();

        await Transaction.create({
            user: userId,
            amount: numAmount,
            type: 'credit',
            category: 'Savings',
            description: 'Withdrawn from T-Vault',
            status: 'completed'
        });

        return { user, vault };
    }

    async calculateDailyInterest(userId) {
        const vault = await this.getTVault(userId);
        if (vault.balance <= 0) return;

        const dailyRate = (vault.annualPercentageYield / 100) / 365;
        const interest = vault.balance * dailyRate;

        vault.balance += interest;
        vault.accruedInterest += interest;
        vault.lastInterestAccrual = new Date();
        await vault.save();

        return interest;
    }

    // ── Safelock Logic ──────────────────────────────────────────────────────
    async createSafelock(userId, data) {
        const { title, targetAmount, maturityDate } = data;
        const user = await User.findById(userId);
        
        if (user.balance < targetAmount) throw new Error('Insufficient wallet balance for this Safelock');

        const safelock = new SavingsGoal({
            user: userId,
            title,
            targetAmount,
            currentBalance: targetAmount,
            maturityDate
        });

        user.balance -= targetAmount;
        await user.save();
        await safelock.save();

        await Transaction.create({
            user: userId,
            amount: targetAmount,
            type: 'debit',
            category: 'Savings',
            description: `Safelock: ${title}`,
            status: 'completed'
        });

        return safelock;
    }

    async getSafelocks(userId) {
        return await SavingsGoal.find({ user: userId }).sort({ createdAt: -1 });
    }

    async withdrawMatured(userId, safelockId) {
        const safelock = await SavingsGoal.findOne({ _id: safelockId, user: userId });
        if (!safelock) throw new Error('Safelock not found');
        if (safelock.status !== 'active') throw new Error('Safelock is already withdrawn or matured');
        
        if (new Date() < new Date(safelock.maturityDate)) {
            throw new Error('Safelock has not matured yet');
        }

        const user = await User.findById(userId);
        user.balance += safelock.currentBalance;
        safelock.status = 'withdrawn';

        await user.save();
        await safelock.save();

        await Transaction.create({
            user: userId,
            amount: safelock.currentBalance,
            type: 'credit',
            category: 'Savings',
            description: `Withdrawn matured Safelock: ${safelock.title}`,
            status: 'completed'
        });

        return safelock;
    }
}

module.exports = new SavingsService();
