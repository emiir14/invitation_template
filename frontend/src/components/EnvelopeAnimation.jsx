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
        className={`fixed inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 z-40 flex items-center justify-center transition-all duration-1000 ease-in-out ${
          showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div 
          className="relative cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2"
          onClick={handleEnvelopeClick}
          style={{ perspective: '1000px' }}
        >
          {/* Shadow beneath envelope */}
          <div className="absolute top-6 left-4 w-80 h-56 bg-black opacity-20 rounded-sm blur-xl transform rotate-1"></div>
          
          {/* Envelope Base */}
          <div className="relative transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
            {/* Envelope Body */}
            <div className="w-80 h-56 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 shadow-2xl relative overflow-hidden"
                 style={{ 
                   background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 30%, #f3e8ab 70%, #e5d174 100%)',
                   boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.1), inset 2px 2px 8px rgba(255,255,255,0.9), 0 8px 32px rgba(0,0,0,0.2)'
                 }}>
              
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-30"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000' fill-opacity='0.05' d='m0 0h1v1h-1zm2 2h1v1h-1z'/%3E%3C/svg%3E")`
                   }}>
              </div>
              
              {/* Side edges for depth */}
              <div className="absolute right-0 top-0 w-2 h-full bg-gradient-to-r from-amber-200 to-amber-300 shadow-inner"></div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-amber-200 to-amber-300 shadow-inner"></div>
              
              {/* Envelope Content Peek */}
              <div className="absolute top-12 left-3 right-3 bottom-3 bg-gradient-to-br from-white to-gray-50 shadow-inner flex items-center justify-center border border-gray-100"
                   style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06), inset 0 -1px 2px rgba(0,0,0,0.04)' }}>
                <div className="text-center">
                  <div className="text-4xl mb-3 filter drop-shadow-sm">💌</div>
                  <div className="text-amber-700 text-base font-serif font-medium tracking-wide">
                    {isOpened ? "Abriendo..." : "Invitación al casamiento"}
                  </div>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mt-2 mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Envelope Flap */}
            <div 
              className={`absolute top-0 left-0 w-80 h-36 bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 transition-transform duration-800 ease-in-out shadow-lg z-10`}
              style={{
                clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
                background: 'linear-gradient(135deg, #f3e8ab 0%, #fef3c7 30%, #fde68a 70%, #d69e2e 100%)',
                boxShadow: isOpened 
                  ? '0 -8px 24px rgba(0,0,0,0.25), inset 2px 2px 8px rgba(255,255,255,0.4)' 
                  : '0 4px 12px rgba(0,0,0,0.2), inset -1px -1px 4px rgba(0,0,0,0.1), inset 1px 1px 4px rgba(255,255,255,0.8)',
                transformOrigin: '50% 0%',
                transform: isOpened ? 'rotateX(-45deg) translateZ(20px)' : 'rotateX(0deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Flap texture */}
              <div className="absolute inset-0 opacity-20"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000' fill-opacity='0.05' d='m0 0h1v1h-1zm2 2h1v1h-1z'/%3E%3C/svg%3E")`
                   }}>
              </div>
              
              {/* Wax Seal with Heart */}
              <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-full shadow-xl transition-all duration-500 ${
                isOpened ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
              }`}
                   style={{ 
                     boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4), inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.2)' 
                   }}>
                <div className="absolute inset-1 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                  <div className="text-white text-lg filter drop-shadow-sm">💕</div>
                </div>
                {/* Wax drip effects */}
                <div className="absolute -bottom-1 left-2 w-2 h-3 bg-red-600 rounded-full opacity-60"></div>
                <div className="absolute -bottom-2 right-3 w-1 h-2 bg-red-700 rounded-full opacity-40"></div>
              </div>
            </div>

            {/* Opening Glow Effect */}
            {isOpened && (
              <div className="absolute inset-0 bg-gradient-to-br from-golden-200 to-amber-200 opacity-40 animate-pulse rounded mix-blend-soft-light"></div>
            )}
          </div>

          {/* Click Instruction */}
          {!isOpened && (
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-amber-700 text-sm animate-bounce font-medium font-serif">
                Estás invitado!
              </div>
              <div className="text-amber-600 text-xs mt-1 font-serif">
                Hace click para abrir la invitación
              </div>
            </div>
          )}
        </div>

        {/* Floating heart particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-red-300 opacity-40 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
                fontSize: `${10 + Math.random() * 6}px`,
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