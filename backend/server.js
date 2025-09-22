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

// ✅ Allowed frontend domains
const allowedOrigins = [
  "https://www.gemsandastrologybysuraj.com", // frontend production
  "https://admin.gemsandastrologybysuraj.com", // admin production
  "http://localhost:3000",
  "http://localhost:3001",
  "https://gemswebsite.vercel.app",
  "https://gemswebsite-re47.vercel.app"
];

// ✅ Dynamic CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true); // Postman or server-to-server
    if(allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  credentials: true,
}));

// ✅ Handle preflight OPTIONS requests
app.options("*", cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true);
    if(allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  credentials: true,
}));

// ✅ JSON parsing
app.use(express.json());

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ✅ Test route
app.get("/", (req, res) => res.send("API running"));

// ✅ API routes
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/gems", gemsRoutes);
app.use("/api/pujas", pujaRoutes);

// ✅ Production URL redirect (optional but recommended)
app.use((req, res, next) => {
  if(req.headers.host === "gemsandastrologybysuraj.com") {
    return res.redirect(301, "https://www.gemsandastrologybysuraj.com" + req.originalUrl);
  }
  next();
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
