import express from "express";
import protectRoute from "../middleware/protectroute.js";
import {
  login,
  logout,
  signup,
  userStatus,
} from "../controller/authController.js";
const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);
router.get("/status", protectRoute, userStatus);

export default router;
