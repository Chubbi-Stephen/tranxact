const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        trim: true,
        default: '',
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    transactionPin: {
        type: String, // Hashed 4-digit PIN
        select: false, // Don't include in normal queries for security
    },
    isPinSet: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    balance: {
        type: Number,
        default: 0,
    },
    phoneNumber: {
        type: String,
        default: '',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.virtual('hasPin').get(function() {
    return !!this.transactionPin;
});

// Never return the password hash in API responses
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model('User', userSchema);