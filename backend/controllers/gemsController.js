const Gem = require("../models/gemsModel");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

// Add Gem
exports.addGem = async (req, res) => {
  try {
    const { name, type, originalPrice, cutPrice, weight, description } = req.body;

    // Store images
    const images = {};
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        images[key] = req.files[key][0].filename; // only save filename
      });
    }

    const gem = new Gem({
      name,
      type,
      originalPrice,
      cutPrice,
      weight,
      description,
      images,
    });

    const savedGem = await gem.save();
    res.status(201).json({ message: "Gem added successfully", gem: savedGem });
  } catch (err) {
    console.error("Add gem error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Get all Gems
exports.getGems = async (req, res) => {
  try {
    const gems = await Gem.find().sort({ createdAt: -1 });

    const formatted = gems.map((g) => {
      const obj = g.toObject();
      if (obj.images) {
        Object.keys(obj.images).forEach((key) => {
          if (obj.images[key]) {
            obj.images[key] = `${req.protocol}://${req.get("host")}/uploads/${obj.images[key]}`;
          }
        });
      }
      return obj;
    });

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Get gems error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get Gem by ID
exports.getGemById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const gem = await Gem.findById(id);
    if (!gem) return res.status(404).json({ message: "Gem not found" });

    const obj = gem.toObject();
    if (obj.images) {
      Object.keys(obj.images).forEach((key) => {
        if (obj.images[key]) {
          obj.images[key] = `${req.protocol}://${req.get("host")}/uploads/${obj.images[key]}`;
        }
      });
    }

    res.status(200).json(obj);
  } catch (err) {
    console.error("Get gem by ID error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update Gem
exports.updateGem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const gem = await Gem.findById(id);
    if (!gem) return res.status(404).json({ message: "Gem not found" });

    const fields = ["name", "type", "originalPrice", "cutPrice", "weight", "description"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) gem[field] = req.body[field];
    });

    // Update images if uploaded
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        // Delete old image if exists
        if (gem.images && gem.images[key]) {
          const oldPath = path.join(__dirname, "..", "uploads", gem.images[key]);
          fs.unlink(oldPath, (err) => {
            if (err) console.warn(`Failed to delete old ${key}:`, err.message);
          });
        }
        gem.images[key] = req.files[key][0].filename;
      });
    }

    const updatedGem = await gem.save();
    res.status(200).json(updatedGem);
  } catch (err) {
    console.error("Update gem error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete Gem + remove local images safely
exports.deleteGem = async (req, res) => {
  try {
    const gem = await Gem.findById(req.params.id);
    if (!gem) return res.status(404).json({ message: "Gem not found" });

    if (gem.images) {
      Object.keys(gem.images).forEach((key) => {
        const fileName = gem.images[key];
        if (fileName) {
          const filePath = path.join(__dirname, "..", "uploads", fileName);
          fs.unlink(filePath, (err) => {
            if (err) console.warn(`Failed to delete ${key}:`, err.message);
          });
        }
      });
    }

    await Gem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "✅ Gem deleted successfully" });
  } catch (err) {
    console.error("Delete gem error:", err);
    res.status(500).json({ message: "❌ Failed to delete gem" });
  }
};
