/**
 * routes/api/warehouses.js
 * Aligned with 'Web Development with Node and Express' (Ethan Brown)
 */

const express = require('express');
const router = express.Router();
const handlers = require('../../handlers/warehouseHandlers');

router.route('/')
  .get(handlers.listWarehouses)
  .post(handlers.createWarehouse);

router.route('/:id')
  .get(handlers.getWarehouse)
  .put(handlers.updateWarehouse)
  .delete(handlers.deleteWarehouse);

module.exports = router;
