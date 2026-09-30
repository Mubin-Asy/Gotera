/**
 * collectionHandlers.js
 * Aligned with:
 * - 'Web Development with Node and Express' (Ethan Brown)
 * - 'MongoDB 8.0 in Action, Third Edition: Building on the Atlas Data Platform' by Arek Borucki (Manning)
 *   - Chapter 4: Document Data Modeling (Traceability schemas)
 *   - Chapter 5: CRUD Operations & Query Language (Sorting by collectionDate, natural key filtering)
 *   - Chapter 7: Indexing Strategies (Unique index queries)
 */

const CollectionRecord = require('../models/CollectionRecord');
const { getMemoryStore, getIsConnected } = require('../db/connection');

function escapeRegex(text) {
  return text ? text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : '';
}

exports.listCollections = async (req, res, next) => {
  try {
    const { status, warehouse, search } = req.query;

    if (getIsConnected()) {
      let query = {};
      if (status && status !== 'All') query.status = status;
      if (warehouse && warehouse !== 'All') query.destinationWarehouse = warehouse;
      if (search) {
        const safeSearch = escapeRegex(search);
        query.$or = [
          { recordId: { $regex: safeSearch, $options: 'i' } },
          { item: { $regex: safeSearch, $options: 'i' } },
          { source: { $regex: safeSearch, $options: 'i' } },
          { destinationWarehouse: { $regex: safeSearch, $options: 'i' } }
        ];
      }
      const records = await CollectionRecord.find(query).sort({ collectionDate: -1 });
      return res.status(200).json({ success: true, count: records.length, data: records });
    }

    let store = getMemoryStore().collections;
    let filtered = [...store];

    if (status && status !== 'All') {
      filtered = filtered.filter(c => c.status.toLowerCase() === status.toLowerCase());
    }
    if (warehouse && warehouse !== 'All') {
      filtered = filtered.filter(c => c.destinationWarehouse.toLowerCase() === warehouse.toLowerCase());
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(c =>
        c.recordId.toLowerCase().includes(s) ||
        c.item.toLowerCase().includes(s) ||
        c.source.toLowerCase().includes(s) ||
        c.destinationWarehouse.toLowerCase().includes(s)
      );
    }

    res.status(200).json({ success: true, count: filtered.length, data: filtered });
  } catch (err) {
    next(err);
  }
};

exports.getCollection = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const record = await CollectionRecord.findById(id);
      if (!record) {
        return res.status(404).json({ success: false, message: `Record ${id} not found` });
      }
      return res.status(200).json({ success: true, data: record });
    }

    const store = getMemoryStore().collections;
    const record = store.find(c => String(c._id) === String(id) || c.recordId === id);
    if (!record) {
      return res.status(404).json({ success: false, message: `Record ${id} not found` });
    }
    res.status(200).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

exports.createCollection = async (req, res, next) => {
  try {
    const { item, quantity, unit, source, destinationWarehouse, collectionDate, status, notes } = req.body;

    if (!item || quantity === undefined || !source || !destinationWarehouse) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields: item, quantity, source, destinationWarehouse'
      });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedRecordId = `GC-2026-${randomSuffix}`;

    const newRecordData = {
      recordId: req.body.recordId || generatedRecordId,
      item,
      quantity: Number(quantity),
      unit: unit || 'Tonnes',
      source,
      destinationWarehouse,
      collectionDate: collectionDate ? new Date(collectionDate) : new Date(),
      status: status || 'Pending Inspection',
      notes: notes || '',
    };

    if (getIsConnected()) {
      const created = await CollectionRecord.create(newRecordData);
      return res.status(201).json({ success: true, data: created });
    }

    const store = getMemoryStore().collections;
    const newDoc = {
      ...newRecordData,
      _id: `col_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    store.unshift(newDoc);
    res.status(201).json({ success: true, data: newDoc });
  } catch (err) {
    next(err);
  }
};

exports.updateCollection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (getIsConnected()) {
      const updated = await CollectionRecord.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: `Record ${id} not found` });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const store = getMemoryStore().collections;
    const index = store.findIndex(c => String(c._id) === String(id) || c.recordId === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Record ${id} not found` });
    }

    store[index] = {
      ...store[index],
      ...updateData,
      quantity: updateData.quantity !== undefined ? Number(updateData.quantity) : store[index].quantity,
      updatedAt: new Date()
    };

    res.status(200).json({ success: true, data: store[index] });
  } catch (err) {
    next(err);
  }
};

exports.deleteCollection = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const deleted = await CollectionRecord.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: `Record ${id} not found` });
      }
      return res.status(200).json({ success: true, message: 'Record deleted successfully' });
    }

    const store = getMemoryStore().collections;
    const index = store.findIndex(c => String(c._id) === String(id) || c.recordId === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Record ${id} not found` });
    }

    store.splice(index, 1);
    res.status(200).json({ success: true, message: 'Record deleted successfully' });
  } catch (err) {
    next(err);
  }
};
