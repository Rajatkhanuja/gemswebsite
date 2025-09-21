const Puja = require("../models/pujaModel");

// Add Puja
exports.addPuja = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.path : null; // Cloudinary gives URL in .path

    const puja = new Puja({ name, description, image });
    const saved = await puja.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Get all
exports.getAllPujas = async (req, res) => {
  try {
    const pujas = await Puja.find().sort({ createdAt: -1 }).lean();
    // No need to prepend local path, Cloudinary gives direct URL
    res.json(pujas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get by ID
exports.getPujaById = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id);
    if (!puja) return res.status(404).json({ message: "Puja not found" });

    res.json(puja);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updatePuja = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id);
    if (!puja) return res.status(404).json({ message: "Puja not found" });

    const { name, description } = req.body;
    if (name) puja.name = name;
    if (description) puja.description = description;

    if (req.file) {
      // Replace old image URL with new one
      puja.image = req.file.path;
    }

    const updated = await puja.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deletePuja = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id);
    if (!puja) return res.status(404).json({ message: "Puja not found" });

    // Optional: Cloudinary delete logic (if you want, need public_id stored separately)
    await Puja.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
