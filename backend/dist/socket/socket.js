import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import { Server } from "socket.io";
import http from "http";
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://bubbly-q2bp.onrender.com"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
export const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId];
};
const userSocketMap = {};
io.on("connection", (socket) => {
    console.log("user connected:", socket.id);
    const userId = socket.handshake.query.userId;
    if (!userId) {
        console.warn("No userId provided in socket handshake query");
        return;
    }
    if (userId)
        userSocketMap[userId] = socket.id;
    //io.omit() is used to send anything to connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("disconnect user", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
const PORT = 9000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
export { app, io, server };
