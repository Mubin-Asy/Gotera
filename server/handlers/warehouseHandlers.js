/**
 * warehouseHandlers.js
 * Aligned with:
 * - 'Web Development with Node and Express' (Ethan Brown)
 * - 'MongoDB 8.0 in Action, Third Edition: Building on the Atlas Data Platform' by Arek Borucki (Manning)
 *   - Chapter 4: Document Data Modeling (Storage facility documents)
 *   - Chapter 5: CRUD Operations & Query Language (Sorting, filtering, capacity updates)
 */

const Warehouse = require('../models/Warehouse');
const { getMemoryStore, getIsConnected } = require('../db/connection');

function escapeRegex(text) {
  return text ? text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : '';
}

exports.listWarehouses = async (req, res, next) => {
  try {
    const { region, status, search } = req.query;

    if (getIsConnected()) {
      try {
        let query = {};
        if (region && region !== 'All') query.region = region;
        if (status && status !== 'All') query.status = status;
        if (search) {
          const safeSearch = escapeRegex(search);
          query.$or = [
            { name: { $regex: safeSearch, $options: 'i' } },
            { region: { $regex: safeSearch, $options: 'i' } },
            { manager: { $regex: safeSearch, $options: 'i' } }
          ];
        }
        const warehouses = await Warehouse.find(query).sort({ name: 1 });
        return res.status(200).json({ success: true, count: warehouses.length, data: warehouses });
      } catch (mongoErr) {
        console.warn('[Warehouse Handler] Falling back to memory store:', mongoErr.message);
      }
    }

    let store = getMemoryStore().warehouses;
    let filtered = [...store];

    if (region && region !== 'All') {
      filtered = filtered.filter(w => w.region.toLowerCase() === region.toLowerCase());
    }
    if (status && status !== 'All') {
      filtered = filtered.filter(w => w.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(w =>
        w.name.toLowerCase().includes(s) ||
        w.region.toLowerCase().includes(s) ||
        w.manager.toLowerCase().includes(s)
      );
    }

    res.status(200).json({ success: true, count: filtered.length, data: filtered });
  } catch (err) {
    next(err);
  }
};

exports.getWarehouse = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const wh = await Warehouse.findById(id);
      if (!wh) {
        return res.status(404).json({ success: false, message: `Warehouse ${id} not found` });
      }
      return res.status(200).json({ success: true, data: wh });
    }

    const store = getMemoryStore().warehouses;
    const wh = store.find(w => String(w._id) === String(id));
    if (!wh) {
      return res.status(404).json({ success: false, message: `Warehouse ${id} not found` });
    }
    res.status(200).json({ success: true, data: wh });
  } catch (err) {
    next(err);
  }
};

exports.createWarehouse = async (req, res, next) => {
  try {
    const { name, region, totalCapacity, currentStock, unit, manager, contact, status } = req.body;

    if (!name || !region || !totalCapacity || !manager) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields: name, region, totalCapacity, manager'
      });
    }

    const newWhData = {
      name,
      region,
      totalCapacity: Number(totalCapacity),
      currentStock: Number(currentStock || 0),
      unit: unit || 't',
      manager,
      contact: contact || '',
      status: status || 'Operational',
    };

    if (getIsConnected()) {
      const created = await Warehouse.create(newWhData);
      return res.status(201).json({ success: true, data: created });
    }

    const store = getMemoryStore().warehouses;
    const percent = Math.min(100, Math.round((newWhData.currentStock / newWhData.totalCapacity) * 100));
    const newDoc = {
      ...newWhData,
      capacityUsedPercent: percent,
      _id: `wh_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    store.push(newDoc);
    res.status(201).json({ success: true, data: newDoc });
  } catch (err) {
    next(err);
  }
};

exports.updateWarehouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (getIsConnected()) {
      const updated = await Warehouse.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: `Warehouse ${id} not found` });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const store = getMemoryStore().warehouses;
    const index = store.findIndex(w => String(w._id) === String(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Warehouse ${id} not found` });
    }

    const updatedDoc = {
      ...store[index],
      ...updateData,
      totalCapacity: updateData.totalCapacity !== undefined ? Number(updateData.totalCapacity) : store[index].totalCapacity,
      currentStock: updateData.currentStock !== undefined ? Number(updateData.currentStock) : store[index].currentStock,
      updatedAt: new Date()
    };
    updatedDoc.capacityUsedPercent = Math.min(100, Math.round((updatedDoc.currentStock / updatedDoc.totalCapacity) * 100));
    store[index] = updatedDoc;

    res.status(200).json({ success: true, data: store[index] });
  } catch (err) {
    next(err);
  }
};

exports.deleteWarehouse = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const deleted = await Warehouse.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: `Warehouse ${id} not found` });
      }
      return res.status(200).json({ success: true, message: 'Warehouse removed successfully' });
    }

    const store = getMemoryStore().warehouses;
    const index = store.findIndex(w => String(w._id) === String(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Warehouse ${id} not found` });
    }

    store.splice(index, 1);
    res.status(200).json({ success: true, message: 'Warehouse removed successfully' });
  } catch (err) {
    next(err);
  }
};
