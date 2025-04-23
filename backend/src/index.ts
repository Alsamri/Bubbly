// src/index.ts
import express from "express";
import authRouter from "./routers/authRouter.js";
import messagesRouter from "./routers/messageRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://bubbly-q2bp.onrender.com"],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/userAuth", authRouter);
app.use("/api/messages", messagesRouter);

// Serve frontend in production
if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

export default app;
