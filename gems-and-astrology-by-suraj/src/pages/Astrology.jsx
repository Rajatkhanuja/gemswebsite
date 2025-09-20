import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Navigate import added
import axios from "axios";
import logo from "../assets/logo.png";

const Astrology = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Navigate hook added

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // ✅ WhatsApp function added
  const openWhatsApp = (serviceName) => {
    const phoneNumber = "917568596521"; // 👈 apna WhatsApp number with country code
    const message = `Hello, I want to book the service: ${serviceName}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/pujas`);
        // Limit to first 3 services only
        setServices(res.data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching astrology services:", err);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading)
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: "1.1rem",
          padding: "2rem",
        }}
      >
        Loading...
      </p>
    );

  return (
    <div className="astrology-container">
      <h1>Our Astrology Services</h1>

      <div className="services-layout">
        {services.map((service, index) => (
          <div key={service._id} className="service-card">
            <div className="left-section">
              {service.image && (
                <div className="image-container">
                  <img src={service.image} alt={service.name} />
                </div>
              )}
              <h3 className="service-name">{service.name}</h3>
            </div>
            <div className="right-section">
              <p className="service-description">{service.description}</p>
              {/* ✅ Added action buttons */}
              <div className="service-actions">
                <button 
                  className="btn-primary" 
                  onClick={() => openWhatsApp(service.name)}
                >
                  Book Now
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => navigate(`/services/${service._id}`)}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .astrology-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 1rem;
          text-align: center;
        }

        h1 {
          margin-bottom: 3rem;
          font-size: 2.5rem;
          color: #2c3e50;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .services-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .service-card {
          background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          text-align: left;
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.15);
        }

        .left-section {
          flex: 0 0 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .right-section {
          flex: 1;
          display: flex;
          flex-direction: column; /* ✅ Changed to column for proper layout */
          justify-content: center;
          padding-left: 1rem;
          gap: 1.5rem; /* ✅ Added gap between description and buttons */
        }

        .image-container {
          width: 200px;
          height: 200px;
          overflow: hidden;
          border-radius: 12px;
          margin-bottom: 1rem;
          position: relative;
        }

        .service-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .service-card:hover img {
          transform: scale(1.05);
        }

        .service-name {
          margin: 0;
          font-size: 1.4rem;
          color: #007bff;
          font-weight: 600;
          line-height: 1.3;
          text-align: center;
          width: 100%;
        }

        .service-description {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.6;
          margin: 0;
          flex: 1; /* ✅ Take available space */
        }

        /* ✅ Action buttons styling */
        .service-actions {
          display: flex;
          gap: 1rem;
          margin-top: auto; /* ✅ Push buttons to bottom */
        }

        .btn-primary, .btn-secondary {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          flex: 1;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        /* Tablet responsive design */
        @media (max-width: 768px) {
          .astrology-container {
            padding: 1rem 0.5rem;
            margin: 1rem auto;
          }

          h1 {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .services-layout {
            gap: 1.5rem;
            max-width: 100%;
          }

          .service-card {
            padding: 1.25rem;
            gap: 1.5rem;
          }

          .left-section {
            flex: 0 0 200px;
          }

          .image-container {
            width: 160px;
            height: 160px;
          }

          .service-name {
            font-size: 1.25rem;
          }

          .service-description {
            font-size: 1rem;
          }

          .right-section {
            padding-left: 0.5rem;
          }

          .btn-primary, .btn-secondary {
            padding: 0.65rem 1.25rem;
            font-size: 0.95rem;
          }
        }

        /* Mobile responsive design */
        @media (max-width: 580px) {
          .service-card {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .left-section {
            flex: none;
            width: 100%;
          }

          .right-section {
            flex: none;
            width: 100%;
            padding-left: 0;
            text-align: center;
          }

          .image-container {
            width: 180px;
            height: 180px;
            margin: 0 auto 1rem auto;
          }

          .service-actions {
            gap: 0.75rem;
          }
        }

        /* Small mobile devices */
        @media (max-width: 480px) {
          .astrology-container {
            padding: 0.5rem;
          }

          h1 {
            font-size: 1.8rem;
          }

          .services-layout {
            gap: 1.25rem;
          }

          .service-card {
            padding: 1rem;
          }

          .image-container {
            width: 160px;
            height: 160px;
          }

          .service-name {
            font-size: 1.15rem;
          }

          .service-description {
            font-size: 0.95rem;
          }

          .service-actions {
            flex-direction: column;
            gap: 0.5rem;
          }

          .btn-primary, .btn-secondary {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Astrology;