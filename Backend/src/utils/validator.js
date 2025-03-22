const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

const validateTransaction = [
    body('amount')
        .isNumeric()
        .withMessage('Amount must be a number')
        .isFloat({ gt: 0 })
        .withMessage('Amount must be greater than 0'),
    body('type')
        .isString()
        .withMessage('Type must be a string')
        .isIn(['credit', 'debit'])
        .withMessage('Type must be either credit or debit'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    validateTransaction,
    validate,
};