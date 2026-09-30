/**
 * ReceivingTable.jsx
 * Aligned with 'HTML5 Design Patterns' and 'Learning React' (Banks & Porcello)
 * Left column table displaying incoming shipments
 */

import { Eye, Pencil, Trash2 } from 'lucide-react';
import StatusBadge from '../Common/StatusBadge';

export default function ReceivingTable({
  records,
  onViewRecord,
  onEditRecord,
  onDeleteRecord,
}) {
  return (
    <div className="data-card" style={{ flex: 1 }}>
      <div className="table-toolbar">
        <h2 className="table-title">Recent Collection Records</h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
          Last 30 days
        </span>
      </div>

      <div className="data-table-container">
        <table className="gotera-table">
          <thead>
            <tr>
              <th scope="col">RECORD ID</th>
              <th scope="col">ITEM</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">SOURCE</th>
              <th scope="col">WAREHOUSE</th>
              <th scope="col">STATUS</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-secondary)' }}>
                  No incoming collection records logged yet.
                </td>
              </tr>
            ) : (
              records.map((rec) => (
                <tr key={rec._id || rec.recordId}>
                  <td style={{ fontWeight: '600', fontSize: '0.7875rem' }}>{rec.recordId}</td>
                  <td style={{ fontWeight: '500' }}>{rec.item}</td>
                  <td style={{ fontWeight: '600' }}>{`${Number(rec.quantity).toLocaleString()} ${rec.unit || 't'}`}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{rec.source}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{rec.destinationWarehouse}</td>
                  <td>
                    <StatusBadge status={rec.status} />
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button
                        type="button"
                        className="btn-icon view-btn"
                        onClick={() => onViewRecord(rec)}
                        aria-label={`View record ${rec.recordId}`}
                        title="View Record Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon edit-btn"
                        onClick={() => onEditRecord(rec)}
                        aria-label={`Edit record ${rec.recordId}`}
                        title="Edit Record Status"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon delete-btn"
                        onClick={() => onDeleteRecord(rec)}
                        aria-label={`Delete record ${rec.recordId}`}
                        title="Delete Record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
