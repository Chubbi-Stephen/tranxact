const mongoose = require('mongoose');

const oWealthSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    },
    accruedInterest: {
        type: Number,
        default: 0
    },
    annualPercentageYield: {
        type: Number,
        default: 15 // 15% APY
    },
    lastInterestAccrual: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'paused'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = mongoose.model('OWealth', oWealthSchema);
