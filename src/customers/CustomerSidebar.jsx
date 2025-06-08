import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart2, FileText, Upload, LogOut, ChartBar, LayoutDashboard } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { Chart } from "chart.js";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/customer-dashboard" },
    { name: "Upload File", icon: <Upload size={20} />, path: "/upload" },
    { name: "Analyze Data", icon: <BarChart2 size={20} />, path: "/analyze-data" },
    { name: "My Files", icon: <FileText size={20} />, path: "/files" },
  ];

   const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : { name: "", email: "" };
});


  const handleLogout = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No active session found.");
    navigate("/login");
    return;
  }

  try {
    await axios.post(
      "http://localhost/api/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  } catch (err) {
    if (err.response?.status === 401) {
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      console.error("Logout failed:", err);
      alert("Logout failed. Try again.");
    }
  }
};


  return (
    <div className="w-72 h-screen fixed top-0 left-0 bg-[#006494] text-white shadow-2xl rounded-tr-4xl flex flex-col">

      <div className="mt-6 px-6 text-sm">
          <h1 className="text-2xl font-bold montserrat-mont">Welcome, {user.name || "User"}</h1>
          <p className="text-sm poppins-medium">{user.email || "No email available"}</p>
        </div>
<div className="border mt-6"></div>
      <nav className="flex-1 p-4 space-y-3 poppins-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-yellow-600 transition ${
              location.pathname === item.path ? "bg-yellow-600" : ""
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center cursor-pointer gap-3 px-4 py-2 rounded-lg hover:bg-yellow-600 transition w-full text-left"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

        
      </nav>

      <div className="p-4 text-sm text-center text-blue-100 mt-auto">
        © {new Date().getFullYear()} Zidio
      </div>
    </div>
  );
};

export default Sidebar;
