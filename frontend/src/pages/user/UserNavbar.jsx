import "../user/UserNavbar.css";

function UserNavbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">FreshPlates</div>
                <div className="navbar-links">
                    <a href="/">Home</a>
                    <a href="/Browsemeals">Browse Meals</a>
                    <a href="#">MyOrders</a>
                    <a href="#">Cart</a>
                    <a href="#">Profile</a>
                    <a>Logout</a>
                </div>
            </div>
        </nav>
    );
}

export default UserNavbar;
