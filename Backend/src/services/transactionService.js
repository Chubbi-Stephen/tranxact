const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

class TransactionService {
    async createTransaction(userId, transactionData) {
        const { amount, type, category, description, status } = transactionData;
        
        // ── ACID TRANSACTION START ──────────────────────────────────────────
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // 1. Update user balance within the session
            const balanceDelta = type === 'credit' ? amount : -amount;
            const updatedUser = await User.findByIdAndUpdate(
                userId, 
                { $inc: { balance: balanceDelta } },
                { session, new: true }
            );

            if (!updatedUser) throw new Error('User not found');
            if (updatedUser.balance < 0 && type === 'debit') {
                throw new Error('Insufficient funds for this transaction');
            }

            // 2. Create the transaction record within the session
            const transaction = new Transaction({
                amount,
                type,
                category,
                description,
                status,
                user: userId,
            });
            
            await transaction.save({ session });

            // 3. Commit everything to the database
            await session.commitTransaction();

            // 4. Check for Referral Bonus (Asynchronous)
            if (type === 'credit') {
                const referralService = require('./referralService');
                referralService.processFirstTransactionBonus(userId, amount);
            }

            return transaction;
        } catch (error) {
            // 4. If ANYTHING fails, abort and undo all partial changes
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
        // ── ACID TRANSACTION END ────────────────────────────────────────────
    }

    async getTransactionsByUser(userId, query = {}) {
        const { type, category, limit = 50, skip = 0 } = query;
        const filter = { user: userId };
        if (type) filter.type = type;
        if (category) filter.category = category;

        return await Transaction.find(filter)
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(Number(skip));
    }

    async getTransactionById(transactionId, userId) {
        return await Transaction.findOne({ _id: transactionId, user: userId });
    }

    async updateTransaction(transactionId, userId, updateData) {
        return await Transaction.findOneAndUpdate(
            { _id: transactionId, user: userId },
            updateData,
            { new: true }
        );
    }

    async deleteTransaction(transactionId, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const transaction = await Transaction.findOne({ _id: transactionId, user: userId }).session(session);
            if (!transaction) throw new Error('Transaction not found');

            const balanceDelta = transaction.type === 'credit' ? -transaction.amount : transaction.amount;
            await User.findByIdAndUpdate(userId, { $inc: { balance: balanceDelta } }, { session });

            const deleted = await Transaction.findByIdAndDelete(transactionId).session(session);
            await session.commitTransaction();
            return deleted;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async getSpendingSummary(userId) {
        const transactions = await Transaction.find({ user: userId });
        const summary = {};
        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach((t) => {
            if (t.type === 'credit') {
                totalIncome += t.amount;
            } else {
                totalExpenses += t.amount;
                summary[t.category] = (summary[t.category] || 0) + t.amount;
            }
        });

        return { totalIncome, totalExpenses, byCategory: summary };
    }
}

module.exports = new TransactionService();