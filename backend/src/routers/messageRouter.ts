import express from "express";
import protectRoute from "../middleware/protectroute.js";
import { sendMessage } from "../controller/messageController.js";
const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);

export default router;
