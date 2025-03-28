import express from "express";
const router = express.Router();

router.get("/conversations", (req, res) => {
  res.send("login");
});
router.get("/logout", (req, res) => {
  res.send("logout");
});
router.get("/signup", (req, res) => {
  res.send("signup");
});

export default router;
