// middleware/upload.js
const multer = require("multer");

// Cloudinary setup
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage setup for multiple images
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "gems", // Cloudinary folder name
      allowed_formats: ["jpeg", "jpg", "png", "webp"],
      public_id: Date.now() + "-" + file.originalname.split(".")[0],
    };
  },
});

// Multer with Cloudinary storage
const upload = multer({ storage });

// Multiple images (image1...image5)
module.exports = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
  { name: "image5", maxCount: 1 },
]);
