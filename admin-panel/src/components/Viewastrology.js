import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const ViewAstrology = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  // ✅ Fetch Astrology Services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/pujas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // ✅ Delete Service (No confirmation, direct delete)
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/pujas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(services.filter((service) => service._id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  // ✅ Update Service
  const handleUpdate = (id) => {
   navigate(`/admin/update-view/${id}`);
  };

  return (
    <div className="view-astrology-container">
      {/* ✅ Navbar */}
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

      {/* ✅ Content - Table Layout */}
      <div className="astrology-list-container">
        <h1 className="list-title">Astrology Services</h1>

        {loading ? (
          <div className="loading-container">
            <p>Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="no-services-container">
            <p>No astrology services found.</p>
          </div>
        ) : (
          <div className="table-container">
            {/* Desktop Table */}
            <table className="services-table desktop-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id}>
                    <td>
                      {service.image && (
                        <img
                          src={
                            service.image?.includes("http")
                              ? service.image
                              : `${API_BASE_URL}/uploads/${service.image}`
                          }
                          alt={service.name}
                          className="service-image"
                        />
                      )}
                    </td>
                    <td className="service-name">{service.name}</td>
                    <td className="service-description">{service.description}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleUpdate(service._id)}
                          className="update-btn"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Cards */}
            <div className="mobile-cards">
              {services.map((service) => (
                <div key={service._id} className="mobile-service-card">
                  <div className="mobile-field">
                    <label>Image:</label>
                    <div className="mobile-value">
                      {service.image && (
                        <img
                          src={
                            service.image?.includes("http")
                              ? service.image
                              : `${API_BASE_URL}/uploads/${service.image}`
                          }
                          alt={service.name}
                          className="mobile-service-image"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="mobile-field">
                    <label>Name:</label>
                    <div className="mobile-value">{service.name}</div>
                  </div>
                  
                  <div className="mobile-field">
                    <label>Description:</label>
                    <div className="mobile-value">{service.description}</div>
                  </div>
                  
                  <div className="mobile-field">
                    <label>Actions:</label>
                    <div className="mobile-value">
                      <div className="mobile-action-buttons">
                        <button
                          onClick={() => handleUpdate(service._id)}
                          className="update-btn"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ✅ CSS */}
      <style jsx>{`
        /* ==== NAVBAR ==== */
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

        /* ==== CONTENT ==== */
        .astrology-list-container {
          max-width: 1200px;
          margin: 3rem auto;
          padding: 1rem;
        }
        .list-title {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2rem;
          font-weight: bold;
          color: #333;
        }
        .loading-container,
        .no-services-container {
          text-align: center;
          padding: 2rem;
          font-size: 1.1rem;
          color: #666;
        }

        /* ==== DESKTOP TABLE ==== */
        .table-container {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .services-table {
          width: 100%;
          border-collapse: collapse;
        }
        .services-table th {
          background: #f8f9fa;
          color: #333;
          font-weight: 600;
          padding: 15px 12px;
          text-align: left;
          border-bottom: 2px solid #dee2e6;
        }
        .services-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #dee2e6;
          vertical-align: top;
        }
        .services-table tbody tr:hover {
          background: #f8f9fa;
        }
        .service-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }
        .service-name {
          font-weight: 600;
          color: #333;
          min-width: 150px;
        }
        .service-description {
          color: #666;
          line-height: 1.4;
          max-width: 300px;
        }
        .action-buttons {
          display: flex;
          gap: 8px;
        }
        .update-btn {
          background: #007bff;
          color: white;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .update-btn:hover {
          background: #0056b3;
        }
        .delete-btn {
          background: #ff4747;
          color: white;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .delete-btn:hover {
          background: #e63939;
        }

        /* ==== MOBILE CARDS ==== */
        .mobile-cards {
          display: none;
        }
        .mobile-service-card {
          background: white;
          border-radius: 8px;
          margin-bottom: 1rem;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .mobile-field {
          display: flex;
          border-bottom: 1px solid #eee;
        }
        .mobile-field:last-child {
          border-bottom: none;
        }
        .mobile-field label {
          background: #f8f9fa;
          padding: 12px 15px;
          font-weight: 600;
          color: #333;
          min-width: 80px;
          display: flex;
          align-items: flex-start;
          border-right: 1px solid #eee;
        }
        .mobile-value {
          padding: 12px 15px;
          flex: 1;
          display: flex;
          align-items: flex-start;
        }
        .mobile-service-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
        }
        .mobile-action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* ==== RESPONSIVE ==== */
        @media (max-width: 768px) {
          .desktop-table {
            display: none;
          }
          .mobile-cards {
            display: block;
          }
          .list-title {
            font-size: 1.5rem;
          }
          .astrology-list-container {
            margin: 2rem auto;
            padding: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .mobile-field {
            flex-direction: column;
          }
          .mobile-field label {
            min-width: auto;
            border-right: none;
            border-bottom: 1px solid #eee;
          }
          .mobile-action-buttons {
            flex-direction: column;
          }
          .update-btn,
          .delete-btn {
            width: 100%;
            padding: 8px 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewAstrology;