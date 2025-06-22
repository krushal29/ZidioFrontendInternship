// import React, { useEffect, useState } from 'react';
// import Sidebar from './CustomerSidebar';
// import { useNavigate } from 'react-router';
// import axios from 'axios';

// const CustomerDashboard = () => {
//   const [stats, setStats] = useState({
//     totalFiles: 0,
//     totalSizeMB: 0,
//     aiInsights: 0
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:80/api/excel/userStats", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (res.data.success) setStats(res.data);
//       } catch (e) {
//         console.error("Error fetching stats:", e);
//       }
//     };
//     fetchStats();
//   }, []);


//   return (
//     <div className="ml-72 p-6 bg-[#e0eafc] min-h-screen">
//       <Sidebar />
//       <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center montserrat-mont1">📊 Your Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Card 1: Total Files Uploaded */}
//         <div className="bg-blue-200 shadow-lg rounded-2xl p-10 text-center hover:shadow-2xl transition-all duration-300">
//           <h2 className="text-lg font-semibold text-gray-600 mb-2">Total Files Uploaded</h2>
//           <p className="text-4xl font-bold text-blue-600">{stats.totalFiles}</p>
//         </div>

//         {/* Card 2: Total File Size */}
//         <div className="bg-green-200 shadow-lg rounded-2xl p-10 text-center hover:shadow-2xl transition-all duration-300">
//           <h2 className="text-lg font-semibold text-gray-600 mb-2">Total File Size</h2>
//           <p className="text-4xl font-bold text-green-600">{stats.totalSizeMB}MB</p>
//         </div>

//         {/* Card 3: AI Insights */}
//         <div className="bg-purple-200 shadow-lg rounded-2xl p-10 text-center hover:shadow-2xl transition-all duration-300">
//           <h2 className="text-lg font-semibold text-gray-600 mb-2">AI Insights</h2>
//           <p className="text-4xl font-bold text-purple-600">{stats.aiInsights}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;



import React, { useEffect, useState } from 'react';
import Sidebar from './CustomerSidebar';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ChangePasswordModal from './ChangePasswordModal';
import { backendurl } from '../App';


const CustomerDashboard = () => {
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalSizeMB: 0,
    aiInsights: 0
  });
  const navigate = useNavigate()
  const [showPasswordModal, setShowPasswordModal] = useState(false);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch uploaded files
        const fileRes = await axios.get(`${backendurl}/excel/ExcelAllData`, { headers });
        const sortedFiles = fileRes.data.message.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setFiles(sortedFiles.slice(0, 5)); // Last 5 files

        // Fetch user info
        const userRes = await axios.get(`${backendurl}/user/profile`, { headers });
         const storedLastLogin = localStorage.getItem('lastLogin');
          const userWithLastLogin = {
        ...userRes.data.user,
        lastLogin: storedLastLogin || userRes.data.user.lastLogin,
      };
      setUser(userWithLastLogin);
        // setUser(userRes.data.user);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

    useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${backendurl}/excel/userStats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) setStats(res.data);
      } catch (e) {
        console.error("Error fetching stats:", e);
      }
    };
    fetchStats();
  }, []);

  

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-72 flex-1 p-6 bg-purple-100 space-y-8 min-h-screen">

       <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center montserrat-mont1">Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Card 1: Total Files Uploaded */}
         <div className="bg-blue-200 shadow-lg rounded-2xl p-10 text-center hover:shadow-2xl transition-all duration-300">
           <h2 className="text-lg font-semibold text-gray-600 mb-2 poppins-medium">Total Files Uploaded</h2>
           <p className="text-4xl font-bold text-blue-600 winky-sans">{stats.totalFiles}</p>
         </div>

         {/* Card 2: Total File Size */}
         <div className="bg-green-200 shadow-lg rounded-2xl p-10 text-center hover:shadow-2xl transition-all duration-300">
           <h2 className="text-lg font-semibold text-gray-600 mb-2 poppins-medium">Total File Size</h2>
           <p className="text-4xl font-bold text-green-600 winky-sans">{stats.totalSizeMB}MB</p>
         </div>

         {/* Card 3: AI Insights */}
         <div className="bg-purple-200 shadow-lg rounded-2xl p-10 text-center hover:shadow-2xl transition-all duration-300">
           <h2 className="text-lg font-semibold text-gray-600 mb-2 poppins-medium">AI Insights</h2>
           <p className="text-4xl font-bold text-purple-600 winky-sans">{stats.aiInsights}</p>
         </div>
       </div>


        {/* Recent Uploaded Files */}
        <div className="bg-[#c8e6f4] p-4 rounded-xl shadow-xl justify-center items-center hover:shadow-2xl transition-all duration-300 mb-6">
          <h2 className="text-xl font-semibold mb-4 montserrat-mont1">📊 Recent Uploaded Files</h2>
          <table className="w-full table-auto text-sm text-center poppins-medium">
            <thead>
              <tr className='text-lg'>
                <th className="py-2 px-4">File Name</th>
                <th className="py-2 px-4">Upload Date</th>
                <th className="py-2 px-4">Size (KB)</th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ? (
                files.map((file) => (
                  <tr key={file._id} className="border-t">
                    <td className="py-2 px-4">{file.FileName}</td>
                    <td className="py-2 px-4">
                      {new Date(file.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {(file.FileSize / 1024).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-2 px-4 text-center">
                    No recent uploads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className='flex justify-center items-center p-2 bg-[#006494] text-white cursor-pointer rounded-lg hover:scale-102 transition-all duration-300'>
            <button onClick={() => navigate("/files")}  className='poppins-medium cursor-pointer'>Show more</button>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-[#c8e6f4] p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
         
          <h2 className="text-xl font-semibold mb-4 montserrat-mont1">👤 Your Info</h2>
          {user ? (
            <>
              <p className='poppins-medium'><strong>Name:</strong> {user.Name}</p>
              <p className='poppins-medium'><strong>Email:</strong> {user.email}</p>
              <button
                className="mt-3 px-4 py-2 bg-[#006494] text-white rounded poppins-medium cursor-pointer hover:scale-104 transition-all duration-300"
                 onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </button>
            
              {user?.lastLogin && (
  <div className=" text-sm flex gap-2 mt-2 text-gray-700 poppins-medium">
    <p className="mb-1 text-red-600 "><strong>Last Login: </strong></p>
    <p>{new Date(user.lastLogin).toLocaleDateString()}</p>
<p>{new Date(user.lastLogin).toLocaleTimeString()}</p>

  </div>
)}
            </>
          ) : (
            <p>Loading user data...</p>
          )}


          {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
