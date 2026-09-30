import {
  Boxes,
  Warehouse,
  Truck,
  Send,
  AlertTriangle,
  FileBarChart,
  LogOut
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, onLogout }) {
  const operationsNav = [
    { id: 'inventory', label: 'Food Inventory', icon: Boxes },
    { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
    { id: 'receiving', label: 'Receiving / Collection', icon: Truck },
    { id: 'distribution', label: 'Distribution', icon: Send },
    { id: 'emergency', label: 'Emergency Requests', icon: AlertTriangle },
    { id: 'reports', label: 'Reports & Analytics', icon: FileBarChart },
  ];

  return (
    <aside className="app-sidebar" aria-label="Gotera Main Navigation">
      <div>
        {/* Brand Emblem & Logo */}
        <div className="sidebar-brand" style={{ cursor: 'default' }} title="Gotera System">
          <div className="brand-emblem" aria-hidden="true">
            {/* Organic drop leaf symbol */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </div>
          <span className="brand-title">GOTERA</span>
        </div>

        {/* Operations Navigation Group */}
        <nav className="nav-section" aria-label="Operations Navigation">
          <h2 className="nav-section-title">OPERATIONS</h2>
          <ul className="nav-list">
            {operationsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`nav-item-btn ${isActive ? 'active' : ''}`}
                    onClick={() => onSelectTab(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="nav-icon" aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Sign Out Action at Bottom */}
      <div style={{ padding: '0.85rem' }}>
        <button
          type="button"
          className="nav-item-btn"
          onClick={onLogout}
          style={{ width: '100%', color: '#fca5a5' }}
          title="Sign out of your account"
        >
          <LogOut className="nav-icon" size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

