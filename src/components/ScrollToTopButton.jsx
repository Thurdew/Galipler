import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      id="scrollToTopBtn"
      title="Yukarı Çık"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-500 ease-out flex items-center justify-center group ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-10 scale-0 pointer-events-none'
      }`}
    >
      <ArrowUp
        className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300"
      />
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 animate-ping"></span>
    </button>
  );
};

export default ScrollToTopButton;
