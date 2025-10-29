import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './landingpage.css';
const virtualCardFeatures = [
  {
    id: 1,
    title: 'Dual Funding Options',
    description: 'Fund with crypto or local currency, whichever works best for you.',
    icon: '💰',
  },
  {
    id: 2,
    title: 'Modern Design, Simple Flow',
    description: 'Every feature is designed to be effortless  ,because good finance should just work.',
    icon: '⚡',
  },
  {
    id: 3,
    title: 'Global Acceptance',
    description: 'Use your card anywhere in the world that accepts virtual cards.',
    icon: '🌍',
  },
    {
    id: 4,
    title: 'Real-Time Security',
    description: 'Stay in control with instant spend alerts and easy one-tap card freezing.',
    icon: '🌍',
  },
   {
    id: 5,
    title: ' Instant Card Setup',
    description: 'Get your virtual card in seconds. No bank queues, no paperwork.',
    icon: '🌍',
  },
];

export function FeatureCarousel() {
  const [currentVirtualCardSlide, setCurrentVirtualCardSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVirtualCardSlide((prev) => (prev + 1) % virtualCardFeatures.length);
    }, 4000); // Auto-swipe every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] mb-4 sm:mb-5 text-black" style={{ fontWeight: 700 }}>
            Everything, In One Card
          </h2>
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-gray-600 max-w-[700px] mx-auto" style={{ fontWeight: 400 }}>
            Instantly create cards, fund with any currency, and track every transaction. All from one simple dashboard.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-[1100px] mx-auto px-0 sm:px-4">
          {/* Cards Container - visible overflow to show all 3 cards with rounded corners */}
          <div className="relative h-[280px] sm:h-[320px] flex items-center justify-center overflow-visible">
            {/* Navigation Arrows - positioned inside cards container */}
            <motion.button
              onClick={() => setCurrentVirtualCardSlide((prev) => 
                prev === 0 ? virtualCardFeatures.length - 1 : prev - 1
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center shadow-lg transition-all duration-200 icondiv"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.button
              onClick={() => setCurrentVirtualCardSlide((prev) => 
                (prev + 1) % virtualCardFeatures.length
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center shadow-lg transition-all duration-200 icondiv"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
            {/* Render all cards with different positions */}
            {virtualCardFeatures.map((card, index) => {
              // Calculate position relative to current slide
              let position = index - currentVirtualCardSlide;
              
              // Handle wrap around for seamless infinite scroll
              if (position < -1) position += virtualCardFeatures.length;
              if (position > 1) position -= virtualCardFeatures.length;

              // Determine if card should be visible (show 3 cards: left, center, right)
              const isVisible = position >= -1 && position <= 1;
              
              // Calculate transform values based on position
              let xOffset = 0;
              let scale = 0.85;
              let opacity = 0.5;
              let zIndex = 0;
              
              if (position === 0) {
                // Active card - center
                xOffset = 0;
                scale = 1;
                opacity = 1;
                zIndex = 30;
              } else if (position === -1) {
                // Previous card - left
                xOffset = -300;
                scale = 0.85;
                opacity = 0.6;
                zIndex = 10;
              } else if (position === 1) {
                // Next card - right
                xOffset = 300;
                scale = 0.85;
                opacity = 0.6;
                zIndex = 10;
              }

              return (
                <motion.div
                  key={card.id}
                  className="absolute"
                  initial={false}
                  animate={{
                    x: xOffset,
                    scale: scale,
                    opacity: isVisible ? opacity : 0,
                    zIndex: zIndex,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  style={{
                    pointerEvents: position === 0 ? 'auto' : 'none',
                  }}
                >
                  {/* Feature Card */}
                  <div
                    className="w-[240px] sm:w-[360px] lg:w-[440px] h-[200px] sm:h-[240px] lg:h-[260px] rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] shadow-2xl flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0014 100%)',
                    }}
                  >
                    {/* Decorative curved lines */}
                    <div className="absolute inset-0 overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[28px]">
                      <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 400 300" fill="none">
                        <circle cx="320" cy="60" r="80" stroke="white" strokeWidth="2"/>
                        <circle cx="320" cy="60" r="120" stroke="white" strokeWidth="1.5"/>
                        <path d="M50 250Q150 200 250 250T450 250" stroke="white" strokeWidth="2"/>
                      </svg>
                    </div>
                    
                    {/* Icon in corner */}
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <h3 className="text-[18px] sm:text-[24px] lg:text-[28px] text-white mb-2 sm:mb-3" style={{ fontWeight: 700 }}>
                        {card.title}
                      </h3>
                      <p className="text-[12px] sm:text-[14px] lg:text-[15px] text-gray-300 max-w-[200px] sm:max-w-[320px] lg:max-w-[360px]" style={{ fontWeight: 400 }}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
            {virtualCardFeatures.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVirtualCardSlide(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentVirtualCardSlide 
                    ? 'w-8 sm:w-10 bg-black' 
                    : 'w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
