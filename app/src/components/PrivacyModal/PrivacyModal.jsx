import { getPrivacyContent } from '../../handlers/privacyHandler';
import './PrivacyModal.scss';

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
      className="privacy-modal__source-icon"
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

export function PrivacyModal({ isVisible, isActive, onClose }) {
  if (!isVisible) return null;

  const { title, lastUpdated, siteName, siteUrl, intro, sections, contact } =
    getPrivacyContent();

  return (
    <div
      className={`privacy-modal${isActive ? ' privacy-modal--open' : ''}`}
      role="presentation"
    >
      <button
        type="button"
        className="privacy-modal__backdrop"
        aria-label="Close privacy policy"
        onClick={onClose}
      />
      <div
        className="privacy-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        <header className="privacy-modal__header">
          <div>
            <p className="privacy-modal__eyebrow">Last updated · {lastUpdated}</p>
            <h2 id="privacy-modal-title" className="privacy-modal__title">
              {title}
            </h2>
          </div>
          <button
            type="button"
            className="privacy-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </header>

        <div className="privacy-modal__body">
          <section className="privacy-modal__section">
            <p className="privacy-modal__lead">
              Thank you for visiting the{' '}
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="privacy-modal__inline-link"
              >
                {siteName}
              </a>
              . {intro}
            </p>
          </section>

          {sections.map((section) => (
            <section key={section.heading} className="privacy-modal__section">
              <h3 className="privacy-modal__heading">{section.heading}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="privacy-modal__text">
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul className="privacy-modal__list">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="privacy-modal__section">
            <div className="privacy-modal__sources">
              <a
                className="privacy-modal__source-pill privacy-modal__source-pill--link"
                href={`mailto:${contact.email}`}
              >
                <span>{contact.email}</span>
              </a>
              <a
                className="privacy-modal__source-pill privacy-modal__source-pill--link"
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>GitHub</span>
                <ExternalIcon />
              </a>
            </div>
          </section>
        </div>

        <footer className="privacy-modal__footer">
          <button type="button" className="privacy-modal__close-btn" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
