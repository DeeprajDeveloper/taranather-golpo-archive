import './LoadMoreButton.scss';

export function LoadMoreButton({ label, status, onClick }) {
  return (
    <div className="load-more">
      <p className="load-more__status" aria-live="polite">
        {status}
      </p>
      <button type="button" className="load-more__button" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
