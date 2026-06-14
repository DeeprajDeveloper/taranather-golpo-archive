import { useEffect, useRef } from 'react';
import {
  createScrollRevealObserver,
  getRevealDelayMs,
} from '../handlers/scrollRevealHandler';

export function useScrollReveal(deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const cards = container.querySelectorAll('[data-reveal]');
    const observer = createScrollRevealObserver((target) => {
      target.classList.add('is-visible');
    });

    cards.forEach((card, index) => {
      card.style.transitionDelay = `${getRevealDelayMs(index)}ms`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, deps);

  return containerRef;
}
