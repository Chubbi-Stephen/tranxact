const { Pool } = require('pg'); // For PostgreSQL
// const mongoose = require('mongoose'); // Uncomment for MongoDB

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

// Uncomment for MongoDB
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected successfully');
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         process.exit(1);
//     }
// };

module.exports = {
    connectDB,
    pool, // For PostgreSQL
    // mongoose, // Uncomment for MongoDB
};