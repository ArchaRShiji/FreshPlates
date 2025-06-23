import "./Card.css";

function Card({
  meal,
  quantity,
  delivery_type,
  onAddToCart,
  onRemoveFromCart,
  showRemove,
  showAdd,
  showOrder,
  onPlaceOrder,
  onQuantityChange,
  onDeliveryChange,
  isOrdered
}) {
  return (
    <div className="meal-card">
      <img src={`http://localhost:8500/uploads/${meal.image}`} alt={meal.title} />
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <p><strong>₹{meal.price}</strong></p>

      {quantity !== undefined && (
  <>
    <div className="quantity-control">
      <button onClick={() => onQuantityChange(meal._id, -1)}>-</button>
      <span>{quantity}</span>
      <button onClick={() => onQuantityChange(meal._id, 1)}>+</button>
    </div>

    <div className="delivery-type">
      <label>
        <input
          type="radio"
          value="pickup"
          checked={delivery_type === "pickup"}
          onChange={() => onDeliveryChange(meal._id, "pickup")}
        />
        Pickup
      </label>
      <label>
        <input
          type="radio"
          value="delivery"
          checked={delivery_type === "delivery"}
          onChange={() => onDeliveryChange(meal._id, "delivery")}
        />
        Delivery
      </label>
    </div>

    <p>Total: ₹{meal.price * quantity}</p>
  </>
)}


      {showRemove && (
        <button onClick={() => onRemoveFromCart(meal._id)} className="remove-btn">
          Remove from Cart
        </button>
      )}

      {(showAdd || showOrder) && (
    <div className="card-buttons">
    {showAdd && (
      <button onClick={() => onAddToCart(meal._id)} className="add-btn">
        Add to Cart
      </button>
    )}
    {showOrder && (
  <button
    onClick={() => onPlaceOrder(meal._id)}
    className="place-order-btn"
    disabled={isOrdered}
    style={isOrdered ? { backgroundColor: "#aaa", cursor: "not-allowed" } : {}}
  >
    {isOrdered ? "Ordered" : "Place Order"}
  </button>
)}
  </div>
  )}

     
  </div>
  );
}

export default Card;