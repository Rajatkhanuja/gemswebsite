import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

const ContactInfo = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/contact/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(res.data);
      } catch (err) {
        console.error("Error fetching contacts:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Delete contact
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/contact/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting contact:", err.response?.data || err.message);
      alert("Failed to delete contact.");
    }
  };

  return (
    <div className="dashboard-container">
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

      {/* Content Section */}
      <div className="dashboard-content">
        <h2 className="dashboard-title">Contact Information</h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : contacts.length === 0 ? (
          <p style={{ textAlign: "center" }}>No contact information available.</p>
        ) : (
          <div className="cards-container">
            {contacts.map((c) => (
              <div className="contact-card" key={c._id}>
                <h3>{c.name}</h3>
                <p><strong>Phone:</strong> {c.phoneNumber}</p>
                <p><strong>Message:</strong> {c.message}</p>
                <p className="date">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
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

        /* Dashboard Content */
        .dashboard-content {
          text-align: center;
          margin-top: 4rem;
          padding: 0 1rem;
        }
        .dashboard-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
        }

        /* Contact Cards */
        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .contact-card {
          background: #fff;
          padding: 1.2rem;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          text-align: left;
        }
        .contact-card h3 {
          margin: 0 0 0.5rem;
          color: #222;
        }
        .contact-card p {
          margin: 0.3rem 0;
          color: #555;
        }
        .contact-card .date {
          font-size: 0.85rem;
          color: #888;
          margin-top: 0.5rem;
        }
        .delete-btn {
          margin-top: 1rem;
          background: #ff4747;
          border: none;
          color: white;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .delete-btn:hover {
          background: #e63939;
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

export default ContactInfo;
