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
      className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-300 to-orange-200 relative overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
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
                className="text-white/90 text-lg font-light tracking-wide mb-4"
              >
                You're Invited to Celebrate
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight"
              >
                {weddingData.couple.bride}
                <span className="block text-3xl md:text-4xl font-light my-2">&</span>
                {weddingData.couple.groom}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-white/80 text-xl font-light"
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
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <p className="text-2xl font-medium">{weddingData.date.formatted}</p>
                  <p className="text-lg opacity-90">{weddingData.date.day}</p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
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
              <button
                onClick={scrollToRSVP}
                className="bg-white text-rose-600 px-8 py-4 rounded-full font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                RSVP Now
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side - Envelope Animation */}
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
            className="text-white/70 text-center"
          >
            <p className="text-sm mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto relative">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-white/70 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;