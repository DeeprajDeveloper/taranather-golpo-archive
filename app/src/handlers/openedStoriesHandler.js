const STORAGE_KEY = 'tt-opened-stories';

function parseStoredIds(raw) {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.ids) ? parsed.ids.filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function loadOpenedStoryIds() {
  if (typeof window === 'undefined') return new Set();

  return new Set(parseStoredIds(localStorage.getItem(STORAGE_KEY)));
}

export function saveOpenedStoryIds(ids) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ids: [...ids],
      updatedAt: new Date().toISOString().slice(0, 10),
    }),
  );
}

export function markStoryOpened(currentIds, storyId) {
  if (!storyId) return currentIds;

  const next = new Set(currentIds);
  next.add(storyId);
  saveOpenedStoryIds(next);
  return next;
}

export function clearOpenedStories() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }

  return new Set();
}

export function isStoryOpened(openedIds, storyId) {
  return openedIds.has(storyId);
}

export function getOpenedStoryCount(openedIds) {
  return openedIds.size;
}
