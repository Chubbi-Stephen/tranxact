const mongoose = require('mongoose');
const crypto = require('crypto');

const CATEGORIES = [
    'Food & Drink',
    'Groceries',
    'Utilities',
    'Income',
    'Transfer',
    'Subscriptions',
    'Shopping',
    'Healthcare',
    'Entertainment',
    'Other',
];

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true,
    },
    category: {
        type: String,
        enum: CATEGORIES,
        default: 'Other',
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    reference: {
        type: String,
        unique: true,
        default: () => 'TXN-' + crypto.randomBytes(6).toString('hex').toUpperCase(),
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);