import "../Admin/AdminNavbar.css"
function AdminNavbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">FreshPlates</div>
                <div className="navbar-links">
                    <a href="/">AdminHome</a>
                    <a href="/Browsemeals">#1</a>
                    <a href="/Signup">#2</a>
                    <a href="/login">#3</a>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;
