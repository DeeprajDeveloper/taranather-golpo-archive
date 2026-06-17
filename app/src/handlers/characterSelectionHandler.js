export function getCharacterById(characters, id) {
  return characters.find((character) => character.id === id) ?? characters[0] ?? null;
}

export function getCharacterNavLabel(character) {
  if (!character) return '';

  const name = character.nameEn || character.name?.en || '';
  return name.split('(')[0].trim();
}

export function normalizeCharacterHash(hash = '') {
  const id = hash.replace(/^#/, '').trim();
  return id || null;
}
