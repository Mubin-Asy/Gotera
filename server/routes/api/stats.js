/**
 * routes/api/stats.js
 * Aligned with 'Web Development with Node and Express' (Ethan Brown)
 */

const express = require('express');
const router = express.Router();
const handlers = require('../../handlers/statsHandlers');

router.get('/overview', handlers.getOverviewStats);

module.exports = router;
