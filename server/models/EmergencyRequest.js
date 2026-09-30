/**
 * EmergencyRequest.js
 * Mongoose Schema for regional emergency food allocation requisitions
 * Aligned with 'MongoDB 8.0 in Action' (Arek Borucki)
 */

const mongoose = require('mongoose');

const emergencyRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  authority: {
    type: String,
    required: [true, 'Requesting authority is required'],
    trim: true
  },
  region: {
    type: String,
    required: [true, 'Target region is required'],
    trim: true
  },
  affectedPopulation: {
    type: Number,
    required: [true, 'Affected population count is required'],
    min: [0, 'Population cannot be negative']
  },
  item: {
    type: String,
    required: [true, 'Commodity / Crop requested is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity requested is required'],
    min: [0, 'Quantity cannot be negative']
  },
  unit: {
    type: String,
    default: 't'
  },
  urgency: {
    type: String,
    enum: ['Critical', 'High', 'Moderate'],
    default: 'High'
  },
  status: {
    type: String,
    enum: ['Pending Review', 'Approved', 'Allocated', 'Declined'],
    default: 'Pending Review'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  assignedWarehouse: {
    type: String,
    default: 'Pending Allocation',
    trim: true
  },
  details: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EmergencyRequest', emergencyRequestSchema);
