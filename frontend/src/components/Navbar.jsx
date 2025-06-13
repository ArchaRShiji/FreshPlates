import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">FreshPlates</div>
                <div className="navbar-links">
                    <a href="/">Home</a>
                    <a href="/Browsemeals">Browse Meals</a>
                    <a href="/Signup">Signup</a>
                    <a href="/login">Login</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
