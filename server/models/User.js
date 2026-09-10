/**
 * User.js
 * Aligned with 'MongoDB in Action' (Manning)
 * 
 * Schema for users and roles within Gotera National Food Reserve:
 * - Credentials, organization, and role definitions
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
    enum: ['Warehouse Manager', 'Relief Coordinator', 'Logistics Officer', 'Quality Inspector', 'Administrator'],
    default: 'Warehouse Manager',
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
