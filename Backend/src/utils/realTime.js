const { Server } = require('socket.io');

let io;

const initRealTime = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Each authenticated user joins their own room by userId
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
};

const emitTransactionUpdate = (userId, transaction) => {
    if (io) {
        // Emit only to that user's room
        io.to(userId.toString()).emit('transactionUpdate', transaction);
    }
};

const getIO = () => io;

module.exports = { initRealTime, emitTransactionUpdate, getIO };