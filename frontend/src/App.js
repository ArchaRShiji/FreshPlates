import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import Browsemeals from './pages/Browsemeals';
import Login from './pages/Login';
import UserHomepage from './pages/user/Homepage';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Browsemeals" element={<Browsemeals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/Homepage" element={<UserHomepage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
