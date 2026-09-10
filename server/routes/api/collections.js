/**
 * routes/api/collections.js
 * Aligned with 'Web Development with Node and Express' (Ethan Brown)
 */

const express = require('express');
const router = express.Router();
const handlers = require('../../handlers/collectionHandlers');

router.route('/')
  .get(handlers.listCollections)
  .post(handlers.createCollection);

router.route('/:id')
  .get(handlers.getCollection)
  .put(handlers.updateCollection)
  .delete(handlers.deleteCollection);

module.exports = router;
