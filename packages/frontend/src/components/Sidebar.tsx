import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  icon: string;
  label: string;
  to: string;
}

const navItems: NavItem[] = [
  { icon: 'dashboard', label: 'Dashboard', to: '/' },
  { icon: 'groups', label: 'Employee Directory', to: '/employees' },
  { icon: 'domain', label: 'Departments', to: '/departments' },
  { icon: 'payments', label: 'Payroll', to: '/payroll' },
  { icon: 'description', label: 'Documents', to: '/documents' }
];

const secondaryItems: NavItem[] = [
  { icon: 'contact_support', label: 'Support', to: '/support' },
  { icon: 'logout', label: 'Sign Out', to: '/logout' }
];

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isMobileOpen, onClose }: SidebarProps): JSX.Element => {
  const location = useLocation();
  const sidebarClassName = `dashboard-sidebar ${isMobileOpen ? 'is-mobile-open' : ''}`;

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
            <Link
              key={item.label}
              to={item.to}
              className={`sidebar-link ${
                location.pathname === item.to ? 'is-active' : ''
              }`}
              onClick={onClose}
            >
              <span
                className="material-symbols-outlined"
                style={
                  location.pathname === item.to
                    ? { fontVariationSettings: '"FILL" 1' }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-secondary">
          {secondaryItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`sidebar-link ${item.label === 'Sign Out' ? 'is-signout' : ''}`}
              onClick={onClose}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default memo(Sidebar);
