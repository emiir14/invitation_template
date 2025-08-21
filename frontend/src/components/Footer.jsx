import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-rose-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Wedding Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <Heart className="w-8 h-8 text-rose-400" />
              <span className="text-2xl font-serif">Sofi & Fede</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              No podemos esperar a celebrar este día especial con nuestras personas favoritas. 
              Su presencia en nuestras vidas significa el mundo para nosotros.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-6 text-rose-300">Ponte en Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-5 h-5 text-rose-400" />
                <span className="text-gray-300">sofiandfede@wedding.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-5 h-5 text-rose-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-5 h-5 text-rose-400" />
                <span className="text-gray-300">Ubicación Por Anunciar</span>
              </div>
            </div>
          </motion.div>

          {/* Wedding Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h3 className="text-xl font-semibold mb-6 text-rose-300">Detalles de la Boda</h3>
            <div className="space-y-3">
              <p className="text-2xl font-serif text-rose-200">15 de Abril, 2026</p>
              <p className="text-gray-300">Sábado</p>
              <p className="text-sm text-gray-400 mt-4">
                Por favor confirma antes del 15 de Marzo, 2026
              </p>
              <p className="text-sm text-gray-400">
                Más detalles próximamente
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0"
            >
              © 2025 Boda de Sofi & Fede. Hecho con amor.
            </motion.p>

            {/* Floating Hearts Animation */}
            <div className="relative">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-rose-400 text-sm"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                  }}
                  style={{ left: i * 15 }}
                >
                  ♥
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;