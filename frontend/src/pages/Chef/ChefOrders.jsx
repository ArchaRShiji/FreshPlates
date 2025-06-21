import { useEffect, useState } from "react";
import ChefNavbar from "./ChefNavbar";
import "./ChefOrders.css"; // optional styling

function ChefOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // chef

  useEffect(() => {
    fetch(`http://localhost:8500/api/get-chef-orders/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
      })
      .catch((err) => console.error("Error fetching chef orders:", err));
  }, [user._id]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch("http://localhost:8500/api/update-order-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error(error);
      alert("Error updating status");
    }
  };

  return (
    <div>
      <ChefNavbar />
      <div className="chef-orders-container">
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order._id} className="order-card">
                <h4>{order.menu_id.title}</h4>
                <p><strong>Qty:</strong> {order.quantity}</p>
                <p><strong>Type:</strong> {order.delivery_type}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ChefOrders;
