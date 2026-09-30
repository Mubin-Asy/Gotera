/**
 * WarehouseModal.jsx
 * Aligned with 'Learning React' (Banks & Porcello) and 'HTML5 Design Patterns'
 * Controlled modal for creating and updating regional storage facilities
 */

import { useState } from 'react';
import { X, Warehouse, Check } from 'lucide-react';

export default function WarehouseModal({ isOpen, mode = 'add', warehouse = null, onClose, onSave }) {
  const getInitialFormData = () => {
    if (warehouse && (mode === 'edit' || mode === 'view')) {
      return {
        name: warehouse.name || '',
        region: warehouse.region || 'Oromia Region',
        totalCapacity: warehouse.totalCapacity !== undefined ? String(warehouse.totalCapacity) : '',
        currentStock: warehouse.currentStock !== undefined ? String(warehouse.currentStock) : '0',
        unit: warehouse.unit || 't',
        manager: warehouse.manager || '',
        contact: warehouse.contact || '',
        status: warehouse.status || 'Operational',
      };
    }
    return {
      name: '',
      region: 'Oromia Region',
      totalCapacity: '',
      currentStock: '0',
      unit: 't',
      manager: '',
      contact: '',
      status: 'Operational',
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const isViewMode = mode === 'view';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewMode) {
      onClose();
      return;
    }

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Warehouse name is required';
    if (!formData.region.trim()) newErrors.region = 'Region is required';
    if (!formData.totalCapacity || isNaN(Number(formData.totalCapacity)) || Number(formData.totalCapacity) <= 0) {
      newErrors.totalCapacity = 'Valid total capacity is required';
    }
    if (!formData.manager.trim()) newErrors.manager = 'Manager name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...formData,
      totalCapacity: Number(formData.totalCapacity),
      currentStock: Number(formData.currentStock || 0),
    });
  };

  const regions = [
    'Oromia Region',
    'Tigray Region',
    'Amhara Region',
    'Gambella Region',
    'Dire Dawa',
    'Sidama Region',
    'Somali Region',
    'Afar Region',
    'Benishangul-Gumuz',
    'Addis Ababa',
    'Harari Region'
  ];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="wh-modal-title">
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ padding: '0.4rem', backgroundColor: '#e6f7fa', borderRadius: '6px', color: '#0891b2' }}>
              <Warehouse size={18} />
            </div>
            <h3 id="wh-modal-title" className="modal-title">
              {mode === 'add' && 'Add Regional Warehouse Facility'}
              {mode === 'edit' && 'Edit Warehouse Details'}
              {mode === 'view' && 'Warehouse Facility Overview'}
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
                <label htmlFor="whName" className="form-label">
                  Warehouse Facility Name <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  id="whName"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Adama Central Warehouse"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
                {errors.name && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="whRegion" className="form-label">
                    Administrative Region <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    id="whRegion"
                    name="region"
                    className="form-select"
                    value={formData.region}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="whStatus" className="form-label">
                    Operational Status
                  </label>
                  <select
                    id="whStatus"
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    <option value="Operational">Operational</option>
                    <option value="Near Capacity">Near Capacity</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="whCapacity" className="form-label">
                    Total Capacity (Tonnes) <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    id="whCapacity"
                    name="totalCapacity"
                    type="number"
                    min="1"
                    className="form-input"
                    placeholder="e.g. 39000"
                    value={formData.totalCapacity}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  />
                  {errors.totalCapacity && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.totalCapacity}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="whCurrentStock" className="form-label">
                    Current Stock (Tonnes)
                  </label>
                  <input
                    id="whCurrentStock"
                    name="currentStock"
                    type="number"
                    min="0"
                    className="form-input"
                    placeholder="e.g. 32000"
                    value={formData.currentStock}
                    onChange={handleChange}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="whManager" className="form-label">
                    Facility Manager <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    id="whManager"
                    name="manager"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Tesfaye Alemu"
                    value={formData.manager}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  />
                  {errors.manager && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.manager}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="whContact" className="form-label">
                    Contact Phone
                  </label>
                  <input
                    id="whContact"
                    name="contact"
                    type="text"
                    className="form-input"
                    placeholder="e.g. +251 91 123 4567"
                    value={formData.contact}
                    onChange={handleChange}
                    disabled={isViewMode}
                  />
                </div>
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
                <span>{mode === 'add' ? 'Save Facility' : 'Update Facility'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
