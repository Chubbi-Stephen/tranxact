const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const { authenticate } = require('../middlewares/authMiddleware');
const idempotency = require('../middlewares/idempotencyMiddleware');

router.use(authenticate);

router.get('/', cardController.getCards);
router.post('/', idempotency, cardController.createCard);
router.post('/fund', idempotency, cardController.fundCard);

module.exports = router;
