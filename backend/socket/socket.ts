// socket/socket.ts
import { Server } from "socket.io";
import http from "http";

const userSocketMap: { [key: string]: string } = {};

export const getRecieverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

export const setupSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "https://bubbly-q2bp.onrender.com"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // console.log("user connected:", socket.id);

    const userId = socket.handshake.query.userId as string;
    if (userId) {
      userSocketMap[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};
