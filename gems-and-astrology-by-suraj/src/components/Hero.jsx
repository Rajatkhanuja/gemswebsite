// src/components/Hero.jsx
import "../components/Hero.css";
import { FaWhatsapp } from "react-icons/fa"; // React Icons se WhatsApp icon

export default function Hero() {
  const whatsappNumber = "+917568596521"; // yaha apna WhatsApp number daalo (country code ke sath)
  const whatsappMessage = "Hello! I am interested in knowing which gemstones suit my zodiac sign. Can you guide me?";

 // default message

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-card">
            <h1 className="hero-title">
              Divine Gems & Astrology
            </h1>
            <p className="hero-subtitle">
              Discover the mystical power of precious gemstones and unlock your cosmic destiny through ancient wisdom
            </p>
            <a href="/About" className="hero-cta">
              <span className="sparkle-icon">💎</span>
              Explore Your Journey
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <FaWhatsapp size={30} />
      </a>
    </>
  );
}
