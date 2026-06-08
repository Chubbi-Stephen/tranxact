const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cardType: {
        type: String,
        enum: ['Visa', 'Mastercard'],
        default: 'Visa',
    },
    cardName: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: String,
        unique: true,
        required: true,
    },
    expiryDate: {
        type: String, // MM/YY
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['active', 'blocked', 'expired'],
        default: 'active',
    },
    color: {
        type: String,
        default: 'bg-[#013653]', // Deep blue
    },
    currency: {
        type: String,
        enum: ['NGN', 'USD'],
        default: 'NGN',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Card', cardSchema);
