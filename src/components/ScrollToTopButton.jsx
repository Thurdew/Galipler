import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
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
      className={`fixed bottom-10 right-10 z-50 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white p-6 rounded-full shadow-lg hover:scale-110 transform transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={scrollToTop}
      style={{
        width: '80px',
        height: '80px',
        padding: '20px',
      }}
    >
      <i className="fas fa-chevron-up text-4xl"></i> {/* Chevron Up icon */}
    </button>
  );
};

export default ScrollToTopButton;
