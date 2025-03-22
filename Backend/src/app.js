const express = require('express');
const mongoose = require('mongoose'); // or use pg for PostgreSQL
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const aiRoutes = require('./routes/aiRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const { connectDB } = require('./config/db');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;