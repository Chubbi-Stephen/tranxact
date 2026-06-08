const mongoose = require('mongoose');
const SavingsGoal = require('../models/SavingsGoal');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

class SavingsService {
    async createSafelock(userId, lockData) {
        const { title, amount, maturityDate } = lockData;
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // 1. Debit User Balance
            const user = await User.findById(userId).session(session);
            if (user.balance < amount) throw new Error('Insufficient balance to lock funds');
            
            user.balance -= amount;
            await user.save({ session });

            // 2. Create Audit Transaction
            const auditTx = new Transaction({
                user: userId,
                amount,
                type: 'debit',
                category: 'Savings',
                description: `Safelock: ${title}`,
                status: 'completed'
            });
            await auditTx.save({ session });

            // 3. Create Safelock
            const safelock = new SavingsGoal({
                user: userId,
                title,
                targetAmount: amount,
                currentBalance: amount,
                maturityDate: new Date(maturityDate),
                status: 'active'
            });
            await safelock.save({ session });

            await session.commitTransaction();
            return safelock;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async getSafelocks(userId) {
        return await SavingsGoal.find({ user: userId }).sort({ createdAt: -1 });
    }

    async withdrawMatured(userId, lockId) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const lock = await SavingsGoal.findOne({ _id: lockId, user: userId }).session(session);
            if (!lock) throw new Error('Safelock not found');
            if (lock.status !== 'active') throw new Error('Funs already withdrawn');
            if (new Date() < new Date(lock.maturityDate)) {
                throw new Error(`Funds are locked until ${new Date(lock.maturityDate).toDateString()}`);
            }

            // Calculate interest (simplified: 10% flat for demo, in real life it's pro-rated)
            const interest = Math.round(lock.currentBalance * 0.1);
            const totalToReturn = lock.currentBalance + interest;

            // 1. Credit User Balance
            await User.findByIdAndUpdate(userId, { $inc: { balance: totalToReturn } }, { session });

            // 2. Update Lock Status
            lock.status = 'withdrawn';
            await lock.save({ session });

            // 3. Audit Transaction
            const auditTx = new Transaction({
                user: userId,
                amount: totalToReturn,
                type: 'credit',
                category: 'Savings',
                description: `Matured Safelock + Interest: ${lock.title}`,
                status: 'completed'
            });
            await auditTx.save({ session });

            await session.commitTransaction();
            return { totalToReturn, interest };
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
}

module.exports = new SavingsService();
