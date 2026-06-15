import './CardLayoutToggle.scss';

function GridIcon() {
  return (
    <svg className="card-layout-toggle__icon card-layout-toggle__icon--grid" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="7" height="7" rx="1" />
      <rect x="14" y="4" width="7" height="7" rx="1" />
      <rect x="3" y="13" width="7" height="7" rx="1" />
      <rect x="14" y="13" width="7" height="7" rx="1" />
    </svg>
  );
}

function RowsIcon() {
  return (
    <svg className="card-layout-toggle__icon card-layout-toggle__icon--rows" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="5" rx="1" />
      <rect x="3" y="12" width="18" height="5" rx="1" />
      <rect x="3" y="19" width="18" height="2" rx="1" />
    </svg>
  );
}

export function CardLayoutToggle({ isHorizontal, onToggle, ariaLabel }) {
  return (
    <button
      type="button"
      className={`card-layout-toggle${isHorizontal ? ' card-layout-toggle--horizontal' : ''}`}
      aria-label={ariaLabel}
      aria-pressed={isHorizontal}
      onClick={onToggle}
    >
      <GridIcon />
      <RowsIcon />
    </button>
  );
}
