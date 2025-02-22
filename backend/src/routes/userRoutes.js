const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js"); // Import controller functions

const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all users
router.get("/", protect, getUsers);

// Get a user by ID
router.get("/:id", protect, getUserById);

// Create a new user
router.post("/", protect, createUser);

// Update a user
router.put("/:id", protect, updateUser);

// Delete a user
router.delete("/:id", protect, deleteUser);

module.exports = router;
