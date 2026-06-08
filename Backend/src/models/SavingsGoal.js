const mongoose = require('mongoose');

const savingsGoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true, // e.g., "December Rent", "New Mac"
    },
    targetAmount: {
        type: Number,
        required: true,
    },
    currentBalance: {
        type: Number,
        default: 0,
    },
    maturityDate: {
        type: Date,
        required: true, // Funds can't be withdrawn before this
    },
    status: {
        type: String,
        enum: ['active', 'matured', 'withdrawn'],
        default: 'active',
    },
    interestRate: {
        type: Number,
        default: 10, // 10% per annum, typical for Nigerian safes
    }
}, { timestamps: true });

module.exports = mongoose.model('SavingsGoal', savingsGoalSchema);
