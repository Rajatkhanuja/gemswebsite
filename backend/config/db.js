// config/db.js
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) throw new Error("MONGO_URI missing");

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
