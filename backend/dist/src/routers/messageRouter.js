import express from "express";
import protectRoute from "../middleware/protectroute.js";
import { sendMessage, fetchMessage, sideBarUsers, } from "../controller/messageController.js";
const router = express.Router();
router.get("/conversations", protectRoute, sideBarUsers);
router.get("/:id", protectRoute, fetchMessage);
router.post("/send/:id", protectRoute, sendMessage);
export default router;
