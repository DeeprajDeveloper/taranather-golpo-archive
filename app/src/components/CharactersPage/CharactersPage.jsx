import { CharacterEntry } from '../CharacterEntry/CharacterEntry';
import './CharactersPage.scss';

export function CharactersPage({ meta, characters }) {
  return (
    <main className="main-content">
      <section className="characters-page-hero container">
        <p className="characters-page-hero__eyebrow">{meta.eyebrow}</p>
        <h1 className="characters-page-hero__heading">{meta.title}</h1>
        <p className="characters-page-hero__intro">{meta.intro}</p>
      </section>

      <div className="characters-list container">
        {characters.map((character) => (
          <CharacterEntry key={character.id} character={character} />
        ))}
      </div>
    </main>
  );
}
