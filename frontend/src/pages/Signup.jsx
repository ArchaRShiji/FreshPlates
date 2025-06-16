import Navbar from "../components/Navbar";
import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        role: "user",
        location: {
            lat: "",
            lng: ""
        }
    });

    // Geolocation
    useEffect(() => {
        if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            setFormData((prev) => ({
            ...prev,
            location: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            },
            }));
        });
        } else {
        alert("Geolocation not supported");
        }
    }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { confirmPassword, ...payload } = formData;

    try {
      const res = await fetch("http://localhost:8500/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || "Registration failed");
        return;
      }

      alert("Registration successful! Please sign in.");
      navigate("/Login");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };
    return(
        <div>
            <Navbar/>
            <div className="signup-wrapper">
                <div className="signup-image"></div>

                <div className="signup-form-section">
                    <div className="register-container">
                        <form className="register-form" onSubmit={handleSubmit}>

                            <label>Name:</label>
                            <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            />

                            <label>Email:</label>
                            <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            />

                            <label>Password:</label>
                            <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            />

                            <label>Confirm Password:</label>
                            <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            />

                            <label>Phone:</label>
                            <input
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            />

                            <label>Address:</label>
                            <input
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            />

                            <label>Role:</label>
                            <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="chef">Chef</option>
                            <option value="user">User</option>
                            </select>

                            <button type="submit">Register</button>
                        </form>
                    </div>

                </div>
                
            </div>
        </div>//1
    );
}
export default Signup;