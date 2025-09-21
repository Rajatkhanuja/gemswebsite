const Puja = require("../models/pujaModel");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// Add Puja
exports.addPuja = async (req, res) => {
  try {
    const { name, description } = req.body;
    let image = null;

    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer, "pujas");
    }

    const puja = new Puja({ name, description, image });
    const saved = await puja.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Get all Pujas
exports.getAllPujas = async (req, res) => {
  try {
    const pujas = await Puja.find().sort({ createdAt: -1 }).lean();
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

// Update Puja
exports.updatePuja = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id);
    if (!puja) return res.status(404).json({ message: "Puja not found" });

    const { name, description } = req.body;
    if (name) puja.name = name;
    if (description) puja.description = description;

    if (req.file) {
      puja.image = await uploadToCloudinary(req.file.buffer, "pujas");
    }

    const updated = await puja.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Puja
exports.deletePuja = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id);
    if (!puja) return res.status(404).json({ message: "Puja not found" });

    await Puja.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
