import express from "express";
import protectRoute from "../middleware/protectroute.js";
import { sendMessage, fetchMessage } from "../controller/messageController.js";
const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, fetchMessage);
export default router;
