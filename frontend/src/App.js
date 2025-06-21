import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import Browsemeals from './pages/Browsemeals';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import ChefDashboard from './pages/Chef/ChefDashboard.jsx';
import UserCart from './pages/user/Cart.jsx';
import MyOrders from './pages/user/orders.jsx';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Browsemeals" element={<Browsemeals />} />
        <Route path="/login" element={<Login />} />

        <Route path='/Admin/AdminDashboard' element={<AdminDashboard/>}/>

        <Route path='/Chef/ChefDashboard' element={<ChefDashboard/>}/>

        <Route path='/user/cart' element={<UserCart/>}/>
        <Route path='/user/orders' element={<MyOrders/>}/>
      </Routes>
    </Router>
  );
}

export default App;
