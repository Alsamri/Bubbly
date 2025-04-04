import express from "express";
import authRouter from "./routers/authRouter.js";
import messagesRouter from "./routers/messageRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/userAuth", authRouter);
app.use("/api/messages", messagesRouter);

export default app;
