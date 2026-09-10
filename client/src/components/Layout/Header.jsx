/**
 * Header.jsx
 * Aligned with 'Learning React' (Banks & Porcello) and 'HTML5 Design Patterns'
 * Header landmark with accessible search input and action controls
 */

import React from 'react';
import { Search, Bell, ChevronDown, LogIn } from 'lucide-react';

export default function Header({ activeTab, currentUser, onOpenAuth, searchQuery, onSearchChange }) {
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

        {/* Notification Bell */}
        <button
          type="button"
          className="header-icon-btn"
          aria-label="Notifications (1 unread message)"
          title="Notifications"
        >
          <Bell size={16} aria-hidden="true" />
          <span className="notification-dot" aria-hidden="true"></span>
        </button>

        {/* Demo Switcher for Login/Register Screens */}
        <button
          type="button"
          className="btn btn-outline"
          onClick={onOpenAuth}
          style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
          title="Switch to Sign In / Create Account Views"
        >
          <LogIn size={14} />
          <span>Sign In View</span>
        </button>

        {/* Profile Chip */}
        <div
          className="header-profile-badge"
          onClick={onOpenAuth}
          role="button"
          tabIndex={0}
          aria-label="User profile options"
        >
          <div className="header-profile-avatar" aria-hidden="true">
            {currentUser?.avatar || 'MK'}
          </div>
          <span className="header-profile-name">{currentUser?.fullName || 'Meron Kassa'}</span>
          <ChevronDown size={14} style={{ color: 'var(--color-text-muted)' }} />
        </div>
      </div>
    </header>
  );
}
