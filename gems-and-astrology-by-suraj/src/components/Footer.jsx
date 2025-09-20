import React from "react";
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import logo from "../assets/logo.png"; // logo import
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* About Us with Logo */}
        <div className="footer-section about">
          <img src={logo} alt="Gems and Astrology Logo" className="footer-logo" />
          <h3>Gems & Astrology By Suraj</h3>
          <p>
            Your trusted partner in spiritual guidance and gemstone consultation. 
            We combine ancient wisdom with modern insights to help you discover 
            your true potential and navigate life's journey with confidence and clarity.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/shop">Products/Shop</Link></li>
            <li><Link to="/services">Astrology Services</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-section contact">
          <h3>Get In Touch</h3>
          <p>
            <FaEnvelope /> 
            Sparashar7568@gmail.com
          </p>
          <p>
            <FaPhone /> 
            +91 75685 96521
          </p>
          <p>
            <FaMapMarkerAlt /> 
            Fatehnagar, Udaipur, Rajasthan 313205 
          </p>
          
          <div className="social-icons">
            <a
              href="https://wa.me/+917568596521"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Gems & Astrology By Suraj. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;