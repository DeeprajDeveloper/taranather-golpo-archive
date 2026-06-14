import { useEffect, useMemo, useState } from 'react';
import {
  createDefaultFilters,
  filterStories,
  getEmptySearchMessage,
  getResultsLabel,
  getStoryCountLabel,
  isAnyFilterActive,
  isSearchEmptyState,
  resetFilters,
  shouldHideHero,
  sortStories,
} from '../handlers/searchFilterHandler';
import {
  buildAuthorMap,
  buildStoryCardModel,
  buildStoryTypeLabelMap,
  getStoriesWithYouTube,
  loadMasterData,
} from '../handlers/storyDataHandler';

const SEARCH_DEBOUNCE_MS = 300;

export function useStories() {
  const masterData = useMemo(() => loadMasterData(), []);
  const authorMap = useMemo(
    () => buildAuthorMap(masterData.authors),
    [masterData.authors],
  );
  const typeLabels = useMemo(
    () => buildStoryTypeLabelMap(masterData.filters.storyTypes),
    [masterData.filters.storyTypes],
  );

  const allStories = useMemo(
    () => getStoriesWithYouTube(masterData.stories),
    [masterData.stories],
  );

  const [filters, setFilters] = useState(createDefaultFilters);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.searchQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [filters.searchQuery]);

  const effectiveFilters = useMemo(
    () => ({ ...filters, searchQuery: debouncedSearch }),
    [filters, debouncedSearch],
  );

  const filteredStories = useMemo(() => {
    const filtered = filterStories(allStories, effectiveFilters, authorMap);
    return sortStories(filtered, effectiveFilters, authorMap);
  }, [allStories, effectiveFilters, authorMap]);

  const storyCards = useMemo(
    () => filteredStories.map((story) => buildStoryCardModel(story, authorMap, typeLabels)),
    [filteredStories, authorMap, typeLabels],
  );

  const isFiltered = isAnyFilterActive(effectiveFilters);
  const heroHidden = shouldHideHero(effectiveFilters);
  const isEmpty = filteredStories.length === 0;
  const isEmptySearch = isSearchEmptyState(effectiveFilters, filteredStories.length);

  const emptySearchMessage = useMemo(() => {
    if (!isEmptySearch) return null;
    return getEmptySearchMessage();
  }, [effectiveFilters.searchQuery, isEmptySearch]);

  return {
    filters,
    setFilters,
    resetAll: () => setFilters(resetFilters()),
    storyCards,
    totalCount: allStories.length,
    filteredCount: filteredStories.length,
    resultsLabel: getResultsLabel(filteredStories.length, allStories.length, isFiltered),
    storyCountLabel: getStoryCountLabel(filteredStories.length),
    heroHidden,
    isEmpty,
    isEmptySearch,
    emptySearchMessage,
    filterOptions: masterData.filters,
    authorMap,
  };
}
