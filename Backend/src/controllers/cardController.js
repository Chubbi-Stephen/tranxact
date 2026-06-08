const Card = require('../models/Card');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const generateCardNumber = () => {
    let num = '4242'; // Visa prefix
    for (let i = 0; i < 12; i++) {
        num += Math.floor(Math.random() * 10).toString();
    }
    return num;
};

const createCard = async (req, res) => {
    try {
        const { cardType, currency, color } = req.body;
        const userId = req.user._id;

        // One-time creation fee (Simulated)
        const FEE = currency === 'USD' ? 1500 : 1000;
        const user = await User.findById(userId);

        if (user.balance < FEE) {
            return res.status(400).json({ message: `Insufficient balance to create a card. Fee is ₦${FEE}` });
        }

        // Deduct fee
        user.balance -= FEE;
        await user.save();

        const newCard = await Card.create({
            user: userId,
            cardType: cardType || 'Visa',
            cardName: `${user.firstName} ${user.lastName}`.toUpperCase(),
            cardNumber: generateCardNumber(),
            expiryDate: '12/28',
            cvv: Math.floor(100 + Math.random() * 900).toString(),
            color: color || 'bg-slate-900',
            currency: currency || 'NGN',
            balance: 0
        });

        // Create transaction for fee
        await Transaction.create({
            user: userId,
            amount: FEE,
            type: 'debit',
            category: 'Bills',
            description: `Virtual Card Creation Fee (${newCard.currency})`,
            status: 'completed'
        });

        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCards = async (req, res) => {
    try {
        const cards = await Card.find({ user: req.user._id });
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const fundCard = async (req, res) => {
    try {
        const { cardId, amount } = req.body;
        const numAmount = parseFloat(amount);
        const user = await User.findById(req.user._id);
        const card = await Card.findById(cardId);

        if (user.balance < numAmount) return res.status(400).json({ message: 'Insufficient wallet balance' });
        
        user.balance -= numAmount;
        card.balance += numAmount;

        await user.save();
        await card.save();

        await Transaction.create({
            user: req.user._id,
            amount: numAmount,
            type: 'debit',
            category: 'Transfer',
            description: `Card Funding - Wallet to ****${card.cardNumber.slice(-4)}`,
            status: 'completed'
        });

        res.json({ card, newWalletBalance: user.balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCard, getCards, fundCard };
