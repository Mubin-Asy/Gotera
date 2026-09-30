import {
  Boxes,
  Warehouse,
  Truck,
  Send,
  AlertTriangle,
  FileBarChart,
  LogOut,
  UserCheck,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, onLogout, currentUser }) {
  const role = currentUser?.role || 'Warehouse Manager';

  const getNavItems = () => {
    if (role === 'Administrator') {
      return {
        sectionTitle: 'GOVERNANCE & ACCESS',
        items: [
          { id: 'approvals', label: 'User Governance & Approvals', icon: UserCheck },
          { id: 'system', label: 'Platform & Security', icon: ShieldCheck }
        ]
      };
    }

    if (role === 'Relief Coordinator') {
      return {
        sectionTitle: 'RELIEF COORDINATION',
        items: [
          { id: 'emergency', label: 'Emergency Requests', icon: AlertTriangle },
          { id: 'distribution', label: 'Distribution & Dispatches', icon: Send },
          { id: 'warehouses', label: 'Warehouse Oversight', icon: Warehouse },
          { id: 'reports', label: 'Reports & Analytics', icon: FileBarChart }
        ]
      };
    }

    // Default to Warehouse Manager
    return {
      sectionTitle: 'WAREHOUSE OPERATIONS',
      items: [
        { id: 'inventory', label: 'Food Inventory', icon: Boxes },
        { id: 'warehouses', label: 'Warehouses & Silos', icon: Warehouse },
        { id: 'receiving', label: 'Receiving / Collection', icon: Truck }
      ]
    };
  };

  const { sectionTitle, items } = getNavItems();

  const getRoleBadgeStyle = () => {
    if (role === 'Administrator') {
      return { bg: '#581c87', color: '#e9d5ff', label: 'Administrator' };
    }
    if (role === 'Relief Coordinator') {
      return { bg: '#0369a1', color: '#e0f2fe', label: 'Relief Coordinator' };
    }
    return { bg: '#065f46', color: '#a7f3d0', label: 'Warehouse Manager' };
  };

  const badge = getRoleBadgeStyle();

  return (
    <aside className="app-sidebar" aria-label="Gotera Main Navigation">
      <div>
        {/* Brand Emblem & Logo */}
        <div className="sidebar-brand" style={{ cursor: 'default' }} title="Gotera System">
          <div className="brand-emblem" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </div>
          <span className="brand-title">GOTERA</span>
        </div>

        {/* Role Persona Tag */}
        <div style={{ padding: '0 0.85rem 1rem 0.85rem' }}>
          <div style={{
            background: badge.bg,
            color: badge.color,
            padding: '0.35rem 0.6rem',
            borderRadius: '6px',
            fontSize: '0.68rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            {badge.label}
          </div>
        </div>

        {/* Dynamic Navigation Group according to active Role */}
        <nav className="nav-section" aria-label={`${sectionTitle} Navigation`}>
          <h2 className="nav-section-title">{sectionTitle}</h2>
          <ul className="nav-list">
            {items.map((item) => {
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
