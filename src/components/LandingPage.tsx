import { motion, AnimatePresence, color } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FeatureCarousel } from "../components/carousel";
import cardImage from '../assets/whatsapp.png';
import womanPhoneImage from '../assets/maincard.png';
import phoneInterfaceImage from '../assets/maincard.png';
import phoneInterfaceImagetwo from '../assets/whatsappthree.png';
import virtualCardPhone from '../assets/whatsapptwo.png';
import Bitcoin from '../assets/bitcoin.png';
import Ethereum from '../assets/etheruem.png';
import BNB from '../assets/bnb.png';
import Solana from '../assets/solana.png';
import TRON from '../assets/tron.png';
import Polygon from '../assets/polygon.png';
import Near from '../assets/near.png';
import Avalanche from '../assets/avalanche.png';
import Optimism from '../assets/optimism.png';
import Lisk from '../assets/lisk.png';
import Arbitrum from '../assets/arbitrum.png';
import Base from '../assets/base.png';
import tokilogo from '../assets/tokilogo.png';  
import whatsappfour from '../assets/whatsappfour.png';
import whatsappfive from '../assets/whatsappfive.png';
import whatsappsix from '../assets/whatsappsix.png';
import whatsappseven from '../assets/whatsappseven.png';
import './landingpage.css';
interface LandingPageProps {
  onJoinWaitlist: () => void;
}

const featureCards = [
  {
    id: 1,
    title: 'Dual Funding Options',
    description: 'Fund with crypto or local currency, whichever works best for you.',
    icon: '💰',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
  },
  {
    id: 2,
    title: 'Instant Card Setup',
    description: 'Get your virtual card instantly and start spending in minutes.',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  },
  {
    id: 3,
    title: 'Global Acceptance',
    description: 'Use your card anywhere in the world that accepts virtual cards.',
    icon: '🌍',
    gradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
  },
   {
    id: 4,
    title: 'Secure by Design',
    description: 'Enterprise-grade encryption and fintech-level protection, built for trust.',
    icon: '🌍',
    gradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
  },
   {
    id: 5,
    title: 'Instant Card Setup',
    description: 'Get your virtual card in seconds. No bank queues, no paperwork.',
    icon: '🌍',
    gradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
  },
];

const blockchainLogos = [
  { name: 'Bitcoin', emoji: Bitcoin, color: '#F7931A' },
  { name: 'Ethereum', emoji: Ethereum, color: '#627EEA' },
  { name: 'Lisk', emoji: Lisk, color: '#0D47A1' },
  { name: 'BNB', emoji: BNB, color: '#F3BA2F' },
  { name: 'Solana', emoji: Solana, color: '#14F195' },
  { name: 'TRON', emoji: TRON, color: '#FF0013' },
  { name: 'Polygon', emoji: Polygon, color: '#8247E5' },
  { name: 'Lisk', emoji: Lisk, color: '#0D47A1' },
  { name: 'NEAR', emoji: Near, color: '#00C08B' },
  { name: 'Avalanche', emoji: Avalanche, color: '#E84142' },
  { name: 'Optimism', emoji: Optimism, color: '#FF0420' },
  { name: 'Lisk', emoji: Lisk, color: '#0D47A1' },
  { name: 'Arbitrum', emoji: Arbitrum, color: '#28A0F0' },
  { name: 'Base', emoji: Base, color: '#0052FF' },
  { name: 'Lisk', emoji: Lisk, color: '#0D47A1' },
];

export function LandingPage({ onJoinWaitlist }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureCards.length);
    }, 4000); // Auto-swipe every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100"
       
      >
        <div className="w-full max-w-[1400px] mx-auto  sm:px-10 lg:px-16 py-4 sm:py-4 flex items-center justify-between mynav"
  >
          {/* Logo */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* <svg 
              width="120" 
              height="32" 
              viewBox="0 0 120 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[100px] h-[27px] sm:w-[120px] sm:h-[32px] "
            >
              <path d="M17.5 0H0V17.5C0 25.5081 6.49187 32 14.5 32C22.5081 32 29 25.5081 29 17.5V14.5H17.5V0Z" fill="#9333EA"/>
              <circle cx="14.5" cy="17.5" r="8.5" fill="white"/>
              <text x="38" y="23" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="600" fill="#000000">Tokicard</text>
            </svg> */}
            <img src={tokilogo} alt=""   width={118}/>
          </motion.div>

          {/* Navigation - Desktop */}
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:flex items-center gap-8 lg:gap-10"
          >
            <a href="#home" className="text-[15px] text-black hover:text-purple-600 transition-colors">Home</a>
            <a href="#about" className="text-[15px] text-black hover:text-purple-600 transition-colors">About</a>
            <a href="#features" className="text-[15px] text-black hover:text-purple-600 transition-colors">Features</a>
          </motion.nav>

          {/* Join Waitlist Button */}
          <motion.button
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onClick={onJoinWaitlist}
            className="bg-black text-white rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-[14px] hover:bg-black/90 transition-all hover:scale-105"
            style={{ fontWeight: 500 }}
          >
            Get early access
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8"  id='home'>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2  items-center imageandtextdiv">
            {/* gap-8 lg:gap-12 */}
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
              className="order-2 lg:order-1 textdiv"
            >
              {/* <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-[13px] sm:text-[14px] text-gray-600 mb-4 sm:mb-6"
                style={{ fontWeight: 400 }}
              >
                No transaction fee to experience the future of digital payment
              </motion.p> */}
              
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="text-[32px] sm:text-[48px] lg:text-[56px] xl:text-[64px] leading-[1.1] mb-6 sm:mb-8 text-black  mt-6"
                style={{ fontWeight:  700 }}
              >
              Redefining <span className="hidden md:inline"><br /></span>
card experience <span className="hidden md:inline"><br /></span>
powered by <span style={{ color: '#C502E8' }}>Ai</span>

                {/* Generation. */}
              </motion.h1>

              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] text-gray-700 mb-8 sm:mb-10 max-w-[480px]"
                style={{ fontWeight: 400 }}
              >
              Create instant virtual cards, fund with crypto or local currency, and make global online payments. All from a friendly WhatsApp chat.</motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onJoinWaitlist}
                className="bg-black text-white rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-[14px] sm:text-[15px] hover:bg-black/90 transition-all shadow-lg hover:shadow-xl"
                style={{ fontWeight: 500 }}
              >
                Get early access
              </motion.button>
            </motion.div>

            {/* Right Content - Card Images */}
            <motion.div
              initial={{ x: 50, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="order-1 lg:order-2 flex items-center justify-center"
            >
              <motion.div
                initial={{ rotate: -3 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className=" bigdiv"
              >
                <motion.img
                  src={cardImage}
                  alt="Tokicard virtual cards"
                  className="w-full tokicards drop-shadow-2xl firstcard"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                
                />
              </motion.div>
               {/* <motion.div
              initial={{ x: 50, opacity: 0, scale: 0.95 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 lg:order-2 flex items-center justify-center virtualCardPhoneDiv mx-auto"
            >
              <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] mx-auto virtualCardPhoneDiv">
                <img
                  src={cardImage}
                  alt="Virtual Card Interface"
                  className="w-full virtualCardPhone "
                />
              </div>
            </motion.div> */}
            </motion.div>
          </div>
        </div>
      </section>
      

      {/* One Card, Endless Possibilities Section */}
      <section className="py-16 sm:py-10 lg:py-10 px-4 sm:px-6 lg:px-8 bg-[#0a0014] overflow-hidden">
        <div className="max-w-[1400px] mx-auto ">
          <div className="grid lg:grid-cols-2  items-center contentsection">
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-2 lg:order-1 writeupdiv"
            >
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[52px] leading-[1.1] mb-6 sm:mb-8 text-white"
                style={{ fontWeight: 700 }}
              >
               Your finances simplified<br className="hidden md:inline"/>
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-gray-300 mb-8 sm:mb-10 max-w-[480px]"
                style={{ fontWeight: 400 }}
              >
               Tokicard brings the power of a global card system directly to WhatsApp.<br /> No downloads. No updates. Just seamless payments in your chat.
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onJoinWaitlist}
                className="bg-white text-black rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-[14px] sm:text-[15px] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                style={{ fontWeight: 500 }}
              >
                Get Early Access
              </motion.button>
            </motion.div>

            {/* Right Content - Phone Image */}
            <motion.div
              initial={{ x: 50, opacity: 0, scale: 0.95 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 lg:order-2 flex items-center justify-center  mx-auto  contentdiv"
            >
              <div className="w-full  mx-auto virtualCardPhoneDiv">
                <img
                  src={virtualCardPhone}
                  alt="Virtual Card Interface"
                  className="w-full virtualCardPhone drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deposit Crypto Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          {/* Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.2] mb-4 sm:mb-5 text-black" style={{ fontWeight: 700 }}>
              Deposit Crypto Or Fiat Seamlessly
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-gray-600 max-w-[600px] mx-auto" style={{ fontWeight: 400 }}>
              Fund your Tokicard with your preferred method,enjoy instant deposits with zero upfront fees, without stress or hidden fees.
            </p>
          </motion.div>

          {/* Blockchain Logos Marquee */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-8 sm:gap-12 lg:gap-16"
              animate={{
                x: isPaused ? 0 : [0, -1920],
              }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Duplicate the logos array 3 times for seamless loop */}
              {[...blockchainLogos, ...blockchainLogos, ...blockchainLogos].map((logo, index) => (
                <motion.div
                  key={`${logo.name}-${index}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 flex flex-col items-center gap-2 sm:gap-3 cursor-pointer"
                >
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center text-[32px] sm:text-[40px] lg:text-[48px] shadow-lg hover:shadow-xl transition-all"
                    style={{
                      backgroundColor: `${logo.color}15`,
                      border: `2px solid ${logo.color}30`,
                    }}
                  >
                    <span style={{ color: logo.color }}>  <img
                  src= {logo.emoji} 
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center text-[32px] sm:text-[40px] lg:text-[48px] shadow-lg hover:shadow-xl transition-all"
                    style={{
                      backgroundColor: `${logo.color}15`,
                      border: `2px solid ${logo.color}30`,
                    }}
                />
                </span>
                  </div>
                  <span className="text-[11px] sm:text-[12px] lg:text-[13px] text-gray-600" style={{ fontWeight: 500 }}>
                    {logo.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Create Your Virtual Card Instantly Section */}
      <section className="py-16 sm:py-10 lg:py-10 px-4 sm:px-6 lg:px-8 bg-[#0a0014] overflow-hidden" id='about'>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[52px] leading-[1.1] mb-6 sm:mb-8 text-white "
                style={{ fontWeight: 700 }}
              >
               Create Your Virtual <br className="hidden md:inline"/>
                Card in 60 Seconds
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-gray-300 mb-6 sm:mb-7"
                style={{ fontWeight: 400 }}
              >
                Meet the card that lives in your chat. <br />
                No forms. No waitlist delays. Just send a message and your card appears.
              </motion.p>

              {/* <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7]  text-gray-300  mb-8 sm:mb-10 "
                style={{ fontWeight: 400 }}
              >
                Tokicard makes global payments simple. One card for all your online expenses, powered by crypto or local funding. Built for people who move fast and work across borders.
              </motion.p> */}

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onJoinWaitlist}
                className="bg-white text-black rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-[14px] sm:text-[15px] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                style={{ fontWeight: 500 }}
              >
                Get Early Access
              </motion.button>
            </motion.div>

            {/* Right Content - Phone Image */}
            <motion.div
              initial={{ x: 50, opacity: 0, scale: 0.95 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 lg:order-2 flex items-center justify-center  mx-auto"
            >
              <div className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[420px]">
                <img
                  src={ phoneInterfaceImagetwo}
                  alt="Virtual Card Created Successfully"
                  className="w-full h-auto drop-shadow-2xl virtualCardPhone"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Everything, In One Card Section - Using the new FeatureCarousel component */}
      <div id='features'></div>
      <FeatureCarousel />

    <section className="py-16 sm:py-10 lg:py-10 px-4 sm:px-6 lg:px-8 bg-[#0a0014] overflow-hidden" id='about'>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[52px] leading-[1.1] mb-6 sm:mb-8 text-white "
                style={{ fontWeight: 700 }}
              >
                Fund Your Card,Your Way
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-gray-300 mb-6 sm:mb-7"
                style={{ fontWeight: 400 }}
              >
                Whether you’re holding crypto or cash, Tokicard bridges both worlds seamlessly. <br />
                 Convert instantly. Fund directly from WhatsApp.
              </motion.p>

              {/* <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7]  text-gray-300  mb-8 sm:mb-10 "
                style={{ fontWeight: 400 }}
              >
                Tokicard makes global payments simple. One card for all your online expenses, powered by crypto or local funding. Built for people who move fast and work across borders.
              </motion.p> */}

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onJoinWaitlist}
                className="bg-white text-black rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-[14px] sm:text-[15px] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                style={{ fontWeight: 500 }}
              >
                Get Early Access
              </motion.button>
            </motion.div>

            {/* Right Content - Phone Image */}
            <motion.div
              initial={{ x: 50, opacity: 0, scale: 0.95 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 lg:order-2 flex items-center justify-center  mx-auto"
            >
              <div className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[420px]">
                <img
                  src={whatsappfour}
                  alt="Virtual Card Created Successfully"
                  className="w-full h-auto drop-shadow-2xl virtualCardPhone"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      

      <section className="py-16 sm:py-10 lg:py-10 px-4 sm:px-6 lg:px-8  overflow-hidden" id='about'>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[52px] leading-[1.1] mb-6 sm:mb-8 text-[#0a0014] "
                style={{ fontWeight: 700 }}
              >
                Pay Globally. Instantly
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-[#0a0014] mb-6 sm:mb-7"
                style={{ fontWeight: 400 }}
              >
                Use your Tokicard for streaming, shopping, ads, or international checkouts: it just works. <br />
                Because we believe spending should feel as easy as texting.
              </motion.p>

              {/* <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7]  text-[#0a0014]  mb-8 sm:mb-10 "
                style={{ fontWeight: 400 }}
              >
                Tokicard makes global payments simple. One card for all your online expenses, powered by crypto or local funding. Built for people who move fast and work across borders.
              </motion.p> */}

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onJoinWaitlist}
                className="bg-[#0a0014] text-white rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-[14px] sm:text-[15px] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                style={{ fontWeight: 500 }}
              >
                Get Early Access
              </motion.button>
            </motion.div>

            {/* Right Content - Phone Image */}
            <motion.div
              initial={{ x: 50, opacity: 0, scale: 0.95 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 lg:order-2 flex items-center justify-center  mx-auto"
            >
              <div className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[420px]">
                <img
                  src={whatsappfive}
                  alt="Virtual Card Created Successfully"
                  className="w-full h-auto drop-shadow-2xl virtualCardPhone"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


<section className="py-16 sm:py-10 lg:py-10 px-4 sm:px-6 lg:px-8 bg-[#0a0014] overflow-hidden" id='about'>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[52px] leading-[1.1] mb-6 sm:mb-8 text-white "
                style={{ fontWeight: 700 }}
              >
                You’re Always in Control.
              </motion.h2>

   <motion.div
  initial={{ y: 20, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: false }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-gray-300 mb-6 sm:mb-7"
>
  <ul
    style={{
      listStyleType: 'disc',
      listStylePosition: 'outside',
      paddingLeft: '1.5rem',
      margin: 0,
    }}
  >
    <li>Encrypted chats for every transaction</li>
    <li>Freeze/unfreeze card instantly</li>
    <li>PIN protection & identity verification</li>
  </ul>
</motion.div>




              {/* <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7]  text-gray-300  mb-8 sm:mb-10 "
                style={{ fontWeight: 400 }}
              >
                Tokicard makes global payments simple. One card for all your online expenses, powered by crypto or local funding. Built for people who move fast and work across borders.
              </motion.p> */}

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onJoinWaitlist}
                className="bg-white text-black rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-[14px] sm:text-[15px] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                style={{ fontWeight: 500 }}
              >
                Get Early Access
              </motion.button>
            </motion.div>

            {/* Right Content - Phone Image */}
            <motion.div
              initial={{ x: 50, opacity: 0, scale: 0.95 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 lg:order-2 flex items-center justify-center  mx-auto"
            >
              <div className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[420px]">
                <img
                  src={whatsappsix}
                  alt="Virtual Card Created Successfully"
                  className="w-full h-auto drop-shadow-2xl virtualCardPhone"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

  <section className="py-16 sm:py-10 lg:py-10 px-4 sm:px-6 lg:px-8  overflow-hidden" id='about'>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[52px] leading-[1.1] mb-6 sm:mb-8 text-[#0a0014] "
                style={{ fontWeight: 700 }}
              >
                Experience the Flow
              </motion.h2>


<motion.div
  initial={{ y: 20, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: false }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7]  mb-6 sm:mb-7"
>
  <ul
    style={{
      listStyleType: 'disc',
      listStylePosition: 'outside',
      paddingLeft: '1.5rem',
      margin: 0,
    }}
  >
   <li>You’re in a chat.</li>
    <li>You type “Create card.”</li>
    <li>A few taps later  you’re funded, verified, and ready to spend online.</li>
    <li>No app store. No complicated forms, just Tokicard.</li>
     <li>The future of global spending, one chat at a time.</li>
  </ul>
</motion.div>

 
              {/* <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7]  text-[#0a0014]  mb-8 sm:mb-10 "
                style={{ fontWeight: 400 }}
              >
                Tokicard makes global payments simple. One card for all your online expenses, powered by crypto or local funding. Built for people who move fast and work across borders.
              </motion.p> */}

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onJoinWaitlist}
                className="bg-[#0a0014] text-white rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-[14px] sm:text-[15px] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                style={{ fontWeight: 500 }}
              >
                Get Early Access
              </motion.button>
            </motion.div>

            {/* Right Content - Phone Image */}
            <motion.div
              initial={{ x: 50, opacity: 0, scale: 0.95 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 lg:order-2 flex items-center justify-center  mx-auto"
            >
              <div className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[420px]">
                <img
                  src={whatsappseven}
                  alt="Virtual Card Created Successfully"
                  className="w-full h-auto drop-shadow-2xl virtualCardPhone"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0014] py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Left - Tagline */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-center sm:text-left order-2 sm:order-1"
            >
              <h3 className="text-[16px] sm:text-[17px] lg:text-[18px] text-white mb-1 sm:mb-2" style={{ fontWeight: 600 }}>
                Start Your Global Payment Journey
              </h3>
              <p className="text-[13px] sm:text-[14px] text-gray-400" style={{ fontWeight: 400 }}>
                Simple. Secure. Borderless.
              </p>
            </motion.div>

            {/* Center - Logo */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex justify-center order-1 sm:order-2"
            >
              <img src={tokilogo} alt=""   width={118}/>
            </motion.div>

            {/* Right - Social & Copyright */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center sm:text-right order-3"
            >
              <button className="text-[13px] sm:text-[14px] text-gray-300 hover:text-purple-400 transition-colors mb-2 sm:mb-3 block mx-auto sm:ml-auto sm:mr-0" style={{ fontWeight: 500 }} onClick={() => window.open('https://x.com/tokicardapp', '_blank')}>
                Follow Us On X
              </button>
              <p className="text-[11px] sm:text-[12px] text-gray-500" style={{ fontWeight: 400 }}>
                © 2025 TokiCard. All Rights Reserved.
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
