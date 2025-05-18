const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP } = require("../middleware/otpMiddleware");
const otpStore = require("../otpStore");
const user = require("../user");

router.post("/send-otp", sendOTP, (req, res) => {
  res.status(200).json({ success: true, message: "OTP sent successfully" });
});
router.post("/verify-otp", verifyOTP, (req, res) => {
  const { email, userName, password } = req.body;
  user.push({ userName, email, password });
  console.log("User registered successfully:", user);
  res.status(200).json({ success: true });
});
router.post("/login", (req, res) => {
  const { userName, password } = req.body;
  console.log("Username:", userName, "Password:", password);
  const users = user.find(
    (u) => u.userName === userName && u.password === password
  );
  if (users) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});
module.exports = router;
