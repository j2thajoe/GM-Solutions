import express from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";
import twilio from "twilio";

const router = express.Router();

const otpStore = new Map();

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// ------------------- EMAIL OTP ------------------- //

router.post("/send-email-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = generateOtp();
  otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

  try {
    await transporter.sendMail({
      from: `"GMSolutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Mail OTP Code",
      text: `Your One Time Password is: ${otp}`,
    });
    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error("Email OTP error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// ------------------- PHONE OTP ------------------- //

router.post("/send-phone-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone required" });

  const otp = generateOtp();
  otpStore.set(phone, { otp, expires: Date.now() + 5 * 60 * 1000 });

  try {
    await twilioClient.messages.create({
      from: process.env.TWILIO_PHONE,
      to: phone,
      body: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });
    res.json({ success: true, message: "OTP sent via SMS" });
  } catch (err) {
    console.error("Phone OTP error:", err);
    res.status(500).json({ error: "Failed to send SMS OTP" });
  }
});

// ------------------- VERIFY OTP ------------------- //

router.post("/verify-otp", (req, res) => {
  const { identifier, otp } = req.body;
  const record = otpStore.get(identifier);

  if (!record) return res.status(400).json({ error: "No OTP found" });
  if (Date.now() > record.expires)
    return res.status(400).json({ error: "OTP expired" });
  if (record.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

  // Success → clear it
  otpStore.delete(identifier);
  res.json({ success: true, message: "OTP verified successfully" });
});

export default router;
