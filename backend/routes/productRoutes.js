const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// CRUD Routes
router.post("/", protect, createProduct); // Create product (protected)
router.get("/", getProducts); // Get all products (public)
router.get("/:id", getProductById); // Get product by ID (public)
router.put("/:id", protect, updateProduct); // Update product (protected)
router.delete("/:id", protect, deleteProduct); // Delete product (protected)

module.exports = router;
