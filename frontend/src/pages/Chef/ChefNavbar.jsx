import "../Chef/ChefNavbar.css"

function ChefNavbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">FreshPlates</div>
                <div className="navbar-links">
                    <a href="/">ChefHome</a>
                    <a href="/Browsemeals">#1</a>
                    <a href="/Signup">#2</a>
                    <a href="/login">#3</a>
                </div>
            </div>
        </nav>
    );
}

export default ChefNavbar;
