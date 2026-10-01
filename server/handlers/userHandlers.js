/**
 * userHandlers.js
 * Aligned with 'MongoDB 8.0 in Action' (Arek Borucki)
 * User Governance, Approvals and Identity Management for Gotera
 */

const mongoose = require('mongoose');
const User = require('../models/User');
const { getMemoryStore, getIsConnected } = require('../db/connection');

exports.listUsers = async (req, res, next) => {
  try {
    const { role, status, search } = req.query;

    if (getIsConnected()) {
      try {
        let query = {};
        if (role && role !== 'All') query.role = role;
        if (status && status !== 'All') query.status = status;
        if (search) {
          query.$or = [
            { fullName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { organization: { $regex: search, $options: 'i' } }
          ];
        }

        const users = await User.find(query).select('-password').sort({ createdAt: -1 });
        return res.status(200).json({ success: true, count: users.length, data: users });
      } catch (mongoErr) {
        console.warn('[User Handler] Falling back to memory store:', mongoErr.message);
      }
    }

    let store = getMemoryStore().users || [];
    let filtered = [...store];

    if (role && role !== 'All') {
      filtered = filtered.filter(u => u.role?.toLowerCase() === role.toLowerCase());
    }
    if (status && status !== 'All') {
      filtered = filtered.filter(u => (u.status || 'Active').toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(u =>
        u.fullName?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s) ||
        u.organization?.toLowerCase().includes(s)
      );
    }

    const safeUsers = filtered.map(u => ({
      _id: u._id,
      fullName: u.fullName,
      email: u.email,
      phone: u.phone,
      organization: u.organization,
      role: u.role,
      status: u.status || 'Active',
      avatar: u.avatar || 'US',
      createdAt: u.createdAt || new Date()
    }));

    res.status(200).json({ success: true, count: safeUsers.length, data: safeUsers });
  } catch (err) {
    next(err);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;

    if (getIsConnected()) {
      const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { email: id };
      const updates = {};
      if (role) updates.role = role;
      if (status) updates.status = status;

      const updated = await User.findOneAndUpdate(filter, updates, { new: true }).select('-password');
      if (!updated) {
        return res.status(404).json({ success: false, message: 'User account not found' });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const store = getMemoryStore().users || [];
    const index = store.findIndex(u => String(u._id) === String(id) || u.email === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    if (role) store[index].role = role;
    if (status) store[index].status = status;
    store[index].updatedAt = new Date();

    const result = { ...store[index] };
    delete result.password;
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.approveUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const assignedRole = role || 'Warehouse Manager';

    if (getIsConnected()) {
      const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { email: id };
      const updated = await User.findOneAndUpdate(
        filter,
        { status: 'Active', role: assignedRole },
        { new: true }
      ).select('-password');

      if (!updated) {
        return res.status(404).json({ success: false, message: 'User account not found' });
      }
      return res.status(200).json({ success: true, data: updated, message: `Account approved as ${assignedRole}` });
    }

    const store = getMemoryStore().users || [];
    const index = store.findIndex(u => String(u._id) === String(id) || u.email === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    store[index].status = 'Active';
    store[index].role = assignedRole;
    store[index].updatedAt = new Date();

    const result = { ...store[index] };
    delete result.password;
    res.status(200).json({ success: true, data: result, message: `Account approved as ${assignedRole}` });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { email: id };
      const deleted = await User.findOneAndDelete(filter);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'User account not found' });
      }
      return res.status(200).json({ success: true, message: 'User account removed' });
    }

    const store = getMemoryStore().users || [];
    const index = store.findIndex(u => String(u._id) === String(id) || u.email === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    store.splice(index, 1);
    res.status(200).json({ success: true, message: 'User account removed' });
  } catch (err) {
    next(err);
  }
};
