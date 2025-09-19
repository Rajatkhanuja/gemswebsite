import React from "react";
import AstImage from "../assets/Ast.png";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="brand-name">Gems and Astrology by Suraj</span>
            </h1>
            <p className="hero-subtitle">
              A trusted name in astrology and spiritual guidance for the past <strong>6 years</strong>
            </p>
            <div className="hero-description">
              Over the years, we have helped people overcome challenges, find balance, and bring positivity into their lives through the combined power of gemstones, astrology, and traditional rituals.
            </div>
          </div>
          <div className="hero-visual">
            <div className="astrology-circle">
              <img 
                src={AstImage} 
                alt="Astrology Chart" 
                className="astrology-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="journey-section">
        <div className="container">
          <div className="section-header">
            <span className="section-icon">🌟</span>
            <h2 className="section-title">Our Journey</h2>
          </div>
          <div className="journey-content">
            <p>
              For the last 6 years, we have been dedicated to guiding individuals with astrological remedies and spiritual practices. In India, we have successfully organized and performed many <strong>pujas</strong>—both <strong>online</strong> as well as in-person at sacred places.
            </p>
            <p>
              Our services have also reached beyond India, where people from different countries connect with us through calls and consultations to find solutions for their life problems.
            </p>
            <div className="journey-stats">
              <div className="stat-item">
                <div className="stat-number">6+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-icon">🙏</span>
            <h2 className="section-title">What We Do</h2>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🔮</div>
              <h3 className="service-title">Astrology Consultations</h3>
              <p className="service-description">
                Personalized readings based on your birth chart to understand your life path and potential.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">💎</div>
              <h3 className="service-title">Gemstone Guidance</h3>
              <p className="service-description">
                Suggesting the right gemstone to bring harmony, success, and positive energy into your life.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">🕉️</div>
              <h3 className="service-title">Puja Services</h3>
              <p className="service-description">
                Organizing online pujas and performing rituals in temples across India for your well-being.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">✨</div>
              <h3 className="service-title">Problem Solutions</h3>
              <p className="service-description">
                Offering remedies and nivaran for issues related to career, finance, marriage, health, and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container">
          <div className="section-header">
            <span className="section-icon">💎</span>
            <h2 className="section-title">Why People Trust Us</h2>
          </div>
          <div className="trust-content">
            <div className="trust-points">
              <div className="trust-point">
                <div className="trust-icon">⏰</div>
                <div className="trust-text">
                  <strong>6+ years of experience</strong> in astrology and spiritual practices
                </div>
              </div>
              <div className="trust-point">
                <div className="trust-icon">👥</div>
                <div className="trust-text">
                  <strong>Hundreds of satisfied clients</strong> across India and abroad
                </div>
              </div>
              <div className="trust-point">
                <div className="trust-icon">🌍</div>
                <div className="trust-text">
                  <strong>Global connectivity</strong> to provide effective guidance worldwide
                </div>
              </div>
              <div className="trust-point">
                <div className="trust-icon">⚖️</div>
                <div className="trust-text">
                  A perfect <strong>balance of traditional Vedic wisdom</strong> with modern problem-solving approach
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Find Peace, Positivity, and Prosperity</h2>
            <p className="cta-description">
              At <strong>Gems and Astrology by Suraj</strong>, our goal is simple—to help you find peace, positivity, and prosperity in life. Whether you are in India or abroad, we are here to guide you with trust, dedication, and the blessings of the divine.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Book Consultation</button>
              <button className="btn-secondary">Contact Us</button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .about-container {
          font-family: 'Georgia', serif;
          line-height: 1.6;
          color: #333;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="a"><stop offset="0" stop-color="%23ffffff" stop-opacity=".1"/><stop offset="1" stop-color="%23000000" stop-opacity=".1"/></radialGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23a)"/></svg>') repeat;
          opacity: 0.1;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .brand-name {
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-description {
          font-size: 1.1rem;
          opacity: 0.85;
          line-height: 1.8;
        }

        /* Astrology Circle */
        .astrology-circle {
          position: relative;
          width: min(350px, 80vw);
          height: min(350px, 80vw);
          margin: 0 auto;
          max-width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .astrology-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
          animation: rotateAndGlow 20s linear infinite;
        }

        @keyframes rotateAndGlow {
          0% { 
            transform: rotate(0deg) scale(1);
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
          }
          50% { 
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.6);
          }
          100% { 
            transform: rotate(360deg) scale(1);
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
          }
        }

        /* Section Styles */
        .journey-section, .services-section, .trust-section {
          padding: 5rem 0;
          background: white;
        }

        .cta-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .cta-section .section-title {
          color: white;
        }

        /* Journey Section */
        .journey-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          text-align: center;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .journey-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .stat-item {
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 15px;
          color: white;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .stat-number {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        /* Services Section */
        .services-section {
          background: #f8f9fa;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .service-card {
          background: white;
          padding: 2.5rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .service-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .service-title {
          font-size: 1.4rem;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .service-description {
          color: #666;
          line-height: 1.6;
        }

        /* Trust Section */
        .trust-points {
          max-width: 800px;
          margin: 0 auto;
        }

        .trust-point {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 4px solid #667eea;
        }

        .trust-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .trust-text {
          font-size: 1.1rem;
          line-height: 1.6;
        }

        /* CTA Section */
        .cta-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #ffd700;
        }

        .cta-description {
          font-size: 1.2rem;
          margin-bottom: 3rem;
          opacity: 0.9;
          line-height: 1.8;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .btn-primary {
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          color: #2c3e50;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: white;
          color: #2c3e50;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-content {
            gap: 3rem;
            padding: 0 1.5rem;
          }
          
          .container {
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
            padding: 0 1rem;
          }

          .hero-section {
            min-height: auto;
            padding: 4rem 0;
          }

          .astrology-circle {
            width: min(280px, 75vw);
            height: min(280px, 75vw);
          }

          .journey-stats {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .service-card {
            padding: 2rem;
          }

          .trust-point {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            max-width: 280px;
          }

          .container {
            padding: 0 1rem;
          }

          .journey-section, .services-section, .trust-section {
            padding: 3rem 0;
          }

          .cta-section {
            padding: 3rem 0;
          }
        }

        @media (max-width: 480px) {
          .hero-content {
            padding: 0 0.5rem;
          }

          .astrology-circle {
            width: min(220px, 80vw);
            height: min(220px, 80vw);
          }

          .stat-item {
            padding: 1.5rem;
          }

          .stat-number {
            font-size: 2.5rem;
          }

          .service-card {
            padding: 1.5rem;
          }

          .trust-point {
            padding: 1rem;
          }

          .container {
            padding: 0 0.5rem;
          }

          .journey-section, .services-section, .trust-section {
            padding: 2.5rem 0;
          }

          .cta-section {
            padding: 2.5rem 0;
          }

          .btn-primary, .btn-secondary {
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 360px) {
          .hero-section {
            padding: 2rem 0;
          }

          .astrology-circle {
            width: min(200px, 85vw);
            height: min(200px, 85vw);
          }
        }
      `}</style>
    </div>
  );
};

export default About;