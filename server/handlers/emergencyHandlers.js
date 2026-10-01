/**
 * emergencyHandlers.js
 * Handlers for Gotera regional emergency food allocation requisitions
 * Aligned with 'MongoDB 8.0 in Action' (Arek Borucki)
 */

const EmergencyRequest = require('../models/EmergencyRequest');
const { getMemoryStore, getIsConnected } = require('../db/connection');

function escapeRegex(text) {
  return text ? text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : '';
}

exports.listRequests = async (req, res, next) => {
  try {
    const { urgency, status, search } = req.query;

    if (getIsConnected()) {
      try {
        let query = {};
        if (urgency && urgency !== 'All') query.urgency = urgency;
        if (status && status !== 'All') query.status = status;
        if (search) {
          const safe = escapeRegex(search);
          query.$or = [
            { requestId: { $regex: safe, $options: 'i' } },
            { authority: { $regex: safe, $options: 'i' } },
            { region: { $regex: safe, $options: 'i' } },
            { item: { $regex: safe, $options: 'i' } }
          ];
        }
        const records = await EmergencyRequest.find(query).sort({ requestDate: -1 });
        return res.status(200).json({ success: true, count: records.length, data: records });
      } catch (mongoErr) {
        console.warn('[Emergency Handler] Falling back to memory store:', mongoErr.message);
      }
    }

    let store = getMemoryStore().emergencyRequests || [];
    let filtered = [...store];

    if (urgency && urgency !== 'All') {
      filtered = filtered.filter(r => r.urgency.toLowerCase() === urgency.toLowerCase());
    }
    if (status && status !== 'All') {
      filtered = filtered.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(r =>
        r.requestId?.toLowerCase().includes(s) ||
        r.authority?.toLowerCase().includes(s) ||
        r.region?.toLowerCase().includes(s) ||
        r.item?.toLowerCase().includes(s)
      );
    }

    res.status(200).json({ success: true, count: filtered.length, data: filtered });
  } catch (err) {
    next(err);
  }
};

exports.createRequest = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.authority || !data.item || !data.quantity || !data.region) {
      return res.status(400).json({
        success: false,
        message: 'Authority, item, quantity, and region are required'
      });
    }

    const reqId = data.requestId || `EMR-2026-${Math.floor(100 + Math.random() * 900)}`;

    if (getIsConnected()) {
      const created = await EmergencyRequest.create({
        ...data,
        requestId: reqId,
        requestDate: data.requestDate ? new Date(data.requestDate) : new Date()
      });
      return res.status(201).json({ success: true, data: created });
    }

    const created = {
      _id: `emr_${Date.now()}`,
      requestId: reqId,
      authority: data.authority,
      region: data.region,
      affectedPopulation: Number(data.affectedPopulation || 0),
      item: data.item,
      quantity: Number(data.quantity),
      unit: data.unit || 't',
      urgency: data.urgency || 'High',
      status: data.status || 'Pending Review',
      requestDate: data.requestDate ? new Date(data.requestDate) : new Date(),
      assignedWarehouse: data.assignedWarehouse || 'Pending Allocation',
      details: data.details || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    getMemoryStore().emergencyRequests = [created, ...(getMemoryStore().emergencyRequests || [])];
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
};

exports.updateRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (getIsConnected()) {
      const updated = await EmergencyRequest.findByIdAndUpdate(id, updates, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Request not found' });
      return res.status(200).json({ success: true, data: updated });
    }

    const store = getMemoryStore().emergencyRequests || [];
    const index = store.findIndex(r => String(r._id) === String(id) || r.requestId === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Request not found' });

    store[index] = { ...store[index], ...updates, updatedAt: new Date() };
    res.status(200).json({ success: true, data: store[index] });
  } catch (err) {
    next(err);
  }
};

exports.deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const deleted = await EmergencyRequest.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Request not found' });
      return res.status(200).json({ success: true, message: 'Request removed' });
    }

    const store = getMemoryStore().emergencyRequests || [];
    const index = store.findIndex(r => String(r._id) === String(id) || r.requestId === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Request not found' });

    store.splice(index, 1);
    res.status(200).json({ success: true, message: 'Request removed' });
  } catch (err) {
    next(err);
  }
};
