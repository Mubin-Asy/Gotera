const express = require('express');
const router = express.Router();
const distributionHandlers = require('../../handlers/distributionHandlers');

router.get('/', distributionHandlers.listDistributions);
router.post('/', distributionHandlers.createDistribution);
router.put('/:id', distributionHandlers.updateDistribution);
router.delete('/:id', distributionHandlers.deleteDistribution);

module.exports = router;
