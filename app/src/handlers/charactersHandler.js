import charactersData from '@data/characters.json';

export function loadCharactersData() {
  return charactersData;
}

export function buildCharacterEntryModel(character) {
  return {
    id: character.id,
    nameEn: character.name.en,
    nameBn: character.name.bn,
    role: character.role,
    tagline: character.tagline,
    bio: character.bio,
    traits: character.traits || [],
    appearance: character.appearance,
    image: character.image || null,
    imageAlt: character.imageAlt || character.name.en,
  };
}

export function buildCharactersPageModel(data = loadCharactersData()) {
  return {
    meta: data.meta,
    characters: (data.characters || []).map(buildCharacterEntryModel),
  };
}
