import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getDb, isFirebaseConfigured } from '../lib/firebase';
import { toast } from 'sonner@2.0.3';
import { Mail, Copy, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import tokilogo from '../assets/tokilogo.png';
import './landingpage.css';
const REFERRAL_REWARD_POINTS = 10; // 🎯 change reward per referral here

export function ReferralLookupPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [referralCount, setReferralCount] = useState<number | null>(null);
  const [earnings, setEarnings] = useState<number | null>(null);
  const [referralLink, setReferralLink] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter an email address.');
      return;
    }

    if (!isFirebaseConfigured) {
      toast.error('Firebase is not configured.');
      return;
    }

    setIsLoading(true);
    setUserData(null);
    setReferralCount(null);
    setEarnings(null);

    try {
      const db = await getDb();
      if (!db) throw new Error('Firebase not initialized');

      const waitlistRef = collection(db, 'waitlist');
      const q = query(waitlistRef, where('email', '==', email.toLowerCase()));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        toast.error('No user found with that email.');
        setIsLoading(false);
        return;
      }

      const userDoc = snapshot.docs[0];
      const user = userDoc.data();
      setUserData(user);

      // 🔍 Count how many people used this user's referralId
      const referralQuery = query(waitlistRef, where('referredBy', '==', user.referralId));
      const referralsSnapshot = await getDocs(referralQuery);
      const count = referralsSnapshot.size;
      setReferralCount(count);

      // 💰 Calculate earnings
      const totalEarnings = count * REFERRAL_REWARD_POINTS;
      setEarnings(totalEarnings);
      setReferralLink(`https://tokicard.com/earlyaccess?ref=${user.referralId}`);
    } catch (error) {
      console.error('Error fetching referral data:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success('Copied successfully!');
    } catch {
      toast.error('Failed to copy. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-4 py-10">
      {/* Tokicard Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <img src={tokilogo} alt="Tokicard" className="w-[120px]" />
      </motion.div>

      {/* Icon */}
      <UserPlus className="text-[#C502E8] w-10 h-10 mb-4 userplus" />

      {/* Title */}
      <h1 className="text-[22px] sm:text-[28px] font-semibold text-center text-black mb-2">
        Find your referral rewards
      </h1>
      <p className="text-center text-[#666] text-[13px] sm:text-[14px] mb-8 max-w-[360px]">
        Enter the email you used to join the early access so we can find your referral info.
      </p>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="w-full max-w-[420px] mb-3">
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="email"
            placeholder="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white rounded-full pl-10 pr-4 py-3 px-8 border border-gray-200 text-[14px] sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#C502E8]/30"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white text-[14px] sm:text-[15px] rounded-full py-3 hover:bg-black/90 transition-colors disabled:opacity-60"
        >
          {isLoading ? 'Checking...' : 'Check Rewards'}
        </button>
      </form>

      <p className="text-[12px] text-gray-500 text-center mb-6">
        We’ll only use this email to find your waitlist record. No spam.
      </p>

      {/* Display Results */}
      {userData && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center w-full max-w-[480px]"
        >
          <p className="text-[13px] sm:text-[14px] mb-4 text-gray-600">
            <span className="bg-[#E9D5FF] text-[#C502E8] px-3 py-1 rounded-full text-[12px] font-medium">
              {userData.email}
            </span>{' '}
            is on the waitlist
          </p>

          {/* Referral Link Box */}
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

        {/* Stats Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 w-full max-w-[420px]  ">
  {/* Earnings Card */}
  <div className="flex flex-col justify-center items-center bg-white border border-gray-100 rounded-2xl py-5 sm:py-6 shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
    <p className="text-gray-500 text-[13px] sm:text-[14px] font-medium mb-1">
      Earnings
    </p>
    <p className="text-[#C502E8] text-[20px] sm:text-[22px] font-bold tracking-tight">
      ${earnings?.toFixed(2) ?? 0}
    </p>
  </div>

  {/* Total Referrals Card */}
  <div className="flex flex-col justify-center items-center bg-white border border-gray-100 rounded-2xl py-5 sm:py-6 shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
    <p className="text-gray-500 text-[13px] sm:text-[14px] font-medium mb-1">
      Total Referrals
    </p>
    <p className="text-[#C502E8] text-[20px] sm:text-[22px] font-bold tracking-tight">
      {referralCount ?? 0}
    </p>
  </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
