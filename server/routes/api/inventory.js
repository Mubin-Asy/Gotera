/**
 * routes/api/inventory.js
 * Aligned with 'Web Development with Node and Express' (Ethan Brown)
 */

const express = require('express');
const router = express.Router();
const handlers = require('../../handlers/inventoryHandlers');

// RESTful endpoints for food inventory line items
router.route('/')
  .get(handlers.listItems)
  .post(handlers.createItem);

router.route('/:id')
  .get(handlers.getItem)
  .put(handlers.updateItem)
  .delete(handlers.deleteItem);

module.exports = router;
