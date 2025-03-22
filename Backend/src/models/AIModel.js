import mongoose from 'mongoose';

const AIModelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    financialData: {
        type: Object,
        required: true
    },
    recommendations: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const AIModel = mongoose.model('AIModel', AIModelSchema);

export default AIModel;