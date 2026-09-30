import {
  Boxes,
  Warehouse,
  Truck,
  Send,
  AlertTriangle,
  FileBarChart,
  Users,
  Home,
  LogOut
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, currentUser, onNavigateHome, onLogout }) {
  const operationsNav = [
    { id: 'inventory', label: 'Food Inventory', icon: Boxes },
    { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
    { id: 'receiving', label: 'Receiving / Collection', icon: Truck },
    { id: 'distribution', label: 'Distribution', icon: Send },
    { id: 'emergency', label: 'Emergency Requests', icon: AlertTriangle },
    { id: 'reports', label: 'Reports & Analytics', icon: FileBarChart },
    { id: 'users', label: 'Users & Roles', icon: Users },
  ];

  return (
    <aside className="app-sidebar" aria-label="Gotera Main Navigation">
      <div>
        {/* Brand Emblem & Logo */}
        <div className="sidebar-brand" onClick={onNavigateHome} style={{ cursor: 'pointer' }} title="Gotera Home">
          <div className="brand-emblem" aria-hidden="true">
            {/* Organic drop leaf symbol */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </div>
          <span className="brand-title">GOTERA</span>
        </div>

        {/* Portal Quick Link */}
        <div style={{ padding: '0 0.85rem 0.75rem 0.85rem' }}>
          <button
            type="button"
            className="nav-item-btn"
            onClick={onNavigateHome}
            style={{ width: '100%', background: 'rgba(255,255,255,0.06)' }}
          >
            <Home className="nav-icon" size={16} />
            <span>Public Home Portal</span>
          </button>
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

      {/* User Profile Widget & Sign Out */}
      <div>
        <div 
          className="sidebar-user" 
          title={`Signed in as ${currentUser?.fullName} (${currentUser?.role})`}
        >
          <div className="user-avatar-badge" aria-hidden="true">
            {currentUser?.avatar || 'MK'}
          </div>
          <div className="user-info">
            <span className="user-name">{currentUser?.fullName || 'User'}</span>
            <span className="user-role">{currentUser?.role || 'Staff'}</span>
          </div>
        </div>

        <div style={{ padding: '0.5rem 0.85rem 0.85rem 0.85rem' }}>
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
      </div>
    </aside>
  );
}

