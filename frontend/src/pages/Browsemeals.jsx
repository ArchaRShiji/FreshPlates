import PublicNavbar from "../components/Navbar";
import UserNavbar from "./user/UserNavbar";
import Footer from "../components/Footer";
import "./Browsemeals.css";
import React, { useEffect, useState } from "react";

function Browsemeals(){
const user = JSON.parse(localStorage.getItem("user"));    const isLoggedIn = user !== null; 
    const [menuItems, setMenuItems] = useState([]);
    
    useEffect(() => {
    fetch("http://localhost:8500/api/get-menu")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched menu data:", data);
        setMenuItems(data);
      })
      .catch((err) => console.error("Error fetching meals:", err));
  }, []);

    const handleAddToCart = async (menu_id) => {
const user = JSON.parse(localStorage.getItem("user")); // move this here safely
  if (!user) return alert("Login required");
    try {
      const res = await fetch("http://localhost:8500/api/add-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user._id,
          menu_id,
          quantity: 1,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert("Added to cart!");
    } catch (error) {
      console.error(error);
      alert("Error adding to cart");
    }
  };

    return(
        <div>
            {isLoggedIn ? <UserNavbar /> : <PublicNavbar />}
            <div className="meals-container">
        {menuItems.map((meal) => (
          <div key={meal._id} className="meal-card">
            <img src={`http://localhost:8500/uploads/${meal.image}`} alt={meal.title} />
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p><strong>₹{meal.price}</strong></p>
            {isLoggedIn && (
              <button onClick={() => handleAddToCart(meal._id)}>Add to Cart</button>
            )}
          </div>
          ))}
        </div>
            <Footer/>
        </div>
    );
}
export default Browsemeals;