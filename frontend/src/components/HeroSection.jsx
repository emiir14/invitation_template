import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import EnvelopeAnimation from './EnvelopeAnimation';
import ParticleBackground from './ParticleBackground';
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
      {/* Dancing Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1639330693395-0944b5bef0c7?w=1920&q=80')`,
            filter: 'blur(1px) brightness(0.8)'
          }}
        />
        {/* Gradient overlay to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-300/80 via-pink-300/80 to-orange-200/80"></div>
      </div>

      {/* Particle Background - Higher z-index to float above background */}
      <div className="absolute inset-0 z-10">
        <ParticleBackground />
      </div>
      
      {/* Content - Highest z-index */}
      <div className="relative z-20 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Wedding Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center lg:text-left space-y-8"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-white/95 text-lg font-light tracking-wide mb-4 drop-shadow-sm"
              >
                You're Invited to Celebrate
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-lg"
              >
                {weddingData.couple.bride}
                <span className="block text-3xl md:text-4xl font-light my-2">&</span>
                {weddingData.couple.groom}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-white/90 text-xl font-light drop-shadow-sm"
              >
                are getting married
              </motion.p>
            </div>

            {/* Wedding Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="bg-white/25 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-white drop-shadow-sm">
                  <p className="text-2xl font-medium">{weddingData.date.formatted}</p>
                  <p className="text-lg opacity-90">{weddingData.date.day}</p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="bg-white/25 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-white drop-shadow-sm">
                  <p className="text-lg font-medium">{weddingData.venue.name}</p>
                  <p className="opacity-90">{weddingData.venue.address}</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <motion.button
                onClick={scrollToRSVP}
                className="bg-white text-rose-600 px-8 py-4 rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                RSVP Now
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Envelope Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center"
          >
            <EnvelopeAnimation />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/80 text-center drop-shadow-sm"
          >
            <p className="text-sm mb-2">Scroll to explore</p>
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