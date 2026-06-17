import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './components/HomePage/HomePage';
import { CharactersPage } from './components/CharactersPage/CharactersPage';
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
import { useOpenedStories } from './hooks/useOpenedStories';
import { useCardLayout } from './hooks/useCardLayout';
import { useAppRoute } from './hooks/useAppRoute';
import { useCharacters } from './hooks/useCharacters';
import { PrivacyModal } from './components/PrivacyModal/PrivacyModal';
import { usePrivacyModal } from './hooks/usePrivacyModal';
import './App.scss';

function App() {
  const { theme, onToggle, ariaLabel } = useTheme();
  const { isScrolled, showBackToTop } = useHeaderScroll();
  const feedback = useFeedbackModal();
  const about = useAboutModal();
  const privacy = usePrivacyModal();
  const filterDrawer = useFilterDrawer();
  const openedStories = useOpenedStories();
  const cardLayout = useCardLayout();
  const route = useAppRoute();
  const { meta, characters } = useCharacters();

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
  } = useStories(openedStories.openedIds);

  const gridRef = useScrollReveal([
    storyCards.map((s) => s.id).join(','),
    cardLayout.layout,
  ]);

  const handleReset = (event) => {
    if (event) event.preventDefault();
    resetAll();
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
        currentPath={route.path}
        onNavigate={route.navigate}
      />

      {route.isCharacters ? (
        <CharactersPage meta={meta} characters={characters} />
      ) : (
        <HomePage
          filters={filters}
          setFilters={setFilters}
          storyCards={storyCards}
          resultsLabel={resultsLabel}
          storyCountLabel={storyCountLabel}
          heroHidden={heroHidden}
          isEmpty={isEmpty}
          isEmptySearch={isEmptySearch}
          emptySearchMessage={emptySearchMessage}
          filterOptions={filterOptions}
          gridRef={gridRef}
          openedStories={openedStories}
          cardLayout={cardLayout}
          filterDrawer={filterDrawer}
          onFeedbackClick={feedback.open}
        />
      )}

      <Footer onFeedbackClick={feedback.open} onPrivacyClick={privacy.open} />
      <BackToTop visible={showBackToTop} />

      <FeedbackModal
        isVisible={feedback.isVisible}
        isActive={feedback.isActive}
        form={feedback.form}
        errors={feedback.errors}
        status={feedback.status}
        statusMessage={feedback.statusMessage}
        isStoryRecommendation={feedback.isStoryRecommendation}
        onClose={feedback.close}
        onFieldChange={feedback.updateField}
        onSubmit={feedback.handleSubmit}
      />

      <AboutModal
        isVisible={about.isVisible}
        isActive={about.isActive}
        onClose={about.close}
        openedCount={openedStories.openedCount}
        onClearOpened={openedStories.clearOpened}
      />

      <PrivacyModal
        isVisible={privacy.isVisible}
        isActive={privacy.isActive}
        onClose={privacy.close}
      />
    </>
  );
}

export default App;
