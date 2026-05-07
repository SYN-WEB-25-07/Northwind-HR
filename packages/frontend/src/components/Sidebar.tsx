import { memo } from 'react';
import type { MouseEvent } from 'react';

interface NavItem {
  icon: string;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: 'dashboard', label: 'Dashboard' },
  { icon: 'groups', label: 'Employee Directory', active: true },
  { icon: 'domain', label: 'Departments' },
  { icon: 'payments', label: 'Payroll' },
  { icon: 'description', label: 'Documents' }
];

const secondaryItems: NavItem[] = [
  { icon: 'contact_support', label: 'Support' },
  { icon: 'logout', label: 'Sign Out' }
];

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isMobileOpen, onClose }: SidebarProps): JSX.Element => {
  const sidebarClassName = `dashboard-sidebar ${isMobileOpen ? 'is-mobile-open' : ''}`;

  const handleNavigationClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    onClose();
  };

  return (
    <>
      <button
        type="button"
        className={`sidebar-backdrop ${isMobileOpen ? 'is-visible' : ''}`}
        onClick={onClose}
        aria-label="Mobile Menü schließen"
      />

      <aside className={sidebarClassName}>
        <div className="brand-block">
          <div className="brand-icon-shell">
            <span className="material-symbols-outlined">corporate_fare</span>
          </div>
          <div>
            <h1 className="brand-title">HR Central</h1>
            <p className="brand-subtitle">Administrative Suite</p>
          </div>

          <button
            type="button"
            className="sidebar-close-button"
            onClick={onClose}
            aria-label="Menü schließen"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`sidebar-link ${item.active ? 'is-active' : ''}`}
              onClick={handleNavigationClick}
            >
              <span
                className="material-symbols-outlined"
                style={item.active ? { fontVariationSettings: '"FILL" 1' } : undefined}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-secondary">
          {secondaryItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`sidebar-link ${item.label === 'Sign Out' ? 'is-signout' : ''}`}
              onClick={handleNavigationClick}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
};

export default memo(Sidebar);
