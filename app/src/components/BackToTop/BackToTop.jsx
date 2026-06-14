import { scrollToTop } from '../../handlers/headerScrollHandler';
import './BackToTop.scss';

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <line x1="12" y1="19" x2="12" y2="5" stroke="currentColor" strokeWidth="2" />
      <polyline
        points="5 12 12 5 19 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function BackToTop({ visible, onClick }) {
  const handleClick = () => {
    scrollToTop();
    onClick?.();
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      onClick={handleClick}
      aria-label="Back to top"
    >
      <ArrowUpIcon />
    </button>
  );
}
