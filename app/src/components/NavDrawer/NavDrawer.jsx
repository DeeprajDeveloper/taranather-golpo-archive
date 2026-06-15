import { ROUTES } from '../../handlers/routeHandler';
import './NavDrawer.scss';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function NavDrawer({
  isVisible,
  isActive,
  onClose,
  currentPath,
  onNavigate,
  onAboutClick,
}) {
  if (!isVisible) return null;

  const handleNavClick = (event, path) => {
    event.preventDefault();
    onNavigate?.(path);
    onClose();
  };

  const handleAboutClick = () => {
    onAboutClick?.();
    onClose();
  };

  return (
    <div
      className={`nav-drawer${isActive ? ' nav-drawer--open' : ''}`}
      role="presentation"
    >
      <button
        type="button"
        className="nav-drawer__backdrop"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        className="nav-drawer__sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nav-drawer-title"
      >
        <header className="nav-drawer__header">
          <h2 id="nav-drawer-title" className="nav-drawer__title">
            Menu
          </h2>
          <button
            type="button"
            className="nav-drawer__close"
            aria-label="Close menu"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </header>

        <nav className="nav-drawer__body" aria-label="Site sections">
          <a
            href="/"
            className={`nav-drawer__link${currentPath === ROUTES.HOME ? ' is-active' : ''}`}
            onClick={(event) => handleNavClick(event, ROUTES.HOME)}
          >
            Stories
          </a>
          <a
            href="/characters"
            className={`nav-drawer__link${currentPath === ROUTES.CHARACTERS ? ' is-active' : ''}`}
            onClick={(event) => handleNavClick(event, ROUTES.CHARACTERS)}
          >
            Characters
          </a>
          <button
            type="button"
            className="nav-drawer__link nav-drawer__link--action"
            onClick={handleAboutClick}
          >
            About
          </button>
        </nav>
      </div>
    </div>
  );
}
