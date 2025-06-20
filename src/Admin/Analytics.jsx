// import React, { useState } from 'react';
// import axios from 'axios';
// import AdminSidebar from './AdminSidebar';

// const Analytics = () => {
//   const [searchName, setSearchName] = useState('');
//   const [reports, setReports] = useState([]);
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');

//   const handleSearch = async () => {
//     try {
//       const res = await axios.get(`http://localhost:80/api/admin/reports/by-username/${searchName}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setReports(res.data.reports);
//       setError('');
//     } catch (err) {
//       setReports([]);
//       setError('User not found or no reports available.');
//     }
//   };

//   return (
//     <div className="flex h-screen">
//         <AdminSidebar/>
// <div className='ml-72'>
//       <h2 className="text-xl font-bold mb-4">Search Reports by User Name</h2>

//       <input
//         type="text"
//         className="border p-2 rounded mr-2"
//         placeholder="Enter username"
//         value={searchName}
//         onChange={(e) => setSearchName(e.target.value)}
//       />
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={handleSearch}
//       >
//         Search
//       </button>

//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {reports.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold mb-2">Reports:</h3>
//           <ul className="list-disc pl-6">
//             {reports.map((report) => (
//               <li key={report._id} className="mb-1">
//                 {report.title} — <span className="text-sm text-gray-500">{new Date(report.createdAt).toLocaleString()}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
// </div>
//   );
// };

// export default Analytics;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Analytics = () => {
  const [searchName, setSearchName] = useState('');
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:80/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const usernames = res.data.users.map((user) => user.Name);
        setSuggestions(usernames);
      })
      .catch(console.error);
  }, [token]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:80/api/admin/reports/by-username/${encodeURIComponent(searchName)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReports(res.data.reports);
      setError('');
    } catch {
      setReports([]);
      setError('User not found or no reports available.');
    }
  };

  const filtered = suggestions.filter((name) =>
    name.toLowerCase().startsWith(searchName.toLowerCase())
  );

  const chartData = {
    labels: reports.map((r) => r.title),
    datasets: [
      {
        label: 'File Size (MB)',
        data: reports.map((r) => (r.fileSize / (1024 * 1024)).toFixed(2)),
        backgroundColor: '#93D9D9',
      },
    ],
  };

  return (
    <div className="flex h-screen">
        <AdminSidebar />
      <div className="h-full ">
        
      </div>
      <div className="flex-1 p-6 overflow-y-auto ">
        <h2 className="text-2xl font-bold text-center mb-6 montserrat-mont1">
          Search Reports by User Name
        </h2>

        <div className="flex justify-center gap-2 mb-4">
          <div className="relative">
            <input
              type="text"
              className="border p-2 rounded w-64 winky-sans"
              placeholder="Enter username"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            {searchName && filtered.length > 0 && (
              <ul className="absolute bg-white w-64 mt-1 rounded shadow z-10 winky-sans">
                {filtered.map((s, i) => (
                  <li
                    key={i}
                    className="p-2 hover:bg-gray-100 cursor-pointer winky-sans"
                    onClick={() => {
                      setSearchName(s);
                      setSuggestions([]);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded poppins-medium cursor-pointer hover:scale-103 transform duration-300 ease-in-out hover:bg-yellow-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {reports.length > 0 && (
          <>
            {/* Reports Table */}
            <div className="overflow-x-auto mt-6 poppins-medium">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-[#009689] text-white text-left">
                    <th className="border p-2">Title</th>
                    <th className="border p-2">Created At</th>
                    <th className="border p-2">Size (MB)</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report._id}>
                      <td className="border p-2">{report.title}</td>
                      <td className="border p-2">
                        {new Date(report.createdAt).toLocaleString()}
                      </td>
                      <td className="border p-2">
                        {(report.fileSize / (1024 * 1024)).toFixed(2)} 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bar Chart */}
            <div className="mt-10 poppins-medium">
              <h4 className="text-lg font-semibold mb-2 montserrat-mont1">File Size Summary</h4>
              <Bar height={100} data={chartData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
