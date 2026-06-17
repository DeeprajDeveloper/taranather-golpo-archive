import { useEffect, useRef } from 'react';
import { getCharacterNavLabel } from '../../handlers/characterSelectionHandler';
import './CharacterNav.scss';

export function CharacterNav({ characters, selectedId, onSelect }) {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const activeItem = list.querySelector('.character-nav__item.is-active');
    activeItem?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
  }, [selectedId]);

  return (
    <nav className="character-nav" aria-label="Characters">
      <p className="character-nav__label">Characters</p>
      <ul className="character-nav__list" ref={listRef}>
        {characters.map((character) => {
          const isActive = character.id === selectedId;
          const label = getCharacterNavLabel(character);

          return (
            <li key={character.id}>
              <button
                type="button"
                className={`character-nav__item${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => onSelect(character.id)}
              >
                <span className="character-nav__name">{label}</span>
                <span className="character-nav__name-bn">{character.nameBn}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
