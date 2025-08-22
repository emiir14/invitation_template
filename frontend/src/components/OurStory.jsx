import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const OurStory = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timeline = [
    {
      year: "2020",
      title: "Primer Encuentro",
      description: "Nos conocimos en una cafetería en una mañana lluviosa de martes. Sin saber que cambiaría nuestras vidas para siempre.",
      icon: "☕"
    },
    {
      year: "2021",
      title: "Primera Cita",
      description: "Nuestra primera cita oficial fue en el jardín botánico local. Pasamos horas conversando y caminando entre las flores.",
      icon: "🌸"
    },
    {
      year: "2023",
      title: "Viviendo Juntos",
      description: "Decidimos dar el siguiente paso y mudarnos juntos. Construyendo nuestro pequeño hogar lleno de amor y risas.",
      icon: "🏠"
    },
    {
      year: "2024",
      title: "La Propuesta",
      description: "Bajo el cielo estrellado en nuestro lugar favorito de senderismo, Fede se arrodilló y le pidió a Sofi que fuera su para siempre.",
      icon: "💍"
    },
    {
      year: "2026",
      title: "Nuestra Boda",
      description: "Y ahora, estamos emocionados de celebrar nuestro amor con todas nuestras personas favoritas mientras comenzamos este hermoso viaje como esposo y esposa.",
      icon: "💒"
    }
  ];

  return (
    <section id="story" className="py-12 md:py-20 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-24 h-24 md:w-32 md:h-32 bg-rose-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 md:w-48 md:h-48 bg-orange-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 mb-3 md:mb-4">
            Nuestra Historia de Amor
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Cada historia de amor es hermosa, pero la nuestra es nuestra favorita
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line - Always visible */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-200 via-pink-200 to-orange-200 rounded-full"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative mb-10 md:mb-12 pl-12 md:pl-0 flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} text-left`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl shadow-lg p-5 md:p-6 border border-rose-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-2xl md:text-3xl mb-2 md:mb-3">{item.icon}</div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Circle */}
                <div className="absolute -left-2 md:relative md:left-0 md:z-10 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                  >
                    <span className="text-white font-bold text-sm md:text-lg">{item.year}</span>
                  </motion.div>
                </div>

                {/* Empty space for desktop alignment */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12 md:mt-16"
        >
          <blockquote className="text-xl md:text-2xl font-serif text-gray-700 max-w-3xl mx-auto leading-relaxed px-2">
            "Ser profundamente amado por alguien te da fuerza, mientras que amar profundamente a alguien te da valor."
          </blockquote>
          <cite className="block mt-3 md:mt-4 text-gray-500 font-medium text-sm md:text-base">- Lao Tzu</cite>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;