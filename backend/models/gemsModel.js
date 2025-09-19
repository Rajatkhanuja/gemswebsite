const mongoose = require("mongoose");

const gemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    originalPrice: { type: String, required: true, trim: true },
    cutPrice: { type: String, required: true, trim: true },
    weight: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    // Images as an object
    images: {
      image1: { type: String },
      image2: { type: String },
      image3: { type: String },
      image4: { type: String },
      image5: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gem", gemSchema);
