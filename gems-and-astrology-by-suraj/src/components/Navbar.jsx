import React, { useState } from 'react';
import { Link } from "react-router-dom";

import logo from '../assets/logo.png';
import './navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
  <Link to="/">
    <img src={logo} alt="Logo" className="logo" />
  </Link>
</div>

      {/* Desktop Menu */}
      <div className="navbar-menu desktop-menu">
        <a href="/about" className="navbar-link">About Us</a>
        <a href="/shop" className="navbar-link">Products / Shop</a>
        <a href="/services" className="navbar-link">Astrology Services</a>
        <a href="/contact" className="navbar-link">Contact Us</a>
      </div>

      {/* Mobile Menu Button */}
      <div className="navbar-right-icons">
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <a href="/about" className="mobile-link" onClick={toggleMenu}>About Us</a>
        <a href="/shop" className="mobile-link" onClick={toggleMenu}>Products / Shop</a>
        <a href="/services" className="mobile-link" onClick={toggleMenu}>Astrology Services</a>
        <a href="/contact" className="mobile-link" onClick={toggleMenu}>Contact Us</a>
      </div>
    </nav>
  );
};

export default Navbar;
