import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // URL de música instrumental romántica libre de derechos
  const musicUrl = "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"; // Placeholder

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.3; // Volumen suave
      
      // Auto-play después de interacción del usuario
      const startMusic = () => {
        if (!isPlaying) {
          audio.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("No se pudo reproducir música automáticamente:", error);
            });
        }
      };

      // Esperar interacción del usuario antes de reproducir
      document.addEventListener('click', startMusic, { once: true });
      document.addEventListener('scroll', startMusic, { once: true });

      return () => {
        document.removeEventListener('click', startMusic);
        document.removeEventListener('scroll', startMusic);
      };
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Error reproduciendo música:", error);
          });
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        preload="auto"
        muted={isMuted}
      >
        {/* Usando archivo de audio local para demo - en producción usar URL real */}
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      {/* Floating Music Control */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-rose-200">
          <div className="flex items-center space-x-2">
            {/* Play/Pause Button */}
            <motion.button
              onClick={toggleMusic}
              className="p-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={isPlaying ? "Pausar música" : "Reproducir música"}
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </motion.button>

            {/* Mute Button */}
            <motion.button
              onClick={toggleMute}
              className="p-2 rounded-full text-rose-500 hover:bg-rose-50 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </motion.button>
          </div>

          {/* Music indicator */}
          {isPlaying && (
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
            </motion.div>
          )}
        </div>

        {/* Music label */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2"
          >
            <div className="bg-black/70 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
              ♪ Música de boda
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default MusicPlayer;