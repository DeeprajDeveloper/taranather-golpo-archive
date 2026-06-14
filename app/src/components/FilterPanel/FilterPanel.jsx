import { FilterStrip } from '../FilterStrip/FilterStrip';
import { FeedbackTrigger } from '../FeedbackTrigger/FeedbackTrigger';
import {
  FILTER_ALL,
  handleAuthorChange,
  handleLineageToggle,
  handleStoryTypeToggle,
} from '../../handlers/searchFilterHandler';
import './FilterPanel.scss';

export function FilterPanel({ filters, setFilters, filterOptions, onFeedbackClick, idPrefix = '' }) {
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

  const authorId = `${idPrefix}author-filter`;

  return (
    <div className="filter-panel">
      <FilterStrip
        label="Lineage"
        pills={lineagePills}
        activeValues={filters.lineages}
        onToggle={(value) => setFilters((current) => handleLineageToggle(current, value))}
        ariaLabel="Filter by lineage"
        orientation="vertical"
      />
      <FilterStrip
        label="Story Type"
        pills={storyTypePills}
        activeValues={filters.storyTypes}
        onToggle={(value) => setFilters((current) => handleStoryTypeToggle(current, value))}
        ariaLabel="Filter by story type"
        orientation="vertical"
      />
      <div className="filter-panel__author">
        <label className="filter-group__label" htmlFor={authorId}>
          Author
        </label>
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
