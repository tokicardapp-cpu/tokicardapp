import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { getDb, isFirebaseConfigured } from '../lib/firebase';
import { toast } from 'sonner@2.0.3';
import { User, Mail, AlertCircle, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import tokilogo from '../assets/tokilogo.png';
import './landingpage.css';
// Utility to generate a unique referral code
const generateReferralCode = (name: string) => {
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${name.split(' ')[0].toLowerCase()}-${random}`;
};

// Get referral code from URL (e.g., ?ref=john-AB12)
const getReferralFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
};

interface WaitlistFormProps {
  onSuccess: (name: string) => void;
  onLoadingStart?: () => void;
}

export function WaitlistForm({ onSuccess, onLoadingStart }: WaitlistFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referrer, setReferrer] = useState<string | null>(null);
  const [existingReferralId, setExistingReferralId] = useState<string | null>(null);

  useEffect(() => {
    const ref = getReferralFromUrl();
    if (ref) {
      setReferrer(ref);
      localStorage.setItem('referrer', ref);
    }
  }, []);

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Copied successfully!');
    } catch (error) {
      toast.error('Failed to copy. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!isFirebaseConfigured) {
      toast.error('Firebase is not configured yet. Please add your Firebase credentials in /lib/firebase.ts');
      return;
    }

    setIsSubmitting(true);
    setExistingReferralId(null);

    try {
      const db = await getDb();
      if (!db) {
        toast.error('Firebase initialization failed.');
        setIsSubmitting(false);
        return;
      }

      const waitlistRef = collection(db, 'waitlist');
      const q = query(waitlistRef, where('email', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      // If user already exists, show their referral link instead of blocking
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const referralId = userData.referralId;

        toast.error('This email is already on the waitlist!');
        setExistingReferralId(referralId);
        setIsSubmitting(false);
        return;
      }

      // Generate a unique referral code for this user
      const referralId = generateReferralCode(fullName);

      // Add the new user to the waitlist
      await addDoc(waitlistRef, {
        fullName: fullName,
        email: email.toLowerCase(),
        referralId,
        referredBy: referrer || null,
        points: 0,
        timestamp: new Date().toISOString()
      });

      // If the user was referred by someone, reward that referrer
      if (referrer) {
        const refQuery = query(waitlistRef, where('referralId', '==', referrer));
        const refSnap = await getDocs(refQuery);

        if (!refSnap.empty) {
          const referrerDoc = refSnap.docs[0];
          const currentPoints = referrerDoc.data().points || 0;
          await updateDoc(referrerDoc.ref, { points: currentPoints + 1 });
        }
      }

      toast.success('Successfully joined the waitlist!');

      if (onLoadingStart) {
        onLoadingStart();
      }

      setTimeout(() => {
        onSuccess(fullName);
        localStorage.setItem('userReferralId', referralId);
      }, 200);
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      toast.error('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const referralLink = existingReferralId
    ? `${window.location.origin}/?ref=${existingReferralId}`
    : '';

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
                  Please add your Firebase credentials in <code className="bg-yellow-100 px-1 py-0.5 rounded">/lib/firebase.ts</code>.
                </p>
              </div>
            </div>
          )}

          {/* Logo */}
          <div className="mb-6 sm:mb-8">
            <img src={tokilogo} alt="Logo" width={118} />
          </div>

          {/* Heading */}
          <h1 className="text-[28px] sm:text-[32px] leading-[1.2] mb-2 sm:mb-3 text-center text-black px-4">
            Get Early Access
          </h1>
          <p className="text-[13px] sm:text-[14px] leading-[1.5] text-center text-[#666666] mb-6 sm:mb-8 max-w-[420px] px-4">
            Be among the first to experience the future of global payments
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full mb-8 sm:mb-6">
            <div className="relative mb-3">
              <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#999999]" />
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white rounded-[12px] px-10 sm:px-12 py-3 sm:py-4 text-[14px] sm:text-[15px] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div className="relative mb-4">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#999999]" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded-[12px] px-10 sm:px-12 py-3 sm:py-4 text-[14px] sm:text-[15px] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white rounded-[12px] py-3 sm:py-4 text-[14px] sm:text-[15px] hover:bg-black/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>

          {/* If email exists, show referral link */}
          {existingReferralId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full mt-3 text-center"
            >
              <p className="text-[14px] sm:text-[15px] text-[#444] mb-3 font-medium">
                This is the referral link for this email:
              </p>

             <div
      className="flex items-center justify-between w-full max-w-[480px] bg-[#F8F8F8] border border-[#E5E5E5] rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-sm mx-auto overflow-hidden"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
    >
      {/* Left side: Icon + Link */}
      <div className="flex items-center flex-1 min-w-0 gap-2 mycontainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 010 5.656l-1.415 1.415a4 4 0 01-5.657-5.656l.708-.708m8.486 0l.708-.708a4 4 0 015.657 5.656l-1.415 1.415a4 4 0 01-5.657-5.656z"
          />
        </svg>

       <p
  className="text-[9.5px] sm:text-[13.5px] text-gray-700 font-medium truncate mylink overflow-hidden text-ellipsis whitespace-nowrap"
  title={referralLink}
>
  {referralLink}
</p>

      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopyLink}
        className="ml-3 sm:ml-4 bg-black text-white text-[13px] sm:text-[14px] font-medium rounded-full px-4 sm:px-5 copybutton sm:py-6 hover:bg-[#222] active:scale-[0.97] transition-all duration-200"
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
