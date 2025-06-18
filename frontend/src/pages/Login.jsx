import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const navigate = useNavigate();

     const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const res = await fetch("http://localhost:8500/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();
      if (!res.ok) {
        alert(data.msg || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.role === "admin") {
        navigate("/Admin/AdminDashboard");
      } else if (data.user.role === "chef") {
        navigate("/Chef/ChefDashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

    return(
        <div>
            <Navbar/>
            <div className="login-wrapper">
                <div className="login-img"></div>
                <div className="login-form-section">
                    <form className="signin-form" onSubmit={handleSubmit}>
                        <label>Email:</label>
                        <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Password:</label>
                        <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />

                        <label>Role:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="customer">Chef</option>
                        <option value="artisan">User</option>
                        <option value="admin">Admin</option>
                        </select>

                        <button type="submit">logIn</button>

                        <div className="divider">
                        <span>or</span>
                        </div>

                        <a href="http://localhost:5000/auth/google" className="google-login-btn">
                        <img
                            src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
                            alt="Sign in with Google"
                        />
                        </a>
                    </form>
                </div>
            
            </div>
        </div>
    );
}
export default Login;