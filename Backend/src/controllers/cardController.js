const CardService = require('../services/cardService');

const createCard = async (req, res) => {
    try {
        const card = await CardService.createCard(req.user._id, req.body);
        res.status(201).json(card);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const fundCard = async (req, res) => {
    try {
        const result = await CardService.fundCard(req.user._id, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCards = async (req, res) => {
    try {
        const cards = await CardService.getCards(req.user._id);
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCard, fundCard, getCards };
