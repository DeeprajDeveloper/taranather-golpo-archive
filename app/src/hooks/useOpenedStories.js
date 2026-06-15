import { useCallback, useState } from 'react';
import {
  clearOpenedStories,
  isStoryOpened,
  loadOpenedStoryIds,
  markStoryOpened,
} from '../handlers/openedStoriesHandler';

export function useOpenedStories() {
  const [openedIds, setOpenedIds] = useState(() => loadOpenedStoryIds());

  const markOpened = useCallback((storyId) => {
    setOpenedIds((current) => markStoryOpened(current, storyId));
  }, []);

  const clearOpened = useCallback(() => {
    setOpenedIds(clearOpenedStories());
  }, []);

  const isOpened = useCallback(
    (storyId) => isStoryOpened(openedIds, storyId),
    [openedIds],
  );

  return {
    openedIds,
    openedCount: openedIds.size,
    markOpened,
    clearOpened,
    isOpened,
  };
}
