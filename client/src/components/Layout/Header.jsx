/**
 * Header.jsx
 * Aligned with 'Learning React' (Banks & Porcello) and 'HTML5 Design Patterns'
 * Header landmark with accessible search input and action controls
 */

import { Search } from 'lucide-react';

export default function Header({
  activeTab,
  currentUser,
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
      case 'approvals':
        return {
          title: 'Account Governance & Approvals',
          subtitle: 'Review incoming registrations and assign roles: Warehouse Manager or Relief Coordinator',
        };
      case 'system':
        return {
          title: 'Platform Infrastructure & Cloud Cluster',
          subtitle: 'MongoDB Atlas connectivity, security policies, and system audit logs',
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

