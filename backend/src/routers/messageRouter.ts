import express from "express";
import protectRoute from "../middleware/protectroute.js";
import {
  sendMessage,
  fetchMessage,
  sideBarUsers,
  allUsers,
} from "../controller/messageController.js";

const router = express.Router();
router.get("/allUsers", protectRoute, allUsers);
router.get("/conversations", protectRoute, sideBarUsers);
router.get("/:id", protectRoute, fetchMessage);
router.post("/send/:id", protectRoute, sendMessage);
export default router;
