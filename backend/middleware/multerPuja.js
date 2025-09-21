const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, .png, .webp images allowed!"));
  }
};

const uploadPuja = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
}).single("image");

module.exports = uploadPuja;
