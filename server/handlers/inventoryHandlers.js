/**
 * inventoryHandlers.js
 * Aligned with:
 * - 'Web Development with Node and Express' (Ethan Brown)
 * - 'MongoDB 8.0 in Action, Third Edition: Building on the Atlas Data Platform' by Arek Borucki (Manning)
 *   - Chapter 5: CRUD Operations & Query Language (Atomic insert, update, delete, $regex, $or operators)
 *   - Chapter 7: Indexing Strategies & Query Optimization
 */

const InventoryItem = require('../models/InventoryItem');
const { getMemoryStore, getIsConnected } = require('../db/connection');

function escapeRegex(text) {
  return text ? text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : '';
}

exports.listItems = async (req, res, next) => {
  try {
    const { category, warehouse, search, status } = req.query;

    if (getIsConnected()) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (warehouse && warehouse !== 'All') query.warehouse = warehouse;
      if (status && status !== 'All') query.status = status;
      if (search) {
        const safeSearch = escapeRegex(search);
        query.$or = [
          { name: { $regex: safeSearch, $options: 'i' } },
          { subCategory: { $regex: safeSearch, $options: 'i' } },
          { warehouse: { $regex: safeSearch, $options: 'i' } }
        ];
      }
      const items = await InventoryItem.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: items.length, data: items });
    }

    // Memory fallback matching native MongoDB queries
    let store = getMemoryStore().inventory;
    let filtered = [...store];

    if (category && category !== 'All') {
      filtered = filtered.filter(i => i.category.toLowerCase() === category.toLowerCase());
    }
    if (warehouse && warehouse !== 'All') {
      filtered = filtered.filter(i => i.warehouse.toLowerCase() === warehouse.toLowerCase());
    }
    if (status && status !== 'All') {
      filtered = filtered.filter(i => i.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(i => 
        i.name.toLowerCase().includes(s) ||
        (i.subCategory && i.subCategory.toLowerCase().includes(s)) ||
        i.warehouse.toLowerCase().includes(s)
      );
    }

    res.status(200).json({ success: true, count: filtered.length, data: filtered });
  } catch (err) {
    next(err);
  }
};

exports.getItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const item = await InventoryItem.findById(id);
      if (!item) {
        return res.status(404).json({ success: false, message: `Item with id ${id} not found` });
      }
      return res.status(200).json({ success: true, data: item });
    }

    const store = getMemoryStore().inventory;
    const item = store.find(i => String(i._id) === String(id));
    if (!item) {
      return res.status(404).json({ success: false, message: `Item with id ${id} not found` });
    }
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const { name, category, subCategory, quantity, unit, warehouse, status, notes, expiryDate } = req.body;

    if (!name || quantity === undefined || !warehouse) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields: name, quantity, warehouse'
      });
    }

    const newItemData = {
      name,
      category: category || 'Cereals',
      subCategory: subCategory || category || 'Cereals',
      quantity: Number(quantity),
      unit: unit || 't',
      warehouse,
      status: status || 'In Stock',
      lastUpdated: new Date(),
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      notes: notes || '',
    };

    if (getIsConnected()) {
      const created = await InventoryItem.create(newItemData);
      return res.status(201).json({ success: true, data: created });
    }

    const store = getMemoryStore().inventory;
    const newDoc = {
      ...newItemData,
      _id: `inv_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.unshift(newDoc);
    res.status(201).json({ success: true, data: newDoc });
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, lastUpdated: new Date() };

    if (getIsConnected()) {
      const updated = await InventoryItem.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: `Item with id ${id} not found` });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const store = getMemoryStore().inventory;
    const index = store.findIndex(i => String(i._id) === String(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Item with id ${id} not found` });
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

exports.deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const deleted = await InventoryItem.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: `Item with id ${id} not found` });
      }
      return res.status(200).json({ success: true, message: 'Item removed successfully' });
    }

    const store = getMemoryStore().inventory;
    const index = store.findIndex(i => String(i._id) === String(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Item with id ${id} not found` });
    }

    store.splice(index, 1);
    res.status(200).json({ success: true, message: 'Item removed successfully' });
  } catch (err) {
    next(err);
  }
};
