/**
 * ReceivingModal.jsx
 * Aligned with 'Learning React' (Banks & Porcello) and 'HTML5 Design Patterns'
 * Modal for editing collection records
 */

import { useState } from 'react';
import { X, Truck, Check } from 'lucide-react';

export default function ReceivingModal({ isOpen, mode = 'edit', record = null, warehousesList, onClose, onSave }) {
  const getInitialFormData = () => {
    if (record) {
      return {
        recordId: record.recordId || '',
        item: record.item || '',
        quantity: record.quantity !== undefined ? String(record.quantity) : '',
        unit: record.unit || 't',
        source: record.source || '',
        destinationWarehouse: record.destinationWarehouse || (warehousesList?.[0]?.name || 'Adama Central Warehouse'),
        status: record.status || 'Pending Inspection',
        notes: record.notes || '',
      };
    }
    return {
      recordId: '',
      item: '',
      quantity: '',
      unit: 't',
      source: '',
      destinationWarehouse: warehousesList?.[0]?.name || 'Adama Central Warehouse',
      status: 'Pending Inspection',
      notes: '',
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  if (!isOpen) return null;

  const isViewMode = mode === 'view';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewMode) {
      onClose();
      return;
    }
    onSave({
      ...formData,
      quantity: Number(formData.quantity),
    });
  };

  const units = ['t', 'Tonnes', 'kg', 'Kilograms', 'L', 'Litres', 'Bags', 'Cartons'];
  const statuses = ['Inspected', 'Received', 'Pending Inspection', 'Rejected / Damaged', 'Awaiting Arrival'];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="rec-modal-title">
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ padding: '0.4rem', backgroundColor: '#e6f7fa', borderRadius: '6px', color: '#0891b2' }}>
              <Truck size={18} />
            </div>
            <h3 id="rec-modal-title" className="modal-title">
              {isViewMode ? `Collection Record ${formData.recordId}` : `Update Record ${formData.recordId}`}
            </h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="gotera-form">
              <div className="form-group">
                <label htmlFor="recRecordId" className="form-label">Record ID</label>
                <input
                  id="recRecordId"
                  type="text"
                  className="form-input"
                  value={formData.recordId}
                  disabled
                />
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 2 }}>
                  <label htmlFor="recItem" className="form-label">Food Item</label>
                  <input
                    id="recItem"
                    type="text"
                    className="form-input"
                    value={formData.item}
                    name="item"
                    onChange={handleChange}
                    disabled={isViewMode}
                  />
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="recQuantity" className="form-label">Quantity</label>
                  <input
                    id="recQuantity"
                    type="number"
                    className="form-input"
                    value={formData.quantity}
                    name="quantity"
                    onChange={handleChange}
                    disabled={isViewMode}
                  />
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="recUnit" className="form-label">Unit</label>
                  <select
                    id="recUnit"
                    name="unit"
                    className="form-select"
                    value={formData.unit}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    {units.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="recSource" className="form-label">Source / Donor</label>
                <input
                  id="recSource"
                  type="text"
                  className="form-input"
                  value={formData.source}
                  name="source"
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="recWarehouse" className="form-label">Destination Warehouse</label>
                  <select
                    id="recWarehouse"
                    name="destinationWarehouse"
                    className="form-select"
                    value={formData.destinationWarehouse}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    {warehousesList?.map((w) => (
                      <option key={w._id || w.name} value={w.name}>{w.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="recStatus" className="form-label">Shipment Status</label>
                  <select
                    id="recStatus"
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="recNotes" className="form-label">Inspection & Quality Notes</label>
                <textarea
                  id="recNotes"
                  name="notes"
                  rows="2"
                  className="form-textarea"
                  value={formData.notes}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              {isViewMode ? 'Close' : 'Cancel'}
            </button>
            {!isViewMode && (
              <button type="submit" className="btn btn-primary">
                <Check size={16} />
                <span>Update Record</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
