import { useState } from 'react';
import { X, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';

export default function EmergencyModal({
  isOpen,
  mode = 'add',
  request,
  warehousesList = [],
  inventoryList = [],
  onClose,
  onSave
}) {
  const isView = mode === 'view';

  const [formData, setFormData] = useState(() => {
    if (request) {
      return {
        requestId: request.requestId || '',
        authority: request.authority || '',
        region: request.region || 'Somali Region',
        affectedPopulation: request.affectedPopulation || '',
        item: request.item || '',
        quantity: request.quantity || '',
        unit: request.unit || 't',
        urgency: request.urgency || 'High',
        status: request.status || 'Pending Review',
        assignedWarehouse: request.assignedWarehouse || 'Pending Allocation',
        details: request.details || '',
        requestDate: request.requestDate
          ? new Date(request.requestDate).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10)
      };
    }
    return {
      requestId: `EMR-2026-${Math.floor(100 + Math.random() * 900)}`,
      authority: '',
      region: 'Somali Region',
      affectedPopulation: '',
      item: inventoryList[0]?.name || 'Yellow Maize Grain',
      quantity: '',
      unit: 't',
      urgency: 'Critical',
      status: 'Pending Review',
      assignedWarehouse: 'Pending Allocation',
      details: '',
      requestDate: new Date().toISOString().slice(0, 10)
    };
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.authority.trim()) errs.authority = 'Requesting authority is required';
    if (!formData.region.trim()) errs.region = 'Region is required';
    if (!formData.item.trim()) errs.item = 'Required commodity is required';
    if (!formData.quantity || Number(formData.quantity) <= 0) errs.quantity = 'Valid positive quantity required';
    if (!formData.affectedPopulation || Number(formData.affectedPopulation) <= 0) errs.affectedPopulation = 'Affected population count is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...formData,
      quantity: Number(formData.quantity),
      affectedPopulation: Number(formData.affectedPopulation)
    });
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="emr-modal-title">
      <div className="modal-dialog">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isView ? <Eye size={18} color="#e11d48" /> : <AlertTriangle size={18} color="#e11d48" />}
            <h2 id="emr-modal-title" className="modal-title">
              {isView ? `Emergency Request: ${request?.requestId}` : 'Submit Emergency Requisition'}
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
                <label className="form-label" htmlFor="emrIdInput">Requisition ID</label>
                <input
                  id="emrIdInput"
                  className="form-input"
                  type="text"
                  value={formData.requestId}
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="emrUrgency">Urgency Tier</label>
                <select
                  id="emrUrgency"
                  className="form-select"
                  value={formData.urgency}
                  disabled={isView}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                >
                  <option value="Critical">🔴 Critical (Immediate Famine/Drought Hazard)</option>
                  <option value="High">🟠 High (Severe Depletion in 7-14 Days)</option>
                  <option value="Moderate">🟡 Moderate (Targeted Buffer Replenishment)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="emrAuthority">Requesting Authority / Agency <span className="required-star">*</span></label>
              <input
                id="emrAuthority"
                className={`form-input ${errors.authority ? 'has-error' : ''}`}
                value={formData.authority}
                disabled={isView}
                onChange={(e) => setFormData({ ...formData, authority: e.target.value })}
                placeholder="e.g. Afar Drought Taskforce, Somali DRM Bureau"
              />
              {errors.authority && <span className="field-error-text">{errors.authority}</span>}
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="emrRegion">Target Administrative Region <span className="required-star">*</span></label>
                <select
                  id="emrRegion"
                  className="form-select"
                  value={formData.region}
                  disabled={isView}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                >
                  <option value="Somali Region">Somali Region</option>
                  <option value="Afar Region">Afar Region</option>
                  <option value="Tigray Region">Tigray Region</option>
                  <option value="Oromia Region">Oromia Region</option>
                  <option value="Amhara Region">Amhara Region</option>
                  <option value="South Ethiopia">South Ethiopia</option>
                  <option value="Gambella Region">Gambella Region</option>
                  <option value="Benishangul-Gumuz">Benishangul-Gumuz</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="emrPop">Affected Population <span className="required-star">*</span></label>
                <input
                  id="emrPop"
                  type="number"
                  className={`form-input ${errors.affectedPopulation ? 'has-error' : ''}`}
                  value={formData.affectedPopulation}
                  disabled={isView}
                  onChange={(e) => setFormData({ ...formData, affectedPopulation: e.target.value })}
                  placeholder="e.g. 50000"
                />
                {errors.affectedPopulation && <span className="field-error-text">{errors.affectedPopulation}</span>}
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="emrItem">Required Commodity <span className="required-star">*</span></label>
                <input
                  id="emrItem"
                  className={`form-input ${errors.item ? 'has-error' : ''}`}
                  value={formData.item}
                  disabled={isView}
                  onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  placeholder="e.g. Yellow Maize Grain"
                />
                {errors.item && <span className="field-error-text">{errors.item}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="emrQuantity">Quantity (t) <span className="required-star">*</span></label>
                <input
                  id="emrQuantity"
                  type="number"
                  step="any"
                  className={`form-input ${errors.quantity ? 'has-error' : ''}`}
                  value={formData.quantity}
                  disabled={isView}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. 350"
                />
                {errors.quantity && <span className="field-error-text">{errors.quantity}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="emrWarehouse">Assigned Strategic Depot</label>
              <select
                id="emrWarehouse"
                className="form-select"
                value={formData.assignedWarehouse}
                disabled={isView}
                onChange={(e) => setFormData({ ...formData, assignedWarehouse: e.target.value })}
              >
                <option value="Pending Allocation">Pending Allocation</option>
                {warehousesList.map(w => (
                  <option key={w._id || w.name} value={w.name}>{w.name} ({w.region})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="emrDetails">Crisis Situation & Assessment Details</label>
              <textarea
                id="emrDetails"
                className="form-textarea"
                rows="3"
                value={formData.details}
                disabled={isView}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Describe rainfall deficit, IDP movements, or nutritional emergency findings..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              {isView ? 'Close' : 'Cancel'}
            </button>
            {!isView && (
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#dc2626', borderColor: '#b91c1c' }}>
                <CheckCircle2 size={16} />
                <span>Submit Requisition</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
