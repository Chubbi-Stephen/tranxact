const Card = require('../models/Card');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

class CardService {
    async createCard(userId, { cardName, cardType, currency }) {
        const user = await User.findById(userId);
        
        // Fee for creating a USD card (e.g., NGN 2500)
        const issueFee = currency === 'USD' ? 2500 : 500;
        if (user.balance < issueFee) throw new Error(`Insufficient balance. Initial card issue fee is ₦${issueFee}`);

        // Generate Random Card Details
        const cardNumber = `4${Math.random().toString().slice(2, 17)}`; // Simple Visa mock
        const cvv = Math.random().toString().slice(2, 5);
        const expiryDate = "12/28";

        const card = new Card({
            user: userId,
            cardName,
            cardType,
            currency,
            cardNumber,
            cvv,
            expiryDate,
            balance: 0
        });

        user.balance -= issueFee;
        await user.save();
        await card.save();

        await Transaction.create({
            user: userId,
            amount: issueFee,
            type: 'debit',
            category: 'Card',
            description: `Virtual ${currency} Card Issuance Fee`,
            status: 'completed'
        });

        return card;
    }

    async fundCard(userId, { cardId, amountNgn }) {
        const user = await User.findById(userId);
        const card = await Card.findById(cardId);
        
        if (user.balance < amountNgn) throw new Error('Insufficient wallet balance');

        // Mock Exchange Rate (1 USD = 1500 NGN)
        const rate = 1500;
        const amountUsd = card.currency === 'USD' ? amountNgn / rate : amountNgn;

        user.balance -= amountNgn;
        card.balance += amountUsd;

        await user.save();
        await card.save();

        await Transaction.create({
            user: userId,
            amount: amountNgn,
            type: 'debit',
            category: 'Card',
            description: `Funded Virtual Card (+${card.currency === 'USD' ? '$' : '₦'}${amountUsd.toFixed(2)})`,
            status: 'completed'
        });

        return { user, card };
    }

    async getCards(userId) {
        return await Card.find({ user: userId });
    }
}

module.exports = new CardService();
