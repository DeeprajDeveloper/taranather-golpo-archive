import { useEffect } from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { NavDrawer } from '../NavDrawer/NavDrawer';
import { getFaviconPath } from '../../handlers/themeHandler';
import { ROUTES } from '../../handlers/routeHandler';
import { useNavDrawer } from '../../hooks/useNavDrawer';
import './Header.scss';

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Header({
  theme,
  onThemeToggle,
  themeAriaLabel,
  isScrolled,
  onReset,
  onAboutClick,
  currentPath = ROUTES.HOME,
  onNavigate,
}) {
  const navDrawer = useNavDrawer();

  useEffect(() => {
    if (navDrawer.isOpen) {
      navDrawer.close();
    }
    // Close menu when route changes (e.g. browser back)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  const handleHomeClick = (event) => {
    event.preventDefault();
    onNavigate?.(ROUTES.HOME);
    onReset?.(event);
  };

  const handleNavClick = (event, path) => {
    event.preventDefault();
    onNavigate?.(path);
  };

  return (
    <>
      <header
        className={`site-header${isScrolled ? ' site-header--collapsed' : ''}`}
      >
        <div className="site-header__inner">
          <a href="/" className="site-header__title" onClick={handleHomeClick}>
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
            <nav className="site-header__nav" aria-label="Site sections">
              <a
                href="/"
                className={`site-header__nav-link${currentPath === ROUTES.HOME ? ' is-active' : ''}`}
                onClick={(event) => handleNavClick(event, ROUTES.HOME)}
              >
                Stories
              </a>
              <a
                href="/characters"
                className={`site-header__nav-link${currentPath === ROUTES.CHARACTERS ? ' is-active' : ''}`}
                onClick={(event) => handleNavClick(event, ROUTES.CHARACTERS)}
              >
                Characters
              </a>
            </nav>
            <button
              type="button"
              className="site-header__about"
              onClick={onAboutClick}
            >
              About
            </button>
            <ThemeToggle theme={theme} onToggle={onThemeToggle} ariaLabel={themeAriaLabel} />
            <button
              type="button"
              className="site-header__menu"
              aria-label="Open menu"
              aria-expanded={navDrawer.isOpen}
              onClick={navDrawer.open}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <NavDrawer
        isVisible={navDrawer.isVisible}
        isActive={navDrawer.isActive}
        onClose={navDrawer.close}
        currentPath={currentPath}
        onNavigate={onNavigate}
        onAboutClick={onAboutClick}
      />
    </>
  );
}
