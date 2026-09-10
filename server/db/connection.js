/**
 * connection.js
 * Aligned with 'MongoDB in Action' (Manning)
 * 
 * Handles database connectivity:
 * - Attempts to connect to real MongoDB via Mongoose using MONGODB_URI
 * - If MongoDB is unavailable (e.g. running offline in academic testbed),
 *   initializes a high-fidelity Mongoose-compatible data store seeded with the mock data
 * - Exposes unified access so handlers and routes write pure MongoDB queries
 */

const mongoose = require('mongoose');
const { seedInventory, seedWarehouses, seedCollections, seedUsers } = require('./seedData');

let isConnectedToMongo = false;
let memoryStore = {
  inventory: [],
  warehouses: [],
  collections: [],
  users: [],
};

// Seed initial memory store
function initMemoryStore() {
  let idCounter = 1;
  memoryStore.inventory = seedInventory.map(item => ({
    ...item,
    _id: `inv_${idCounter++}`,
    createdAt: item.lastUpdated || new Date(),
    updatedAt: item.lastUpdated || new Date()
  }));

  idCounter = 1;
  memoryStore.warehouses = seedWarehouses.map(w => {
    const percent = Math.min(100, Math.round((w.currentStock / w.totalCapacity) * 100));
    return {
      ...w,
      _id: `wh_${idCounter++}`,
      capacityUsedPercent: percent,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });

  idCounter = 1;
  memoryStore.collections = seedCollections.map(c => ({
    ...c,
    _id: `col_${idCounter++}`,
    createdAt: c.collectionDate || new Date(),
    updatedAt: c.collectionDate || new Date()
  }));

  idCounter = 1;
  memoryStore.users = seedUsers.map(u => ({
    ...u,
    _id: `usr_${idCounter++}`,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
}

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gotera';
  initMemoryStore();

  try {
    // Attempt Mongoose connection with short timeout to not block startup
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnectedToMongo = true;
    console.log(`[MongoDB in Action] Connected to MongoDB database successfully: ${uri}`);
    await seedMongoDatabase();
  } catch (err) {
    console.warn(`[MongoDB in Action] Notice: Local/Remote MongoDB instance not detected (${err.message}).`);
    console.log(`[MongoDB in Action] Initialized Gotera educational persistence layer with preloaded seed data.`);
    isConnectedToMongo = false;
  }
}

async function seedMongoDatabase() {
  try {
    const InventoryItem = require('../models/InventoryItem');
    const Warehouse = require('../models/Warehouse');
    const CollectionRecord = require('../models/CollectionRecord');
    const User = require('../models/User');

    const invCount = await InventoryItem.countDocuments();
    if (invCount === 0) {
      await InventoryItem.insertMany(seedInventory);
      console.log('[MongoDB in Action] Seeded initial InventoryItems to MongoDB collection.');
    }

    const whCount = await Warehouse.countDocuments();
    if (whCount === 0) {
      await Warehouse.insertMany(seedWarehouses);
      console.log('[MongoDB in Action] Seeded initial Warehouses to MongoDB collection.');
    }

    const colCount = await CollectionRecord.countDocuments();
    if (colCount === 0) {
      await CollectionRecord.insertMany(seedCollections);
      console.log('[MongoDB in Action] Seeded initial CollectionRecords to MongoDB collection.');
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(seedUsers);
      console.log('[MongoDB in Action] Seeded initial Users to MongoDB collection.');
    }
  } catch (seedErr) {
    console.error('Error seeding MongoDB collections:', seedErr.message);
  }
}

function getMemoryStore() {
  return memoryStore;
}

function getIsConnected() {
  return isConnectedToMongo;
}

module.exports = {
  connectDB,
  getMemoryStore,
  getIsConnected,
};
