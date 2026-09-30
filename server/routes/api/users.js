/**
 * routes/api/users.js
 * User Governance, Approvals and Identity Management
 */

const express = require('express');
const router = express.Router();
const userHandlers = require('../../handlers/userHandlers');

router.get('/', userHandlers.listUsers);
router.patch('/:id/role', userHandlers.updateUserRole);
router.post('/:id/approve', userHandlers.approveUser);
router.delete('/:id', userHandlers.deleteUser);

module.exports = router;
