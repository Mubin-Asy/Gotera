/**
 * InventoryModal.jsx
 * Aligned with 'Learning React' (Banks & Porcello) - Controlled Forms Pattern
 * and 'HTML5 Design Patterns'
 */

import React, { useState, useEffect } from 'react';
import { X, Package, Check } from 'lucide-react';

export default function InventoryModal({ isOpen, mode = 'add', item = null, warehousesList, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cereals',
    subCategory: '',
    quantity: '',
    unit: 't',
    warehouse: 'Adama Central',
    status: 'In Stock',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: item.name || '',
        category: item.category || 'Cereals',
        subCategory: item.subCategory || '',
        quantity: item.quantity !== undefined ? String(item.quantity) : '',
        unit: item.unit || 't',
        warehouse: item.warehouse || (warehousesList?.[0]?.name || 'Adama Central'),
        status: item.status || 'In Stock',
        notes: item.notes || '',
      });
    } else {
      setFormData({
        name: '',
        category: 'Cereals',
        subCategory: '',
        quantity: '',
        unit: 't',
        warehouse: warehousesList?.[0]?.name || 'Adama Central',
        status: 'In Stock',
        notes: '',
      });
    }
    setErrors({});
  }, [item, mode, isOpen, warehousesList]);

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
      newErrors.quantity = 'Valid positive quantity is required';
    }
    if (!formData.warehouse) newErrors.warehouse = 'Warehouse facility is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...formData,
      quantity: Number(formData.quantity),
      subCategory: formData.subCategory || formData.category,
    });
  };

  const categories = ['Cereals', 'Fats & Oils', 'Minerals', 'Supplementary', 'Pulses', 'Dairy', 'Tubers', 'Other'];
  const units = [
    { value: 't', label: 'Tonnes (t)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'L', label: 'Litres (L)' },
    { value: 'bags', label: 'Bags' },
    { value: 'cartons', label: 'Cartons' },
  ];
  const statuses = ['In Stock', 'Low Stock', 'Critical', 'Expiring Soon'];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="inventory-modal-title">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ padding: '0.4rem', backgroundColor: '#e6f8f1', borderRadius: '6px', color: '#059669' }}>
              <Package size={18} />
            </div>
            <h3 id="inventory-modal-title" className="modal-title">
              {mode === 'add' && 'Add New Food Reserve Item'}
              {mode === 'edit' && 'Edit Food Reserve Record'}
              {mode === 'view' && 'Food Reserve Item Details'}
            </h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="gotera-form">
              {/* Item Name */}
              <div className="form-group">
                <label htmlFor="itemName" className="form-label">
                  Food Item Name <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  id="itemName"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Wheat Grain, White Rice, Cooking Oil"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
                {errors.name && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.name}</span>}
              </div>

              {/* Category & Subcategory Row */}
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
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="itemSubCategory" className="form-label">
                    Sub-Category / Variety
                  </label>
                  <input
                    id="itemSubCategory"
                    name="subCategory"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Cereals, Milled"
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
            <button type="button" className="btn btn-outline" onClick={onClose}>
              {isViewMode ? 'Close' : 'Cancel'}
            </button>
            {!isViewMode && (
              <button type="submit" className="btn btn-primary">
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
