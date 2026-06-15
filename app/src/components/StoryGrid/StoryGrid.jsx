import { StoryCard } from '../StoryCard/StoryCard';
import './StoryGrid.scss';

export function StoryGrid({ stories, gridRef, layout = 'vertical', isOpened, onOpenStory }) {
  const isHorizontal = layout === 'horizontal';

  return (
    <div
      className={`card-grid${isHorizontal ? ' card-grid--horizontal' : ''}`}
      ref={gridRef}
      aria-live="polite"
    >
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
          layout={layout}
          isOpened={isOpened?.(story.id)}
          onOpen={onOpenStory}
        />
      ))}
    </div>
  );
}
