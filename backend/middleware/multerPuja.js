const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage setup for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "pujas", // Cloudinary folder name
    allowed_formats: ["jpeg", "jpg", "png", "webp"],
  },
});

// Multer upload (single image, field name = image)
const uploadPuja = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

module.exports = uploadPuja.single("image");
