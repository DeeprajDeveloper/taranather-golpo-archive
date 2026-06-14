import { FilterPanel } from '../FilterPanel/FilterPanel';
import './FilterDrawer.scss';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function FilterDrawer({
  isVisible,
  isActive,
  onClose,
  filters,
  setFilters,
  filterOptions,
  onFeedbackClick,
}) {
  if (!isVisible) return null;

  return (
    <div
      className={`filter-drawer${isActive ? ' filter-drawer--open' : ''}`}
      role="presentation"
    >
      <button
        type="button"
        className="filter-drawer__backdrop"
        aria-label="Close filters"
        onClick={onClose}
      />
      <div
        className="filter-drawer__sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
      >
        <header className="filter-drawer__header">
          <h2 id="filter-drawer-title" className="filter-drawer__title">
            Filters
          </h2>
          <button
            type="button"
            className="filter-drawer__close"
            aria-label="Close filters"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </header>

        <div className="filter-drawer__body">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
            onFeedbackClick={onFeedbackClick}
            idPrefix="drawer-"
          />
        </div>
      </div>
    </div>
  );
}
