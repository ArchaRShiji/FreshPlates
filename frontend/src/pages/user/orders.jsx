import { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import Card from "../../components/card";
import "../user/MyOrders.css";
import { useLocation } from "react-router-dom";//?

function MyOrders() {
  const location = useLocation();
  const mealFromBrowse = location.state?.mealToOrder;
  const [orders, setOrders] = useState([]);
  const [itemDetails, setItemDetails] = useState({});
  const [orderedItems, setOrderedItems] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await fetch(`http://localhost:8500/api/get-cart/${user._id}`);
      const data = await res.json();
      if (data.items) {
        setOrders(data.items);

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
      console.error("Error fetching cart:", err);
    }
  };

  const fetchPastOrders = async () => {
    try {
      const res = await fetch(`http://localhost:8500/api/get-user-orders/${user._id}`);
      const data = await res.json();
      if (data.orders) {
        setPastOrders(data.orders);

        // Prevent duplicate ordering of same item
        const orderedIds = data.orders.map((order) => order.menu_id?._id);
        setOrderedItems(orderedIds);
      }
    } catch (err) {
      console.error("Error fetching past orders:", err);
    }
  };

  if (user?._id) {
  if (mealFromBrowse) {
    // Show just the selected meal instead of full cart
    const tempCartItem = {
      menu: mealFromBrowse,
    };
    setOrders([tempCartItem]); // Only show this one meal
    setItemDetails({
      [mealFromBrowse._id]: {
        quantity: 1,
        delivery_type: "pickup",
      },
    });
  } else {
    fetchCart(); // normal cart items
  }

  fetchPastOrders(); // always fetch past orders
}

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
      setOrderedItems(prev => [...prev, menu_id]); 
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
                isOrdered={orderedItems.includes(item.menu._id)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="past-orders-section">
  <h2>Your Past Orders</h2>
  {pastOrders.length === 0 ? (
    <p>You haven’t placed any orders yet.</p>
  ) : (
    <div className="orders-list">
      {pastOrders.map((order) => (
        <Card
          key={order._id}
          meal={order.menu_id}
          quantity={order.quantity}
          delivery_type={order.delivery_type}
          showOrder={false} // hides Place Order button
          isOrdered={true} // optional visual indicator like grey card
          status={order.status} // pass status for display
        />
      ))}
    </div>
  )}
</div>

    </div>
  );
}

export default MyOrders;
