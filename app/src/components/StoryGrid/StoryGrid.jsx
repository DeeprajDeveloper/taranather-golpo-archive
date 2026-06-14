import { StoryCard } from '../StoryCard/StoryCard';
import './StoryGrid.scss';

export function StoryGrid({ stories, gridRef }) {
  return (
    <div className="card-grid" ref={gridRef} aria-live="polite">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
