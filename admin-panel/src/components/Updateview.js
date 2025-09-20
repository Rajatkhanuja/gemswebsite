import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const UpdateView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "", // current image URL
  });
  const [selectedFile, setSelectedFile] = useState(null); // for new image

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  // Fetch existing service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/pujas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching service:", err);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Update service silently
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      if (selectedFile) data.append("image", selectedFile);

      await axios.patch(`${API_BASE_URL}/api/pujas/${id}`, data, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });

      // Navigate silently
      navigate("/admin/view-astrology");
    } catch (err) {
      console.error("Error updating service:", err);
      // optional: you can show error message in UI instead of alert
    }
  };


  return (
    <div className="update-container">
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

      {/* Form */}
      <div className="form-container">
        <h1>Update Astrology Service</h1>
        <input
          type="text"
          name="name"
          placeholder="Enter service name"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="image-section">
          <label>Current Image:</label>
          {formData.image && (
            <img
              src={formData.image}
              alt="Current"
              style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "10px" }}
            />
          )}
          <input type="file" onChange={handleFileChange} />
        </div>

        <button className="update-btn" onClick={handleUpdate}>Update</button>
      </div>

      {/* CSS */}
      <style jsx>{`
        /* Navbar Styles */
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

        /* Form Styles */
        .form-container {
          max-width: 500px;
          margin: 2rem auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        input, textarea {
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          width: 100%;
          font-size: 1rem;
        }
        .update-btn {
          background: #007bff;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .update-btn:hover {
          background: #0056b3;
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
      `}</style>
    </div>
  );
};

export default UpdateView;