import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import { useState } from 'react';

import Home from "./components/Homepage.js";
import Login from "./components/LoginSign.js";
import Dashboard from "./components/Patient/Dashboard.js"
import AdminDash from "./components/Admin/AdminDash.js"
import DrDashboard from "./components/Doctor/DrDashboard.js"




import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [isLogin, setLogin] = useState(true);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setLogin={setLogin}/>} />
        <Route path="/login" element={<Login isLogin={isLogin}  setLogin={setLogin} />} />
        <Route path="/signup" element={<Login isLogin={isLogin} setLogin={setLogin}/>} /> 
        <Route path="/patient_dashboard" element={<Dashboard />} /> 
        <Route path="/admin_dashboard" element={<AdminDash />} /> 
        <Route path="/doctor_dashboard" element={<DrDashboard />} />



      </Routes>
      
      <ToastContainer/>
    </Router>
  );
}

export default App;