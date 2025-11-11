const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

// 🔐 Get Resend key from Firebase config
const RESEND_API_KEY = functions.config().resend?.key;
if (!RESEND_API_KEY) console.warn("⚠️ Missing resend.key config. Set it with: firebase functions:config:set resend.key=\"YOUR_KEY\"");

// Generate 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ sendOtp Cloud Function
exports.sendOtp = functions.https.onCall(async (data, context) => {
  const { fullName, email } = data;
  if (!fullName || !email) {
    throw new functions.https.HttpsError("invalid-argument", "Missing fullName or email.");
  }

  const otp = generateOtp();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

  await db.collection("email_verifications").doc(email.toLowerCase()).set({
    fullName,
    email: email.toLowerCase(),
    otp,
    expiresAt: expiry,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Send email using Resend API
  try {
    await axios.post(
      "https://api.resend.com/emails",
      {
        from: "Tokicard <onboarding@resend.dev>",
        to: email,
        subject: "Your Tokicard Verification Code",
        html: `<p>Hi <strong>${fullName}</strong>,</p>
               <p>Your verification code is:</p>
               <h2 style="color:#4F46E5;">${otp}</h2>
               <p>This code will expire in 5 minutes.</p>`,
      },
      { headers: { Authorization: `Bearer ${RESEND_API_KEY}` } }
    );

    return { message: "OTP sent successfully" };
  } catch (err) {
    console.error("Resend error:", err.response?.data || err.message);
    throw new functions.https.HttpsError("internal", "Failed to send OTP email");
  }
});

// ✅ verifyOtp Cloud Function
exports.verifyOtp = functions.https.onCall(async (data, context) => {
  const { email, otp } = data;
  if (!email || !otp)
    throw new functions.https.HttpsError("invalid-argument", "Missing email or OTP.");

  const ref = db.collection("email_verifications").doc(email.toLowerCase());
  const snap = await ref.get();

  if (!snap.exists)
    throw new functions.https.HttpsError("not-found", "No OTP found for this email.");

  const record = snap.data();
  if (Date.now() > record.expiresAt)
    throw new functions.https.HttpsError("deadline-exceeded", "OTP expired.");
  if (record.otp !== otp)
    throw new functions.https.HttpsError("permission-denied", "Invalid OTP.");

  await ref.delete(); // cleanup

  return { message: "Email verified successfully" };
});
