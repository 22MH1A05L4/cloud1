const express = require('express');
const router = express.Router();

const {
  registerAgent,
  getAgentProfile,
  getAgents,
  loginAgent,
  updateAgent,
  deleteAgent,
  getTaskDistribution,

} = require('../controllers/agentController');

const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// Public routes
router.post('/register', registerAgent);
router.post('/login', loginAgent);

// Protected routes
router.get('/profile', protect, getAgentProfile);
router.get('/agents', getAgents);
router.put('/:id', protect, updateAgent);
router.delete('/:id', protect, isAdmin, deleteAgent);
router.get('/agent-distribution', getTaskDistribution);

module.exports = router;
