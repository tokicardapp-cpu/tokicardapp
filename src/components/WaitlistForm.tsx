import { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getDb, isFirebaseConfigured } from '../lib/firebase';
import { toast } from 'sonner@2.0.3';
import { User, Mail, AlertCircle } from 'lucide-react';
import logo from 'figma:asset/820d6c255732d29ace7799e391354969e370224c.png';
import banner from 'figma:asset/c5f8b9c8fa26756650afa4303444ee0ab7ac5bd6.png';

interface WaitlistFormProps {
  onSuccess: (name: string) => void;
  onLoadingStart?: () => void;
}

export function WaitlistForm({ onSuccess, onLoadingStart }: WaitlistFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Check if Firebase is configured
    if (!isFirebaseConfigured) {
      toast.error('Firebase is not configured yet. Please add your Firebase credentials in /lib/firebase.ts');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get Firebase database instance
      const db = await getDb();
      
      if (!db) {
        toast.error('Firebase initialization failed. Please check your configuration.');
        setIsSubmitting(false);
        return;
      }

      // Check if email already exists
      const waitlistRef = collection(db, 'waitlist');
      const q = query(waitlistRef, where('email', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error('This email is already on the waitlist!');
        setIsSubmitting(false);
        return;
      }

      // Add to waitlist
      await addDoc(waitlistRef, {
        fullName: fullName,
        email: email.toLowerCase(),
        timestamp: new Date().toISOString()
      });

      toast.success('Successfully joined the waitlist!');
      
      // Show loading before success page
      if (onLoadingStart) {
        onLoadingStart();
      }
      
      // Small delay to show the preloader
      setTimeout(() => {
        onSuccess(fullName);
      }, 100);
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      toast.error('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-[#f5f5f5] flex flex-col relative overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-[572px] flex flex-col items-center px-4 sm:px-0">
          {/* Firebase Configuration Warning */}
          {!isFirebaseConfigured && (
            <div className="w-full mb-6 bg-yellow-50 border border-yellow-200 rounded-[12px] p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] sm:text-[13px] text-yellow-800" style={{ fontWeight: 500 }}>
                  Firebase Not Configured
                </p>
                <p className="text-[11px] sm:text-[12px] text-yellow-700 mt-1" style={{ fontWeight: 400 }}>
                  Please add your Firebase credentials in <code className="bg-yellow-100 px-1 py-0.5 rounded">/lib/firebase.ts</code> to enable waitlist functionality.
                </p>
              </div>
            </div>
          )}

          {/* Logo */}
          <div className="mb-6 sm:mb-8">
            <svg 
              width="120" 
              height="32" 
              viewBox="0 0 120 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[100px] h-[27px] sm:w-[120px] sm:h-[32px]"
            >
              <path d="M17.5 0H0V17.5C0 25.5081 6.49187 32 14.5 32C22.5081 32 29 25.5081 29 17.5V14.5H17.5V0Z" fill="#9333EA"/>
              <circle cx="14.5" cy="17.5" r="8.5" fill="white"/>
              <text x="38" y="23" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="600" fill="#000000">Tokicard</text>
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-[28px] sm:text-[32px] leading-[1.2] mb-2 sm:mb-3 text-center text-black px-4" style={{ fontWeight: 400 }}>
            Get Early Access
          </h1>

          {/* Description */}
          <p className="text-[13px] sm:text-[14px] leading-[1.5] text-center text-[#666666] mb-6 sm:mb-8 max-w-[420px] px-4" style={{ fontWeight: 400 }}>
            Instantly create USD virtual cards, fund with crypto or Naira, and pay globally all in one sleek dashboard.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full mb-8 sm:mb-12">
            {/* Full Name Input */}
            <div className="relative mb-3">
              <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#999999]" />
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border-none rounded-[12px] px-10 sm:px-12 py-3 sm:py-4 text-[14px] sm:text-[15px] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                style={{ fontWeight: 400 }}
              />
            </div>

            {/* Email Input */}
            <div className="relative mb-4">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#999999]" />
              <input
                type="email"
                placeholder="email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border-none rounded-[12px] px-10 sm:px-12 py-3 sm:py-4 text-[14px] sm:text-[15px] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                style={{ fontWeight: 400 }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white rounded-[12px] py-3 sm:py-4 text-[14px] sm:text-[15px] hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center"
              style={{ fontWeight: 500 }}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        </div>
      </div>

    
    </div>
  );
}