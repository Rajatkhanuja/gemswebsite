import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './ServiceDetail.css'; // Component ke saath

const ServiceDetail = () => {
  const { id } = useParams(); 
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/pujas/${id}`);
        setService(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("Failed to load service details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="service-detail-container">
        <div className="loading-spinner">
          <p>Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-detail-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-detail-container">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="service-detail-container">
        <div className="error-message">
          <p>Service not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="service-detail-container">
      <div className="service-detail-card">
        {/* Image Section */}
        {service.image && (
          <div className="service-image-container">
            <img 
              src={service.image} 
              alt={service.name}
              className="service-image"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* Content Section */}
        <div className="service-content">
          <h1 className="service-title">{service.name}</h1>
          <div className="service-description">
            <p>{service.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;