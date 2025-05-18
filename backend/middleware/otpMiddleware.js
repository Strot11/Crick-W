const otpStore = require("../otpStore");
const nodemailer = require("nodemailer");

const sendOTP = async (req, res, next) => {
  const { email } = req.body;
  const otp = Math.floor(10000 + Math.random() * 10000).toString(); // Generate a 5-digit OTP
  const expireDate = Date.now() + 300 * 1000; // 5 minutes expiry

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "strotjain1108@gmail.com",
      pass: "sdecdqupjxcufzfw", //sdec dqup jxcu fzfw
    },
  });
  const mailOptions = {
    from: "strotjain1108@gmail.com",
    to: email,
    subject: "CRIC-W PLAYERS OTP for Registration",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };
  try {
    await transporter.sendMail(mailOptions);
    otpStore.set(email, { otp, expireDate });
    console.log("OTP sent to email:", email);
    next(); // move to next middleware or route handler
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
};
const verifyOTP = (req, res, next) => {
  const { email, userName, password, otp } = req.body;
  console.log("Inside Backend Verify OTP route", req.body);
  const record = otpStore.get(email);
  if (!record) return res.json({ success: false, message: "OTP not found" });

  if (Date.now() > record.expiry) {
    otpStore.delete(email);
    return res.json({ success: false, message: "OTP expired" });
  }

  if (record.otp !== otp) {
    return res.json({ success: false, message: "Incorrect OTP" });
  }
  otpStore.delete(email);
  next();
};
module.exports = { sendOTP, verifyOTP };
