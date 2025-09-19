// server.js
const express = require("express");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRouter");
const gemsRoutes = require("./routes/gemsRouter");
const pujaRoutes = require("./routes/pujaRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ MongoDB connection
connectDB();

// ✅ Enable CORS (includes PATCH)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// ✅ JSON parsing
app.use(express.json());

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ✅ Test route
app.get("/", (req, res) => res.send("API running"));

// ✅ Routes
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/gems", gemsRoutes);
app.use("/api/pujas", pujaRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
