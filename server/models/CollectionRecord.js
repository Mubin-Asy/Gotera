/**
 * CollectionRecord.js
 * Aligned with 'MongoDB 8.0 in Action, Third Edition: Building on the Atlas Data Platform'
 * by Arek Borucki (Manning)
 * 
 * - Chapter 4: Document Data Modeling & Schema Design (Shipment traceability & schemas)
 * - Chapter 7: Indexing Strategies (Natural key uniqueness index on recordId)
 */

const mongoose = require('mongoose');

const collectionRecordSchema = new mongoose.Schema({
  recordId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  item: {
    type: String,
    required: [true, 'Food item name is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  unit: {
    type: String,
    required: true,
    enum: ['t', 'Tonnes', 'kg', 'Kilograms', 'L', 'Litres', 'bags', 'Bags', 'cartons', 'Cartons'],
    default: 't',
  },
  source: {
    type: String,
    required: [true, 'Source / Donor is required'],
    trim: true,
  },
  destinationWarehouse: {
    type: String,
    required: [true, 'Destination warehouse is required'],
    trim: true,
    index: true,
  },
  collectionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ['Inspected', 'Received', 'Pending Inspection', 'Rejected / Damaged', 'Awaiting Arrival'],
    default: 'Pending Inspection',
    index: true,
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

module.exports = mongoose.model('CollectionRecord', collectionRecordSchema);
