const SCROLL_THRESHOLD = 80;
const BACK_TO_TOP_THRESHOLD = 400;

export function shouldHeaderCollapse(scrollY) {
  return scrollY > SCROLL_THRESHOLD;
}

export function shouldShowBackToTop(scrollY) {
  return scrollY > BACK_TO_TOP_THRESHOLD;
}

export function scrollToTop(behavior = 'smooth') {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : behavior });
}

export function getScrollThreshold() {
  return SCROLL_THRESHOLD;
}

export function getBackToTopThreshold() {
  return BACK_TO_TOP_THRESHOLD;
}

// Kept for backwards compatibility
export function shouldHeaderShowBorder(scrollY) {
  return shouldHeaderCollapse(scrollY);
}
