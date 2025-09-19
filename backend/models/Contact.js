const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    // Optional: Add a regex to ensure only digits are entered
    match: /^\d{10}$/ // Ensures exactly 10 digits
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", contactSchema);