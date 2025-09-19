// src/pages/Home.jsx
import Hero from "../components/Hero";
import gemsImg from "../assets/gems.jpg";
import astroImg from "../assets/astro.jpg";
import Homeshop from "./Homeshop";   // 👈 Homeshop import
import Astrology from "./Astrology";
import "./Home.css";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Professional Cards Section */}
      <section className="cards-container">
        {/* Gems Card - Image Left */}
        <div className="professional-card card-left">
          <div className="card-image">
            <img src={gemsImg} alt="Premium Gems Collection" />
          </div>
          <div className="card-content">
            <h2>Premium Gems Collection</h2>
            <p>
              Discover our exquisite collection of certified precious and
              semi-precious gemstones. Each gem is carefully selected for its
              quality, authenticity, and spiritual significance.
            </p>
            <ul>
              <li>Certified authentic gemstones</li>
              <li>Spiritual healing properties</li>
              <li>Expert consultation available</li>
              <li>Custom jewelry options</li>
            </ul>
            <button className="cta-button">Explore Gems</button>
          </div>
        </div>

        {/* Astrology Card - Image Right */}
        <div className="professional-card card-right">
          <div className="card-content">
            <h2>Professional Astrology Services</h2>
            <p>
              Get personalized astrological insights from our experienced
              astrologers. Understand your destiny, career prospects,
              relationships, and life path through ancient Vedic wisdom.
            </p>
            <ul>
              <li>Detailed birth chart analysis</li>
              <li>Career & relationship guidance</li>
              <li>Remedial solutions</li>
              <li>Future predictions</li>
            </ul>
            <button className="cta-button">Book Consultation</button>
          </div>
          <div className="card-image">
            <img src={astroImg} alt="Professional Astrology Services" />
          </div>
        </div>
      </section>

      {/* 👇 Ye add karo */}
      <Homeshop />
      <Astrology />
    </>
  );
}
