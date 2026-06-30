import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  STORIES_PAGE_SIZE,
  getLoadMoreLabel,
  getVisibleStories,
  hasMoreStories,
} from '../handlers/storyPaginationHandler';

export function useStoryPagination(storyCards) {
  const [visibleCount, setVisibleCount] = useState(STORIES_PAGE_SIZE);

  const listKey = useMemo(
    () => storyCards.map((story) => story.id).join(','),
    [storyCards],
  );

  useEffect(() => {
    setVisibleCount(STORIES_PAGE_SIZE);
  }, [listKey]);

  const visibleStories = useMemo(
    () => getVisibleStories(storyCards, visibleCount),
    [storyCards, visibleCount],
  );

  const hasMore = hasMoreStories(storyCards.length, visibleCount);
  const loadMoreLabel = getLoadMoreLabel(visibleCount, storyCards.length);

  const loadMore = useCallback(() => {
    setVisibleCount((current) =>
      Math.min(current + STORIES_PAGE_SIZE, storyCards.length),
    );
  }, [storyCards.length]);

  return {
    visibleStories,
    hasMore,
    loadMore,
    loadMoreLabel,
  };
}
