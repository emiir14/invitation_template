import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Inicio' },
    { href: '#story', label: 'Nuestra Historia' },
    { href: '#gallery', label: 'Galería' },
    { href: '#rsvp', label: 'Confirmar Asistencia' }
  ];

  const scrollToSection = (href) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);
    
    // Use requestAnimationFrame to ensure smooth scrolling after state update
    requestAnimationFrame(() => {
      const element = document.querySelector(href);
      if (element) {
        // Calculate the position to scroll to (accounting for navbar height)
        const offsetTop = element.offsetTop - 80;
        
        // Scroll to the element
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Heart className={`w-6 h-6 ${isScrolled ? 'text-rose-500' : 'text-white'}`} />
              <span className={`font-serif text-xl ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                S & C
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`font-medium transition-colors duration-200 hover:text-rose-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0 
          }}
          className="md:hidden bg-white/95 backdrop-blur-md overflow-hidden"
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-gray-700 font-medium hover:text-rose-500 transition-colors duration-200 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;