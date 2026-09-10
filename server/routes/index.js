/**
 * routes/index.js
 * Aligned with 'Web Development with Node and Express' (Ethan Brown)
 * 
 * Central routing registry assembling sub-routers
 */

const express = require('express');
const router = express.Router();

const inventoryRouter = require('./api/inventory');
const warehousesRouter = require('./api/warehouses');
const collectionsRouter = require('./api/collections');
const statsRouter = require('./api/stats');
const authRouter = require('./api/auth');

router.use('/inventory', inventoryRouter);
router.use('/warehouses', warehousesRouter);
router.use('/collections', collectionsRouter);
router.use('/stats', statsRouter);
router.use('/auth', authRouter);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Gotera National Emergency Management API' });
});

module.exports = router;
