import { NavLink } from "react-router-dom";
import "../Chef/ChefNavbar.css"

function ChefNavbar() {
    const handleLogout = () =>  {
        localStorage.clear();
        window.location.href = "/login";
    }
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">FreshPlates</div>
                <div className="navbar-links">
                    <NavLink to="/Chef/ChefDashboard">ChefHome</NavLink>
                    <NavLink to="/Chef/UploadMenu">Upload Menu</NavLink>
                    <NavLink to="/Chef/MyMenu">My Menu</NavLink>
                    <NavLink to="/Chef/ChefOrders">Chef Orders</NavLink>
                    <button onClick={handleLogout} className="logout-link">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default ChefNavbar;
