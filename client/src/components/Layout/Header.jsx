/**
 * Header.jsx
 * Aligned with 'Learning React' (Banks & Porcello) and 'HTML5 Design Patterns'
 * Header landmark with accessible search input and action controls
 */

import React from 'react';
import { Search, Bell, ChevronDown, LogOut, Home } from 'lucide-react';

export default function Header({
  activeTab,
  currentUser,
  onNavigateHome,
  onLogout,
  searchQuery,
  onSearchChange
}) {
  const getTitles = () => {
    switch (activeTab) {
      case 'inventory':
        return {
          title: 'Food Inventory',
          subtitle: 'Track and manage all reserve food items across warehouses',
        };
      case 'warehouses':
        return {
          title: 'Warehouses',
          subtitle: 'Manage storage facilities and regional capacity',
        };
      case 'receiving':
        return {
          title: 'Receiving / Food Collection',
          subtitle: 'Log and verify incoming food supplies',
        };
      case 'distribution':
        return {
          title: 'Distribution & Dispatches',
          subtitle: 'Allocate and dispatch food relief to drought/emergency zones',
        };
      case 'emergency':
        return {
          title: 'Emergency Requests',
          subtitle: 'Prioritize and process regional emergency food requisitions',
        };
      case 'reports':
        return {
          title: 'Reports & Analytics',
          subtitle: 'National food balance sheets, supply forecasting & trends',
        };
      case 'users':
        return {
          title: 'Users & Roles',
          subtitle: 'Manage personnel credentials, access tiers, and facility oversight',
        };
      default:
        return {
          title: 'National Reserve Dashboard',
          subtitle: 'Overview of national food reserves, alerts, and logistical pipeline',
        };
    }
  };

  const { title, subtitle } = getTitles();

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>

      <div className="header-right">
        {/* Global Search Input */}
        <div className="header-search">
          <Search className="header-search-icon" aria-hidden="true" />
          <input
            type="search"
            className="header-search-input"
            placeholder="Search inventory, warehouses..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search reserve inventory and warehouses"
          />
        </div>

        {/* Home / Public Portal Button */}
        <button
          type="button"
          className="btn btn-outline"
          onClick={onNavigateHome}
          style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          title="Return to Public Landing Page"
        >
          <Home size={14} />
          <span>Home Portal</span>
        </button>

        {/* Sign Out Button */}
        <button
          type="button"
          className="btn btn-outline"
          onClick={onLogout}
          style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#c53030', borderColor: '#feb2b2' }}
          title="Sign Out of GOTERA System"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>

        {/* Profile Chip */}
        <div
          className="header-profile-badge"
          title={`${currentUser?.fullName} (${currentUser?.role})`}
        >
          <div className="header-profile-avatar" aria-hidden="true">
            {currentUser?.avatar || 'MK'}
          </div>
          <span className="header-profile-name">{currentUser?.fullName || 'User'}</span>
        </div>
      </div>
    </header>
  );
}

