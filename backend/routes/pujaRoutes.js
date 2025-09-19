// routes/pujaRoutes.js
const express = require("express");
const router = express.Router();
const uploadPuja = require("../middleware/multerPuja");
const {
  addPuja,
  getAllPujas,
  getPujaById,
  updatePuja,
  deletePuja,
} = require("../controllers/pujaController");

// Routes
router.post("/", uploadPuja, addPuja); // add with image
router.get("/", getAllPujas);
router.get("/:id", getPujaById);
router.patch("/:id", uploadPuja, updatePuja); // update with image
router.delete("/:id", deletePuja);

module.exports = router;
