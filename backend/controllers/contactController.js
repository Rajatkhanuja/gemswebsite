const mongoose = require("mongoose"); // Ensure this line is present
const Contact = require("../models/Contact");

// POST: Submit contact form
const submitContact = async (req, res) => {
  const { name, phoneNumber, message } = req.body; // Changed 'email' to 'phoneNumber'

  try {
    const newContact = new Contact({ name, phoneNumber, message }); // Changed 'email' to 'phoneNumber'
    await newContact.save();
    res.status(201).json({ message: "Contact submitted successfully", contact: newContact });
  } catch (error) {
    res.status(500).json({ message: "Error submitting contact form", error });
  }
};

// GET: Fetch all contact submissions (Admin only)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact submissions", error });
  }
};

// DELETE: Delete a contact submission by ID (Admin only)
const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID format" });
    }

    // Use findByIdAndDelete with error handling
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully", contact: deletedContact });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({ message: "Error deleting contact", error: error.message });
  }
};

module.exports = { submitContact, getContacts, deleteContact };