import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../mock';

const EnvelopeAnimation = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Envelope Container */}
      <div className="relative cursor-pointer" onClick={handleClick}>
        {/* Envelope Body */}
        <motion.div
          className="w-80 h-56 bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg shadow-2xl relative overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Envelope Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-rose-200 to-transparent transform rotate-45"></div>
          </div>

          {/* Letter Content (visible when opened) */}
          <motion.div
            className="absolute inset-4 bg-white rounded shadow-md p-6 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: isOpened ? 0 : 20, 
              opacity: isOpened ? 1 : 0 
            }}
            transition={{ delay: isOpened ? 0.5 : 0, duration: 0.6 }}
          >
            <div className="font-serif text-2xl text-gray-800 mb-2">
              {weddingData.couple.bride} & {weddingData.couple.groom}
            </div>
            <div className="text-sm text-gray-600 mb-3">
              are getting married
            </div>
            <div className="text-lg font-medium text-rose-600">
              {weddingData.date.formatted}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {weddingData.date.day}
            </div>
            <div className="mt-4 text-xs text-gray-400">
              Click envelope to {isOpened ? 'close' : 'open'}
            </div>
          </motion.div>
        </motion.div>

        {/* Envelope Flap */}
        <motion.div
          className="absolute top-0 left-0 w-80 h-32 bg-gradient-to-br from-rose-200 to-rose-300 origin-bottom"
          style={{
            clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
          }}
          animate={{
            rotateX: isOpened ? -180 : 0,
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut",
            type: "spring",
            stiffness: 100
          }}
        >
          {/* Wax Seal */}
          <motion.div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center"
            animate={{
              scale: isOpened ? 0 : 1,
              opacity: isOpened ? 0 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-white text-xs font-bold">♥</div>
          </motion.div>
        </motion.div>

        {/* Floating Hearts Animation */}
        {isOpened && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 text-rose-400"
                initial={{ 
                  x: 160, 
                  y: 120, 
                  opacity: 0, 
                  scale: 0 
                }}
                animate={{
                  x: 160 + (Math.random() - 0.5) * 200,
                  y: 120 - Math.random() * 150,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                ♥
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Click Instruction */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-white text-lg font-light">
          Click the envelope to reveal our invitation
        </p>
        <motion.div
          className="mt-2 text-white/70"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnvelopeAnimation;