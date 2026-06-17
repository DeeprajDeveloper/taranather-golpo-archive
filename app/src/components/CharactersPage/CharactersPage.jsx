import { CharacterEntry } from '../CharacterEntry/CharacterEntry';
import { CharacterNav } from '../CharacterNav/CharacterNav';
import { useCharacterSelection } from '../../hooks/useCharacterSelection';
import './CharactersPage.scss';

export function CharactersPage({ meta, characters }) {
  const { selectedId, selectedCharacter, selectCharacter } = useCharacterSelection(characters);

  return (
    <main className="main-content">
      <section className="characters-page-hero container">
        <p className="characters-page-hero__eyebrow">{meta.eyebrow}</p>
        <h1 className="characters-page-hero__heading">{meta.title}</h1>
        <p className="characters-page-hero__intro">{meta.intro}</p>
      </section>

      <div className="characters-layout container">
        <CharacterNav
          characters={characters}
          selectedId={selectedId}
          onSelect={selectCharacter}
        />

        <div className="characters-detail" aria-live="polite">
          {selectedCharacter ? (
            <CharacterEntry key={selectedCharacter.id} character={selectedCharacter} />
          ) : null}
        </div>
      </div>
    </main>
  );
}
