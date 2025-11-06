import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getDb, isFirebaseConfigured } from '../lib/firebase';
import { toast } from 'sonner@2.0.3';
import { Mail, Search } from 'lucide-react';

const REFERRAL_REWARD_POINTS = 10; // 🔥 change reward per referral here

export function ReferralLookupPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [referralCount, setReferralCount] = useState<number | null>(null);
  const [earnings, setEarnings] = useState<number | null>(null);

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

      // ✅ Found the user
      const userDoc = snapshot.docs[0];
      const user = userDoc.data();
      setUserData(user);

      // 🔍 Count how many people used this user's referralId
      const referralQuery = query(
        waitlistRef,
        where('referredBy', '==', user.referralId)
      );
      const referralsSnapshot = await getDocs(referralQuery);
      const count = referralsSnapshot.size;
      setReferralCount(count);

      // 💰 Calculate earnings
      const totalEarnings = count * REFERRAL_REWARD_POINTS;
      setEarnings(totalEarnings);
    } catch (error) {
      console.error('Error fetching referral data:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[480px] bg-white rounded-[20px] p-6 sm:p-8 shadow-md">
        <h1 className="text-[24px] sm:text-[28px] font-semibold text-center mb-6 text-black">
          Check Referral Earnings
        </h1>

        <form onSubmit={handleSearch} className="w-full mb-6">
          <div className="relative mb-4">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#fafafa] rounded-[12px] px-12 py-3 text-[14px] sm:text-[15px] text-black placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-[12px] py-3 sm:py-4 text-[14px] sm:text-[15px] font-medium hover:bg-black/90 transition-colors disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {userData && (
          <div className="bg-[#f9f9f9] rounded-[16px] p-5 text-center border border-gray-200">
            <p className="text-[14px] text-[#666] mb-2">
              <span className="font-semibold text-black">{userData.email}</span> is on the waitlist.
            </p>

            <p className="text-[14px] text-[#444] mb-1">
              Referral ID: <span className="font-medium">{userData.referralId}</span>
            </p>

            <p className="text-[14px] text-[#444] mb-1">
              Total Referrals: <span className="font-semibold text-black">{referralCount ?? 0}</span>
            </p>

            <p className="text-[15px] text-[#111] mt-3 font-semibold">
              💰 Earnings: {earnings ?? 0} USDT
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
