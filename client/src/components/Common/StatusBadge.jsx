/**
 * StatusBadge.jsx
 * Aligned with 'Learning React' (Banks & Porcello) - Pure Presentational Component
 * and 'HTML5 Design Patterns'
 */

import React from 'react';

export default function StatusBadge({ status }) {
  const getBadgeClass = (s) => {
    if (!s) return 'in-stock';
    const lower = s.toLowerCase();
    if (lower.includes('in stock') || lower.includes('operational') || lower.includes('inspected')) {
      return 'in-stock';
    }
    if (lower.includes('low stock') || lower.includes('near capacity') || lower.includes('pending') || lower.includes('expiring')) {
      return 'low-stock';
    }
    if (lower.includes('critical') || lower.includes('rejected') || lower.includes('maintenance')) {
      return 'critical';
    }
    if (lower.includes('received')) {
      return 'received';
    }
    return 'in-stock';
  };

  return (
    <span className={`status-badge ${getBadgeClass(status)}`} role="status">
      <span className="badge-dot" aria-hidden="true"></span>
      {status}
    </span>
  );
}
