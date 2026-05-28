import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

const router = express.Router();

router.post("/send-otp", async (req,res)=>{
  const { name, email, password } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(password,10);

  await User.findOneAndUpdate(
    { email },
    { name, email, password:hash, otp, otpExpiry:Date.now()+5*60*1000 },
    { upsert:true }
  );

  console.log("OTP:", otp); // integrate email/sms API here

  res.json({ message:"OTP sent" });
});

router.post("/verify-otp", async (req,res)=>{
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if(!user || user.otp !== otp || user.otpExpiry < Date.now())
    return res.status(400).json({ message:"Invalid OTP" });

  user.otp = null;
  await user.save();

  res.json({ message:"Signup success" });
});

export default router;
