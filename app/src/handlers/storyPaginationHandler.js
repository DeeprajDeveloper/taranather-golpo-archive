export const STORIES_PAGE_SIZE = 12;

export function getVisibleStories(stories, visibleCount) {
  return stories.slice(0, visibleCount);
}

export function hasMoreStories(totalCount, visibleCount) {
  return visibleCount < totalCount;
}

export function getLoadMoreLabel(visibleCount, totalCount) {
  const remaining = totalCount - visibleCount;
  const nextBatch = Math.min(STORIES_PAGE_SIZE, remaining);

  return {
    button: nextBatch === 1 ? 'Load 1 more story' : `Load ${nextBatch} more stories`,
    status: `Showing ${visibleCount} of ${totalCount}`,
  };
}
