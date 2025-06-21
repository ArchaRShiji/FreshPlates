import Footer from "../components/Footer";
import Header from "../components/Header";
import PublicNavbar from "../components/Navbar";
import UserNavbar from "./user/UserNavbar";
import "../pages/Homepage.css";

function Homepage() {
  const user = localStorage.getItem("user");
  const isLoggedIn = user !== null;
  return (
    <div>
      {isLoggedIn? <UserNavbar/> :<PublicNavbar/>};
      <Header/>
      <div className="why-freshplates" >
          <h2>Why FreshPlates?</h2>
            <ul>
              <li>👩‍🍳 Made by Local Home Chefs</li>
              <li>🍽️ Fresh, Hygienic & Homemade</li>
              <li>🕒 Flexible Pickup or Delivery</li>
              <li>❤️ Support Small Businesses</li>
              <li>💸 Affordable & Transparent Pricing</li>
              <li>📍 Hyperlocal Experience</li>
              <li>🌿 Health-Conscious Options</li>
            </ul>
      </div>
      <div  className="aboutus">
        <h2>About Us</h2>
            <h6>“FreshPlates is a platform connecting home chefs with food lovers. Whether you miss homemade food or want to explore local flavors, FreshPlates is here for you.”</h6>
      </div>
      <Footer/>
    </div>
  );
}

export default Homepage;
