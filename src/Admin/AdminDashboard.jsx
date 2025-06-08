// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaUserShield,
//   FaChartBar,
//   FaFileAlt,
//   FaSignOutAlt,
// } from "react-icons/fa";


// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/admin-login");
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
// <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
//   <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#9EF2E4,transparent)]"></div>
// </div>

//       <div className="w-72 bg-teal-700 text-white flex flex-col px-6 rounded-tr-4xl shadow-3xl">
//         <div className="text-2xl font-bold p-6 border-b border-white montserrat-mont1">
//           Admin Panel
//         </div>
//         <nav className="flex-1 px-4 py-6 space-y-4">
//           <button className="flex poppins-medium items-center rounded-lg text-xl cursor-pointer px-4 py-2 gap-3 w-full text-left hover:bg-blue-600">
//             <FaUserShield size={20} /> Users
//           </button>
//           <button className="flex poppins-medium items-center rounded-lg text-xl cursor-pointer px-4 py-2 gap-3 w-full text-left hover:bg-yellow-600">
//             <FaChartBar size={20}/> Analytics
//           </button>
//           <button className="flex items-center poppins-medium rounded-lg text-xl cursor-pointer px-4 py-2 gap-3 w-full text-left hover:bg-yellow-600">
//             <FaFileAlt size={20}/> Reports
//           </button>
//         </nav>
//         <div className="p-4 border-t border-blue-800">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 text-left w-full hover:text-red-300"
//           >
//             <FaSignOutAlt /> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 overflow-y-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 montserrat-mont1">
//           Welcome, Admin
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           <div className="bg-blue-100 rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold text-gray-700 mb-2 poppins-medium">
//               Total Users
//             </h2>
//             <p className="text-3xl font-bold text-blue-600 winky-sans">128</p>
//           </div>
//           <div className="bg-green-100 rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">
//               Reports Reviewed
//             </h2>
//             <p className="text-3xl font-bold text-green-600 winky-sans">42</p>
//           </div>
//           <div className="bg-purple-100 rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">
//               Active Sessions
//             </h2>
//             <p className="text-3xl font-bold text-purple-600 winky-sans">5</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

import axios from "axios";
import { Sidebar } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  const [stats, setStats] = useState({
  reviewedReports: 0,
  activeSessions: 0,
});

const fetchStats = async () => {
  try {
    const res = await axios.get('http://localhost:80/api/admin/dashboard-stats', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStats(res.data);
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
  }
};

useEffect(() => {
  fetchUsers();
  fetchStats(); // <-- fetch this along with users
}, []);



  const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:80/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API response:", res.data);
    setUsers(res.data.users || []); 
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};


  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:80/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const toggleUserRole = async (id, currentRole) => {
    const newRole = currentRole === "user" ? "admin" : "user";
    try {
      await axios.put(`http://localhost:80/api/admin/users/${id}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error updating user role:", err);
    }
  };

  




  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar/>
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#9EF2E4,transparent)]"></div>
      </div>

      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 montserrat-mont1">
          Welcome, Admin
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10 rounded-xl">
          <div className="bg-blue-300 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-2 poppins-medium">
              Total Users
            </h2>
            <p className="text-3xl font-bold text-blue-600 winky-sans">{Array.isArray(users) ? users.length : 0}</p>

          </div>
          <div className="bg-green-300 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2 poppins-medium">
              Reports Reviewed
            </h2>
            <p className="text-3xl font-bold text-green-600 winky-sans"> {stats.reviewedReports}</p>
          </div>
          <div className="bg-purple-300 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2 poppins-medium">
              Active Sessions
            </h2>
            <p className="text-3xl font-bold text-purple-600 winky-sans"> {stats.activeSessions}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 montserrat-mont1">User Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-start border">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="py-2 px-4 poppins-medium">Name</th>
                  <th className="py-2 px-4 poppins-medium">Email</th>
                  <th className="py-2 px-4 poppins-medium">Role</th>
                  <th className="py-2 px-4 poppins-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.map((user) => (
                  <tr key={user._id} className="border-b text-center">
                    <td className="py-2 px-4 winky-sans text-lg">{user.Name}</td>
                    <td className="py-2 px-4 winky-sans text-lg">{user.email}</td>
                    <td className="py-2 px-4 winky-sans text-lg">{user.role}</td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white cursor-pointer px-3 winky-sans py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => toggleUserRole(user._id, user.role)}
                        className="bg-blue-500 text-white cursor-pointer px-3 py-1 winky-sans rounded hover:bg-blue-600"
                      >
                        Toggle Role
                      </button>
                    </td>
                  </tr>
                ))}
                {Array.isArray(users) && users.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;

