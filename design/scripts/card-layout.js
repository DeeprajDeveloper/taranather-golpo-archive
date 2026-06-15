/* Card layout toggle — vertical grid vs horizontal rows */

const STORAGE_KEY = 'tt-card-layout';

function getGrids() {
  return document.querySelectorAll('[data-card-grid]');
}

function setCardLayout(layout) {
  const horizontal = layout === 'horizontal';
  const toggle = document.getElementById('card-layout-toggle');

  getGrids().forEach((grid) => {
    grid.classList.toggle('card-grid--horizontal', horizontal);
    grid.querySelectorAll('.story-card, .card-skeleton').forEach((card) => {
      card.classList.toggle('story-card--horizontal', horizontal && card.classList.contains('story-card'));
    });
  });

  if (toggle) {
    toggle.setAttribute('aria-pressed', String(horizontal));
    toggle.setAttribute(
      'aria-label',
      horizontal ? 'Switch to vertical card layout' : 'Switch to horizontal card layout',
    );
    toggle.classList.toggle('card-layout-toggle--horizontal', horizontal);
  }

  try {
    localStorage.setItem(STORAGE_KEY, layout);
  } catch {
    /* ignore storage errors */
  }
}

function initCardLayout() {
  const toggle = document.getElementById('card-layout-toggle');
  let layout = 'vertical';

  try {
    layout = localStorage.getItem(STORAGE_KEY) || 'vertical';
  } catch {
    layout = 'vertical';
  }

  setCardLayout(layout);

  toggle?.addEventListener('click', () => {
    const next = layout === 'horizontal' ? 'vertical' : 'horizontal';
    layout = next;
    setCardLayout(next);
  });
}

initCardLayout();
