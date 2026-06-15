import { useCallback, useEffect, useState } from 'react';
import {
  getPageTitle,
  isCharactersRoute,
  normalizePath,
  ROUTES,
} from '../handlers/routeHandler';

export function useAppRoute() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = getPageTitle(path);
  }, [path]);

  const navigate = useCallback((to) => {
    const next = normalizePath(to);
    setPath((current) => {
      if (current === next) return current;
      window.history.pushState({}, '', next);
      window.scrollTo(0, 0);
      return next;
    });
  }, []);

  return {
    path,
    navigate,
    isHome: path === ROUTES.HOME,
    isCharacters: isCharactersRoute(path),
    routes: ROUTES,
  };
}
