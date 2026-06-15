const root = document.documentElement;
const saved = localStorage.getItem('tt-theme') || 'dark';
root.setAttribute('data-theme', saved);

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('tt-theme', next);
  });
}

initThemeToggle();
