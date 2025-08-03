const express = require("express");
const router = express.Router();
const { registerAgent, loginAgent, getAgentProfile } = require("../controllers/agentController");
const protect = require("../middleware/authMiddleware");

// @route   POST /api/agents/register
// @desc    Register a new agent
// @access  Public
router.post("/register", registerAgent);

// @route   POST /api/agents/login
// @desc    Login agent
// @access  Public
router.post("/login", loginAgent);

// @route   GET /api/agents/profile
// @desc    Get agent profile
// @access  Private
router.get("/profile", protect, getAgentProfile);

module.exports = router;
