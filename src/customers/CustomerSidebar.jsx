import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart2, FileText, Upload, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <BarChart2 size={20} />, path: "/customer-dashboard" },
    { name: "Upload File", icon: <Upload size={20} />, path: "/upload" },
    { name: "My Files", icon: <FileText size={20} />, path: "/files" },
    { name: "Logout", icon: <LogOut size={20} />, path: "/logout" },
  ];

  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-[#006494] text-white shadow-lg flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-blue-200">
        ExcelAnalytics
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
              location.pathname === item.path ? "bg-blue-800" : ""
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 text-sm text-center text-blue-100">
        © {new Date().getFullYear()} Zidio
      </div>
    </div>
  );
};

export default Sidebar;
