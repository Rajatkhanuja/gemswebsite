import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ clear token
    navigate("/admin/login"); // ✅ redirect to login
  };

  return (
    <div className="dashboard-container">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-links desktop-menu">
          <li><a href="/admin/view-gems">View & Update Gems</a></li>
          <li><a href="/admin/add-gems">Add Gems</a></li>
          <li><a href="/admin/view-astrology">View & Update Astrology Services</a></li>
          <li><a href="/admin/add-astrology">Add Astrology Services</a></li>
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
            <li><a href="/admin/add-gems" onClick={toggleMobileMenu}>Add Gems</a></li>
            <li><a href="/admin/view-astrology" onClick={toggleMobileMenu}>View & Update Astrology Services</a></li>
            <li><a href="/admin/add-astrology" onClick={toggleMobileMenu}>Add Astrology Services</a></li>
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

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome to Gem's and Astrology's Admin Panel</h1>
      </div>

      {/* ✅ CSS */}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: #f5f5f5;
        }
        .dashboard-container {
          min-height: 100vh;
        }
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

export default Dashboard;
