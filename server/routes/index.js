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
const distributionsRouter = require('./api/distributions');
const emergencyRouter = require('./api/emergency');
const statsRouter = require('./api/stats');
const authRouter = require('./api/auth');
const usersRouter = require('./api/users');

router.use('/inventory', inventoryRouter);
router.use('/warehouses', warehousesRouter);
router.use('/collections', collectionsRouter);
router.use('/distributions', distributionsRouter);
router.use('/emergency', emergencyRouter);
router.use('/stats', statsRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Gotera National Emergency Management API' });
});

module.exports = router;
