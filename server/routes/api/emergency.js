const express = require('express');
const router = express.Router();
const emergencyHandlers = require('../../handlers/emergencyHandlers');

router.get('/', emergencyHandlers.listRequests);
router.post('/', emergencyHandlers.createRequest);
router.put('/:id', emergencyHandlers.updateRequest);
router.delete('/:id', emergencyHandlers.deleteRequest);

module.exports = router;
