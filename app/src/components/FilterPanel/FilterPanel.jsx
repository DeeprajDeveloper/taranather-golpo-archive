import { FilterStrip } from '../FilterStrip/FilterStrip';
import { FeedbackTrigger } from '../FeedbackTrigger/FeedbackTrigger';
import {
  FILTER_ALL,
  clearAllFilters,
  clearAuthorFilter,
  clearLineageFilter,
  clearOpenedFilter,
  clearStoryTypeFilter,
  handleAuthorChange,
  handleLineageToggle,
  handleOpenedStatusChange,
  handleStoryTypeToggle,
  isAnyFilterActive,
  isAuthorFilterActive,
  isLineageFilterActive,
  isOpenedFilterActive,
  isStoryTypeFilterActive,
} from '../../handlers/searchFilterHandler';
import './FilterPanel.scss';

export function FilterPanel({
  filters,
  setFilters,
  filterOptions,
  onFeedbackClick,
  idPrefix = '',
  variant = 'sidebar',
}) {
  const stripOrientation = variant === 'drawer' ? 'horizontal' : 'vertical';

  const lineagePills = [
    { value: FILTER_ALL, label: 'All' },
    ...filterOptions.lineages.map(({ value, label }) => ({
      value,
      label: label.split('(')[0].trim(),
      title: label,
    })),
  ];

  const storyTypePills = [
    { value: FILTER_ALL, label: 'All Types' },
    ...filterOptions.storyTypes.map(({ value, label }) => ({ value, label })),
  ];

  const authorOptions = [
    { value: FILTER_ALL, label: 'All Authors' },
    ...filterOptions.authors.map(({ value, label }) => ({ value, label })),
  ];

  const openedPills = [
    { value: FILTER_ALL, label: 'All' },
    { value: 'opened', label: 'Opened' },
    { value: 'unopened', label: 'Not opened' },
  ];

  const authorId = `${idPrefix}author-filter`;
  const showClearAll = isAnyFilterActive(filters);

  return (
    <div className={`filter-panel filter-panel--${variant}`}>
      {showClearAll ? (
        <button
          type="button"
          className="filter-panel__clear-all"
          onClick={() => setFilters(clearAllFilters())}
        >
          Clear all filters
        </button>
      ) : null}

      <FilterStrip
        label="Lineage"
        pills={lineagePills}
        activeValues={filters.lineages}
        onToggle={(value) => setFilters((current) => handleLineageToggle(current, value))}
        onClear={() => setFilters((current) => clearLineageFilter(current))}
        showClear={isLineageFilterActive(filters.lineages)}
        ariaLabel="Filter by lineage"
        orientation={stripOrientation}
      />
      <FilterStrip
        label="Story Type"
        pills={storyTypePills}
        activeValues={filters.storyTypes}
        onToggle={(value) => setFilters((current) => handleStoryTypeToggle(current, value))}
        onClear={() => setFilters((current) => clearStoryTypeFilter(current))}
        showClear={isStoryTypeFilterActive(filters.storyTypes)}
        ariaLabel="Filter by story type"
        orientation={stripOrientation}
      />
      <FilterStrip
        label="Opened"
        pills={openedPills}
        activeValues={[filters.openedStatus]}
        onToggle={(value) => setFilters((current) => handleOpenedStatusChange(current, value))}
        onClear={() => setFilters((current) => clearOpenedFilter(current))}
        showClear={isOpenedFilterActive(filters.openedStatus)}
        ariaLabel="Filter by opened stories"
        orientation={stripOrientation}
      />
      <div className="filter-panel__author">
        <div className="filter-group__header">
          <label className="filter-group__label" htmlFor={authorId}>
            Author
          </label>
          {isAuthorFilterActive(filters.authorId) ? (
            <button
              type="button"
              className="filter-group__clear"
              onClick={() => setFilters((current) => clearAuthorFilter(current))}
              aria-label="Clear author filter"
            >
              Clear
            </button>
          ) : null}
        </div>
        <select
          id={authorId}
          className="filter-select"
          value={filters.authorId}
          onChange={(event) =>
            setFilters((current) => handleAuthorChange(current, event.target.value))
          }
          aria-label="Filter by author"
        >
          {authorOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {onFeedbackClick ? (
        <FeedbackTrigger onClick={onFeedbackClick} variant="sidebar" />
      ) : null}
    </div>
  );
}
