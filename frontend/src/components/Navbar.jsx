import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">FreshPlates</div>
                <div className="navbar-links">
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/Browsemeals">Browse Meals</NavLink>
                    <NavLink to="/Signup">Signup</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
