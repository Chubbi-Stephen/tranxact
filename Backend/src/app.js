const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const aiRoutes = require('./routes/aiRoutes');
const savingsRoutes = require('./routes/savingsRoutes');
const pinRoutes = require('./routes/pinRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://tranxxact.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/pin', pinRoutes);

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;