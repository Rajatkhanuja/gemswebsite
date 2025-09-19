import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./UpdateGem.css";   // <-- Custom CSS file import

const UpdateGem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    originalPrice: "",
    cutPrice: "",
    weight: "",
    description: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // ✅ Fetch existing gem
  useEffect(() => {
    const fetchGem = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/gems/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          name: res.data.name || "",
          type: res.data.type || "",
          originalPrice: res.data.originalPrice || "",
          cutPrice: res.data.cutPrice || "",
          weight: res.data.weight || "",
          description: res.data.description || "",
          image1: null,
          image2: null,
          image3: null,
          image4: null,
          image5: null,
        });

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        setLoading(false);
        setNotification({ type: "error", message: "Failed to fetch gem data!" });
      }
    };

    fetchGem();
  }, [id]);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });

      await axios.patch(`http://localhost:5000/api/gems/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setNotification({ type: "success", message: "Gem updated successfully ✅" });

      setTimeout(() => {
        navigate("/admin/view-gems");
      }, 2000);
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      setNotification({ type: "error", message: "Failed to update gem ❌" });
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="update-gem-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="update-gem-card"
      >
        <h2>Update Gem</h2>

        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`notification ${notification.type}`}
          >
            {notification.message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="update-gem-form">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" />
          <input name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight" />
          <input
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            placeholder="Original Price"
          />
          <input
            name="cutPrice"
            value={formData.cutPrice}
            onChange={handleChange}
            placeholder="Cut Price"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />

          {/* Image Uploads */}
          <div className="image-grid">
            <div className="file-group">
              <label>Image 1:</label>
              <input type="file" name="image1" onChange={handleChange} />
            </div>
            <div className="file-group">
              <label>Image 2:</label>
              <input type="file" name="image2" onChange={handleChange} />
            </div>
            <div className="file-group">
              <label>Image 3:</label>
              <input type="file" name="image3" onChange={handleChange} />
            </div>
            <div className="file-group">
              <label>Image 4:</label>
              <input type="file" name="image4" onChange={handleChange} />
            </div>
            <div className="file-group">
              <label>Image 5:</label>
              <input type="file" name="image5" onChange={handleChange} />
            </div>
          </div>

          <button type="submit">Update Gem</button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateGem;
