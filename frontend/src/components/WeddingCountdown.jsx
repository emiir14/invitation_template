import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WeddingCountdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Días', labelSingle: 'Día' },
    { value: timeLeft.hours, label: 'Horas', labelSingle: 'Hora' },
    { value: timeLeft.minutes, label: 'Minutos', labelSingle: 'Minuto' },
    { value: timeLeft.seconds, label: 'Segundos', labelSingle: 'Segundo' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30"
    >
      <div className="text-center mb-4">
        <h3 className="text-white text-lg font-light">
          Faltan para nuestra boda
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
            className="text-center"
          >
            <motion.div
              className="bg-white/30 backdrop-blur-sm rounded-lg p-3 mb-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
            >
              <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                {unit.value.toString().padStart(2, '0')}
              </span>
            </motion.div>
            <span className="text-white/90 text-sm font-medium">
              {unit.value === 1 ? unit.labelSingle : unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      {(timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-center"
        >
          <span className="text-white text-xl font-serif">
            ¡Es hoy! ¡Nos casamos! 💒
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WeddingCountdown;