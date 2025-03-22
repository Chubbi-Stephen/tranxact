import { Server } from "socket.io";

let io;

export const initRealTime = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};

export const emitTransactionUpdate = (transaction) => {
    if (io) {
        io.emit("transactionUpdate", transaction);
    }
};