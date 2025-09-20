import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import axios from "axios";

const ViewGems = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const [expandedRow, setExpandedRow] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: "", message: "" }), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  const fetchGems = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/api/gems`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGems(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      showNotification("error", "Failed to fetch gems!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/gems/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showNotification("success", "✅ Gem deleted successfully!");
      setGems(gems.filter((gem) => gem._id !== id));
    } catch (err) {
      console.error(err);
      showNotification("error", "❌ Failed to delete gem!");
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/admin/update-gem/${id}`;
  };

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="dashboard-container">
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-content">
            <span className="notification-message">{notification.message}</span>
            <button
              className="notification-close"
              onClick={() => setNotification({ show: false, type: "", message: "" })}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <ul className="navbar-links desktop-menu">
          <li><a href="/admin/view-gems">View & Update Gems</a></li>
          <li><a href="/admin/add-gems">Add Gems</a></li>
          <li><a href="/admin/view-astrology">View & Update Astrology</a></li>
          <li><a href="/admin/update-astrology">Add Astrology</a></li>
          <li><a href="/admin/contact-info">Contact Info</a></li>
        </ul>

        <button onClick={handleLogout} className="logout-btn desktop-logout">
          Logout
        </button>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
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
            <li><a href="/admin/view-astrology" onClick={toggleMobileMenu}>View & Update Astrology</a></li>
            <li><a href="/admin/update-astrology" onClick={toggleMobileMenu}>Add Astrology</a></li>
            <li><a href="/admin/contact-info" onClick={toggleMobileMenu}>Contact Info</a></li>
          </ul>
          <button onClick={handleLogout} className="logout-btn mobile-logout">Logout</button>
        </div>
      </nav>

      {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}

      {/* Gems List Table */}
      <div className="dashboard-content">
        <h2>All Gems</h2>
        {loading ? (
          <p>Loading...</p>
        ) : gems.length === 0 ? (
          <p>No gems found.</p>
        ) : (
          <div className="table-responsive">
            <table className="gem-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Weight</th>
                  <th>Price</th>
                  <th>Photos</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {gems.map((gem) => (
                  <React.Fragment key={gem._id}>
                    <tr>
                      <td>{gem.name}</td>
                      <td>{gem.type}</td>
                      <td>{gem.weight}</td>
                      <td>
                        <span className="cut-price">₹{gem.originalPrice}</span> ₹{gem.cutPrice}
                      </td>
                      <td>
                        <button className="photo-btn" onClick={() => toggleExpand(gem._id)}>
                          {expandedRow === gem._id ? "Hide Photos" : "View Photos"}
                        </button>
                      </td>
                      <td>
                        <button className="update-btn" onClick={() => handleUpdate(gem._id)}>✏️</button>
                        <button className="delete-btn" onClick={() => handleDelete(gem._id)}>🗑️</button>
                      </td>
                    </tr>
                    {expandedRow === gem._id && (
                      <tr className="photo-row">
                        <td colSpan="6">
                          <div className="photo-gallery">
                            {gem.images?.image1 && <img src={gem.images.image1} alt="gem" />}
                            {gem.images?.image2 && <img src={gem.images.image2} alt="gem" />}
                            {gem.images?.image3 && <img src={gem.images.image3} alt="gem" />}
                            {gem.images?.image4 && <img src={gem.images.image4} alt="gem" />}
                            {gem.images?.image5 && <img src={gem.images.image5} alt="gem" />}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .dashboard-container { min-height:100vh; background:#f5f5f5; }
        .dashboard-content { max-width:1100px; margin:2rem auto; padding:1rem; background:#fff; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1); }
        h2 { text-align:center; margin-bottom:1.5rem; }

        .table-responsive { overflow-x:auto; }

        .gem-table { width:100%; border-collapse:collapse; min-width:600px; }
        .gem-table th, .gem-table td { border-bottom:1px solid #ddd; padding:12px; text-align:center; }
        .gem-table th { background:#f0f0f0; }
        .cut-price { text-decoration:line-through; color:#888; margin-right:0.5rem; }

        .photo-btn { background:#ef4444; color:white; padding:6px 12px; border:none; border-radius:4px; cursor:pointer; font-weight:500; }
        .photo-btn:hover { background:#d93c3c; }

        .update-btn, .delete-btn { border:none; padding:6px 10px; border-radius:4px; cursor:pointer; margin:0 4px; }
        .update-btn { background:#222; color:white; }
        .update-btn:hover { background:#444; }
        .delete-btn { background:#ef4444; color:white; }
        .delete-btn:hover { background:#d93c3c; }

        .photo-row td { background:#fafafa; }
        .photo-gallery { display:flex; gap:10px; justify-content:center; padding:10px 0; flex-wrap:wrap; }
        .photo-gallery img { width:120px; height:100px; object-fit:cover; border-radius:6px; border:1px solid #ddd; }

        /* Notification */
        .notification { position:fixed; top:20px; right:20px; z-index:10000; min-width:250px; border-radius:6px; padding:12px 16px; color:#fff; font-weight:500; display:flex; justify-content:space-between; align-items:center; box-shadow:0 0 10px rgba(0,0,0,0.2); }
        .notification.success { background:#28a745; }
        .notification.error { background:#dc3545; }
        .notification-close { background:none; border:none; color:#fff; font-size:16px; cursor:pointer; }

        /* Navbar styles */
        .navbar { background:#222; color:white; height:70px; display:flex; justify-content:space-between; align-items:center; padding:0 2rem; position:relative; z-index:1000; }
        .navbar-left { display:flex; align-items:center; gap:0.8rem; }
        .logo { height:40px; width:40px; object-fit:contain; border-radius:4px; }
        .desktop-menu { display:flex; gap:1.5rem; list-style:none; }
        .desktop-menu a { color:white; text-decoration:none; font-weight:500; padding:8px 12px; border-radius:4px; }
        .desktop-menu a:hover { color:#ffcc00; background:rgba(255,204,0,0.1); }
        .logout-btn { background:#ff4747; border:none; color:white; padding:8px 14px; border-radius:6px; cursor:pointer; font-weight:600; }
        .logout-btn:hover { background:#e63939; }
        .mobile-menu-toggle { display:none; background:none; border:none; cursor:pointer; }
        .hamburger { width:24px; height:18px; display:flex; flex-direction:column; justify-content:space-between; }
        .hamburger span { display:block; width:100%; height:3px; background:white; border-radius:2px; transition:all 0.3s ease; }
        .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(6px,6px); }
        .hamburger.active span:nth-child(2) { opacity:0; }
        .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(6px,-6px); }
        .mobile-menu { display:none; position:absolute; top:100%; left:0; right:0; background:#222; border-top:1px solid #444; padding:1rem 2rem; z-index:999; }
        .mobile-menu.active { display:block; }
        .mobile-navbar-links { list-style:none; margin:0; padding:0; margin-bottom:1rem; }
        .mobile-navbar-links a { color:white; text-decoration:none; font-weight:500; display:block; padding:12px 0; border-bottom:1px solid #444; }
        .mobile-navbar-links a:hover { color:#ffcc00; }
        .mobile-logout { width:100%; margin-top:1rem; }
        .mobile-menu-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.5); z-index:998; }

        @media (max-width:768px) { 
          .desktop-menu, .desktop-logout { display:none; } 
          .mobile-menu-toggle { display:block; } 
          .gem-table th, .gem-table td { font-size:14px; padding:8px; }
          .photo-gallery img { width:80px; height:70px; }
        }
      `}</style>
    </div>
  );
};

export default ViewGems;
