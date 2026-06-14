import './SearchBar.scss';

function SearchIcon() {
  return (
    <svg className="search-bar__icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function SearchBar({ value, onChange, onClear, sticky = false }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClear();
    }
  };

  const wrapperClass = sticky ? 'search-bar-sticky' : 'search-bar-wrap';

  return (
    <div className={wrapperClass}>
      <div className="search-bar" role="search">
        <SearchIcon />
        <input
          className="search-bar__input"
          type="search"
          placeholder="Search stories..."
          aria-label="Search stories"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
        />
        {value ? (
          <button
            type="button"
            className="search-bar__clear search-bar__clear--visible"
            aria-label="Clear search"
            onClick={onClear}
          >
            <ClearIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
}
