import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [waitingForInteraction, setWaitingForInteraction] = useState(false);
  const audioRef = useRef(null);
  const hasTriedAutoplay = useRef(false);

  // CHANGE THIS URL to your desired music source
  // const musicUrl = "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3";
  // Alternative sources you can try:
  const musicUrl = "https://www.bensound.com/bensound-music/bensound-romantic.mp3";
  // const musicUrl = "/path/to/your/wedding-music.mp3"; // For local files
  
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.3; // Gentle volume
      audio.preload = "metadata";

      // Event listeners for better UX
      const handleCanPlayThrough = () => {
        setIsLoading(false);
        // Try to autoplay when audio is ready
        tryAutoplay();
      };

      const handleLoadStart = () => {
        setIsLoading(true);
      };

      const handleError = (e) => {
        console.error("Audio loading error:", e);
        setIsLoading(false);
        setIsPlaying(false);
        alert("No se pudo cargar la música. Verifica la URL del archivo de audio.");
      };

      const handleEnded = () => {
        setIsPlaying(false);
      };

      audio.addEventListener('canplaythrough', handleCanPlayThrough);
      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('error', handleError);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  // Listen for first user interaction to enable autoplay
  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (waitingForInteraction && !isPlaying && !hasTriedAutoplay.current) {
        console.log("User interaction detected, attempting to play music...");
        await startMusicAfterInteraction();
      }
    };

    if (waitingForInteraction) {
      // Listen for various interaction events
      document.addEventListener('click', handleFirstInteraction, { once: false });
      document.addEventListener('touchstart', handleFirstInteraction, { once: false });
      document.addEventListener('keydown', handleFirstInteraction, { once: false });
      
      return () => {
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      };
    }
  }, [waitingForInteraction, isPlaying]);

  const startMusicAfterInteraction = async () => {
    const audio = audioRef.current;
    if (!audio || hasTriedAutoplay.current) return;

    try {
      hasTriedAutoplay.current = true;
      setIsLoading(true);
      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
      setWaitingForInteraction(false);
      setAutoplayBlocked(false);
      console.log("Music started successfully after user interaction!");
    } catch (error) {
      console.log("Still couldn't play after interaction:", error);
      setIsLoading(false);
      setWaitingForInteraction(false);
      setAutoplayBlocked(true);
    }
  };

  const tryAutoplay = async () => {
    const audio = audioRef.current;
    if (!audio || isPlaying || hasTriedAutoplay.current) return;

    try {
      setIsLoading(true);
      hasTriedAutoplay.current = true;
      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
      setAutoplayBlocked(false);
      console.log("Autoplay successful!");
    } catch (error) {
      console.log("Autoplay blocked, waiting for user interaction:", error);
      setIsLoading(false);
      setIsPlaying(false);
      hasTriedAutoplay.current = false; // Reset so we can try again after interaction
      
      // Instead of showing blocked message immediately, wait for user interaction
      if (error.name === 'NotAllowedError') {
        setWaitingForInteraction(true);
      } else {
        setAutoplayBlocked(true);
      }
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        // Pause music
        audio.pause();
        setIsPlaying(false);
      } else {
        // Play music
        setIsLoading(true);
        await audio.play();
        setIsPlaying(true);
        setIsLoading(false);
        setAutoplayBlocked(false); // Hide autoplay message when user manually plays
      }
    } catch (error) {
      console.error("Playback error:", error);
      setIsLoading(false);
      setIsPlaying(false);
      
      // Handle different types of errors
      if (error.name === 'NotAllowedError') {
        alert("El navegador bloqueó la reproducción. Haz clic de nuevo para reproducir.");
      } else if (error.name === 'NotSupportedError') {
        alert("Formato de audio no soportado o archivo no encontrado.");
      } else {
        alert("Error al reproducir la música. Verifica la conexión o la URL del archivo.");
      }
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={musicUrl}
        preload="metadata"
      />

      {/* Autoplay notification banner */}
      {waitingForInteraction && (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] animate-fade-in">
          <div className="bg-blue-100 border border-blue-300 text-blue-800 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-sm font-medium">
              Haz clic en cualquier parte de la página para comenzar la música 🎵
            </span>
          </div>
        </div>
      )}
      
      {autoplayBlocked && (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] animate-fade-in">
          <div className="bg-rose-100 border border-rose-300 text-rose-800 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-sm">
              Haz clic en el botón de música para comenzar la reproducción
            </span>
            <button 
              onClick={() => setAutoplayBlocked(false)}
              className="text-rose-600 hover:text-rose-800 ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Floating Music Control */}
      <div className="fixed bottom-6 right-6 z-60">
        <div className={`bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg border transition-all duration-300 hover:shadow-xl ${
          autoplayBlocked ? 'border-rose-400 ring-2 ring-rose-200 animate-pulse' : 
          waitingForInteraction ? 'border-blue-400 ring-2 ring-blue-200' :
          'border-rose-200'
        }`}>
          {/* Play/Pause Button */}
          <button
            onClick={toggleMusic}
            disabled={isLoading}
            className={`flex items-center justify-center w-12 h-12 rounded-full text-white transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : autoplayBlocked
                  ? 'bg-rose-600 hover:bg-rose-700 animate-pulse'
                  : waitingForInteraction
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-rose-500 hover:bg-rose-600'
            }`}
            title={
              isLoading 
                ? "Cargando música..." 
                : isPlaying 
                  ? "Pausar música" 
                  : autoplayBlocked
                    ? "¡Haz clic para reproducir música!"
                    : waitingForInteraction
                      ? "Haz clic en cualquier parte para música automática"
                      : "Reproducir música"
            }
          >
            {isLoading ? (
              // Loading spinner
              <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : isPlaying ? (
              // Pause icon
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              // Play icon
              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Playing indicator */}
          {isPlaying && (
            <div className="absolute -top-1 -right-1">
              <div 
                className="w-4 h-4 bg-rose-400 rounded-full animate-pulse"
                style={{
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              ></div>
            </div>
          )}
        </div>

        {/* Music label */}
        {(isPlaying || isLoading || autoplayBlocked || waitingForInteraction) && (
          <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 opacity-0 animate-fade-in"
               style={{
                 animation: 'fadeIn 0.5s ease-in-out 0.2s forwards'
               }}>
            <div className="bg-black/70 text-white text-sm px-4 py-2 rounded-full whitespace-nowrap">
              {isLoading ? "⏳ Cargando..." : 
               autoplayBlocked ? "🎵 ¡Hace click para música!" :
               waitingForInteraction ? "✨ Hace click para música" :
               "♪ Reproduciendo"}
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(10px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
          }
        }
        
        .animate-fade-in {
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;