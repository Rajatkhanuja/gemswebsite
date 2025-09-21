const Gem = require("../models/gemsModel");
const mongoose = require("mongoose");

// Add Gem
exports.addGem = async (req, res) => {
  try {
    const { name, type, originalPrice, cutPrice, weight, description } = req.body;

    // Cloudinary image URLs store karna
    const images = {};
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        images[key] = req.files[key][0].path; // Cloudinary gives `path` = secure URL
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
    res.status(201).json({
      message: "✅ Gem added successfully",
      gem: savedGem,
    });
  } catch (err) {
    console.error("Add gem error:", err);
    res.status(400).json({ message: err.message });
  }
};

// Get all Gems
exports.getGems = async (req, res) => {
  try {
    const gems = await Gem.find().sort({ createdAt: -1 });
    res.status(200).json(gems); // Already have Cloudinary URLs
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

    res.status(200).json(gem);
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

    // Update Cloudinary images if uploaded
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        gem.images[key] = req.files[key][0].path; // Cloudinary secure URL
      });
    }

    const updatedGem = await gem.save();
    res.status(200).json(updatedGem);
  } catch (err) {
    console.error("Update gem error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete Gem
exports.deleteGem = async (req, res) => {
  try {
    const gem = await Gem.findById(req.params.id);
    if (!gem) return res.status(404).json({ message: "Gem not found" });

    await Gem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "✅ Gem deleted successfully" });
  } catch (err) {
    console.error("Delete gem error:", err);
    res.status(500).json({ message: "❌ Failed to delete gem" });
  }
};
