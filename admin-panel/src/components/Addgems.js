import React, { useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";

const Addgems = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    originalPrice: "",
    cutPrice: "",
    weight: "",
    description: "",
  });
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });
  const [message, setMessage] = useState("");

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      Object.keys(images).forEach((key) => {
        if (images[key]) data.append(key, images[key]);
      });

      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_BASE_URL}/api/gems`, data, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });

      setMessage("Gem added successfully!");
      setFormData({
        name: "",
        type: "",
        originalPrice: "",
        cutPrice: "",
        weight: "",
        description: "",
      });
      setImages({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error adding gem!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
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
          <li><a href="/admin/view-astrology">View & Update Astrology</a></li>
          <li><a href="/admin/update-astrology">Add Astrology</a></li>
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
            <li><a href="/admin/view-astrology" onClick={toggleMobileMenu}>View & Update Astrology</a></li>
            <li><a href="/admin/update-astrology" onClick={toggleMobileMenu}>Add Astrology</a></li>
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
      <div className="dashboard-content">
        <h2>Add New Gem</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit} className="gem-form">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
          <input type="text" name="originalPrice" placeholder="Original Price" value={formData.originalPrice} onChange={handleChange} required />
          <input type="text" name="cutPrice" placeholder="Cut Price" value={formData.cutPrice} onChange={handleChange} required />
          <input type="text" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="file" name="image1" onChange={handleImageChange} />
          <input type="file" name="image2" onChange={handleImageChange} />
          <input type="file" name="image3" onChange={handleImageChange} />
          <input type="file" name="image4" onChange={handleImageChange} />
          <input type="file" name="image5" onChange={handleImageChange} />
          <button type="submit">Add Gem</button>
        </form>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* General Reset */
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif; background:#f5f5f5; }
        .dashboard-container { min-height: 100vh; }
        .dashboard-content { max-width:600px; margin:2rem auto; padding:1rem; background:#fff; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1); text-align:center; }
        .gem-form input, .gem-form textarea { display:block; width:100%; margin-bottom:1rem; padding:8px 10px; border-radius:4px; border:1px solid #ccc; }
        .gem-form button { padding:10px 15px; background:#222; color:#fff; border:none; border-radius:4px; cursor:pointer; }
        .gem-form button:hover { background:#444; }
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
        @media (max-width:768px) { .desktop-menu, .desktop-logout { display:none; } .mobile-menu-toggle { display:block; } }
      `}</style>
    </div>
  );
};

export default Addgems;
