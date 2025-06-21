import { useEffect, useState } from "react";
import ChefNavbar from "./ChefNavbar";
import "./MyMenu.css"; // create this for styling

function MyMenu() {
  const [meals, setMeals] = useState([]);
  const user= JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:8500/api/get-menu/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched meals:", data.meals);
        setMeals(data.meals || [])})
      .catch((err) => console.error("Error fetching meals:", err));
  }, [user._id]);

  const handleDelete = async (menuId) => {
    if (!window.confirm("Are you sure you want to delete this meal?")) return;

    try {
      const res = await fetch("http://localhost:8500/api/delete-menu", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menu_id: menuId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Meal deleted!");
      setMeals(meals.filter((m) => m._id !== menuId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete meal");
    }
  };

  return (
    <div>
      <ChefNavbar />
      <div className="mymenu-container">
        {meals.length === 0 ? (
          <p>No meals uploaded yet.</p>
        ) : (
          <div className="meal-grid">
            {meals.map((meal) => (
              <div className="meal-card" key={meal._id}>
                <img src={`http://localhost:8500/uploads/${meal.image}`} alt={meal.title} />
                <h3>{meal.title}</h3>
                <p>{meal.description}</p>
                <p><strong>₹{meal.price}</strong></p>
                <div className="actions">
                  {/* You can add edit functionality later */}
                  <button onClick={() => handleDelete(meal._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyMenu;
