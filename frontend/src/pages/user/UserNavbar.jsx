import "../user/UserNavbar.css";
import { NavLink } from "react-router-dom";

function UserNavbar() {
    const handleLogout = () =>  {
        localStorage.clear();
        window.location.href = "/login";
    }
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">FreshPlates</div>
                <div className="navbar-spacer"></div> {/* This creates the middle gap */}
                <div className="navbar-links">
                    <NavLink to="/"end>Home</NavLink>

                    <NavLink to="/Browsemeals">Browse Meals</NavLink>

                    <NavLink to="/user/orders">MyOrders</NavLink>

                    <NavLink to="/user/cart">Cart</NavLink>

                    <NavLink to="">Profile</NavLink>
                    <button onClick={handleLogout} className="logout-link">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default UserNavbar;
