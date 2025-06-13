import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Eye, Bot } from "lucide-react";
import Modal from "react-modal";
import Sidebar from './CustomerSidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from "jspdf";


const Files = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiOverview, setAiOverview] = useState("");
  const [fetchingOverview, setFetchingOverview] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:80/api/excel/ExcelAllData", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.data) {
        setFiles(res.data.message);
      }
    } catch (err) {
      console.error("Failed to fetch files", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileId) => {
    const confirm = window.confirm("Are you sure you want to delete this file?");
    if (!confirm) return;

    try {
      const res = await axios.delete(`http://localhost:80/api/excel/delete/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setFiles(files.filter((file) => file._id !== fileId));
        toast.success("File deleted successfully!");
      } else {
        toast.error("Failed to delete file.");
      }
    } catch (err) {
      toast.error("Failed to delete file.");
    }
  };

  const handleAiOverview = async (fileId) => {
    setAiModalOpen(true);
    setFetchingOverview(true);
    try {
      const res = await axios.get(`http://localhost:80/api/excel/overview/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.data) {
        const cleanText = res.data.text.replace(/[*_\-#>`]/g, '');
        setAiOverview(cleanText);
      } else {
        setAiOverview("Failed to generate overview.");
      }
    } catch (e) {
      setAiOverview("Error generating overview.");
    }
    setFetchingOverview(false);
  };

  const handleDownloadOverview = () => {
  const doc = new jsPDF();
  const lines = doc.splitTextToSize(aiOverview, 180); 
  doc.text(lines, 10, 10);
  doc.save("AI_File_Overview.pdf");
};


  if (loading) return <div className="ml-72 p-6">Loading files...</div>;

  return (
    <div className="ml-72 p-6">
      <Sidebar />
      <div className="absolute inset-0 -z-10 h-full w-full bg-gray-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <ToastContainer position="top-right" toastStyle={{ backgroundColor: "black", color: "white" }} autoClose={3000} hideProgressBar={false} />
      
      <h1 className="text-2xl font-bold montserrat-mont1 mb-4">📁 My Files</h1>
      {files.length === 0 ? (
        <p className="text-gray-600">No files uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file._id} className="flex justify-between items-center bg-gray-100 p-4 shadow-2xl rounded-lg">
              <div>
                <p className="font-semibold montserrat-mont">{file.FileName}</p>
                <p className="text-sm text-gray-500">{(file.FileSize / 1024).toFixed(2)} KB</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={file.FileURl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white bg-green-500 hover:bg-green-700 p-2 hover:scale-110 transform duration-300 ease-in-out justify-center poppins-medium border rounded-lg flex items-center gap-1"
                >
                  <Eye size={18} /> View
                </a>
                <button
                  onClick={() => handleAiOverview(file._id)}
                  className="text-white p-2 bg-[#167baa] hover:bg-[#006494] cursor-pointer hover:scale-110 transform duration-300 ease-in-out flex justify-center poppins-medium border rounded-lg items-center gap-1"
                >
                  <Bot size={16} /> AI Overview
                </button>
                <button
                  onClick={() => handleDelete(file._id)}
                  className="text-white p-2 bg-red-500 hover:bg-red-700 cursor-pointer hover:scale-110 transform duration-300 ease-in-out flex justify-center poppins-medium border rounded-lg items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
                
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for AI Overview */}
      <Modal
        isOpen={aiModalOpen}
        onRequestClose={() => setAiModalOpen(false)}
        className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-xl border outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4 text-[#167baa] montserrat-mont1">🤖 AI Overview</h2>
        <div className="max-h-96 overflow-y-auto text-gray-700 poppins-medium whitespace-pre-wrap text-base">
          {fetchingOverview ? "Generating overview..." : aiOverview}
        </div>
        <div className="flex justify-between">
        <button
          onClick={() => setAiModalOpen(false)}
          className="mt-4 px-4 py-2 bg-gray-700 text-white cursor-pointer rounded hover:bg-gray-900"
        >
          Close
        </button>
        
  <button
    onClick={handleDownloadOverview}
    className="mt-4 bg-green-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-green-700 transition"
  >
    📥 Download Overview
  </button>
  </div>
      </Modal>


      
    </div>
  );
};

export default Files;
