const STORAGE_KEY = 'tt-card-layout';
const DEFAULT_LAYOUT = 'vertical';

export function getStoredCardLayout() {
  if (typeof window === 'undefined') return DEFAULT_LAYOUT;

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'horizontal' ? 'horizontal' : DEFAULT_LAYOUT;
}

export function setStoredCardLayout(layout) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEY, layout);
}

export function toggleCardLayout(currentLayout) {
  return currentLayout === 'horizontal' ? 'vertical' : 'horizontal';
}

export function isHorizontalLayout(layout) {
  return layout === 'horizontal';
}

export function getCardLayoutAriaLabel(layout) {
  return layout === 'horizontal'
    ? 'Switch to vertical card layout'
    : 'Switch to horizontal card layout';
}
