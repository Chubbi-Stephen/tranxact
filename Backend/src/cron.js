const cron = require('node-cron');
const TVault = require('./models/TVault');
const SavingsService = require('./services/savingsService');

const initCronJobs = () => {
    // Run at 00:00 every day
    cron.schedule('0 0 * * *', async () => {
        console.log('🕒 Running Daily Interest Accrual for T-Vault...');
        try {
            const vaults = await TVault.find({ balance: { $gt: 0 }, status: 'active' });
            
            let totalInterestPaid = 0;
            for (const vault of vaults) {
                const interest = await SavingsService.calculateDailyInterest(vault.user);
                totalInterestPaid += interest;
            }

            console.log(`✅ Success: Paid out ₦${totalInterestPaid.toFixed(2)} in interest to ${vaults.length} users.`);
        } catch (error) {
            console.error('❌ Error in Daily Interest Cron:', error);
        }
    });

    console.log('🚀 Cron Jobs Initialized: T-Vault Interest set for 12:00 AM daily.');
};

module.exports = { initCronJobs };
