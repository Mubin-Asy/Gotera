/**
 * WarehouseGrid.jsx
 * Aligned with 'HTML5 Design Patterns' and 'CSS in Depth' (Flexbox & Grid Layouts)
 * Faithful visual match for Gotera Warehouses management view
 */

import React from 'react';
import { MapPin, Plus, Map, Eye, Pencil, Trash2, ShieldCheck } from 'lucide-react';
import StatusBadge from '../Common/StatusBadge';

export default function WarehouseGrid({
  warehouses,
  onAddWarehouse,
  onEditWarehouse,
  onDeleteWarehouse,
  onViewWarehouse,
}) {
  const getCapacityColorClass = (percent) => {
    if (percent >= 90) return 'amber';
    if (percent >= 95) return 'red';
    return 'green';
  };

  return (
    <section aria-label="Regional Warehouses Registry">
      {/* Action and Title Bar */}
      <div className="page-title-row" style={{ marginBottom: '1.25rem' }}>
        <div>
          <h2 className="page-headline" style={{ fontSize: '1.25rem' }}>Warehouses</h2>
          <p className="page-subheadline">128 facilities across 11 regions</p>
        </div>

        <div className="page-actions-group">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => alert('Map View is available in the extended GIS module.')}
            title="Interactive Regional GIS Map"
          >
            <Map size={16} />
            <span>Map View</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddWarehouse}
          >
            <Plus size={16} />
            <span>Add Warehouse</span>
          </button>
        </div>
      </div>

      {/* Warehouse Cards Grid */}
      <div className="warehouse-grid">
        {warehouses.map((wh) => {
          const percent = wh.capacityUsedPercent !== undefined
            ? wh.capacityUsedPercent
            : Math.min(100, Math.round((wh.currentStock / wh.totalCapacity) * 100));

          const colorClass = getCapacityColorClass(percent);

          return (
            <article key={wh._id} className="warehouse-card">
              {/* Top Row: Name and Status Badge */}
              <div className="warehouse-card-header">
                <div>
                  <h3 className="warehouse-name">{wh.name}</h3>
                  <div className="warehouse-region">
                    <MapPin size={13} style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
                    <span>{wh.region}</span>
                  </div>
                </div>
                <StatusBadge status={wh.status} />
              </div>

              {/* Middle: Capacity Progress Bar */}
              <div className="capacity-meter">
                <div className="capacity-labels">
                  <span className="capacity-label-text">Capacity used</span>
                  <span className="capacity-value-text">{percent}%</span>
                </div>
                <div className="capacity-track" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
                  <div
                    className={`capacity-fill ${colorClass}`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>

              {/* Bottom: Stock and Manager + Actions */}
              <div className="warehouse-card-footer">
                <div className="stock-info">
                  <span className="stock-label">Current stock:</span>
                  <span className="stock-val">
                    {Number(wh.currentStock).toLocaleString()} {wh.unit || 't'}
                  </span>
                </div>

                <div className="manager-info">
                  <span className="manager-label">Manager:</span>
                  <span className="manager-name">{wh.manager}</span>
                </div>
              </div>

              {/* Card Action Controls */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.35rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--color-border-subtle)' }}>
                <button
                  type="button"
                  className="btn-icon view-btn"
                  onClick={() => onViewWarehouse(wh)}
                  aria-label={`View details of ${wh.name}`}
                  title="View Facility Details"
                >
                  <Eye size={14} />
                </button>
                <button
                  type="button"
                  className="btn-icon edit-btn"
                  onClick={() => onEditWarehouse(wh)}
                  aria-label={`Edit ${wh.name}`}
                  title="Edit Facility"
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  className="btn-icon delete-btn"
                  onClick={() => onDeleteWarehouse(wh)}
                  aria-label={`Delete ${wh.name}`}
                  title="Delete Facility"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
