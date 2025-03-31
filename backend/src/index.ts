import express from "express";
import authRouter from "./routers/authRouter.js";
import messagesRouter from "./routers/messageRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/userAuth", authRouter);
app.use("/api/messages", messagesRouter);

export default app;
