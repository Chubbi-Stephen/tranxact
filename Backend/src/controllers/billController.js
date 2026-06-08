const BillService = require('../services/billService');

const payAirtime = async (req, res) => {
    try {
        const result = await BillService.purchaseAirtime(req.user._id, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const payData = async (req, res) => {
    try {
        const result = await BillService.purchaseData(req.user._id, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const payElectricity = async (req, res) => {
    try {
        const result = await BillService.payElectricity(req.user._id, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const payCableTV = async (req, res) => {
    try {
        const result = await BillService.payCableTV(req.user._id, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { payAirtime, payData, payElectricity, payCableTV };
