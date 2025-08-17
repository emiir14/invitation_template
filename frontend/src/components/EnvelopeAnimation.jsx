import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { weddingData } from '../mock';

const EnvelopeAnimation = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const controls = useAnimation();

  // Spring animation for the envelope flap
  const flapSpring = useSpring({
    transform: isOpened ? 'rotateX(-180deg)' : 'rotateX(0deg)',
    config: { tension: 200, friction: 25 }
  });

  // Spring animation for the seal
  const sealSpring = useSpring({
    opacity: isOpened ? 0 : 1,
    scale: isOpened ? 0 : 1,
    config: { tension: 300, friction: 30 }
  });

  // Spring animation for letter emerging
  const letterSpring = useSpring({
    transform: isOpened ? 'translateY(-20px) scale(1)' : 'translateY(0px) scale(0.95)',
    opacity: isOpened ? 1 : 0,
    config: { tension: 180, friction: 12, delay: isOpened ? 200 : 0 }
  });

  const handleClick = async () => {
    if (!isOpened) {
      setIsOpened(true);
      // Trigger confetti-like hearts after opening
      setTimeout(() => {
        setShowContent(true);
        controls.start("visible");
      }, 500);
    } else {
      setShowContent(false);
      setIsOpened(false);
      controls.start("hidden");
    }
  };

  // Heart confetti animation variants
  const heartVariants = {
    hidden: { opacity: 0, scale: 0, y: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      y: [-50, -150, -250],
      transition: {
        duration: 3,
        times: [0, 0.3, 1],
        repeat: Infinity,
        repeatDelay: 2
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Envelope Container */}
      <div className="relative cursor-pointer group" onClick={handleClick}>
        {/* Envelope Body */}
        <motion.div
          className="w-96 h-64 bg-gradient-to-br from-rose-50 via-white to-rose-50 rounded-lg shadow-2xl relative overflow-hidden border border-rose-100"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Decorative Envelope Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" className="absolute inset-0">
              <pattern id="hearts" patternUnits="userSpaceOnUse" width="40" height="40">
                <text x="20" y="25" fontSize="20" textAnchor="middle" fill="currentColor">♥</text>
              </pattern>
              <rect width="100%" height="100%" fill="url(#hearts)" />
            </svg>
          </div>

          {/* Letter Content */}
          <animated.div
            style={letterSpring}
            className="absolute inset-4 bg-white rounded-lg shadow-inner p-6 text-center border border-rose-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpened ? 1 : 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="font-serif text-3xl text-gray-800 mb-3 tracking-wide">
                {weddingData.couple.bride} & {weddingData.couple.groom}
              </div>
              <div className="text-sm text-gray-600 mb-4 font-light">
                solicitan el placer de tu presencia
              </div>
              <div className="text-xl font-medium text-rose-600 mb-2">
                {weddingData.date.formatted}
              </div>
              <div className="text-sm text-gray-500">
                {weddingData.date.day}
              </div>
              <div className="mt-6 text-xs text-rose-400 animate-pulse">
                Haz clic para {isOpened ? 'cerrar' : 'abrir'} la invitación
              </div>
            </motion.div>
          </animated.div>
        </motion.div>

        {/* Envelope Flap with improved animation */}
        <animated.div
          style={flapSpring}
          className="absolute top-0 left-0 w-96 h-40 bg-gradient-to-br from-rose-200 via-rose-150 to-rose-300 origin-bottom shadow-lg"
          css={{
            clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
            transformOrigin: 'bottom center',
            zIndex: 10
          }}
        >
          {/* Wax Seal */}
          <animated.div
            style={sealSpring}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg border-2 border-rose-300"
          >
            <motion.div
              className="text-white text-lg font-bold"
              animate={{ rotate: isOpened ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              ♥
            </motion.div>
          </animated.div>

          {/* Flap shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-t-lg"></div>
        </animated.div>

        {/* Enhanced floating hearts animation */}
        {showContent && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-rose-400 text-xl"
                style={{
                  left: `${30 + i * 8}%`,
                  top: '50%',
                }}
                variants={heartVariants}
                initial="hidden"
                animate={controls}
                custom={i}
              >
                ♥
              </motion.div>
            ))}
          </div>
        )}

        {/* Magical sparkles around envelope when hovered */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Click Instruction */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.p
          className="text-white text-lg font-light"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isOpened ? 'Hace click en el sobre para cerrar' : 'Hace click en el sobre para revelar nuestra invitación'}
        </motion.p>
        <motion.div
          className="mt-3 text-white/70 text-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnvelopeAnimation;