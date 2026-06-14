import { FilterDrawer } from './components/FilterDrawer/FilterDrawer';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import { SearchBar } from './components/SearchBar/SearchBar';
import { FilterSidebar } from './components/FilterSidebar/FilterSidebar';
import { SectionLabel } from './components/SectionLabel/SectionLabel';
import { StoryGrid } from './components/StoryGrid/StoryGrid';
import { EmptyState } from './components/EmptyState/EmptyState';
import { BackToTop } from './components/BackToTop/BackToTop';
import { FeedbackModal } from './components/FeedbackModal/FeedbackModal';
import { AboutModal } from './components/AboutModal/AboutModal';
import { useTheme } from './hooks/useTheme';
import { useHeaderScroll } from './hooks/useHeaderScroll';
import { useStories } from './hooks/useStories';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useFeedbackModal } from './hooks/useFeedbackModal';
import { useAboutModal } from './hooks/useAboutModal';
import { useFilterDrawer } from './hooks/useFilterDrawer';
import {
  handleSearchInputChange,
  isPanelFilterActive,
  resetFilters,
} from './handlers/searchFilterHandler';
import './App.scss';

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function App() {
  const { theme, onToggle, ariaLabel } = useTheme();
  const { isScrolled, showBackToTop } = useHeaderScroll();
  const feedback = useFeedbackModal();
  const about = useAboutModal();
  const filterDrawer = useFilterDrawer();
  const {
    filters,
    setFilters,
    resetAll,
    storyCards,
    resultsLabel,
    storyCountLabel,
    heroHidden,
    isEmpty,
    isEmptySearch,
    emptySearchMessage,
    filterOptions,
  } = useStories();

  const gridRef = useScrollReveal([storyCards.map((s) => s.id).join(',')]);
  const hasPanelFilters = isPanelFilterActive(filters);

  const handleReset = (event) => {
    if (event) event.preventDefault();
    resetAll();
  };

  const handleSearchChange = (value) => {
    setFilters((current) => handleSearchInputChange(current, value));
  };

  const handleSearchClear = () => {
    setFilters((current) => handleSearchInputChange(current, ''));
  };

  return (
    <>
      <Header
        theme={theme}
        onThemeToggle={onToggle}
        themeAriaLabel={ariaLabel}
        isScrolled={isScrolled}
        onReset={handleReset}
        onAboutClick={about.open}
      />

      <main className="main-content">
        <div className="container page-layout">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
            onFeedbackClick={feedback.open}
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
              <StoryGrid stories={storyCards} gridRef={gridRef} />
            )}
          </div>
        </div>
      </main>

      <Footer onFeedbackClick={feedback.open} />
      <BackToTop visible={showBackToTop} />

      <FilterDrawer
        isOpen={filterDrawer.isOpen}
        onClose={filterDrawer.close}
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
        onFeedbackClick={feedback.open}
      />

      <FeedbackModal
        isOpen={feedback.isOpen}
        form={feedback.form}
        errors={feedback.errors}
        status={feedback.status}
        statusMessage={feedback.statusMessage}
        isStoryRecommendation={feedback.isStoryRecommendation}
        onClose={feedback.close}
        onFieldChange={feedback.updateField}
        onSubmit={feedback.handleSubmit}
      />

      <AboutModal isOpen={about.isOpen} onClose={about.close} />
    </>
  );
}

export default App;
