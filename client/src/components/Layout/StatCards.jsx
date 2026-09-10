/**
 * StatCards.jsx
 * Aligned with 'Learning React' (Banks & Porcello)
 * Reusable stat metric component displaying 4-card operational indicators
 */

import React from 'react';
import {
  Boxes,
  Database,
  AlertTriangle,
  Clock,
  Warehouse,
  CheckCircle2,
  Truck,
  Wrench
} from 'lucide-react';

export default function StatCards({ activeTab, stats }) {
  const getCardConfigs = () => {
    if (activeTab === 'warehouses') {
      return [
        {
          id: 'wh-total',
          label: 'Total Warehouses',
          value: stats?.warehouses?.total || 128,
          icon: Warehouse,
          colorClass: 'teal',
        },
        {
          id: 'wh-operational',
          label: 'Operational',
          value: stats?.warehouses?.operational || 112,
          icon: CheckCircle2,
          colorClass: 'green',
        },
        {
          id: 'wh-near',
          label: 'Near Capacity',
          value: stats?.warehouses?.nearCapacity || 13,
          icon: AlertTriangle,
          colorClass: 'amber',
        },
        {
          id: 'wh-maintenance',
          label: 'Under Maintenance',
          value: stats?.warehouses?.maintenance || 3,
          icon: Wrench,
          colorClass: 'rose',
        },
      ];
    }

    if (activeTab === 'receiving') {
      return [
        {
          id: 'rec-inspected',
          label: 'Inspected This Month',
          value: stats?.receiving?.inspectedThisMonth || 642,
          icon: CheckCircle2,
          colorClass: 'green',
        },
        {
          id: 'rec-pending',
          label: 'Received, Pending Inspection',
          value: stats?.receiving?.pendingInspection || 38,
          icon: Truck,
          colorClass: 'teal',
        },
        {
          id: 'rec-awaiting',
          label: 'Awaiting Arrival',
          value: stats?.receiving?.awaitingArrival || 12,
          icon: Clock,
          colorClass: 'amber',
        },
        {
          id: 'rec-rejected',
          label: 'Rejected / Damaged',
          value: stats?.receiving?.rejectedDamaged || 4,
          icon: AlertTriangle,
          colorClass: 'rose',
        },
      ];
    }

    // Default: Food Inventory
    return [
      {
        id: 'inv-items',
        label: 'Total Line Items',
        value: stats?.inventory?.totalLineItems || '1,482',
        icon: Boxes,
        colorClass: 'teal',
      },
      {
        id: 'inv-volume',
        label: 'Total Volume',
        value: stats?.inventory?.totalVolume || '59,670 t',
        icon: Database,
        colorClass: 'green',
      },
      {
        id: 'inv-low',
        label: 'Low Stock Items',
        value: stats?.inventory?.lowStock || 36,
        icon: AlertTriangle,
        colorClass: 'amber',
      },
      {
        id: 'inv-expiring',
        label: 'Expiring Within 30 Days',
        value: stats?.inventory?.expiringSoon || 9,
        icon: Clock,
        colorClass: 'rose',
      },
    ];
  };

  const cards = getCardConfigs();

  return (
    <section className="stat-cards-grid" aria-label="Operational Key Metrics">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article key={card.id} className="stat-card">
            <div className={`stat-icon-wrapper ${card.colorClass}`} aria-hidden="true">
              <Icon size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{card.value}</span>
              <span className="stat-label">{card.label}</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
