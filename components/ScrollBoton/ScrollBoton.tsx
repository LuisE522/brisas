'use client'

import { useEffect, useState } from 'react';

const ScrollBoton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-white/30 text-white rounded-full aspect-square shadow-lg transition-all duration-300 hover:bg-white/50 z-[99999999999]"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default ScrollBoton;
