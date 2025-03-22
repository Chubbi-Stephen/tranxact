import Transaction from '../models/Transaction';
import User from '../models/User';

class TransactionService {
    async createTransaction(userId, transactionData) {
        const transaction = new Transaction({
            ...transactionData,
            user: userId,
        });
        await transaction.save();
        return transaction;
    }

    async getTransactionsByUser(userId) {
        return await Transaction.find({ user: userId });
    }

    async getTransactionById(transactionId) {
        return await Transaction.findById(transactionId);
    }

    async updateTransaction(transactionId, updateData) {
        return await Transaction.findByIdAndUpdate(transactionId, updateData, { new: true });
    }

    async deleteTransaction(transactionId) {
        return await Transaction.findByIdAndDelete(transactionId);
    }
}

export default new TransactionService();