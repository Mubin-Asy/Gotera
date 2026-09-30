/**
 * User.js
 * Aligned with 'MongoDB 8.0 in Action, Third Edition: Building on the Atlas Data Platform'
 * by Arek Borucki (Manning)
 * 
 * - Chapter 4: Document Data Modeling & Schema Design (Role-based access & identity schemas)
 * - Chapter 7: Unique indexing on user email
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  organization: {
    type: String,
    trim: true,
    default: 'National Food Reserve Agency',
  },
  role: {
    type: String,
    enum: ['Warehouse Manager', 'Relief Coordinator', 'Administrator'],
    default: 'Warehouse Manager',
  },
  status: {
    type: String,
    enum: ['Active', 'Pending Approval', 'Suspended'],
    default: 'Active',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  avatar: {
    type: String,
    default: 'MK',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
