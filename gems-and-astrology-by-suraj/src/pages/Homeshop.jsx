// src/pages/Homeshop.jsx
import React, { useEffect, useState } from "react";
import gemImg from "../assets/gemss.png"; // gemss.png image import
import axios from "axios";
import "./Homeshop.css"; // ✅ cards ka CSS alag file

const Homeshop = () => {
  const [gems, setGems] = useState([]);

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gems");
        setGems(res.data);
      } catch (err) {
        console.error("Error fetching gems:", err);
      }
    };
    fetchGems();
  }, []);

  return (
    <div className="homeshop-container">
      {/* Our Gems Section */}
      <section className="our-gems-section">
        <h2 className="heading"> Explore Our Gems</h2>
        <div className="gem-image-wrapper">
          <img src={gemImg} alt="Our Gems" className="gem-image" />
        </div>
      </section>

      {/* Updated Cards Section JSX - Layout  */}
<section className="gems-cards-section">
  <div className="cards-wrapper">
    {gems.slice(0, 6).map((gem) => (
      <div className="gem-card" key={gem._id}>
        <div className="gem-card-img">
          <img
            src={gem.images?.image1 || gemImg}
            alt={gem.name}
          />
        </div>
        <div className="gem-card-body">
          {/* Name  Type  */}
          <div className="gem-name-type">
            <h4 className="gem-name">{gem.name}</h4>
            <p className="gem-type">{gem.type}</p>
          </div>
          
          {/* Weight right  */}
          <p className="gem-weight">Weight: {gem.weight}</p>
          
          {/* Prices center  */}
          <p className="gem-prices">
            <span className="original-price">₹{gem.originalPrice}</span>
            <span className="cut-price">{gem.cutPrice}</span>
          </p>
        </div>
      </div>
    ))}
  </div>
</section>
      {/* Home Component */}
      

      {/* CSS */}
      <style jsx>{`
        .our-gems-section {
          text-align: center;
          margin: 3rem 0;
          padding: 0 1rem;
        }

        .heading {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .gem-image-wrapper {
          width: 400px;
          height: 200px; /* Half of width for perfect half-circle */
          overflow: hidden;
          margin: 0 auto;
          border-radius: 200px 200px 0 0; /* Perfect half-circle - top left, top right rounded */
          position: relative;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .gem-image {
          width: 400px;
          height: 400px; /* Full circle size */
          object-fit: cover;
          display: block;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          animation: rotate 20s linear infinite; /* Smooth clockwise rotation */
        }

        /* Rotation Animation */
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Tablet Responsive */
        @media (max-width: 1024px) {
          .gem-image-wrapper {
            width: 350px;
            height: 175px;
            border-radius: 175px 175px 0 0;
          }
          
          .gem-image {
            width: 350px;
            height: 350px;
          }
        }

        /* Mobile Large (768px and below) */
        @media (max-width: 768px) {
          .heading {
            font-size: 1.8rem;
          }
          
          .gem-image-wrapper {
            width: 300px;
            height: 150px;
            border-radius: 150px 150px 0 0;
          }
          
          .gem-image {
            width: 300px;
            height: 300px;
          }
        }

        /* Mobile Medium (600px and below) */
        @media (max-width: 600px) {
          .gem-image-wrapper {
            width: 250px;
            height: 125px;
            border-radius: 125px 125px 0 0;
          }
          
          .gem-image {
            width: 250px;
            height: 250px;
          }
        }

        /* Mobile Small (480px and below) */
        @media (max-width: 480px) {
          .heading {
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }
          
          .gem-image-wrapper {
            width: 200px;
            height: 100px;
            border-radius: 100px 100px 0 0;
          }
          
          .gem-image {
            width: 200px;
            height: 200px;
          }
        }

        /* Mobile Extra Small (360px and below) */
        @media (max-width: 360px) {
          .our-gems-section {
            margin: 2rem 0;
          }
          
          .heading {
            font-size: 1.3rem;
          }
          
          .gem-image-wrapper {
            width: 180px;
            height: 90px;
            border-radius: 90px 90px 0 0;
          }
          
          .gem-image {
            width: 180px;
            height: 180px;
          }
        }

        /* Pause animation on hover for better UX */
        .gem-image-wrapper:hover .gem-image {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Homeshop;