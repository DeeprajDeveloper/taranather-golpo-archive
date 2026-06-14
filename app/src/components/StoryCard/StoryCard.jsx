import { Tag } from '../Tag/Tag';
import './StoryCard.scss';

function Thumbnail({ url, title, storyId }) {
  if (url) {
    return (
      <img
        className="story-card__thumbnail"
        src={url}
        alt={`Taranath Tantrik — ${title}`}
        loading="lazy"
      />
    );
  }

  return (
    <div className="story-card__thumbnail story-card__thumbnail--placeholder">
      <span>{storyId}</span>
    </div>
  );
}

export function StoryCard({ story }) {
  const displayTags = story.tags.slice(0, 3);

  return (
    <a
      href={story.youtubeUrl}
      className="story-card reveal"
      data-reveal
      target="_blank"
      rel="noopener noreferrer"
      aria-label={story.ariaLabel}
    >
      <Thumbnail url={story.thumbnailUrl} title={story.primaryTitle} storyId={story.id} />
      <div className="story-card__body">
        <span className="story-card__meta">{story.meta}</span>
        <h2 className="story-card__title">{story.primaryTitle}</h2>
        {story.secondaryTitle ? (
          <p className="story-card__subtitle">{story.secondaryTitle}</p>
        ) : null}
        {story.description ? (
          <p className="story-card__description">{story.description}</p>
        ) : null}
        {displayTags.length > 0 ? (
          <div className="story-card__tags">
            {displayTags.map((tag) => (
              <Tag
                key={tag}
                label={tag.replace(/-/g, ' ')}
                variant={tag === 'canonical' ? 'accent' : 'default'}
              />
            ))}
          </div>
        ) : null}
        <span className="story-card__cta" aria-hidden="true">
          ▶ Watch on YouTube
        </span>
      </div>
    </a>
  );
}
