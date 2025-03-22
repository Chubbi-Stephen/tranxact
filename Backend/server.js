const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./src/app');
const { errorHandler } = require('./src/middlewares/errorHandler');

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to the database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

// Error handling middleware
app.use(errorHandler);