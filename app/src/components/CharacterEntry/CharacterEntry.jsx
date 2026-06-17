import { Tag } from '../Tag/Tag';
import './CharacterEntry.scss';

export function CharacterEntry({ character }) {
  return (
    <article className="character-entry" id={character.id}>
      <div className="character-entry__content">
        <p className="character-entry__role">{character.role}</p>
        <h2 className="character-entry__name">
          {character.nameEn}
          <span className="character-entry__name-bn">{character.nameBn}</span>
        </h2>
        <p className="character-entry__lead">{character.tagline}</p>
        <p className="character-entry__bio">{character.bio}</p>
        {character.traits.length > 0 ? (
          <div className="character-entry__traits">
            <span className="character-entry__traits-label">Often described as</span>
            <div className="character-entry__traits-pills">
              {character.traits.map((trait) => (
                <Tag key={trait} label={trait} />
              ))}
            </div>
          </div>
        ) : null}
        <p className="character-entry__appearance">{character.appearance}</p>
        {character.contextVideo ? (
          <aside className="character-entry__context">
            <span className="character-entry__context-label">Story context</span>
            <a
              href={character.contextVideo.url}
              className="character-entry__context-card"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${character.contextVideo.title} — watch on YouTube (opens in a new tab)`}
            >
              <span className="character-entry__context-title">{character.contextVideo.title}</span>
              {character.contextVideo.description ? (
                <span className="character-entry__context-description">
                  {character.contextVideo.description}
                </span>
              ) : null}
              <span className="character-entry__context-cta" aria-hidden="true">
                ▶ Watch on YouTube
              </span>
            </a>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
