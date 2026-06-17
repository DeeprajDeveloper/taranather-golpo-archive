/* Mobile navigation drawer */

const menuButton = document.getElementById('nav-menu-toggle');
const navDrawer = document.getElementById('nav-drawer');
const closeButtons = navDrawer?.querySelectorAll('[data-nav-close]') ?? [];

let isOpen = false;

function setDrawerOpen(open) {
  if (!navDrawer) return;

  isOpen = open;
  navDrawer.hidden = !open;
  navDrawer.classList.toggle('nav-drawer--open', open);
  menuButton?.setAttribute('aria-expanded', String(open));

  document.body.style.overflow = open ? 'hidden' : '';
}

function openDrawer() {
  if (isOpen) return;
  navDrawer.hidden = false;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => setDrawerOpen(true));
  });
}

function closeDrawer() {
  if (!isOpen) return;
  setDrawerOpen(false);
  window.setTimeout(() => {
    if (!isOpen) navDrawer.hidden = true;
  }, 220);
}

menuButton?.addEventListener('click', openDrawer);

closeButtons.forEach((button) => {
  button.addEventListener('click', closeDrawer);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isOpen) closeDrawer();
});
