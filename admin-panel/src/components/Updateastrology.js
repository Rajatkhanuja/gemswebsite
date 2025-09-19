import React, { useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";

const UpdateAstrology = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  // handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.post("http://localhost:5000/api/pujas", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("Astrology Service Added Successfully ✅");
      setErrorMessage("");
      setFormData({ name: "", description: "", image: null });
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add Astrology Service ❌");
      setSuccessMessage("");
    }
  };

  return (
    <div className="update-astrology-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-links desktop-menu">
          <li><a href="/admin/view-gems">View & Update Gems</a></li>
          <li><a href="/admin/Add-gems">Add Gems</a></li>
          <li><a href="/admin/view-astrology">View & Update Astrology Services</a></li>
          <li><a href="/admin/update-astrology">Add Astrology Services</a></li>
          <li><a href="/admin/contact-info">Contact Info</a></li>
        </ul>

        <button onClick={handleLogout} className="logout-btn desktop-logout">
          Logout
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="mobile-navbar-links">
            <li><a href="/admin/view-gems" onClick={toggleMobileMenu}>View & Update Gems</a></li>
            <li><a href="/admin/Add-gems" onClick={toggleMobileMenu}>Add Gems</a></li>
            <li><a href="/admin/view-astrology" onClick={toggleMobileMenu}>View & Update Astrology Services</a></li>
            <li><a href="/admin/update-astrology" onClick={toggleMobileMenu}>Add Astrology Services</a></li>
            <li><a href="/admin/contact-info" onClick={toggleMobileMenu}>Contact Info</a></li>
          </ul>
          <button onClick={handleLogout} className="logout-btn mobile-logout">
            Logout
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
      )}

      {/* Form Content */}
      <div className="astrology-form-container">
        <h1 className="form-title">Add Astrology Service</h1>

        {/* Success / Error Messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="astrology-form">
          <label>
            Service Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Upload Image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="submit-btn">
            Add Service
          </button>
        </form>
      </div>

      {/* CSS */}
      <style jsx>{`
        /* ==== NAVBAR (SAME AS ContactInfo) ==== */
        .navbar {
          background: #222;
          color: white;
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
          position: relative;
          z-index: 1000;
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .logo {
          height: 40px;
          width: 40px;
          object-fit: contain;
          border-radius: 4px;
        }
        .desktop-menu {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .desktop-menu a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 4px;
        }
        .desktop-menu a:hover {
          color: #ffcc00;
          background: rgba(255, 204, 0, 0.1);
        }
        .logout-btn {
          background: #ff4747;
          border: none;
          color: white;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .logout-btn:hover {
          background: #e63939;
        }
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .hamburger {
          width: 24px;
          height: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hamburger span {
          display: block;
          width: 100%;
          height: 3px;
          background: white;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }
        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #222;
          border-top: 1px solid #444;
          padding: 1rem 2rem;
          z-index: 999;
        }
        .mobile-menu.active {
          display: block;
        }
        .mobile-navbar-links {
          list-style: none;
          margin: 0;
          padding: 0;
          margin-bottom: 1rem;
        }
        .mobile-navbar-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          display: block;
          padding: 12px 0;
          border-bottom: 1px solid #444;
        }
        .mobile-navbar-links a:hover {
          color: #ffcc00;
        }
        .mobile-logout {
          width: 100%;
          margin-top: 1rem;
        }
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
        }

        @media (max-width: 768px) {
          .desktop-menu,
          .desktop-logout {
            display: none;
          }
          .mobile-menu-toggle {
            display: block;
          }
        }

        /* ==== FORM ==== */
        .astrology-form-container {
          max-width: 600px;
          margin: 3rem auto;
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
        }
        .form-title {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          font-weight: bold;
          color: #333;
        }
        .astrology-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        label {
          display: flex;
          flex-direction: column;
          font-weight: 500;
          color: #333;
        }
        input, textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
          margin-top: 5px;
        }
        textarea {
          min-height: 100px;
          resize: vertical;
        }
        .submit-btn {
          background: #222;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .submit-btn:hover {
          background: #444;
        }

        /* ==== SUCCESS / ERROR MESSAGE ==== */
        .success-message {
          color: green;
          font-weight: 600;
          margin-bottom: 1rem;
          text-align: center;
        }
        .error-message {
          color: red;
          font-weight: 600;
          margin-bottom: 1rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default UpdateAstrology;
