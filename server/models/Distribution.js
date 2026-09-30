/**
 * Distribution.js
 * Mongoose Schema for tracking outgoing food relief dispatches
 * Aligned with 'MongoDB 8.0 in Action' (Arek Borucki)
 */

const mongoose = require('mongoose');

const distributionSchema = new mongoose.Schema({
  distributionId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  item: {
    type: String,
    required: [true, 'Crop / Food item name is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  unit: {
    type: String,
    enum: ['t', 'kg', 'L', 'Tonnes', 'Bags', 'Cartons'],
    default: 't'
  },
  sourceWarehouse: {
    type: String,
    required: [true, 'Source warehouse is required'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'Destination relief zone / agency is required'],
    trim: true
  },
  dispatchDate: {
    type: Date,
    default: Date.now
  },
  carrier: {
    type: String,
    default: 'National Relief Transport',
    trim: true
  },
  status: {
    type: String,
    enum: ['Dispatched', 'In Transit', 'Delivered'],
    default: 'Dispatched'
  },
  priority: {
    type: String,
    enum: ['Critical', 'High', 'Moderate'],
    default: 'High'
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Distribution', distributionSchema);
