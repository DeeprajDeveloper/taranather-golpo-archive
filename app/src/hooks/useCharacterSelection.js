import { useCallback, useEffect, useState } from 'react';
import {
  getCharacterById,
  normalizeCharacterHash,
} from '../handlers/characterSelectionHandler';

export function useCharacterSelection(characters) {
  const defaultId = characters[0]?.id ?? null;

  const readHashId = useCallback(() => {
    return normalizeCharacterHash(window.location.hash) || defaultId;
  }, [defaultId]);

  const [selectedId, setSelectedId] = useState(readHashId);

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedId(readHashId());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [readHashId]);

  const selectCharacter = useCallback((id) => {
    setSelectedId(id);

    const nextHash = `#${id}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }, []);

  const selectedCharacter = getCharacterById(characters, selectedId) ?? characters[0] ?? null;

  return {
    selectedId: selectedCharacter?.id ?? defaultId,
    selectedCharacter,
    selectCharacter,
  };
}
