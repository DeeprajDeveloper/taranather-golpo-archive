/* Design system showcase interactivity */

const toast = document.getElementById('ds-toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
}

/* Copy color token on click */
document.querySelectorAll('.color-swatch').forEach(swatch => {
  swatch.addEventListener('click', async () => {
    const hex = swatch.dataset.hex;
    const token = swatch.dataset.token;
    try {
      await navigator.clipboard.writeText(hex);
      showToast(`Copied ${token}`);
      swatch.classList.add('is-copied');
      setTimeout(() => swatch.classList.remove('is-copied'), 600);
    } catch {
      showToast(`Token: ${token}`);
    }
  });
});

/* Sidebar active state on scroll */
const sections = document.querySelectorAll('.ds-section[id]');
const navLinks = document.querySelectorAll('.ds-nav__link');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  let current = sections[0]?.id;

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* Filter demo — client-side story filtering */
const filterLineage = document.getElementById('filter-lineage');
const filterType = document.getElementById('filter-type');
const filterAuthor = document.getElementById('filter-author');
const filterCount = document.getElementById('filter-count');
const demoCards = document.querySelectorAll('[data-demo-card]');

function applyFilters() {
  const lineage = filterLineage?.value || '';
  const type = filterType?.value || '';
  const author = filterAuthor?.value || '';
  let visible = 0;

  demoCards.forEach(card => {
    const match =
      (!lineage || card.dataset.lineage === lineage) &&
      (!type || card.dataset.type === type) &&
      (!author || card.dataset.author === author);

    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });

  if (filterCount) {
    filterCount.textContent = `${visible} of ${demoCards.length} stories`;
  }
}

[filterLineage, filterType, filterAuthor].forEach(el => {
  el?.addEventListener('change', applyFilters);
});

applyFilters();

/* Toggle skeleton visibility demo */
const skeletonToggle = document.getElementById('skeleton-toggle');
const skeletonDemo = document.getElementById('skeleton-demo');
const cardsDemo = document.getElementById('cards-demo');

skeletonToggle?.addEventListener('click', () => {
  const showingSkeleton = skeletonDemo.style.display !== 'none';
  skeletonDemo.style.display = showingSkeleton ? 'none' : 'grid';
  cardsDemo.style.display = showingSkeleton ? 'grid' : 'none';
  skeletonToggle.textContent = showingSkeleton ? 'Show loading state' : 'Show loaded cards';
});
