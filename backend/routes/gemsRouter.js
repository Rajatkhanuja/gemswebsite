const express = require("express");
const router = express.Router();
const {
  addGem,
  getGems,
  getGemById,
  updateGem,
  deleteGem,
} = require("../controllers/gemsController");
const upload = require("../middleware/upload");

// Add Gem with multiple image uploads
router.post("/", upload, addGem);

// Get all gems
router.get("/", getGems);

// Get gem by ID
router.get("/:id", getGemById);

// Update gem (optional images)
router.patch("/:id", upload, updateGem);

// Delete gem
router.delete("/:id", deleteGem);

module.exports = router;
