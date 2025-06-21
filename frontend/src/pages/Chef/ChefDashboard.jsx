import ChefNavbar from "./ChefNavbar";
import "../Chef/ChefDashboard.css";

function ChefDashboard(){
    return(
        <div>
            <ChefNavbar/>
            <div className="chef-dashboard">
                <h2>Welcome, Chef!</h2>
                <p>Manage your meals and track your orders here.</p>

                <div className="dashboard-cards">
                    <div className="card" onClick={() => window.location.href = "/Chef/UploadMenu"}>
                        <h3>Upload Menu 🍴</h3>
                        <p>Add new dishes to your menu.</p>
                    </div>

                    <div className="card" onClick={() => window.location.href = "/Chef/MyMenu"}>
                        <h3>My Menu 🥘🍲</h3>
                        <p>View and manage your uploaded dishes.</p>
                    </div>

                    <div className="card" onClick={() => window.location.href = "/Chef/ChefOrders"}>
                        <h3>Chef Orders 👨‍🍳</h3>
                        <p>Track your incoming orders.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChefDashboard;