const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shashankvaish72@gmail.com",
    pass: "zfsfybirqdmnivdl"
  }
});

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();
  res.send("User registered");
});


/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    "SECRET_KEY",
    { expiresIn: rememberMe ? "7d" : "1h" } // ✅ remember me
  );

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
  });
});

router.post("/reset-password",async (req,res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return 
  res.status(404).send("User not found");
  user.password = newPassword;
  await User.Save();
  res.send("Password updated")
});

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    await transporter.sendMail({
      from: "yourgmail@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`
    });

    console.log("OTP SENT:", otp); // 🔥 DEBUG LOG

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("OTP ERROR:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send("User not found");

  if (user.otp !== otp || Date.now() > user.otpExpiry) {
    return res.status(400).send("Invalid or expired OTP");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = null;
  user.otpExpiry = null;

  await user.save();
  res.send("Password reset successful");
});


module.exports = router;
