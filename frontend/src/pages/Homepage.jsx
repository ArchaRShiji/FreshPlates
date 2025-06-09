import Navbar from "../components/Navbar";
import "./Homepage.css"; // Importing the CSS file

function Homepage() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to FreshPlates 🍽️</h1>
        <p>
          Enjoy fresh, homemade meals prepared by local chefs near you.
          Experience the warmth of home-cooked food delivered to your doorstep.
        </p>
        <div className="cta-buttons">
          <a href="/meals" className="primary-btn">
            Browse Meals
          </a>
          <a href="/signup" className="secondary-btn">
            Become a Chef
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        {/*<div className="feature-card">
          <img src="/images/home-cook.png" alt="home cook" />
          <h3>Homemade Goodness</h3>
          <p>Meals made with love by real home chefs.</p>
        </div>
        <div className="feature-card">
          <img src="/images/location.png" alt="location" />
          <h3>Hyperlocal</h3>
          <p>Connect with chefs in your own neighborhood.</p>
        </div>
        <div className="feature-card">
          <img src="/images/delivery.png" alt="delivery" />
          <h3>Quick Delivery</h3>
          <p>Hot meals delivered or ready for pickup.</p>
        </div>*/}
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} FreshPlates. All rights reserved.
      </footer>
    </div>
  );
}

export default Homepage;
