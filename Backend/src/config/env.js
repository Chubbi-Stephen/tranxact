require('dotenv').config();

const env = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/fintech',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    AI_API_KEY: process.env.AI_API_KEY || 'your_ai_api_key',
};

module.exports = env;