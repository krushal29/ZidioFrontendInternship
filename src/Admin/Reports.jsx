import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import { backendurl } from '../App';

const Reports = () => {
  const [reports, setReports] = useState([]);

  // ✅ Get token from localStorage
  const token = localStorage.getItem('token');

 const fetchReports = async () => {
  try {
    const res = await axios.get(`${backendurl}/admin/reports`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Fetched reports:', res.data); // log full response
    setReports(res.data.reports || res.data);   // support both formats
  } catch (err) {
    console.error('Error fetching reports:', err.response?.data || err.message);
  }
};


  const handleReview = async (reportId) => {
    try {
      await axios.put(`${backendurl}/admin/reports/${reportId}/review`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReports();
    } catch (err) {
      console.error('Error reviewing report:', err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex h-screen">
        <AdminSidebar/>
     
      
      <div className="w-4/5 p-4 overflow-y-auto h-screen">
        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 montserrat-mont1">Reports</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-start border">
              <thead className="bg-teal-600 text-white">
  <tr>
    <th className="py-2 px-4 poppins-medium">Title</th>
    <th className="py-2 px-4 poppins-medium">Description</th>
    <th className="py-2 px-4 poppins-medium">Uploaded At</th>
    <th className="py-2 px-4 poppins-medium">File Size</th>
  </tr>
</thead>
<tbody>
  {reports.map((report) => (
    <tr key={report._id} className="border-b text-center">
      <td className="py-2 px-4 winky-sans text-lg">{report.title}</td>
      <td className="py-2 px-4 winky-sans text-lg">{report.description}</td>
      <td className="py-2 px-4 winky-sans text-lg">
        {new Date(report.createdAt).toLocaleString()}
      </td>
       <td className="py-2 px-4 winky-sans text-lg">
        {report.fileSize ? `${(report.fileSize / 1024).toFixed(2)} KB` : "N/A"}
      </td>
    </tr>
  ))}
  {reports.length === 0 && (
    <tr>
      <td colSpan="3" className="py-4 text-center text-gray-500">
        No reports found.
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

export default Reports;
