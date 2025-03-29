import express from "express";
import authRouter from "./routers/authRouter.js";
import messagesRouter from "./routers/messageRouter.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json());
app.use("/api/userAuth", authRouter);
app.use("/api/messages", messagesRouter);
app.listen(9000, () => {
    console.log("server is on port 9000");
});
export default app;
