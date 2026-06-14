export function createScrollRevealObserver(onVisible) {
  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onVisible(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
  );
}

export function getRevealDelayMs(index) {
  return index * 50;
}
