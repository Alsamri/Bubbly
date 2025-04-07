import express from "express";
import authRouter from "./routers/authRouter.js";
import messagesRouter from "./routers/messageRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { app } from "../socket/socket.js";
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173", // Allow requests from your frontend domain
    methods: ["GET", "POST"], // Allow GET and POST methods
    credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
app.use(cookieParser());
dotenv.config();
app.use(express.json());
app.use("/api/userAuth", authRouter);
app.use("/api/messages", messagesRouter);
