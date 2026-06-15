import { useEffect, useLayoutEffect, useRef } from 'react';
import {
  createScrollRevealObserver,
  getRevealDelayMs,
} from '../handlers/scrollRevealHandler';

export function useScrollReveal(deps = []) {
  const containerRef = useRef(null);
  const revealedIdsRef = useRef(new Set());

  const restoreRevealedCards = () => {
    const container = containerRef.current;
    if (!container) return;

    container.querySelectorAll('[data-reveal]').forEach((card) => {
      const revealId = card.dataset.revealId;
      if (revealId && revealedIdsRef.current.has(revealId)) {
        card.classList.add('is-visible');
      }
    });
  };

  useLayoutEffect(() => {
    restoreRevealedCards();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const cards = container.querySelectorAll('[data-reveal]');
    const observer = createScrollRevealObserver((target) => {
      const revealId = target.dataset.revealId;
      if (revealId) revealedIdsRef.current.add(revealId);
      target.classList.add('is-visible');
    });

    cards.forEach((card, index) => {
      const revealId = card.dataset.revealId;

      if (revealId && revealedIdsRef.current.has(revealId)) {
        card.classList.add('is-visible');
      } else {
        observer.observe(card);
      }

      card.style.transitionDelay = `${getRevealDelayMs(index)}ms`;
    });

    return () => observer.disconnect();
  }, deps);

  return containerRef;
}
