const express = require("express");
const router = express.Router();
const { register, login, forgotPassword, resetPassword, changePassword } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

// @route   POST /api/auth/register
// @desc    Register a new admin user
// @access  Public
router.post("/register", register);

// @route   POST /api/auth/login
// @desc    Login admin user
// @access  Public
router.post("/login", login);

// @route   POST /api/auth/forgot-password
// @desc    Forgot password
// @access  Public
router.post("/forgot-password", forgotPassword);

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post("/reset-password", resetPassword);

// @route   POST /api/auth/change-password
// @desc    Change password (requires authentication)
// @access  Private
router.post("/change-password", protect, changePassword);

module.exports = router;
