import { FilterStrip } from '../FilterStrip/FilterStrip';
import { FeedbackTrigger } from '../FeedbackTrigger/FeedbackTrigger';
import {
  FILTER_ALL,
  handleAuthorChange,
  handleLineageToggle,
  handleStoryTypeToggle,
} from '../../handlers/searchFilterHandler';
import './FilterSidebar.scss';

export function FilterSidebar({ filters, setFilters, filterOptions, onFeedbackClick }) {
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

  return (
    <aside className="filter-sidebar" aria-label="Story filters">
      <p className="filter-sidebar__title">Filters</p>

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
      <div className="filter-sidebar__author">
        <label className="filter-group__label" htmlFor="author-filter">
          Author
        </label>
        <select
          id="author-filter"
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

      <FeedbackTrigger onClick={onFeedbackClick} variant="sidebar" />
    </aside>
  );
}
