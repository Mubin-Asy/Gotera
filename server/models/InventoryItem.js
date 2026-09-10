/**
 * InventoryItem.js
 * Aligned with 'MongoDB in Action' (Manning)
 * 
 * Standard document modeling:
 * - Direct, cohesive schema representing a food reserve line item
 * - Field-level type definitions, validations, and defaults
 * - Compound indexing on warehouse and category for fast aggregation
 */

const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
    index: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Cereals', 'Fats & Oils', 'Minerals', 'Supplementary', 'Pulses', 'Dairy', 'Tubers', 'Other'],
    default: 'Cereals',
    index: true,
  },
  subCategory: {
    type: String,
    trim: true,
    default: '',
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  unit: {
    type: String,
    required: true,
    enum: ['t', 'kg', 'L', 'bags', 'cartons'],
    default: 't',
  },
  warehouse: {
    type: String,
    required: [true, 'Warehouse facility is required'],
    trim: true,
    index: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['In Stock', 'Low Stock', 'Critical', 'Expiring Soon'],
    default: 'In Stock',
    index: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
  },
  notes: {
    type: String,
    trim: true,
    default: '',
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index for query optimization as described in MongoDB in Action Ch. 7
inventoryItemSchema.index({ category: 1, warehouse: 1 });

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
