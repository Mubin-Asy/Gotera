import { useState } from 'react';
import { X, Send, Eye, CheckCircle2 } from 'lucide-react';

export default function DistributionModal({
  isOpen,
  mode = 'add',
  distribution,
  warehousesList = [],
  inventoryList = [],
  onClose,
  onSave
}) {
  const isView = mode === 'view';

  const [formData, setFormData] = useState(() => {
    if (distribution) {
      return {
        distributionId: distribution.distributionId || '',
        item: distribution.item || '',
        quantity: distribution.quantity || '',
        unit: distribution.unit || 't',
        sourceWarehouse: distribution.sourceWarehouse || (warehousesList[0]?.name || 'Adama Central Warehouse'),
        destination: distribution.destination || '',
        carrier: distribution.carrier || 'National Relief Transport',
        dispatchDate: distribution.dispatchDate
          ? new Date(distribution.dispatchDate).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10),
        status: distribution.status || 'Dispatched',
        priority: distribution.priority || 'High',
        notes: distribution.notes || ''
      };
    }
    return {
      distributionId: `DST-2026-${Math.floor(100 + Math.random() * 900)}`,
      item: inventoryList[0]?.name || 'Durum Wheat Grain',
      quantity: '',
      unit: 't',
      sourceWarehouse: warehousesList[0]?.name || 'Adama Central Warehouse',
      destination: '',
      carrier: 'National Disaster Transport Logistics',
      dispatchDate: new Date().toISOString().slice(0, 10),
      status: 'Dispatched',
      priority: 'High',
      notes: ''
    };
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.item.trim()) errs.item = 'Crop/Item is required';
    if (!formData.quantity || Number(formData.quantity) <= 0) errs.quantity = 'Valid positive quantity required';
    if (!formData.destination.trim()) errs.destination = 'Destination relief zone or agency is required';
    if (!formData.sourceWarehouse) errs.sourceWarehouse = 'Source warehouse is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...formData,
      quantity: Number(formData.quantity)
    });
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="dist-modal-title">
      <div className="modal-dialog">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isView ? <Eye size={18} color="var(--color-brand-emerald)" /> : <Send size={18} color="var(--color-brand-emerald)" />}
            <h2 id="dist-modal-title" className="modal-title">
              {isView ? `Dispatch Record: ${distribution?.distributionId}` : 'Log Food Relief Dispatch'}
            </h2>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="distIdInput">Dispatch ID</label>
                <input
                  id="distIdInput"
                  className="form-input"
                  type="text"
                  value={formData.distributionId}
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="distPriority">Urgency Priority</label>
                <select
                  id="distPriority"
                  className="form-select"
                  value={formData.priority}
                  disabled={isView}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="Critical">Critical Emergency</option>
                  <option value="High">High Priority</option>
                  <option value="Moderate">Moderate / Scheduled</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="distItem">Commodity / Crop <span className="required-star">*</span></label>
              {isView ? (
                <input id="distItem" className="form-input" value={formData.item} disabled />
              ) : (
                <input
                  id="distItem"
                  className={`form-input ${errors.item ? 'has-error' : ''}`}
                  value={formData.item}
                  onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  placeholder="e.g. Durum Wheat Grain, White Teff"
                />
              )}
              {errors.item && <span className="field-error-text">{errors.item}</span>}
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="distQuantity">Quantity <span className="required-star">*</span></label>
                <input
                  id="distQuantity"
                  type="number"
                  step="any"
                  className={`form-input ${errors.quantity ? 'has-error' : ''}`}
                  value={formData.quantity}
                  disabled={isView}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. 120"
                />
                {errors.quantity && <span className="field-error-text">{errors.quantity}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="distUnit">Unit</label>
                <select
                  id="distUnit"
                  className="form-select"
                  value={formData.unit}
                  disabled={isView}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                >
                  <option value="t">Tonnes (t)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="L">Liters (L)</option>
                  <option value="Bags">Bags (50kg)</option>
                  <option value="Cartons">Cartons</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="distWarehouse">Source Warehouse <span className="required-star">*</span></label>
              <select
                id="distWarehouse"
                className={`form-select ${errors.sourceWarehouse ? 'has-error' : ''}`}
                value={formData.sourceWarehouse}
                disabled={isView}
                onChange={(e) => setFormData({ ...formData, sourceWarehouse: e.target.value })}
              >
                {warehousesList.map(w => (
                  <option key={w._id || w.name} value={w.name}>{w.name} ({w.region})</option>
                ))}
              </select>
              {errors.sourceWarehouse && <span className="field-error-text">{errors.sourceWarehouse}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="distDestination">Destination Relief Zone / Agency <span className="required-star">*</span></label>
              <input
                id="distDestination"
                className={`form-input ${errors.destination ? 'has-error' : ''}`}
                value={formData.destination}
                disabled={isView}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="e.g. East Hararghe Drought Relief Taskforce"
              />
              {errors.destination && <span className="field-error-text">{errors.destination}</span>}
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="distCarrier">Transport Carrier</label>
                <input
                  id="distCarrier"
                  className="form-input"
                  value={formData.carrier}
                  disabled={isView}
                  onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="distStatus">Status</label>
                <select
                  id="distStatus"
                  className="form-select"
                  value={formData.status}
                  disabled={isView}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Dispatched">Dispatched</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="distNotes">Operation Notes</label>
              <textarea
                id="distNotes"
                className="form-textarea"
                rows="2"
                value={formData.notes}
                disabled={isView}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Relief allocation decree reference, convoy details..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              {isView ? 'Close' : 'Cancel'}
            </button>
            {!isView && (
              <button type="submit" className="btn btn-primary">
                <CheckCircle2 size={16} />
                <span>Confirm Dispatch</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
