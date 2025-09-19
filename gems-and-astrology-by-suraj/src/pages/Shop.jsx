// src/pages/Shop.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Navbar import
import gemImg from "../assets/gemss.png"; // fallback image
import axios from "axios";

const Shop = () => {
  const [gems, setGems] = useState([]);
   const navigate = useNavigate();

  // fetch gems from backend
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
    <div>
      {/* Shop Section */}
      <section className="shop-container">
        <h1 className="shop-heading">Welcome to Our Shop</h1>
        <p className="shop-subtext">Explore our exclusive gems collection.</p>

        {/* Gems Cards */}
        <div className="gem-grid">
          {gems.map((gem) => (
            <div className="gem-card" key={gem._id}
             onClick={() => navigate(`/shop/${gem._id}`)} // 👈 click navigates to detail page
              style={{ cursor: "pointer" }}
              >
              <div className="gem-card-img">
                <img src={gem.images?.image1 || gemImg} alt={gem.name} />
              </div>
              <div className="gem-card-body">
                {/* Name + Type inline */}
                <div className="gem-name-type">
                  <h4 className="gem-name">{gem.name}</h4>
                  <span className="gem-type">{gem.type}</span>
                </div>

                {/* Weight */}
                <p className="gem-weight">Weight: {gem.weight}</p>

                {/* Prices */}
                <div className="gem-prices">
                  <span className="original-price">₹{gem.originalPrice}</span>
                  <span className="cut-price">{gem.cutPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CSS */}
      <style jsx>{`
        .shop-container {
          text-align: center;
          padding: 2rem 1rem;
          max-width: 1400px;
          margin: 0 auto;
          
        }

        .shop-heading {
          font-size: 2.8rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .shop-subtext {
          font-size: 1.3rem;
          color: #666;
          margin-bottom: 3rem;
          font-weight: 400;
        }

        /* Perfect Cards Grid */
        .gem-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          justify-items: center;
          padding: 0 1rem;
        }

        .gem-card {
          width: 100%;
          max-width: 300px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }

        .gem-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .gem-card-img {
          position: relative;
          overflow: hidden;
        }

        .gem-card-img img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gem-card:hover .gem-card-img img {
          transform: scale(1.05);
        }

        .gem-card-body {
          padding: 1.5rem;
          text-align: left;
        }

        .gem-name-type {
          margin-bottom: 0.8rem;
        }

        .gem-name {
          font-size: 1.3rem;
          font-weight: bold;
          color: #333;
          line-height: 1.2;
          display: inline;
        }

        .gem-type {
          font-size: 0.9rem;
          color: #777;
          background: #f8f9fa;
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          margin-left: 0.5rem;
          display: inline-block;
          vertical-align: middle;
        }

        .gem-weight {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: #555;
          font-weight: 500;
        }

        .gem-prices {
          text-align: center;
          padding: 0.8rem;
          background: #f8f9fa;
          border-radius: 10px;
          margin-top: auto;
        }

        .original-price {
          text-decoration: line-through;
          color: #999;
          margin-right: 0.8rem;
          font-size: 1rem;
        }

        .cut-price {
          font-weight: bold;
          color: #e63946;
          font-size: 1.2rem;
        }

        /* Desktop - 4 cards per row */
        @media (min-width: 1200px) {
          .gem-grid {
            grid-template-columns: repeat(4, 1fr);
            max-width: 1200px;
            margin: 0 auto;
          }
        }

        /* Laptop/Tablet - 3 cards per row */
        @media (min-width: 768px) and (max-width: 1199px) {
          .gem-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
          
          .shop-heading {
            font-size: 2.4rem;
          }
        }

        /* Mobile - 2 cards per row */
        @media (max-width: 767px) {
          .shop-container {
            padding: 1.5rem 0.8rem;
          }

          .shop-heading {
            font-size: 2rem;
            margin-bottom: 0.8rem;
          }

          .shop-subtext {
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }

          .gem-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            padding: 0 0.5rem;
          }

          .gem-card {
            max-width: none;
          }

          .gem-card-img img {
            height: 160px;
          }

          .gem-card-body {
            padding: 1rem;
          }

          .gem-name {
            font-size: 1.1rem;
          }

          .gem-type {
            font-size: 0.8rem;
            padding: 0.1rem 0.4rem;
            margin-left: 0.3rem;
          }

          .gem-weight {
            font-size: 0.9rem;
            margin-bottom: 0.8rem;
          }

          .gem-prices {
            padding: 0.6rem;
          }

          .original-price {
            font-size: 0.9rem;
            margin-right: 0.5rem;
          }

          .cut-price {
            font-size: 1.1rem;
          }
        }

        /* Extra small mobile */
        @media (max-width: 400px) {
          .gem-grid {
            gap: 0.8rem;
            padding: 0 0.3rem;
          }

          .gem-card-body {
            padding: 0.8rem;
          }

          .shop-heading {
            font-size: 1.8rem;
          }
        }

        /* Loading state */
        .gem-grid:empty::after {
          content: "Loading gems...";
          grid-column: 1 / -1;
          text-align: center;
          padding: 2rem;
          color: #666;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
};

export default Shop;