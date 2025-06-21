import { useState } from "react";
import "./UploadMenu.css";
import ChefNavbar from "./ChefNavbar";

function UploadMenu() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chef = JSON.parse(localStorage.getItem("user"));
    const data = new FormData();
    data.append("chef_id", chef._id);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("image", formData.image);

    try {
      const res = await fetch("http://localhost:8500/api/create-menu", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      alert("Menu uploaded!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload menu");
    }
  };

  return (
    <div>
        <ChefNavbar/>
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <label>Meal Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Price (₹)</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        <button type="submit">Upload</button>
      </form>
    </div>
    </div>
  );
}

export default UploadMenu;
