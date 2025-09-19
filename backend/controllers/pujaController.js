// controllers/pujaController.js
const Puja = require("../models/pujaModel");
const path = require("path");
const fs = require("fs");

// Add Puja
exports.addPuja = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;

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
    const formatted = pujas.map((p) => ({
      ...p,
      image: p.image
        ? `${req.protocol}://${req.get("host")}/uploads/${p.image}`
        : null,
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get by ID
exports.getPujaById = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id);
    if (!puja) return res.status(404).json({ message: "Puja not found" });

    if (puja.image)
      puja.image = `${req.protocol}://${req.get("host")}/uploads/${puja.image}`;
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
      // remove old image
      if (puja.image) {
        const oldPath = path.join(__dirname, "..", "uploads", puja.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      puja.image = req.file.filename;
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

    if (puja.image) {
      const imgPath = path.join(__dirname, "..", "uploads", puja.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Puja.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
