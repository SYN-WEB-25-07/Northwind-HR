import { memo } from 'react';
import { adminProfile } from '../data/fallbackEmployees';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isMobileMenuOpen: boolean;
  onMenuToggle: () => void;
}

const TopBar = ({
  searchQuery,
  onSearchChange,
  isMobileMenuOpen,
  onMenuToggle
}: TopBarProps): JSX.Element => {
  return (
    <header className="dashboard-header">
      <button
        type="button"
        className="mobile-menu-trigger"
        onClick={onMenuToggle}
        aria-label="Menü öffnen"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
      </button>

      <div className="search-wrap">
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          type="text"
          className="search-input"
          placeholder="Mitarbeiter suchen..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Mitarbeiter suchen"
        />
      </div>

      <div className="header-actions">
        <div className="icon-actions">
          <button type="button" className="icon-button" aria-label="Benachrichtigungen">
            <span className="material-symbols-outlined">notifications</span>
            <span className="notification-dot" />
          </button>
          <button type="button" className="icon-button" aria-label="Hilfe">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button type="button" className="icon-button" aria-label="Einstellungen">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>

        <button type="button" className="admin-chip" aria-label="Admin-Benutzer">
          <div className="admin-meta">
            <span className="admin-name">{adminProfile.name}</span>
            <span className="admin-role">{adminProfile.role}</span>
          </div>
          <img src={adminProfile.avatar} alt={adminProfile.name} className="admin-avatar" loading="lazy" />
        </button>
      </div>
    </header>
  );
};

export default memo(TopBar);
