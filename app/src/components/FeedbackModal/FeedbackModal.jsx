import { FEEDBACK_TYPES } from '../../handlers/feedbackHandler';
import './FeedbackModal.scss';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function FeedbackModal({
  isVisible,
  isActive,
  form,
  errors,
  status,
  statusMessage,
  isStoryRecommendation,
  onClose,
  onFieldChange,
  onSubmit,
}) {
  if (!isVisible) return null;

  return (
    <div
      className={`feedback-modal${isActive ? ' feedback-modal--open' : ''}`}
      role="presentation"
    >
      <button
        type="button"
        className="feedback-modal__backdrop"
        aria-label="Close feedback form"
        onClick={onClose}
      />
      <div
        className="feedback-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
      >
        <header className="feedback-modal__header">
          <div>
            <p className="feedback-modal__eyebrow">Help grow this archive</p>
            <h2 id="feedback-modal-title" className="feedback-modal__title">
              Feedback &amp; story recommendations
            </h2>
          </div>
          <button
            type="button"
            className="feedback-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </header>

        <p className="feedback-modal__intro">
          Know a story that belongs here? Missing a YouTube link? Tell us — this
          collection improves with reader contributions.
        </p>

        {status === 'success' ? (
          <div className="feedback-modal__success" role="status">
            <p>{statusMessage}</p>
            <button type="button" className="feedback-modal__submit" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={onSubmit} noValidate>
            <div className="feedback-modal__body">
              <fieldset className="feedback-form__type">
              <legend className="feedback-form__label">What would you like to send?</legend>
              <div className="feedback-form__type-options">
                {Object.values(FEEDBACK_TYPES).map((option) => (
                  <label key={option.value} className="feedback-form__radio">
                    <input
                      type="radio"
                      name="feedback-type"
                      value={option.value}
                      checked={form.type === option.value}
                      onChange={() => onFieldChange('type', option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {isStoryRecommendation ? (
              <div className="feedback-form__grid">
                <div className="feedback-form__field">
                  <label className="feedback-form__label" htmlFor="story-title-bn">
                    Bengali title
                  </label>
                  <input
                    id="story-title-bn"
                    className="feedback-form__input"
                    type="text"
                    value={form.storyTitleBn}
                    onChange={(e) => onFieldChange('storyTitleBn', e.target.value)}
                    placeholder="যেমন: পাতাল ভৈরব"
                  />
                  {errors.storyTitleBn ? (
                    <span className="feedback-form__error">{errors.storyTitleBn}</span>
                  ) : null}
                </div>

                <div className="feedback-form__field">
                  <label className="feedback-form__label" htmlFor="story-title-en">
                    English title
                  </label>
                  <input
                    id="story-title-en"
                    className="feedback-form__input"
                    type="text"
                    value={form.storyTitleEn}
                    onChange={(e) => onFieldChange('storyTitleEn', e.target.value)}
                    placeholder="Optional"
                  />
                </div>

                <div className="feedback-form__field">
                  <label className="feedback-form__label" htmlFor="story-author">
                    Author / narrator
                  </label>
                  <input
                    id="story-author"
                    className="feedback-form__input"
                    type="text"
                    value={form.authorName}
                    onChange={(e) => onFieldChange('authorName', e.target.value)}
                    placeholder="Writer or YouTube channel"
                  />
                </div>

                <div className="feedback-form__field">
                  <label className="feedback-form__label" htmlFor="story-youtube">
                    YouTube link
                  </label>
                  <input
                    id="story-youtube"
                    className="feedback-form__input"
                    type="url"
                    value={form.youtubeUrl}
                    onChange={(e) => onFieldChange('youtubeUrl', e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  {errors.youtubeUrl ? (
                    <span className="feedback-form__error">{errors.youtubeUrl}</span>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="feedback-form__grid">
              <div className="feedback-form__field">
                <label className="feedback-form__label" htmlFor="feedback-name">
                  Your name
                </label>
                <input
                  id="feedback-name"
                  className="feedback-form__input"
                  type="text"
                  value={form.name}
                  onChange={(e) => onFieldChange('name', e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="feedback-form__field">
                <label className="feedback-form__label" htmlFor="feedback-email">
                  Your email
                </label>
                <input
                  id="feedback-email"
                  className="feedback-form__input"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => onFieldChange('contactEmail', e.target.value)}
                  placeholder="Optional — if you want a reply"
                />
                {errors.contactEmail ? (
                  <span className="feedback-form__error">{errors.contactEmail}</span>
                ) : null}
              </div>
            </div>

            <div className="feedback-form__field">
              <label className="feedback-form__label" htmlFor="feedback-message">
                {isStoryRecommendation ? 'Additional details' : 'Your message'}
              </label>
              <textarea
                id="feedback-message"
                className="feedback-form__textarea"
                rows={4}
                value={form.message}
                onChange={(e) => onFieldChange('message', e.target.value)}
                placeholder={
                  isStoryRecommendation
                    ? 'Source, episode number, why it belongs in the collection…'
                    : 'Suggestions, corrections, or anything else…'
                }
                required
              />
              {errors.message ? (
                <span className="feedback-form__error">{errors.message}</span>
              ) : null}
            </div>
            </div>

            <div className="feedback-form__actions">
              <button type="button" className="feedback-form__cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="feedback-modal__submit">
                Send via email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
