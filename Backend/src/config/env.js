require('dotenv').config();

const env = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/transact',
    JWT_SECRET: process.env.JWT_SECRET || 'change_this_in_production',
    AI_API_KEY: process.env.AI_API_KEY || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};

module.exports = env;