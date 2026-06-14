import './FilterPill.scss';

export function FilterPill({ label, value, isActive, onToggle, title }) {
  const hasExtendedLabel = title && title !== label;

  return (
    <button
      type="button"
      className={`filter-pill${isActive ? ' filter-pill--active' : ''}`}
      data-filter={value}
      onClick={() => onToggle(value)}
      title={hasExtendedLabel ? title : label}
      aria-label={hasExtendedLabel ? `${label}: ${title}` : label}
    >
      {label}
    </button>
  );
}
