/**
 * Sidebar.jsx
 * Aligned with 'Learning React' (Banks & Porcello) and 'HTML5 Design Patterns'
 * Semantic navigation landmark with accessible list elements
 */

import React from 'react';
import {
  LayoutDashboard,
  Boxes,
  Warehouse,
  Truck,
  Send,
  AlertTriangle,
  FileBarChart,
  Users,
  User,
  Settings,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, currentUser, onOpenAuth }) {
  const operationsNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Food Inventory', icon: Boxes },
    { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
    { id: 'receiving', label: 'Receiving / Food Collection', icon: Truck },
    { id: 'distribution', label: 'Distribution', icon: Send },
    { id: 'emergency', label: 'Emergency Requests', icon: AlertTriangle },
    { id: 'reports', label: 'Reports & Analytics', icon: FileBarChart },
    { id: 'users', label: 'Users & Roles', icon: Users },
  ];

  const accountNav = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="app-sidebar" aria-label="Gotera Main Navigation">
      <div>
        {/* Brand Emblem & Logo */}
        <div className="sidebar-brand">
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

        {/* Account Navigation Group */}
        <nav className="nav-section" aria-label="Account Navigation">
          <h2 className="nav-section-title">ACCOUNT</h2>
          <ul className="nav-list">
            {accountNav.map((item) => {
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

      {/* User Profile Widget */}
      <div>
        <div 
          className="sidebar-user" 
          onClick={onOpenAuth} 
          title="Click to view Authentication Screens"
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <div className="user-avatar-badge" aria-hidden="true">
            {currentUser?.avatar || 'MK'}
          </div>
          <div className="user-info">
            <span className="user-name">{currentUser?.fullName || 'Meron Kassa'}</span>
            <span className="user-role">{currentUser?.role || 'Warehouse Manager'}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
