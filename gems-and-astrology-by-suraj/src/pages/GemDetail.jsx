// src/pages/GemDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import gemImg from "../assets/gemss.png";
import indiaImg from "../assets/india.avif";

const GemDetail = () => {
  const { id } = useParams();
  const [gem, setGem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchGem = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/gems/${id}`);
        setGem(res.data);
      } catch (err) {
        console.error("Error fetching gem:", err);
      }
    };
    fetchGem();
  }, [id]);

  if (!gem) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading gem details...</p>
      </div>
    );
  }

  // Get all available images
  const allImages = [
    gem.images?.image1,
    gem.images?.image2,
    gem.images?.image3,
    gem.images?.image4,
    gem.images?.image5
  ].filter(Boolean); // Remove null/undefined images

  const displayImages = allImages.length > 0 ? allImages : [gemImg];

  const handleChatNow = () => {
    const message = `Hi! I'm interested in ${gem.name} (${gem.type}) - ₹${gem.cutPrice}`;
    const whatsappUrl = `https://wa.me/917568596521?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallUs = () => {
    window.open('tel:+917568596521', '_self');
  };

  return (
    <div>
      
      
      <div className="gem-detail-container">
        {/* Left Side - Images */}
        <div className="image-section">
          {/* Main Image */}
          <div className="main-image">
            <img 
              src={displayImages[selectedImage] || gemImg} 
              alt={gem.name}
            />
          </div>
          
          {/* Thumbnail Images */}
          {displayImages.length > 1 && (
            <div className="thumbnail-section">
              {displayImages.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image || gemImg} alt={`${gem.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Details */}
        <div className="details-section">
          {/* Name & Type */}
          <div className="gem-header">
            <h1 className="gem-name">{gem.name}</h1>
            <span className="gem-type">{gem.type}</span>
          </div>

          {/* Weight */}
          <div className="gem-weight">
            <span className="weight-label">Weight:</span>
            <span className="weight-value">{gem.weight}</span>
          </div>

          {/* Description */}
          {gem.description && (
            <div className="gem-description">
              <h3>Description</h3>
              <p>{gem.description}</p>
            </div>
          )}

          {/* Prices */}
          <div className="gem-prices">
            <span className="original-price">₹{gem.originalPrice}</span>
            <span className="cut-price">{gem.cutPrice}</span>
            
          </div>

          {/* Action Buttons - First Location */}
          <div className="action-buttons">
            <button className="chat-btn" onClick={handleChatNow}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
              </svg>
              CHAT NOW
            </button>
            
            <button className="call-btn" onClick={handleCallUs}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              CALL US
            </button>
          </div>
        </div>
      </div>

      {/* India Heritage Section */}
      <div className="heritage-section">
        <div className="heritage-image">
          <img src={indiaImg} alt="India Heritage" />
        </div>
        <div className="heritage-content">
          <h2>India's Diamond Legacy</h2>
          <p>
            India, a land of diverse cultures and landscapes, is famous for its diamonds, 
            particularly those from Golconda. Known for their unmatched clarity and size, 
            Golconda diamonds are considered symbols of power and divinity. Indian culture 
            deeply reveres these gemstones, often incorporating them into royal jewelry. 
            The country's rich heritage in gemology is reflected in its intricate diamond 
            cuts and designs.
          </p>
        </div>
      </div>

      {/* Bottom Section - Features */}
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M15 9.5V12L21 11.5V9.5M21 16V14L15 14.5V16M15 16.5V19L21 18.5V16.5M9 12C6.79 12 5 10.21 5 8S6.79 4 9 4 13 5.79 13 8 11.21 12 9 12M15 20H1V18C1 15.79 4.58 14 9 14S17 15.79 17 18V20Z"/>
            </svg>
          </div>
          <div className="feature-content">
            <h4>Personalized</h4>
            <p>Expert Recommendation</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
            </svg>
          </div>
          <div className="feature-content">
            <h4>Offers</h4>
            <p>Exclusive Discount</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
            </svg>
          </div>
          <div className="feature-content">
            <h4>100%</h4>
            <p>Satisfaction Guarantee</p>
          </div>
        </div>
      </div>

      {/* Action Buttons - Second Location (After Features Section) */}
      <div className="action-buttons action-buttons-bottom">
        <button className="chat-btn" onClick={handleChatNow}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
          </svg>
          CHAT NOW
        </button>
        
        <button className="call-btn" onClick={handleCallUs}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          CALL US
        </button>
      </div>

      {/* CSS */}
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60vh;
          color: #666;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .gem-detail-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        /* Left Side - Images */
        .image-section {
          position: sticky;
          top: 2rem;
        }

        .main-image {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
        }

        .main-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .main-image img:hover {
          transform: scale(1.05);
        }

        .thumbnail-section {
          display: flex;
          gap: 0.8rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .thumbnail {
          width: 70px;
          height: 70px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .thumbnail:hover,
        .thumbnail.active {
          border-color: #007bff;
          transform: scale(1.1);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Right Side - Details */
        .details-section {
          padding: 1rem 0;
        }

        .gem-header {
          margin-bottom: 1.5rem;
        }

        .gem-name {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          display: inline;
        }

        .gem-type {
          font-size: 1rem;
          background: #f0f8ff;
          color: #007bff;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          margin-left: 1rem;
          font-weight: 500;
          display: inline-block;
          vertical-align: middle;
        }

        .gem-weight {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          font-size: 1.2rem;
        }

        .weight-label {
          color: #666;
          margin-right: 0.5rem;
        }

        .weight-value {
          font-weight: bold;
          color: #333;
        }

        .gem-prices {
          margin-bottom: 2.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .original-price {
          font-size: 1.3rem;
          text-decoration: line-through;
          color: #999;
        }

        .cut-price {
          font-size: 2rem;
          font-weight: bold;
          color: #e63946;
        }

        .discount {
          background: #28a745;
          color: white;
          padding: 0.3rem 0.6rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: bold;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        /* Special styling for action buttons in heritage section */
        .action-buttons-heritage {
          margin-top: 2rem;
          margin-bottom: 0;
          justify-content: center;
        }

        /* Special styling for action buttons at bottom */
        .action-buttons-bottom {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
          justify-content: center;
        }

        .chat-btn,
        .call-btn {
          flex: 1;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .chat-btn {
          background: #25d366;
          color: white;
        }

        .chat-btn:hover {
          background: #128c7e;
          transform: translateY(-2px);
        }

        .call-btn {
          background: #333;
          color: white;
        }

        .call-btn:hover {
          background: #000;
          transform: translateY(-2px);
        }

        .gem-description {
          margin: 1.5rem 0;
          padding: 1rem 0;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
        }

        .gem-description h3 {
          font-size: 1.3rem;
          margin-bottom: 0.8rem;
          color: #333;
        }

        .gem-description p {
          line-height: 1.6;
          color: #666;
          font-size: 1rem;
        }

        /* Heritage Section */
        .heritage-section {
          max-width: 1200px;
          margin: 3rem auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          align-items: center;
          background: #fafafa;
          border-radius: 16px;
        }

        .heritage-image {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }

        .heritage-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .heritage-content {
          padding: 1rem 0;
        }

        .heritage-content h2 {
          font-size: 2.2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .heritage-content p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #555;
          text-align: justify;
        }

        /* Features Section */
        .features-section {
          background: linear-gradient(135deg, #ffeef5 0%, #e6f3ff 100%);
          margin: 3rem auto;
          padding: 2rem;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          gap: 2rem;
          max-width: 1200px;
        }

        .feature-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
        }

        .feature-icon {
          color: #666;
          opacity: 0.8;
        }

        .feature-content h4 {
          font-size: 1.1rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.2rem;
        }

        .feature-content p {
          color: #666;
          font-size: 0.9rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .gem-detail-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1rem;
            margin: 1rem auto;
          }

          .image-section {
            position: static;
          }

          .main-image img {
            height: 300px;
          }

          .gem-name {
            font-size: 2rem;
          }

          .gem-type {
            display: block;
            margin: 0.5rem 0;
            text-align: center;
            width: fit-content;
          }

          .heritage-section {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.5rem 1rem;
            margin: 2rem auto;
          }

          .heritage-image img {
            height: 250px;
          }

          .heritage-content {
            text-align: center;
          }

          .heritage-content h2 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
          }

          .heritage-content p {
            font-size: 1rem;
            text-align: center;
          }

          .action-buttons-heritage {
            margin-top: 1.5rem;
          }

          .action-buttons-bottom {
            padding: 0 1rem;
          }

          .features-section {
            flex-direction: row;
            justify-content: space-around;
            gap: 0.5rem;
            padding: 1.5rem 1rem;
          }

          .feature-card {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
            flex: 1;
          }

          .feature-icon {
            transform: scale(0.8);
          }

          .feature-content h4 {
            font-size: 1rem;
          }

          .feature-content p {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .thumbnail {
            width: 50px;
            height: 50px;
          }

          .gem-prices {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .cut-price {
            font-size: 1.8rem;
          }

          .action-buttons,
          .action-buttons-heritage,
          .action-buttons-bottom {
            flex-direction: column;
            gap: 1rem;
          }

          .chat-btn,
          .call-btn {
            flex: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default GemDetail;