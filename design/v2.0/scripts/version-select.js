/* Design system version switcher */

const versionSelect = document.getElementById('version-select');

if (versionSelect) {
  versionSelect.addEventListener('change', () => {
    const target = versionSelect.value;
    if (!target) return;

    const destination = new URL(target, window.location.href);
    if (destination.pathname === window.location.pathname) return;

    window.location.href = target;
  });
}
