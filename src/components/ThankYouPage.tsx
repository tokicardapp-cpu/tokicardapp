import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import checkcircle from  '../assets/checkcircle.png'; 
import tokilogo from '../assets/tokilogo.png';  
import cardImage from '../assets/tokilogo.png';
import './landingpage.css';

interface ThankYouPageProps {
  userName?: string;
}

export function ThankYouPage({ userName = 'TOKICARD USER' }: ThankYouPageProps) {
  // Format the name to uppercase for the card
  const cardName = userName.toUpperCase();
  
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Tokicard Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6 sm:mb-8"
      >
        <img src={tokilogo} alt="Tokicard" width={118}/>
      </motion.div>

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-[480px] bg-[#f5f5f5] rounded-[24px] sm:p-12 flex flex-col items-center shadow-sm maincard"
      >
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

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.6
          }}
        >
        </motion.div>

        {/* You're In! Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-[24px] sm:text-[28px] leading-[1.2] mb-4 text-center text-black yourin"
          style={{ fontWeight: 600 }}
        >
          You're In!
        </motion.h1>

        {/* Description Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-[14px] sm:text-[15px] leading-[1.6] text-center text-[#666666] mb-6 sm:mb-10"
          style={{ fontWeight: 400 }}
        >
          Your early access request has been received, you will be among the first to experience Tokicard when we go live.
        </motion.p>

        {/* Follow Us on X Button */}
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

        {/* Small Text Below Button */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="text-[12px] sm:text-[13px] leading-[1.5] text-center text-[#999999]"
          style={{ fontWeight: 400 }}
        >
          Follow us for updates, launch announcements, and lifestyle previews.
        </motion.p>
      </motion.div>
    </div>
  );
}


// className="absolute bottom-[18%] left-[8%] sm:bottom-[19%] sm:left-[8%]"
 {/* <div className="rounded-full flex items-center justify-center">
            <img src={checkcircle} alt="Success"  width={35}/>
          </div> */}