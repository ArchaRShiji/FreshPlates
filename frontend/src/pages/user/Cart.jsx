import { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import Card from "../../components/card";

function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:8500/api/get-cart/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.items || []);
      });
  }, [user._id]);

  const handleRemoveFromCart = async (menu_id) => {
    try {
      const res = await fetch("http://localhost:8500/api/delete-cart-item", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user._id, menu_id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCartItems(data.cart.items);

      alert("Item removed from cart");
    } catch (error) {
      console.error(error);
      alert("Error removing item");
    }
  };

  const handlePlaceOrder = () => {
    // Instead of placing order directly, redirect to MyOrders to configure
    window.location.href = "/user/orders"; // Or use `useNavigate()` if using React Router
  };

  return (
    <div>
      <UserNavbar />
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="cart-list">
            {cartItems.map((item, idx) => (
              <Card
                key={idx}
                meal={item.menu}
                showRemove={true}
                onRemoveFromCart={handleRemoveFromCart}
                showOrder={true}
                onPlaceOrder={() => handlePlaceOrder(item.menu._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCart;
