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
import {
  handleSearchInputChange,
  resetFilters,
} from './handlers/searchFilterHandler';
import './App.scss';

function App() {
  const { theme, onToggle, ariaLabel } = useTheme();
  const { isScrolled, showBackToTop } = useHeaderScroll();
  const feedback = useFeedbackModal();
  const about = useAboutModal();
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

            <SearchBar
              value={filters.searchQuery}
              onChange={handleSearchChange}
              onClear={handleSearchClear}
              sticky
            />

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
