import PublicNavbar from "../components/Navbar";
import UserNavbar from "./user/UserNavbar";
import Footer from "../components/Footer";
import "./Browsemeals.css";
import { useEffect, useState } from "react";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";

function Browsemeals(){
  const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));    
    const isLoggedIn = user !== null; 
    const [menuItems, setMenuItems] = useState([]);
    
    useEffect(() => {
    fetch("http://localhost:8500/api/get-menu")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched menu data:", data);
        setMenuItems(data.meals);
      })
      .catch((err) => console.error("Error fetching meals:", err));
  }, []);

    const handleAddToCart = async (menu_id) => {
const user = JSON.parse(localStorage.getItem("user")); 
  if (!user) return alert("Login required");
    try {
      const res = await fetch("http://localhost:8500/api/add-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user._id,
          menu:menu_id,
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
  const handlePlaceOrder =() => {
  //const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return alert("Login required");
     navigate("/user/orders");
  };

    return(
        <div>
            {isLoggedIn ? <UserNavbar /> : <PublicNavbar />}
            <div className="meals-container">
                {menuItems.map((meal) => (
                  <Card
                    key={meal._id}
                    meal={meal}
                    onAddToCart={handleAddToCart}
                    showAdd={isLoggedIn}  // only show Add to Cart if logged in
                    showOrder={isLoggedIn}
                    onPlaceOrder={handlePlaceOrder}
                  />
                    ))}
            </div>
            <Footer/>
        </div>
    );
}
export default Browsemeals;