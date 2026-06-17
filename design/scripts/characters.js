/* Characters page — loads data/characters.json with nav selection */

const layout = document.getElementById('characters-layout');
const navList = document.getElementById('character-nav-list');
const detail = document.getElementById('characters-detail');
const heroEyebrow = document.getElementById('characters-eyebrow');
const heroHeading = document.getElementById('characters-heading');
const heroIntro = document.getElementById('characters-intro');

let characters = [];
let selectedId = null;

function getNavLabel(character) {
  return character.name.en.split('(')[0].trim();
}

function renderImage(character) {
  const alt = character.imageAlt || character.name.en;

  if (character.image) {
    return `<img class="character-entry__image" src="${character.image}" alt="${alt}" loading="lazy">`;
  }

  return `
    <div class="character-entry__image character-entry__image--placeholder" aria-hidden="true">
      <span>Portrait</span>
    </div>
  `;
}

function renderCharacter(character) {
  const traits = (character.traits || [])
    .map((trait) => `<span class="tag">${trait}</span>`)
    .join('');

  return `
    <article class="character-entry" id="${character.id}">
      ${renderImage(character)}
      <div class="character-entry__content">
        <p class="character-entry__role">${character.role}</p>
        <h2 class="character-entry__name">
          ${character.name.en}
          <span class="character-entry__name-bn">${character.name.bn}</span>
        </h2>
        <p class="character-entry__lead">${character.tagline}</p>
        <p class="character-entry__bio">${character.bio}</p>
        ${traits ? `
          <div class="character-entry__traits">
            <span class="character-entry__traits-label">Often described as</span>
            <div class="character-entry__traits-pills">${traits}</div>
          </div>
        ` : ''}
        <p class="character-entry__appearance">${character.appearance}</p>
      </div>
    </article>
  `;
}

function renderNav() {
  if (!navList) return;

  navList.innerHTML = characters
    .map((character) => {
      const isActive = character.id === selectedId;
      return `
        <li>
          <button
            type="button"
            class="character-nav__item${isActive ? ' is-active' : ''}"
            data-character-id="${character.id}"
            aria-current="${isActive ? 'true' : 'false'}"
          >
            <span class="character-nav__name">${getNavLabel(character)}</span>
            <span class="character-nav__name-bn">${character.name.bn}</span>
          </button>
        </li>
      `;
    })
    .join('');

  navList.querySelectorAll('[data-character-id]').forEach((button) => {
    button.addEventListener('click', () => {
      selectCharacter(button.dataset.characterId);
    });
  });
}

function renderDetail() {
  if (!detail) return;

  const character = characters.find((item) => item.id === selectedId);
  detail.innerHTML = character ? renderCharacter(character) : '';
}

function selectCharacter(id) {
  selectedId = id;
  window.history.replaceState(null, '', `#${id}`);
  renderNav();
  renderDetail();

  const activeItem = navList?.querySelector('.character-nav__item.is-active');
  activeItem?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
}

function showError(message) {
  if (!layout) return;
  layout.innerHTML = `<p class="characters-error">${message}</p>`;
}

async function loadCharacters() {
  if (!layout) return;

  try {
    const response = await fetch('/data/characters.json');
    if (!response.ok) throw new Error('Could not load characters data');

    const data = await response.json();
    characters = data.characters || [];

    if (heroEyebrow && data.meta?.eyebrow) heroEyebrow.textContent = data.meta.eyebrow;
    if (heroHeading && data.meta?.title) heroHeading.textContent = data.meta.title;
    if (heroIntro && data.meta?.intro) heroIntro.textContent = data.meta.intro;
    document.title = `${data.meta?.title || 'Characters'} — Taranath Tantrik Design System`;

    const hashId = window.location.hash.replace(/^#/, '');
    selectedId = characters.some((item) => item.id === hashId)
      ? hashId
      : characters[0]?.id;

    renderNav();
    renderDetail();
  } catch {
    showError('Failed to load characters. Serve via the app dev server or deploy with /data available.');
  }
}

window.addEventListener('hashchange', () => {
  const hashId = window.location.hash.replace(/^#/, '');
  if (hashId && characters.some((item) => item.id === hashId)) {
    selectedId = hashId;
    renderNav();
    renderDetail();
  }
});

loadCharacters();
