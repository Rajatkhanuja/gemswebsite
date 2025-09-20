import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ added
import Navbar from "../components/Navbar";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ added

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/pujas`);
        setServices(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);
    const openWhatsApp = (serviceName) => {
    const phoneNumber = "917568596521"; // 👈 apna WhatsApp number with country code
    const message = `Hello, I want to book the service: ${serviceName}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const serviceCategories = [
    {
      title: "Astrology Services",
      icon: "🔮",
      description: "Ancient wisdom for modern guidance",
      color: "#667eea"
    },
    {
      title: "Puja & Rituals",
      icon: "🕉️",
      description: "Sacred ceremonies and spiritual practices",
      color: "#f093fb"
    },
    {
      title: "Consultation",
      icon: "💫",
      description: "Personalized spiritual guidance",
      color: "#4facfe"
    },
    {
      title: "Remedies",
      icon: "🌟",
      description: "Effective solutions for life challenges",
      color: "#43e97b"
    }
  ];

  if (loading) {
    return (
      <div>
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading our services...</p>
        </div>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 70vh;
            gap: 1rem;
          }
          .loader {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="services-page">
      {/* Service Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-grid">
            {serviceCategories.map((category, index) => (
              <div key={index} className="category-card" style={{ '--accent-color': category.color }}>
                <div className="category-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="services-section">
        <div className="container">
          <h2>Astrology Service's</h2>          
          <div className="services-grid">
            {services.map((service) => (
              <div key={service._id} className="service-card">
                {service.image && (
                  <div className="service-image">
                    <img src={service.image} alt={service.name} />
                  </div>
                )}
                <div className="service-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-actions">
                    <button 
                      className="btn-primary" 
                      onClick={() => openWhatsApp(service.name)}
                    >
                      Book Now
                    </button>
                    {/* ✅ Navigate to service detail page */}
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
        </div>
      </section>

      <style jsx>{`
        .services-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* Categories Section */
        .categories-section {
          padding: 2rem 0;
          background: white;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .category-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          transition: transform 0.3s ease;
          border-top: 3px solid var(--accent-color);
        }

        .category-card:hover {
          transform: translateY(-5px);
        }

        .category-icon {
          font-size: 2.5rem;
          margin-bottom: 0.8rem;
        }

        .category-card h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .category-card p {
          color: #64748b;
          font-size: 0.95rem;
        }

        /* Services Section */
        .services-section {
          padding: 2rem 0;
        }

        .services-section h2 {
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
          color: #2c3e50;
          font-weight: 600;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .service-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-3px);
        }

        .service-image {
          height: 180px;
          overflow: hidden;
        }

        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .service-card:hover .service-image img {
          transform: scale(1.05);
        }

        .service-content {
          padding: 1.25rem;
        }

        .service-content h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .service-content p {
          color: #64748b;
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }

        .service-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-primary, .btn-secondary {
          padding: 0.6rem 1rem;
          border-radius: 6px;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          flex: 1;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          color: #667eea;
          border: 1px solid #667eea;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .services-page {
            padding: 1rem 0;
          }
          
          .categories-section, .services-section {
            padding: 1.5rem 0;
          }

          .categories-section {
            margin-bottom: 1.5rem;
          }

          .services-section h2 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
          }

          .categories-grid, .services-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .category-card, .service-content {
            padding: 1rem;
          }

          .service-image {
            height: 160px;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;