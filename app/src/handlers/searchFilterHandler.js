const ALL = 'all';

export function createDefaultFilters() {
  return {
    lineages: [ALL],
    storyTypes: [ALL],
    authorId: ALL,
    searchQuery: '',
  };
}

export function normalizeQuery(query = '') {
  return query.toLowerCase().trim();
}

export function togglePillValues(activeValues, value, isAllValue = ALL) {
  if (value === isAllValue) {
    return [ALL];
  }

  const withoutAll = activeValues.filter((item) => item !== isAllValue);

  if (withoutAll.includes(value)) {
    const next = withoutAll.filter((item) => item !== value);
    return next.length === 0 ? [ALL] : next;
  }

  return [...withoutAll, value];
}

export function isPillActive(activeValues, value, isAllValue = ALL) {
  if (value === isAllValue) {
    return activeValues.includes(ALL);
  }

  return !activeValues.includes(ALL) && activeValues.includes(value);
}

export function matchesLineage(story, activeLineages) {
  return activeLineages.includes(ALL) || activeLineages.includes(story.lineage);
}

export function matchesStoryType(story, activeStoryTypes) {
  return activeStoryTypes.includes(ALL) || activeStoryTypes.includes(story.storyType);
}

export function matchesAuthor(story, authorId) {
  return authorId === ALL || story.authorId === authorId;
}

export function matchesSearch(story, query, authorMap = {}) {
  if (!query) return true;

  const author = authorMap[story.authorId];
  const haystack = [
    story.title?.bn,
    story.title?.en,
    story.id,
    story.slug,
    story.notes,
    author?.name,
    author?.nameBn,
    ...(story.tags || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
}

export function getSearchRelevance(story, query, authorMap = {}) {
  if (!query) return 0;

  const titleBn = story.title?.bn?.toLowerCase() || '';
  const titleEn = story.title?.en?.toLowerCase() || '';
  const author = authorMap[story.authorId]?.name?.toLowerCase() || '';

  if (titleBn.startsWith(query) || titleEn.startsWith(query)) return 3;
  if (titleBn.includes(query) || titleEn.includes(query)) return 2;
  if ((story.tags || []).some((tag) => tag.includes(query))) return 1;
  if (author.includes(query)) return 1;

  return 0;
}

export function isAnyFilterActive(filters) {
  return (
    Boolean(filters.searchQuery) ||
    !filters.lineages.includes(ALL) ||
    !filters.storyTypes.includes(ALL) ||
    filters.authorId !== ALL
  );
}

export function isPanelFilterActive(filters) {
  return (
    !filters.lineages.includes(ALL) ||
    !filters.storyTypes.includes(ALL) ||
    filters.authorId !== ALL
  );
}

export function shouldHideHero(filters) {
  return isAnyFilterActive(filters);
}

export function filterStories(stories, filters, authorMap = {}) {
  const query = normalizeQuery(filters.searchQuery);

  return stories.filter(
    (story) =>
      matchesSearch(story, query, authorMap) &&
      matchesLineage(story, filters.lineages) &&
      matchesStoryType(story, filters.storyTypes) &&
      matchesAuthor(story, filters.authorId),
  );
}

export function sortStories(stories, filters, authorMap = {}) {
  const query = normalizeQuery(filters.searchQuery);
  const sorted = [...stories];

  if (query) {
    return sorted.sort((a, b) => {
      const relevanceDiff =
        getSearchRelevance(b, query, authorMap) - getSearchRelevance(a, query, authorMap);
      if (relevanceDiff !== 0) return relevanceDiff;
      return getStorySortKey(a) - getStorySortKey(b);
    });
  }

  return sorted.sort((a, b) => getStorySortKey(a) - getStorySortKey(b));
}

function getStorySortKey(story) {
  if (story.playlist?.index != null) {
    return story.playlist.index;
  }

  const match = story.id.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function getResultsLabel(filteredCount, totalCount, isFiltered) {
  if (!isFiltered) {
    return 'All Stories';
  }

  return `${filteredCount} of ${totalCount} Stories`;
}

export function getStoryCountLabel(count) {
  return `${count} STORIES`;
}

export function resetFilters() {
  return createDefaultFilters();
}

export function handleSearchInputChange(currentFilters, value) {
  return {
    ...currentFilters,
    searchQuery: value,
  };
}

export function handleLineageToggle(currentFilters, value) {
  return {
    ...currentFilters,
    lineages: togglePillValues(currentFilters.lineages, value),
  };
}

export function handleStoryTypeToggle(currentFilters, value) {
  return {
    ...currentFilters,
    storyTypes: togglePillValues(currentFilters.storyTypes, value),
  };
}

export function handleAuthorChange(currentFilters, authorId) {
  return {
    ...currentFilters,
    authorId: authorId || ALL,
  };
}

export const EMPTY_SEARCH_MESSAGES = [
  { bengali: 'তারানাথ এই গল্পটি জানেন না।', english: 'Taranath does not know this story.' },
  { bengali: 'এই নামে কোনো আত্মা নেই।', english: 'No spirit answers to that name.' },
  {
    bengali: 'রাতের অন্ধকারেও এই গল্প খুঁজে পাওয়া যায় না।',
    english: 'Even in the dark of night, this story cannot be found.',
  },
  {
    bengali: 'কিছু গল্প বলা হয় না — কিছু হারিয়ে যায়।',
    english: 'Some stories are never told — some are simply lost.',
  },
  {
    bengali: 'তারানাথ থামলেন। এই পথ তিনি চেনেন না।',
    english: 'Taranath paused. He does not recognise this road.',
  },
  { bengali: 'নিঃশব্দ। এখানে কেউ নেই।', english: 'Silence. There is no one here.' },
  {
    bengali: 'মৃতরাও এই নামে সাড়া দেয় না।',
    english: 'Even the dead do not respond to that name.',
  },
  { bengali: 'এই গল্পের শেষ কেউ জানে না।', english: 'No one knows the end of this story.' },
];

export function getEmptySearchMessage() {
  return EMPTY_SEARCH_MESSAGES[Math.floor(Math.random() * EMPTY_SEARCH_MESSAGES.length)];
}

export function isSearchEmptyState(filters, resultCount) {
  return Boolean(normalizeQuery(filters.searchQuery)) && resultCount === 0;
}

export { ALL as FILTER_ALL };
