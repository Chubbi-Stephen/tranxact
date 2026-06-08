const User = require('../models/User');
const Transaction = require('../models/Transaction');

class ReferralService {
    async processFirstTransactionBonus(userId, amount) {
        try {
            const minTransaction = 2000;
            const bonusAmount = 500;

            if (amount < minTransaction) return;

            const user = await User.findById(userId);
            if (!user.referredBy) return;

            // Check if bonus already paid
            const alreadyPaid = await Transaction.findOne({
                user: user.referredBy,
                description: { $regex: new RegExp(`Referral Bonus for ${user.username}`, 'i') }
            });

            if (alreadyPaid) return;

            // Pay Inviter
            const inviter = await User.findById(user.referredBy);
            inviter.balance += bonusAmount;
            inviter.referralEarnings += bonusAmount;
            await inviter.save();

            // Log Transaction for Inviter
            await Transaction.create({
                user: inviter._id,
                amount: bonusAmount,
                type: 'credit',
                category: 'Income',
                description: `Referral Bonus for ${user.firstName} ${user.lastName}`,
                status: 'completed'
            });

            // Pay referred user? (Usually both get)
            user.balance += bonusAmount;
            await user.save();

            // Log Transaction for Referred User
            await Transaction.create({
                user: user._id,
                amount: bonusAmount,
                type: 'credit',
                category: 'Income',
                description: `Welcome Bonus (Referred by ${inviter.username})`,
                status: 'completed'
            });

            console.log(`Referral Bonus paid for ${user.username} and ${inviter.username}`);
        } catch (error) {
            console.error('Error processing referral bonus:', error);
        }
    }
}

module.exports = new ReferralService();
