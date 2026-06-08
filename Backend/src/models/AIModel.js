const mongoose = require('mongoose');

const AIModelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    financialData: {
        type: Object,
        required: true,
    },
    recommendations: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('AIModel', AIModelSchema);