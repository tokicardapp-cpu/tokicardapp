import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to Redis (Upstash)
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

// ✅ Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Route: Send OTP
// app.post("/send-otp", async (req, res) => {
//   const { email } = req.body;

//   if (!email) return res.status(400).json({ error: "Email is required" });

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   const emailKey = email.toLowerCase().trim();

  // Save OTP in Redis (expires in 5 minutes)
  await redis.set(`otp:${emailKey}`, otp, { ex: 300 });

  // Send OTP via Resend
//   try {
//     await resend.emails.send({
//       from: "Tokicard <no-reply@tokicardai.com>",
//       to: email,
//       subject: "Your Tokicard Verification Code",
//       html: `
//         <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
//           <h2>🔐 Tokicard Verification</h2>
//           <p>Your OTP code is:</p>
//           <h1 style="color:#4F46E5;">${otp}</h1>
//           <p>This code will expire in <strong>5 minutes</strong>.</p>
//           <p>If you didn’t request this, please ignore this email.</p>
//           <br/>
//           <small>© Tokicard Team</small>
//         </div>
//       `,
//     });

//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("❌ Email send failed:", error);
//     res.status(500).json({ error: "Failed to send OTP email" });
//   }
// });

// ✅ Route: Verify OTP
// app.post("/verify-otp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp)
//       return res.status(400).json({ error: "Email and OTP are required" });

//     const emailKey = email.toLowerCase().trim();

//     const storedOtp = await redis.get(`otp:${emailKey}`);
//     const actualOtp =
//       typeof storedOtp === "object" && storedOtp !== null
//         ? storedOtp.data
//         : storedOtp;

//     if (!actualOtp)
//       return res.status(400).json({ error: "OTP expired or not found" });

//     if (actualOtp.toString().trim() !== otp.toString().trim())
//       return res.status(400).json({ error: "Invalid OTP" });

    // ✅ OTP verified successfully
//     await redis.del(`otp:${emailKey}`);
//     res.json({ message: "OTP verified successfully" });
//   } catch (error) {
//     console.error("❌ Verification error:", error);
//     res.status(500).json({ error: "Server error during verification" });
//   }
// });

app.listen(5000, () => console.log("✅ Server running on port 5000"));
