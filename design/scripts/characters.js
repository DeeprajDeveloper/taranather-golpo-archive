/* Characters page — loads data/characters.json */

const list = document.getElementById('characters-list');
const heroEyebrow = document.getElementById('characters-eyebrow');
const heroHeading = document.getElementById('characters-heading');
const heroIntro = document.getElementById('characters-intro');

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
  const article = document.createElement('article');
  article.className = 'character-entry';
  article.id = character.id;

  const traits = (character.traits || [])
    .map((trait) => `<span class="tag">${trait}</span>`)
    .join('');

  article.innerHTML = `
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
  `;

  return article;
}

function showError(message) {
  if (!list) return;
  list.innerHTML = `<p class="characters-error">${message}</p>`;
}

async function loadCharacters() {
  if (!list) return;

  list.innerHTML = '<p class="characters-loading">Loading characters…</p>';

  try {
    const response = await fetch('/data/characters.json');
    if (!response.ok) throw new Error('Could not load characters data');

    const data = await response.json();

    if (heroEyebrow && data.meta?.eyebrow) heroEyebrow.textContent = data.meta.eyebrow;
    if (heroHeading && data.meta?.title) heroHeading.textContent = data.meta.title;
    if (heroIntro && data.meta?.intro) heroIntro.textContent = data.meta.intro;
    document.title = `${data.meta?.title || 'Characters'} — Taranath Tantrik Design System`;

    list.innerHTML = '';
    (data.characters || []).forEach((character) => {
      list.appendChild(renderCharacter(character));
    });
  } catch {
    showError('Failed to load characters. Serve via the app dev server or deploy with /data available.');
  }
}

loadCharacters();
