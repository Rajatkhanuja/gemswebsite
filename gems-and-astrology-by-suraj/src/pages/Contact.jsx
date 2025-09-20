import React, { useState } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa"; // WhatsApp icon

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const whatsappNumber = "+917568596521"; // Apna number daalo
  const whatsappMessage = "Hello! I am interested in knowing which gemstones suit my zodiac sign. Can you guide me?";

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      await axios.post(`${API_BASE_URL}/api/contact/submit`, formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", phoneNumber: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message. Try again.");
    }
  };

  return (
    <div className="contact-page" style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Contact Us</h2>

      {/* Contact Info Section - moved above form */}
      <div style={{ textAlign: "center", marginBottom: "2rem", lineHeight: "1.6" }}>
        <p><strong> Gems And Astrology By Suraj</strong></p>
        <p><strong>Address:</strong> Fatehnagar, Udaipur, Rajasthan 313205</p>
        <p><strong>Email:</strong> Sparashar7568@gmail.com</p>
        <p><strong>Phone:</strong> +91 7568596521</p>
        <p><strong>Follow us:</strong></p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "0.5rem",
            backgroundColor: "#25D366",
            color: "#fff",
            padding: "8px",
            borderRadius: "50%",
            textDecoration: "none",
          }}
        >
          <FaWhatsapp size={20} />
        </a>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          style={{ padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          style={{ padding: "0.75rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            borderRadius: "5px",
            backgroundColor: "#25D366",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send Message
        </button>
      </form>

      {status && <p style={{ textAlign: "center", marginTop: "1rem" }}>{status}</p>}
    </div>
  );
}
