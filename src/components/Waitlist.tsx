import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "../lib/firebase";
import { toast } from "sonner@2.0.3";
import { User, Mail, AlertCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import tokilogo from "../assets/tokilogo.png";
import cardImage from "../assets/customercard.png";
import "./landingpage.css";

// ✅ Generate lowercase referral codes for consistency
const generateReferralCode = (name: string) => {
  const random = Math.random().toString(36).substring(2, 6);
  return `${name.split(" ")[0].toLowerCase()}-${random}`;
};

// ✅ Get referral from URL query
const getReferralFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("ref");
};

interface WaitlistFormProps {
  onSuccess: (name: string) => void;
  onLoadingStart?: () => void;
}

export function WaitlistForm({ onSuccess, onLoadingStart }: WaitlistFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [existingUserName, setExistingUserName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referrer, setReferrer] = useState<string | null>(null);
  const [existingReferralId, setExistingReferralId] = useState<string | null>(null);

  // ✅ OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // ✅ Persist referral between pages
  useEffect(() => {
    const ref = getReferralFromUrl();

    if (ref) {
      const lowerRef = ref.toLowerCase();
      setReferrer(lowerRef);
      localStorage.setItem("referrer", lowerRef);
    } else {
      const savedRef = localStorage.getItem("referrer");
      if (savedRef) setReferrer(savedRef);
    }
  }, []);

  // ✅ Handle "copy link" button
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Copied successfully!");
    } catch {
      toast.error("Failed to copy. Please try again.");
    }
  };

  // ✅ Step 1: Send OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phoneNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://tokibackend-otp.onrender.com/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to verification server");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const response = await fetch("https://tokibackend-otp.onrender.com/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Email verified successfully!");
        await addUserToFirestore();
        setOtpSent(false);
        setOtp("");
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error during verification");
    } finally {
      setIsVerifying(false);
    }
  };

  // ✅ Step 3: Add verified user to Firestore
  const addUserToFirestore = async () => {
    if (!isFirebaseConfigured) {
      toast.error("Firebase not configured — please add credentials.");
      return;
    }

    try {
      const db = await getDb();
      if (!db) {
        toast.error("Firebase initialization failed.");
        return;
      }

      const waitlistRef = collection(db, "waitlist");
      const q = query(waitlistRef, where("email", "==", email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const referralId = userData.referralId;
        const name = userData.fullName;
        setExistingUserName(name);
        toast.error("This email is already on the waitlist!");
        setExistingReferralId(referralId);
        return;
      }

      const referralId = generateReferralCode(fullName);

      await addDoc(waitlistRef, {
        fullName,
        phoneNumber,
        email: email.toLowerCase(),
        referralId,
        referredBy: referrer || null,
        points: 0,
        timestamp: new Date().toISOString(),
      });

      toast.success("Successfully joined the waitlist!");

      if (referrer) {
        const normalizedRef = referrer.toLowerCase();
        const refQuery = query(waitlistRef, where("referralId", "==", normalizedRef));
        const refSnap = await getDocs(refQuery);
        if (!refSnap.empty) {
          const referrerDoc = refSnap.docs[0];
          await updateDoc(referrerDoc.ref, { points: increment(1) });
        }
      }

      if (onLoadingStart) onLoadingStart();
      setTimeout(() => {
        onSuccess(fullName);
        localStorage.setItem("userReferralId", referralId);
      }, 200);
    } catch (error) {
      console.error("❌ Error adding to waitlist:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const referralLink = existingReferralId
    ? `${window.location.origin}/?ref=${existingReferralId}`
    : "";

  return (
    <div className="h-screen bg-[#f5f5f5] flex flex-col relative overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-[572px] flex flex-col items-center px-4 sm:px-0">
          {/* Logo */}
          <div className="mb-6 sm:mb-8">
            <img src={tokilogo} alt="Logo" width={118} />
          </div>

          {/* Heading */}
          <h1 className="text-[28px] sm:text-[32px] leading-[1.2] mb-2 text-center text-black">
            Get Early Access
          </h1>
          <p className="text-[13px] sm:text-[14px] text-center text-[#666666] mb-6 max-w-[420px]">
            Be among the first to experience the future of global payments
             {/* <p className="text-[13px] sm:text-[14px] text-center text-[#666666]  max-w-[420px] text-bold otptext">
             Check your email for the OTP.
          </p> */}
          </p>
          

          {referrer && (
            <p className="text-[14px] text-gray-600 mb-4">
              You were referred by{" "}
              <span className="font-semibold text-black">{referrer}</span> 🎉
            </p>
          )}

          {/* Step 1: Main form */}
          {!otpSent && (
            <form onSubmit={handleSubmit} className="w-full mb-8">
              <div className="relative mb-3">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-white rounded-[12px] px-10 py-3 text-[14px] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="relative mb-3">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white rounded-[12px] px-10 py-3 text-[14px] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              {/* <div className="relative mb-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                <input
                  type="tel"
                  placeholder="Whatsapp phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  pattern="^\\+?\\d{11,15}$"
                  title="Phone number must be between 11 and 15 digits (start with your country code)"
                  className="w-full bg-white rounded-[12px] px-10 py-3 text-[14px] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <p className="text-[11px] text-gray-500 mb-4 leading-tight">
                Include country code, e.g.{" "}
                <span className="font-semibold">+2348123456789</span>
              </p> */}
                 <div className="relative mb-1">
    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
    <input
      type="tel"
      placeholder="Whatsapp phone number"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      required
      pattern="^\+?\d{11,15}$"
      title="Phone number must be between 11 and 15 digits (start with your country code)"
      className="w-full bg-white rounded-[12px] px-10 py-3 text-[14px] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
    />
  </div>

 <p className="text-[11px] text-gray-500 mb-4 leading-tight">
   Include country code, e.g. <span className="font-semibold">+2348123456789</span>
</p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white rounded-[12px] py-3 text-[14px] hover:bg-black/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending OTP..." : "Join Waitlist"}
              </button>
            </form>
          )}

          {/* Step 2: OTP form */}
          {otpSent && (
            <form onSubmit={handleVerifyOtp} className="w-full mb-8 mt-4">
              <div className="otpdiv">
                   <p className="text-[13px] sm:text-[14px] text-center text-[#666666]  max-w-[420px] text-bold otptext">
             Check your email for the OTP.
          </p>
              </div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="w-full bg-white rounded-[12px] mb-4 px-10 py-3 text-[14px] text-center placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-black text-white rounded-[12px] py-3 mt-8 text-[14px] hover:bg-black/90 transition-colors disabled:opacity-50"
              >
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* Referral + Card */}
          {existingReferralId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full mt-3 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -20, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[340px] sm:max-w-[380px] mb-8 sm:mb-10"
              >
                <div className="relative w-full">
                  <img
                    src={cardImage}
                    alt="Tokicard Virtual Card"
                    className="w-full h-auto rounded-[16px] sm:rounded-[20px] shadow-2xl"
                  />
                  <div>
                    <p
                      className="text-white text-[11px] sm:text-[13px] md:text-[15px] tracking-wide leading-none cardname"
                      style={{
                        fontWeight: 600,
                        textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      }}
                    >
                      {existingUserName}
                    </p>
                  </div>
                </div>
              </motion.div>

              <p className="text-[14px] text-[#444] mb-3 font-medium">
                This is your referral link:
              </p>

              <div className="flex items-center justify-between w-full max-w-[480px] bg-[#F8F8F8] border border-[#E5E5E5] rounded-full px-4 py-2 shadow-sm mx-auto overflow-hidden">
                <p
                  className="text-[11px] sm:text-[13px] text-gray-700 font-medium truncate"
                  title={referralLink}
                >
                  {referralLink}
                </p>

                <button
                  onClick={() => handleCopyLink(referralLink)}
                  className="ml-3 sm:ml-4 bg-black text-white text-[13px] sm:text-[14px] font-medium rounded-full px-4 sm:px-5 sm:py-2 hover:bg-[#222] active:scale-[0.97] transition-all duration-200"
                >
                  Copy
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
