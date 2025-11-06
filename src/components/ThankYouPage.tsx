import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import { getDb } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { toast } from 'sonner@2.0.3';
import checkcircle from '../assets/checkcircle.png';
import tokilogo from '../assets/tokilogo.png';
import cardImage from '../assets/customercard.png';
import './landingpage.css';

interface ThankYouPageProps {
  userName?: string;
}

export function ThankYouPage({ userName = 'TOKICARD USER' }: ThankYouPageProps) {
  const [referralId, setReferralId] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const cardName = userName.toUpperCase();

  // Fetch referral ID + points from Firestore
  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const db = await getDb();
        const savedReferralId = localStorage.getItem('userReferralId');

        if (savedReferralId && db) {
          setReferralId(savedReferralId);

          const q = query(collection(db, 'waitlist'), where('referralId', '==', savedReferralId));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            setPoints(userDoc.data().points || 0);
          }
        }
      } catch (error) {
        console.error('Error fetching referral data:', error);
      }
    };

    fetchReferralData();
  }, []);

  const referralLink = referralId
    ? `${window.location.origin}/?ref=${referralId}`
    : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success('Copied successfully!');
    } catch (error) {
      toast.error('Failed to copy. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Tokicard Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-6 sm:mb-8"
      >
        <img src={tokilogo} alt="Tokicard" width={118} />
      </motion.div>

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        className="w-full max-w-[480px] bg-[#f5f5f5] rounded-[24px] sm:p-12 flex flex-col items-center shadow-sm maincard"
      >
        {/* Virtual Card */}
                {/* Virtual Card with Image */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotateY: -15 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ 
            delay: 0.4, 
            duration: 0.8,
            ease: "easeOut"
          }}
          className="w-full max-w-[340px] sm:max-w-[380px] mb-8 sm:mb-10"
        >
          <div className="relative w-full">
            {/* Card Background Image */}
            <img 
              src={cardImage} 
              alt="Tokicard Virtual Card" 
              className="w-full h-auto rounded-[16px] sm:rounded-[20px] shadow-2xl"
            />
            
            {/* User's Name Overlay - Positioned where the original name is on the card */}
            <div >
              <p 
                className="text-white text-[11px] sm:text-[13px] md:text-[15px] tracking-wide leading-none cardname"
                style={{ 
                  fontWeight: 600,
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {cardName}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-[24px] sm:text-[28px] leading-[1.2] mb-4 text-center text-black yourin"
          style={{ fontWeight: 600 }}
        >
          You're In!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-[14px] sm:text-[15px] leading-[1.6] text-center text-[#666666] mb-6 sm:mb-10"
          style={{ fontWeight: 400 }}
        >
          Your early access request has been received. You’ll be among the first
          to experience Tokicard when we go live.
        </motion.p>

        {/* Follow Us on X */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open('https://x.com/tokicardapp', '_blank')}
          className="w-full bg-black text-white rounded-full py-4 px-8 mb-4 transition-all duration-200 hover:bg-black/90"
          style={{ fontWeight: 400 }}
        >
          Follow Us on X
        </motion.button>

      {/* --- New Referral Section --- */}
{/* --- Refined Referral Section --- */}
{referralId && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.5 }}
    className="w-full mt-5 text-center"
  >
    <p className="text-[14px] sm:text-[15px] text-[#444] mb-3 font-medium">
      Share your unique referral link:
    </p>

    {/* Beautiful Inline Referral Link Box */}
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




        {/* Small Text Below */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="text-[12px] sm:text-[13px] leading-[1.5] text-center text-[#999999] mt-6"
          style={{ fontWeight: 400 }}
        >
          Follow us for updates, launch announcements, and lifestyle previews.
        </motion.p>
      </motion.div>
    </div>
  );
}
