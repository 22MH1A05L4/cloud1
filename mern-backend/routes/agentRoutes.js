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

// Public route
router.post('/register', protect, registerAgent);

// Protected routes
router.get('/profile', protect, getAgentProfile);
router.get('/agents', getAgents);
router.put('/:id', protect, updateAgent);
router.delete('/:id', protect, isAdmin, deleteAgent);
router.get('/agent-distribution', getTaskDistribution);
router.post('/login',loginAgent);
module.exports = router;
