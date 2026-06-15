import { Tag } from '../Tag/Tag';
import './CharacterEntry.scss';

function CharacterImage({ image, imageAlt }) {
  if (image) {
    return (
      <img
        className="character-entry__image"
        src={image}
        alt={imageAlt}
        loading="lazy"
      />
    );
  }

  return (
    <div className="character-entry__image character-entry__image--placeholder" aria-hidden="true">
      <span>Portrait</span>
    </div>
  );
}

export function CharacterEntry({ character }) {
  return (
    <article className="character-entry" id={character.id}>
      <CharacterImage image={character.image} imageAlt={character.imageAlt} />
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
      </div>
    </article>
  );
}
