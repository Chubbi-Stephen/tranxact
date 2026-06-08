const express = require('express');
const { createCard, getCards, fundCard } = require('../controllers/cardController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getCards);
router.post('/create', authenticate, createCard);
router.post('/fund', authenticate, fundCard);

module.exports = router;
