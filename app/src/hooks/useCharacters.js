import { useMemo } from 'react';
import { buildCharactersPageModel } from '../handlers/charactersHandler';

export function useCharacters() {
  return useMemo(() => buildCharactersPageModel(), []);
}
