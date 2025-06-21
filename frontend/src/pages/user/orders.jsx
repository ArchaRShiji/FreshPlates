import { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import Card from "../../components/card";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [itemDetails, setItemDetails] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await fetch(`http://localhost:8500/api/get-cart/${user._id}`);
      const data = await res.json();
      if (data.items) {
        setOrders(data.items);

        // Only initialize itemDetails if it's empty (first time)
        if (Object.keys(itemDetails).length === 0) {
          const details = {};
          data.items.forEach((item) => {
            details[item.menu._id] = {
              quantity: 1,
              delivery_type: "pickup",
            };
          });
          setItemDetails(details);
        }
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  if (user?._id) {
    fetchCart();
  }
  // add empty dependency array so it runs only once
}, []); 


  const handleQuantityChange = (menuId, delta) => {
    setItemDetails((prev) => ({
      ...prev,
      [menuId]: {
        ...prev[menuId],
        quantity: Math.max(1, (prev[menuId]?.quantity || 1) + delta),
      },
    }));
  };

  const handleDeliveryChange = (menuId, deliveryType) => {
    setItemDetails((prev) => ({
      ...prev,
      [menuId]: {
        ...prev[menuId],
        delivery_type: deliveryType,
      },
    }));
  };

  const handlePlaceOrder = async (menu_id) => {
    const details = itemDetails[menu_id];
    if (!details) return alert("Please fill order details.");

    try {
      const res = await fetch("http://localhost:8500/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer_id: user._id,
          menu_id,
          quantity: details.quantity,
          delivery_type: details.delivery_type,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Order placed!");
      // Optionally remove item from cart after ordering
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="orders-container">
        <h2>Confirm Your Orders</h2>
        {orders.length === 0 ? (
          <p>No items in your cart to order.</p>
        ) : (
          <div className="orders-list">
            {orders.map((item) => (
              <Card
                key={item.menu._id}
                meal={item.menu}
                quantity={itemDetails[item.menu._id]?.quantity}
                delivery_type={itemDetails[item.menu._id]?.delivery_type}
                onQuantityChange={handleQuantityChange}
                onDeliveryChange={handleDeliveryChange}
                showOrder={true}
                onPlaceOrder={handlePlaceOrder}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
