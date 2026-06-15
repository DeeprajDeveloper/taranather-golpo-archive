export const ROUTES = {
  HOME: '/',
  CHARACTERS: '/characters',
};

export function normalizePath(pathname = '/') {
  if (pathname === ROUTES.CHARACTERS || pathname === `${ROUTES.CHARACTERS}/`) {
    return ROUTES.CHARACTERS;
  }

  return ROUTES.HOME;
}

export function isCharactersRoute(path) {
  return normalizePath(path) === ROUTES.CHARACTERS;
}

export function getPageTitle(path) {
  return isCharactersRoute(path)
    ? 'Get to know the characters — Taranath Tantrik'
    : 'Taranath Tantrik — Story Archive';
}
