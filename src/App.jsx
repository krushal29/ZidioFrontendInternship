
import React from 'react';
import Home from './components/Home';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Signup from './components/Signup';
import  Login from './components/Login';
import CustomerDashboard from './customers/CustomerDashboard';


const App = () => {
  return (
    <>
    <div className="App">
      {/* <Home /> */}
     
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/customer-dashboard" element={<CustomerDashboard/>}/>
          {/* Add other routes here as needed */}
        </Routes>
        
    </div>
    </>
  );
};
export default App;

