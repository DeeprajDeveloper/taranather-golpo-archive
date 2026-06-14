import masterData from '@data/master_data.json';

const THEME_STORAGE_KEY = 'tt-theme';
const DEFAULT_THEME = 'dark';

export function getStoredTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
}

export function setStoredTheme(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function toggleTheme(currentTheme) {
  return currentTheme === 'dark' ? 'light' : 'dark';
}

export function getThemeAriaLabel(theme) {
  return theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

export function initTheme() {
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
}

export function loadMasterData() {
  return masterData;
}

export function buildAuthorMap(authors = []) {
  return Object.fromEntries(authors.map((author) => [author.id, author]));
}

export function getYouTubeUrl(story) {
  const youtube = story.media?.find((item) => item.platform === 'youtube');
  return youtube?.url ?? null;
}

export function getYouTubeVideoId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1);
    }
    return parsed.searchParams.get('v');
  } catch {
    return null;
  }
}

export function getYouTubeThumbnail(story) {
  const videoId = getYouTubeVideoId(getYouTubeUrl(story));
  return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
}

export function formatStoryType(storyType) {
  return storyType.replace(/_/g, ' ');
}

export function getStorySortKey(story) {
  if (story.playlist?.index != null) {
    return story.playlist.index;
  }

  const match = story.id.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function buildStoryMeta(story, authorMap, typeLabels = {}) {
  const author = authorMap[story.authorId];
  const typeLabel = typeLabels[story.storyType] || formatStoryType(story.storyType);
  const idLabel = story.id.toUpperCase();

  return `${idLabel} · ${typeLabel}${author ? ` · ${author.name}` : ''}`;
}

export function buildStoryCardModel(story, authorMap, typeLabels = {}) {
  const titleBn = story.title?.bn || '';
  const titleEn = story.title?.en || '';
  const primaryTitle = titleBn || titleEn;
  const secondaryTitle = titleBn && titleEn ? titleEn : null;

  return {
    id: story.id,
    slug: story.slug,
    primaryTitle,
    secondaryTitle,
    description: story.notes || '',
    meta: buildStoryMeta(story, authorMap, typeLabels),
    tags: story.tags || [],
    youtubeUrl: getYouTubeUrl(story),
    thumbnailUrl: getYouTubeThumbnail(story),
    lineage: story.lineage,
    storyType: story.storyType,
    authorId: story.authorId,
    sortKey: getStorySortKey(story),
    ariaLabel: `Watch ${primaryTitle} on YouTube`,
  };
}

export function buildStoryTypeLabelMap(storyTypes = []) {
  return Object.fromEntries(storyTypes.map(({ value, label }) => [value, label]));
}

export function getStoriesWithYouTube(stories = []) {
  return stories.filter((story) => getYouTubeUrl(story));
}
