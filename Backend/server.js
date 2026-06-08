const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const { connectDB } = require('./src/config/db');
const { initRealTime } = require('./src/utils/realTime');
const { initCronJobs } = require('./src/cron');

const PORT = process.env.PORT || 5000;

// Create HTTP server so Socket.io can share it with Express
const server = http.createServer(app);

// Initialise Socket.io real-time layer
initRealTime(server);

// Initialize Background Tasks (Cron)
initCronJobs();

// Connect to MongoDB then start listening
connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to start server:', err.message);
        process.exit(1);
    });