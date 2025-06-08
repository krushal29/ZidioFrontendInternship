import {React} from 'react'
import { useNavigate } from "react-router-dom";

import {
  FaUserShield,
  FaChartBar,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };
  return (
    
      <div className="w-72 bg-teal-700 text-white flex flex-col px-6 rounded-tr-4xl shadow-3xl">
        <div className="text-2xl font-bold p-6 border-b border-white montserrat-mont1">
          Admin Panel
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          <button onClick={() => navigate("/users")} className="flex poppins-medium items-center rounded-lg text-xl cursor-pointer px-4 py-2 gap-3 w-full text-left hover:bg-yellow-600">
            <FaUserShield size={20} /> Users
          </button>
          <button className="flex poppins-medium items-center rounded-lg text-xl cursor-pointer px-4 py-2 gap-3 w-full text-left hover:bg-yellow-600">
            <FaChartBar size={20} /> Analytics
          </button>
          <button onClick={() => navigate("/reports")} className="flex items-center poppins-medium rounded-lg text-xl cursor-pointer px-4 py-2 gap-3 w-full text-left hover:bg-yellow-600">
            <FaFileAlt size={20} /> Reports
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center poppins-medium rounded-lg text-xl cursor-pointer px-4 py-2 gap-3 w-full text-left hover:bg-yellow-600"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
       <div className="p-4 text-sm text-center text-blue-100 mt-auto">
        © {new Date().getFullYear()} Zidio
      </div>
          
     
      </div>
    
  )
}

export default AdminSidebar
