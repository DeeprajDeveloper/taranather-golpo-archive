import { getFooterLinks } from '../../handlers/footerHandler';
import './Footer.scss';

function FooterIcon({ name }) {
  if (name === 'github') {
    return (
      <svg className="site-footer__icon" viewBox="0 0 19 19" aria-hidden="true">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  if (name === 'design') {
    return (
      <svg className="site-footer__icon" viewBox="0 0 20 20" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="6"
          height="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="11"
          y="3"
          width="6"
          height="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="3"
          y="11"
          width="6"
          height="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="11"
          y="11"
          width="6"
          height="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (name === 'feedback') {
    return (
      <svg className="site-footer__icon" viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M4 4h12v9H7l-3 3V4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <line
          x1="7"
          y1="8"
          x2="13"
          y2="8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="7"
          y1="11"
          x2="11"
          y2="11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg className="site-footer__icon" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M7 4h8v12H7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M11 8h4M11 12h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Footer({ onFeedbackClick }) {
  const links = getFooterLinks();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__copy">
          <span className="site-footer__text site-footer__text--full">
            Created by Deepraj Adhikary · Fan Archive · Not affiliated with any publisher
          </span>
          <span className="site-footer__text site-footer__text--short">
            Fan Archive · Not affiliated
          </span>
        </div>

        <div className="site-footer__actions">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target='_blank'
              className={`site-footer__action${
                link.icon === 'github' ? ' site-footer__action--icon-only' : ''
              }`}
              aria-label={link.label}
              title={link.label}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <FooterIcon name={link.icon} />
              <span className="site-footer__action-label">{link.label}</span>
            </a>
          ))}

          <button
            type="button"
            className="site-footer__action site-footer__action--icon-only"
            onClick={onFeedbackClick}
            aria-label="Suggest a story"
            title="Suggest a story"
          >
            <FooterIcon name="feedback" />
            <span className="site-footer__action-label">Suggest</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
