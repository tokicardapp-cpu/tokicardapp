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
import { User, Mail, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import tokilogo from "../assets/tokilogo.png";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referrer, setReferrer] = useState<string | null>(null);
  const [existingReferralId, setExistingReferralId] = useState<string | null>(
    null
  );

  // ✅ Persist referral between pages
  useEffect(() => {
    const ref = getReferralFromUrl();

    if (ref) {
      const lowerRef = ref.toLowerCase();
      setReferrer(lowerRef);
      localStorage.setItem("referrer", lowerRef);
      console.log("🎯 Referral detected from URL:", lowerRef);
    } else {
      const savedRef = localStorage.getItem("referrer");
      if (savedRef) {
        setReferrer(savedRef);
        console.log("📦 Referral restored from localStorage:", savedRef);
      } else {
        console.log("⚠️ No referrer found in URL or storage");
      }
    }
  }, []);

  // ✅ Handle "copy link" button
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Copied successfully!");
    } catch (error) {
      toast.error("Failed to copy. Please try again.");
    }
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isFirebaseConfigured) {
      toast.error("Firebase not configured — please add credentials.");
      return;
    }

    setIsSubmitting(true);
    setExistingReferralId(null);

    try {
      const db = await getDb();
      if (!db) {
        toast.error("Firebase initialization failed.");
        setIsSubmitting(false);
        return;
      }

      const waitlistRef = collection(db, "waitlist");

      // Check if email already exists
      const q = query(waitlistRef, where("email", "==", email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const referralId = userData.referralId;
        toast.error("This email is already on the waitlist!");
        setExistingReferralId(referralId);
        setIsSubmitting(false);
        return;
      }

      // ✅ Generate new referral code
      const referralId = generateReferralCode(fullName);

      // Add new user to Firestore
      await addDoc(waitlistRef, {
        fullName,
        email: email.toLowerCase(),
        referralId,
        referredBy: referrer || null,
        points: 0,
        timestamp: new Date().toISOString(),
      });

      console.log("✅ User added with referralId:", referralId);

      // ✅ Reward the referrer (add +1 point)
      if (referrer) {
        const normalizedRef = referrer.toLowerCase();
        const refQuery = query(
          waitlistRef,
          where("referralId", "==", normalizedRef)
        );
        const refSnap = await getDocs(refQuery);

        console.log("🔍 Looking for referrer:", normalizedRef);
        console.log("📄 Matching docs found:", refSnap.size);

        if (!refSnap.empty) {
          const referrerDoc = refSnap.docs[0];
          const currentPoints = referrerDoc.data().points || 0;
          console.log("💰 Current points:", currentPoints);

          await updateDoc(referrerDoc.ref, { points: increment(1) });
          console.log("✅ Referrer rewarded successfully!");
        } else {
          console.warn("⚠️ No referrer found for:", normalizedRef);
        }
      }

      toast.success("Successfully joined the waitlist!");

      if (onLoadingStart) onLoadingStart();

      setTimeout(() => {
        onSuccess(fullName);
        localStorage.setItem("userReferralId", referralId);
      }, 200);
    } catch (error) {
      console.error("❌ Error adding to waitlist:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const referralLink = existingReferralId
    ? `${window.location.origin}/?ref=${existingReferralId}`
    : "";

  return (
    <div className="h-screen bg-[#f5f5f5] flex flex-col relative overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-[572px] flex flex-col items-center px-4 sm:px-0">
          {!isFirebaseConfigured && (
            <div className="w-full mb-6 bg-yellow-50 border border-yellow-200 rounded-[12px] p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] sm:text-[13px] text-yellow-800 font-medium">
                  Firebase Not Configured
                </p>
                <p className="text-[11px] sm:text-[12px] text-yellow-700 mt-1">
                  Please add your Firebase credentials in{" "}
                  <code className="bg-yellow-100 px-1 py-0.5 rounded">
                    /lib/firebase.ts
                  </code>
                  .
                </p>
              </div>
            </div>
          )}

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
          </p>

          {/* Optional: Show who referred user */}
          {referrer && (
            <p className="text-[14px] text-gray-600 mb-4">
              You were referred by{" "}
              <span className="font-semibold text-black">{referrer}</span> 🎉
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full mb-8">
            <div className="relative mb-3">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white rounded-[12px] px-10 py-3 text-[14px] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div className="relative mb-4">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded-[12px] px-10 py-3 text-[14px] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white rounded-[12px] py-3 text-[14px] hover:bg-black/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </button>
          </form>

          {/* Referral link display */}
          {existingReferralId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full mt-3 text-center"
            >
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
                  className="ml-3 bg-black text-white text-[13px] font-medium rounded-full px-4 py-2 hover:bg-[#222] transition-all"
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
