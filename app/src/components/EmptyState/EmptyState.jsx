import './EmptyState.scss';

const FILTER_EMPTY = {
  bengali: 'কোনো গল্প পাওয়া যায়নি।',
  english: 'No stories match your filters.',
  hint: 'Try clearing some filters.',
};

export function EmptyState({ message, onReset }) {
  const { bengali, english, hint } = message ?? FILTER_EMPTY;

  return (
    <div className="empty-state">
      <span className="empty-state__ornament">— ✦ —</span>
      <p className="empty-state__bengali">{bengali}</p>
      <p className="empty-state__english">{english}</p>
      <p className="empty-state__hint">{hint}</p>
      <button type="button" className="empty-state__reset" onClick={onReset}>
        Clear search &amp; filters
      </button>
    </div>
  );
}
