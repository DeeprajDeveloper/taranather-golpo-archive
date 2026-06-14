import { useEffect, useState } from 'react';
import {
  shouldHeaderCollapse,
  shouldShowBackToTop,
} from '../handlers/headerScrollHandler';

export function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(shouldHeaderCollapse(scrollY));
      setShowBackToTop(shouldShowBackToTop(scrollY));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('header-collapsed', isScrolled);
  }, [isScrolled]);

  return { isScrolled, showBackToTop };
}
