import { useEffect, useState } from 'react';
import { getAboutContent } from '../../handlers/aboutHandler';
import './AboutModal.scss';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      className="about-modal__source-icon"
      viewBox="0 0 24 24"
      width="12"
      height="12"
      aria-hidden="true"
    >
      <path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="15 3 21 3 21 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="10"
        y1="14"
        x2="21"
        y2="3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SourcePill({ label, url }) {
  if (url) {
    return (
      <a
        className="about-modal__source-pill about-modal__source-pill--link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{label}</span>
        <ExternalIcon />
      </a>
    );
  }

  return (
    <span className="about-modal__source-pill">
      <span>{label}</span>
    </span>
  );
}

export function AboutModal({
  isVisible,
  isActive,
  onClose,
  openedCount = 0,
  onClearOpened,
}) {
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    if (!isVisible) setConfirmClear(false);
  }, [isVisible]);

  if (!isVisible) return null;

  const {
    eyebrow,
    title,
    introParagraphs,
    characterHeading,
    characterParagraphs,
    collectionHeading,
    statsLabels,
    sourcesHeading,
    stats,
    sources,
    originalAuthors,
    lineages,
  } = getAboutContent();

  const handleClearClick = () => {
    if (confirmClear) {
      onClearOpened?.();
      setConfirmClear(false);
      return;
    }

    setConfirmClear(true);
  };

  return (
    <div
      className={`about-modal${isActive ? ' about-modal--open' : ''}`}
      role="presentation"
    >
      <button
        type="button"
        className="about-modal__backdrop"
        aria-label="Close about dialog"
        onClick={onClose}
      />
      <div
        className="about-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
      >
        <header className="about-modal__header">
          <div>
            {eyebrow ? <p className="about-modal__eyebrow">{eyebrow}</p> : null}
            <h2 id="about-modal-title" className="about-modal__title">
              {title}
            </h2>
          </div>
          <button
            type="button"
            className="about-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </header>

        <div className="about-modal__body">
          {introParagraphs.length > 0 ? (
            <section className="about-modal__section">
              {introParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0 ? 'about-modal__lead' : 'about-modal__text'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ) : null}

          {characterHeading || characterParagraphs.length > 0 ? (
            <section className="about-modal__section">
              {characterHeading ? (
                <h3 className="about-modal__heading">{characterHeading}</h3>
              ) : null}
              {characterParagraphs.map((paragraph) => (
                <p key={paragraph} className="about-modal__text">
                  {paragraph}
                </p>
              ))}
              {originalAuthors.length > 0 ? (
                <ul className="about-modal__list">
                  {originalAuthors.map((author) => (
                    <li key={author.id}>{author.name}</li>
                  ))}
                </ul>
              ) : null}
              {lineages.length > 0 ? (
                <ul className="about-modal__list about-modal__list--notes">
                  {lineages.map(({ value, title: lineageTitle, label }) => (
                    <li key={value}>
                      <strong>{label.split('(')[0].trim()}</strong>
                      {lineageTitle ? ` — ${lineageTitle}` : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ) : null}

          {stats ? (
            <section className="about-modal__section">
              {collectionHeading ? (
                <h3 className="about-modal__heading">{collectionHeading}</h3>
              ) : null}
              <dl className="about-modal__stats">
                <div className="about-modal__stat">
                  <dt>{statsLabels.totalStories}</dt>
                  <dd>{stats.totalStories}</dd>
                </div>
                <div className="about-modal__stat">
                  <dt>{statsLabels.withYouTube}</dt>
                  <dd>{stats.withYouTube}</dd>
                </div>
                <div className="about-modal__stat">
                  <dt>{statsLabels.original}</dt>
                  <dd>{stats.original}</dd>
                </div>
                <div className="about-modal__stat">
                  <dt>{statsLabels.fanFiction}</dt>
                  <dd>{stats.fanFiction}</dd>
                </div>
              </dl>
            </section>
          ) : null}

          {sources.length > 0 ? (
            <section className="about-modal__section">
              {sourcesHeading ? (
                <h3 className="about-modal__heading">{sourcesHeading}</h3>
              ) : null}
              <div className="about-modal__sources">
                {sources.map((source) => (
                  <SourcePill
                    key={source.label}
                    label={source.label}
                    url={source.url}
                  />
                ))}
              </div>
            </section>
          ) : null}

          <section className="about-modal__section">
            <h3 className="about-modal__heading">Opened stories</h3>
            <p className="about-modal__text">
              Stories you open from this site are remembered on this device so you can
              spot ones you have already visited. This stays in your browser only — not
              on our servers.
            </p>
            <p className="about-modal__history-count">
              {openedCount === 0
                ? 'No stories marked as opened yet.'
                : `${openedCount} ${openedCount === 1 ? 'story' : 'stories'} marked as opened.`}
            </p>
            {openedCount > 0 ? (
              <div className="about-modal__history-actions">
                <button
                  type="button"
                  className={`about-modal__clear-btn${confirmClear ? ' about-modal__clear-btn--confirm' : ''}`}
                  onClick={handleClearClick}
                >
                  {confirmClear ? 'Confirm clear' : 'Clear opened history'}
                </button>
                {confirmClear ? (
                  <button
                    type="button"
                    className="about-modal__clear-cancel"
                    onClick={() => setConfirmClear(false)}
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            ) : null}
          </section>
        </div>

        <footer className="about-modal__footer">
          <button type="button" className="about-modal__close-btn" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
