const express = require("express");
const router = express.Router();
const { submitContact, getContacts, deleteContact } = require("../controllers/contactController");
const authenticateToken = require("../middleware/auth");



// Route to submit contact form
router.post("/submit", submitContact);

// Route to fetch all contact data (protected route)
router.get("/all", authenticateToken, getContacts);

// Route to delete a contact submission by ID (protected route)
router.delete("/contact/:id", authenticateToken, deleteContact);

module.exports = router;
