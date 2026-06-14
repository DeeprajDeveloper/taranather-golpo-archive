import { FilterPanel } from '../FilterPanel/FilterPanel';
import './FilterSidebar.scss';

export function FilterSidebar({ filters, setFilters, filterOptions, onFeedbackClick }) {
  return (
    <aside className="filter-sidebar" aria-label="Story filters">
      <p className="filter-sidebar__title">Filters</p>
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
        onFeedbackClick={onFeedbackClick}
        idPrefix="sidebar-"
      />
    </aside>
  );
}
