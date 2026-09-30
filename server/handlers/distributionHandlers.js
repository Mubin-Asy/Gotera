/**
 * distributionHandlers.js
 * Handlers for Gotera relief food dispatches
 * Aligned with 'MongoDB 8.0 in Action' (Arek Borucki)
 */

const Distribution = require('../models/Distribution');
const { getMemoryStore, getIsConnected } = require('../db/connection');

function escapeRegex(text) {
  return text ? text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : '';
}

exports.listDistributions = async (req, res, next) => {
  try {
    const { status, warehouse, search } = req.query;

    if (getIsConnected()) {
      let query = {};
      if (status && status !== 'All') query.status = status;
      if (warehouse && warehouse !== 'All') query.sourceWarehouse = warehouse;
      if (search) {
        const safe = escapeRegex(search);
        query.$or = [
          { distributionId: { $regex: safe, $options: 'i' } },
          { item: { $regex: safe, $options: 'i' } },
          { destination: { $regex: safe, $options: 'i' } },
          { sourceWarehouse: { $regex: safe, $options: 'i' } }
        ];
      }
      const records = await Distribution.find(query).sort({ dispatchDate: -1 });
      return res.status(200).json({ success: true, count: records.length, data: records });
    }

    let store = getMemoryStore().distributions || [];
    let filtered = [...store];

    if (status && status !== 'All') {
      filtered = filtered.filter(d => d.status.toLowerCase() === status.toLowerCase());
    }
    if (warehouse && warehouse !== 'All') {
      filtered = filtered.filter(d => d.sourceWarehouse.toLowerCase() === warehouse.toLowerCase());
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(d =>
        d.distributionId?.toLowerCase().includes(s) ||
        d.item?.toLowerCase().includes(s) ||
        d.destination?.toLowerCase().includes(s) ||
        d.sourceWarehouse?.toLowerCase().includes(s)
      );
    }

    res.status(200).json({ success: true, count: filtered.length, data: filtered });
  } catch (err) {
    next(err);
  }
};

exports.createDistribution = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.item || !data.quantity || !data.destination || !data.sourceWarehouse) {
      return res.status(400).json({
        success: false,
        message: 'Item, quantity, destination, and source warehouse are required'
      });
    }

    const distId = data.distributionId || `DST-2026-${Math.floor(100 + Math.random() * 900)}`;

    if (getIsConnected()) {
      const newRecord = await Distribution.create({
        ...data,
        distributionId: distId,
        dispatchDate: data.dispatchDate ? new Date(data.dispatchDate) : new Date()
      });
      return res.status(201).json({ success: true, data: newRecord });
    }

    const newRecord = {
      _id: `dst_${Date.now()}`,
      distributionId: distId,
      item: data.item,
      quantity: Number(data.quantity),
      unit: data.unit || 't',
      sourceWarehouse: data.sourceWarehouse,
      destination: data.destination,
      carrier: data.carrier || 'National Relief Transport',
      dispatchDate: data.dispatchDate ? new Date(data.dispatchDate) : new Date(),
      status: data.status || 'Dispatched',
      priority: data.priority || 'High',
      notes: data.notes || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    getMemoryStore().distributions = [newRecord, ...(getMemoryStore().distributions || [])];
    res.status(201).json({ success: true, data: newRecord });
  } catch (err) {
    next(err);
  }
};

exports.updateDistribution = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (getIsConnected()) {
      const updated = await Distribution.findByIdAndUpdate(id, updates, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Distribution record not found' });
      return res.status(200).json({ success: true, data: updated });
    }

    const store = getMemoryStore().distributions || [];
    const index = store.findIndex(d => String(d._id) === String(id) || d.distributionId === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Distribution record not found' });

    store[index] = { ...store[index], ...updates, updatedAt: new Date() };
    res.status(200).json({ success: true, data: store[index] });
  } catch (err) {
    next(err);
  }
};

exports.deleteDistribution = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const deleted = await Distribution.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Distribution record not found' });
      return res.status(200).json({ success: true, message: 'Record deleted' });
    }

    const store = getMemoryStore().distributions || [];
    const index = store.findIndex(d => String(d._id) === String(id) || d.distributionId === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Distribution record not found' });

    store.splice(index, 1);
    res.status(200).json({ success: true, message: 'Record deleted' });
  } catch (err) {
    next(err);
  }
};
