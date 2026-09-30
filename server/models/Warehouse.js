/**
 * Warehouse.js
 * Aligned with 'MongoDB 8.0 in Action, Third Edition: Building on the Atlas Data Platform'
 * by Arek Borucki (Manning)
 * 
 * - Chapter 4: Document Data Modeling & Schema Design (Facility documents & capacity constraints)
 * - Chapter 6: Computed properties and virtual projections
 */

const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Warehouse name is required'],
    unique: true,
    trim: true,
  },
  region: {
    type: String,
    required: [true, 'Region is required'],
    trim: true,
    index: true,
  },
  totalCapacity: {
    type: Number,
    required: [true, 'Total capacity is required'],
    min: [1, 'Capacity must be positive'],
  },
  currentStock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  unit: {
    type: String,
    default: 't',
  },
  manager: {
    type: String,
    required: [true, 'Manager name is required'],
    trim: true,
  },
  contact: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    required: true,
    enum: ['Operational', 'Near Capacity', 'Under Maintenance'],
    default: 'Operational',
    index: true,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual property for capacity percentage (Arek Borucki, MongoDB 8.0 in Action 3rd Ed., Ch. 4 & 6)
warehouseSchema.virtual('capacityUsedPercent').get(function() {
  if (!this.totalCapacity || this.totalCapacity === 0) return 0;
  return Math.min(100, Math.round((this.currentStock / this.totalCapacity) * 100));
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
