/**
 * ReceivingForm.jsx
 * Aligned with 'HTML5 Design Patterns' (Forms and Controls)
 * and 'Learning React' (Banks & Porcello)
 * Right column panel for logging incoming food supplies
 */

import { useState } from 'react';
import { Check } from 'lucide-react';

export default function ReceivingForm({ warehousesList, onLogCollection }) {
  const [formData, setFormData] = useState({
    item: 'Wheat Grain',
    quantity: '',
    unit: 'Tonnes',
    source: 'World Food Programme',
    destinationWarehouse: 'Adama Central Warehouse',
    collectionDate: new Date().toISOString().slice(0, 10),
    status: 'Pending Inspection',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const foodItems = [
    'Wheat Grain',
    'White Rice',
    'Rice',
    'Maize',
    'Cooking Oil',
    'Iodized Salt',
    'Fortified Blend (CSB+)',
    'Fortified Blend',
    'Red Beans',
    'Powdered Milk',
    'Sorghum',
    'Split Peas'
  ];

  const units = ['Tonnes', 'Kilograms', 'Litres', 'Bags', 'Cartons'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.item) newErrors.item = 'Food item is required';
    if (!formData.quantity || isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Enter valid quantity';
    }
    if (!formData.source.trim()) newErrors.source = 'Source or donor is required';
    if (!formData.destinationWarehouse) newErrors.destinationWarehouse = 'Destination warehouse is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    await onLogCollection({
      ...formData,
      quantity: Number(formData.quantity),
    });

    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset quantity
    setFormData((prev) => ({
      ...prev,
      quantity: '',
      collectionDate: new Date().toISOString().slice(0, 10),
    }));
  };

  return (
    <article className="receiving-form-card" aria-label="Log New Food Shipment">
      <h3 className="form-card-title">New Collection Record</h3>

      {showSuccess && (
        <div style={{ padding: '0.65rem', backgroundColor: '#e6f8f1', color: '#059669', borderRadius: '8px', fontSize: '0.8125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check size={16} />
          <span>Collection record logged successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="gotera-form" noValidate>
        {/* Food Item Dropdown */}
        <div className="form-group">
          <label htmlFor="recFoodItem" className="form-label">
            Food item
          </label>
          <select
            id="recFoodItem"
            name="item"
            className="form-select"
            value={formData.item}
            onChange={handleChange}
          >
            {foodItems.map((fi) => (
              <option key={fi} value={fi}>{fi}</option>
            ))}
          </select>
        </div>

        {/* Quantity and Unit Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="recQuantity" className="form-label">
              Quantity
            </label>
            <input
              id="recQuantity"
              name="quantity"
              type="number"
              min="1"
              step="any"
              className="form-input"
              placeholder="e.g. 420"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            {errors.quantity && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="recUnit" className="form-label">
              Unit
            </label>
            <select
              id="recUnit"
              name="unit"
              className="form-select"
              value={formData.unit}
              onChange={handleChange}
            >
              {units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Source / Donor */}
        <div className="form-group">
          <label htmlFor="recSource" className="form-label">
            Source / Donor
          </label>
          <input
            id="recSource"
            name="source"
            type="text"
            className="form-input"
            placeholder="World Food Programme"
            value={formData.source}
            onChange={handleChange}
            required
          />
          {errors.source && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{errors.source}</span>}
        </div>

        {/* Destination Warehouse */}
        <div className="form-group">
          <label htmlFor="recDestination" className="form-label">
            Destination warehouse
          </label>
          <select
            id="recDestination"
            name="destinationWarehouse"
            className="form-select"
            value={formData.destinationWarehouse}
            onChange={handleChange}
          >
            {warehousesList?.map((w) => (
              <option key={w._id || w.name} value={w.name}>{w.name}</option>
            ))}
          </select>
        </div>

        {/* Collection Date */}
        <div className="form-group">
          <label htmlFor="recDate" className="form-label">
            Collection date
          </label>
          <input
            id="recDate"
            name="collectionDate"
            type="date"
            className="form-input"
            value={formData.collectionDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary form-submit-btn"
          disabled={isSubmitting}
        >
          <Check size={18} />
          <span>{isSubmitting ? 'Logging Shipment...' : 'Log Collection'}</span>
        </button>
      </form>
    </article>
  );
}
