const BillService = require('../services/billService');

const buyAirtime = async (req, res) => {
    try {
        const { phone, amount, carrier, pin } = req.body;
        const result = await BillService.purchaseAirtime(req.user._id, { phone, amount, carrier, pin });
        res.status(200).json({ message: 'Airtime purchase successful', ...result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const buyData = async (req, res) => {
    try {
        const { phone, plan, amount, pin } = req.body;
        const result = await BillService.purchaseData(req.user._id, { phone, plan, amount, pin });
        res.status(200).json({ message: 'Data purchase successful', ...result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { buyAirtime, buyData };
