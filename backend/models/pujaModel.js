// models/pujaModel.js
const mongoose = require("mongoose");

const pujaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String }, // filename stored
  },
  { timestamps: true }
);

module.exports = mongoose.model("Puja", pujaSchema);
