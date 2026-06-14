import './FeedbackTrigger.scss';

export function FeedbackTrigger({ onClick, variant = 'default' }) {
  return (
    <button
      type="button"
      className={`feedback-trigger feedback-trigger--${variant}`}
      onClick={onClick}
    >
      Suggest a story
    </button>
  );
}
