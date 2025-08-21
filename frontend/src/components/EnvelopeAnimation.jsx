import React, { useState } from 'react';

const EnvelopeSiteOpener = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      // Delay showing content until envelope opening animation completes
      setTimeout(() => {
        setShowContent(true);
      }, 800);
    }
  };

  return (
    <div className="relative">
      {/* Envelope Container */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 z-40 flex items-center justify-center transition-all duration-1000 ease-in-out ${
          showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
  <div 
          className="relative cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={handleEnvelopeClick}
        >
          {/* Envelope Base */}
          <div className="relative">
            {/* Envelope Body */}
            <div className="w-80 h-56 bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-200 shadow-2xl rounded-sm">
              {/* Envelope Content Peek */}
              <div className="absolute inset-4 bg-white rounded shadow-inner flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-2">💌</div>
                  <div className="text-rose-600 text-sm font-medium">
                    {isOpened ? "Abriendo..." : "Invitación al casamiento"}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    {isOpened ? "" : ""}
                  </div>
                </div>
              </div>
            </div>

            {/* Envelope Flap */}
            <div 
              className={`absolute -top-2 left-0 w-80 h-32 bg-gradient-to-br from-rose-200 to-rose-300 border-2 border-rose-200 shadow-xl transition-transform duration-800 ease-in-out origin-bottom ${
                isOpened ? 'rotate-[-180deg] translate-y-8' : 'rotate-0'
              }`}
              style={{
                clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
              }}
            >
              {/* Wax Seal with Heart */}
              <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-red-700 shadow-lg transition-opacity duration-500 ${
                isOpened ? 'opacity-0' : 'opacity-100'
              }`}>
                <div className="absolute inset-1 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="text-white text-sm">💕</div>
                </div>
              </div>
            </div>

            {/* Opening Glow Effect */}
            {isOpened && (
              <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200 opacity-60 animate-pulse rounded"></div>
            )}
          </div>

          {/* Click Instruction */}
          {!isOpened && (
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-rose-600 text-sm animate-bounce font-medium">
                Estás invitado!
              </div>
              <div className="text-gray-500 text-xs mt-1">
                Hace click para abrir la invitación
              </div>
            </div>
          )}
        </div>

        {/* Floating heart particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-rose-300 opacity-60 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                fontSize: `${8 + Math.random() * 8}px`,
              }}
            >
              💕
            </div>
          ))}
        </div>
      </div>

      {/* Wedding Invitation Content */}
      <div 
        className={`transition-all duration-1000 ease-in-out ${
          showContent 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}
        style={{ isolation: 'auto' }}
      >
        {showContent && children}
      </div>
    </div>
  );
};

export default EnvelopeSiteOpener;