import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { getFaviconPath } from '../../handlers/themeHandler';
import './Header.scss';

export function Header({
  theme,
  onThemeToggle,
  themeAriaLabel,
  isScrolled,
  onReset,
  onAboutClick,
}) {
  return (
    <header
      className={`site-header${isScrolled ? ' site-header--collapsed' : ''}`}
    >
      <div className="site-header__inner">
        <a href="/" className="site-header__title" onClick={onReset}>
          <img
            className="site-header__logo"
            src={getFaviconPath(theme)}
            alt=""
            aria-hidden="true"
          />
          <span className="site-header__text">
            <span className="site-header__eyebrow">Stories of Taranath Tantrik</span>
            <span className="site-header__title-main">তারানাথের গল্প</span>
          </span>
        </a>
        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__about"
            onClick={onAboutClick}
          >
            About
          </button>
          <ThemeToggle theme={theme} onToggle={onThemeToggle} ariaLabel={themeAriaLabel} />
        </div>
      </div>
    </header>
  );
}
