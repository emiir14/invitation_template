import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import WeddingCountdown from './WeddingCountdown';
import { weddingData } from '../mock';

const HeroSection = () => {
  const scrollToRSVP = () => {
    const element = document.querySelector('#rsvp');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen relative overflow-hidden"
    >
      {/* Dancing GIF Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage: `url('https://media1.tenor.com/m/77mG1IeBjM0AAAAd/prerana-vikram-aditya.gif')`,
            filter: 'blur(1px) brightness(0.7)'
          }}
        />
        {/* Gradient overlay to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-gray-100/20 to-blue-100/10"></div>
      </div>

      {/* Particle Background - Higher z-index to float above background */}
      <div className="absolute inset-0 z-10">
        <ParticleBackground />
      </div>
      
      {/* Content - Highest z-index */}
      <div className="relative z-20 container mx-auto px-6 py-20">
        <div className="flex items-center justify-center min-h-screen">
          {/* Centered Wedding Details */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center space-y-8 max-w-6xl mx-auto"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-white/95 text-lg font-light tracking-wide mb-6 drop-shadow-sm"
              >
                Te invitamos a celebrar nuestro casamiento
              </motion.p>
              
              {/* Horizontal Names Layout */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-4 md:space-y-0 mb-6"
              >
                <motion.h1
                  className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-none drop-shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {weddingData.couple.bride}
                </motion.h1>
                
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="text-4xl md:text-6xl font-light text-white/90 drop-shadow-lg"
                >
                  &
                </motion.span>
                
                <motion.h1
                  className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-none drop-shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {weddingData.couple.groom}
                </motion.h1>
              </motion.div>
            </div>

            {/* Wedding Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-white/25 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div className="text-white drop-shadow-sm">
                  <p className="text-2xl font-medium">15 de Abril, 2026 - Sábado</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <div className="bg-white/25 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="text-white drop-shadow-sm">
                  <p className="text-xl font-medium">General Paz 123</p>
                </div>
              </div>
            </motion.div>

            {/* Countdown */}
            <WeddingCountdown targetDate={weddingData.date.raw} />

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <motion.button
                onClick={scrollToRSVP}
                className="bg-white text-rose-600 px-8 py-4 rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirmar Asistencia
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/80 text-center drop-shadow-sm"
          >
            <p className="text-sm mb-2">Desliza para explorar</p>
            <div className="w-6 h-10 border-2 border-white/60 rounded-full mx-auto relative">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-white/80 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;