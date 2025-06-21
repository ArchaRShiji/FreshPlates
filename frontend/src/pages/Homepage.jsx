import Footer from "../components/Footer";
import Header from "../components/Header";
import PublicNavbar from "../components/Navbar";
import UserNavbar from "./user/UserNavbar";

function Homepage() {
  const user = localStorage.getItem("user");
  const isLoggedIn = user !== null;
  return (
    <div>
      {isLoggedIn? <UserNavbar/> :<PublicNavbar/>};
      <Header/>
      <Footer/>
    </div>
  );
}

export default Homepage;
