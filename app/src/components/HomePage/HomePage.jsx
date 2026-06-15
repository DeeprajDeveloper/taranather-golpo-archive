import { FilterDrawer } from '../FilterDrawer/FilterDrawer';
import { Hero } from '../Hero/Hero';
import { SearchBar } from '../SearchBar/SearchBar';
import { CardLayoutToggle } from '../CardLayoutToggle/CardLayoutToggle';
import { FilterSidebar } from '../FilterSidebar/FilterSidebar';
import { SectionLabel } from '../SectionLabel/SectionLabel';
import { StoryGrid } from '../StoryGrid/StoryGrid';
import { EmptyState } from '../EmptyState/EmptyState';
import {
  handleSearchInputChange,
  isPanelFilterActive,
  resetFilters,
} from '../../handlers/searchFilterHandler';

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HomePage({
  filters,
  setFilters,
  storyCards,
  resultsLabel,
  storyCountLabel,
  heroHidden,
  isEmpty,
  isEmptySearch,
  emptySearchMessage,
  filterOptions,
  gridRef,
  openedStories,
  cardLayout,
  filterDrawer,
  onFeedbackClick,
}) {
  const hasPanelFilters = isPanelFilterActive(filters);

  const handleSearchChange = (value) => {
    setFilters((current) => handleSearchInputChange(current, value));
  };

  const handleSearchClear = () => {
    setFilters((current) => handleSearchInputChange(current, ''));
  };

  return (
    <>
      <main className="main-content">
        <div className="container page-layout">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
            onFeedbackClick={onFeedbackClick}
          />

          <div className="content-panel">
            <Hero storyCountLabel={storyCountLabel} isHidden={heroHidden} />

            <div className="search-toolbar">
              <SearchBar
                value={filters.searchQuery}
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                sticky
              />
              <CardLayoutToggle
                isHorizontal={cardLayout.isHorizontal}
                onToggle={cardLayout.onToggle}
                ariaLabel={cardLayout.ariaLabel}
              />
              <button
                type="button"
                className={`filter-toggle${hasPanelFilters ? ' filter-toggle--active' : ''}`}
                aria-label="Open filters"
                aria-expanded={filterDrawer.isOpen}
                onClick={filterDrawer.open}
              >
                <FilterIcon />
                <span className="filter-toggle__label">Filters</span>
              </button>
            </div>

            <SectionLabel text={resultsLabel} />

            {isEmpty ? (
              <EmptyState
                message={
                  isEmptySearch
                    ? {
                        ...emptySearchMessage,
                        hint: 'Try a different search or clear your filters.',
                      }
                    : undefined
                }
                onReset={() => setFilters(resetFilters())}
              />
            ) : (
              <StoryGrid
                stories={storyCards}
                gridRef={gridRef}
                layout={cardLayout.layout}
                isOpened={openedStories.isOpened}
                onOpenStory={openedStories.markOpened}
              />
            )}
          </div>
        </div>
      </main>

      <FilterDrawer
        isVisible={filterDrawer.isVisible}
        isActive={filterDrawer.isActive}
        onClose={filterDrawer.close}
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
        onFeedbackClick={onFeedbackClick}
      />
    </>
  );
}
