/**
 * InventoryModal.jsx
 * Aligned with 'Learning React' (Banks & Porcello) - Controlled Forms Pattern
 * and 'HTML5 Design Patterns'
 */

import { useState } from 'react';
import { X, Package, Check } from 'lucide-react';

const formatDateForInput = (d) => {
  if (!d) return '';
  const dt = new Date(d);
  return !isNaN(dt.getTime()) ? dt.toISOString().slice(0, 10) : '';
};

export default function InventoryModal({ isOpen, mode = 'add', item = null, warehousesList, onClose, onSave }) {
  const getInitialFormData = () => {
    if (item && (mode === 'edit' || mode === 'view')) {
      return {
        name: item.name || '',
        category: item.category || 'Cereals',
        subCategory: item.subCategory || '',
        quantity: item.quantity !== undefined ? String(item.quantity) : '',
        unit: item.unit || 't',
        warehouse: item.warehouse || (warehousesList?.[0]?.name || 'Adama Central Warehouse'),
        status: item.status || 'In Stock',
        expiryDate: formatDateForInput(item.expiryDate),
        notes: item.notes || '',
      };
    }
    return {
      name: '',
      category: 'Cereals',
      subCategory: '',
      quantity: '',
      unit: 't',
      warehouse: warehousesList?.[0]?.name || 'Adama Central Warehouse',
      status: 'In Stock',
      expiryDate: '',
      notes: '',
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

    // Input validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Food item name is required';
    if (!formData.quantity || isNaN(Number(formData.quantity)) || Number(formData.quantity) < 0) {
      newErrors.quantity = 'Valid positive quantity required';
    }
    if (!formData.warehouse) newErrors.warehouse = 'Select a warehouse location';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...formData,
      quantity: Number(formData.quantity),
      expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : undefined,
    });
  };

  const categories = ['Cereals', 'Pulses', 'Fats & Oils', 'Minerals', 'Supplementary', 'Dairy'];
  const units = [
    { value: 't', label: 'Metric Tonnes (t)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'L', label: 'Litres (L)' },
    { value: 'bags', label: 'Bags' },
    { value: 'cartons', label: 'Cartons' },
  ];
  const statuses = ['In Stock', 'Low Stock', 'Critical', 'Expiring Soon'];

  const getTitle = () => {
    if (mode === 'add') return 'Add Reserve Food Item';
    if (mode === 'edit') return `Edit: ${item?.name || 'Food Item'}`;
    return `Details: ${item?.name || 'Food Item'}`;
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inventoryModalTitle"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-brand-emerald-light)',
                color: 'var(--color-brand-emerald-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-hidden="true"
            >
              <Package size={17} />
            </div>
            <h2 id="inventoryModalTitle" className="modal-title">{getTitle()}</h2>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Item Name */}
              <div className="form-group">
                <label htmlFor="itemName" className="form-label">
                  Item Name <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  id="itemName"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Wheat Grain, Cooking Oil, Red Haricot Beans..."
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
                {errors.name && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.name}</span>}
              </div>

              {/* Category & SubCategory Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="itemCategory" className="form-label">
                    Category <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    id="itemCategory"
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="itemSubCategory" className="form-label">
                    Sub-Category / Type
                  </label>
                  <input
                    id="itemSubCategory"
                    name="subCategory"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Hard Red, Sunflower, CSB+..."
                    value={formData.subCategory}
                    onChange={handleChange}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              {/* Quantity & Unit Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="itemQuantity" className="form-label">
                    Quantity <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    id="itemQuantity"
                    name="quantity"
                    type="number"
                    min="0"
                    step="any"
                    className="form-input"
                    placeholder="e.g. 25430"
                    value={formData.quantity}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  />
                  {errors.quantity && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.quantity}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="itemUnit" className="form-label">
                    Unit <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    id="itemUnit"
                    name="unit"
                    className="form-select"
                    value={formData.unit}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    {units.map((u) => (
                      <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Warehouse & Status Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="itemWarehouse" className="form-label">
                    Warehouse Facility <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    id="itemWarehouse"
                    name="warehouse"
                    className="form-select"
                    value={formData.warehouse}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    {warehousesList?.map((w) => (
                      <option key={w._id || w.name} value={w.name}>{w.name}</option>
                    ))}
                  </select>
                  {errors.warehouse && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.warehouse}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="itemStatus" className="form-label">
                    Status
                  </label>
                  <select
                    id="itemStatus"
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Expiry Date */}
              <div className="form-group">
                <label htmlFor="itemExpiryDate" className="form-label">
                  Expiration / Best Before Date
                </label>
                <input
                  id="itemExpiryDate"
                  name="expiryDate"
                  type="date"
                  className="form-input"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>

              {/* Notes */}
              <div className="form-group">
                <label htmlFor="itemNotes" className="form-label">
                  Batch & Inspection Notes
                </label>
                <textarea
                  id="itemNotes"
                  name="notes"
                  rows="2"
                  className="form-textarea"
                  placeholder="Quality grade, moisture level, hermetic packaging details..."
                  value={formData.notes}
                  onChange={handleChange}
                  disabled={isViewMode}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              {isViewMode ? 'Close' : 'Cancel'}
            </button>
            {!isViewMode && (
              <button
                type="submit"
                className="btn btn-primary"
              >
                <Check size={16} />
                <span>{mode === 'add' ? 'Save Item' : 'Update Item'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
