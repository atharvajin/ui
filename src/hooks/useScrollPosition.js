import { useEffect } from 'react';

export const useScrollPosition = (key) => {
  useEffect(() => {
    // Check if we have a saved scroll position for this key (which is the pathname)
    const savedPosition = sessionStorage.getItem(`scrollPosition-${key}`);

    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    } else {
        window.scrollTo(0, 0); // fallback to top
    }

    const handleScroll = () => {
      sessionStorage.setItem(`scrollPosition-${key}`, window.scrollY.toString());
    };

    // Save scroll position on scroll
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [key]);
};
