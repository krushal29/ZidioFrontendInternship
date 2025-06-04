// // src/pages/UploadFile.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const UploadFile = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       setMessage("Please select a file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("File", file);

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post("http://localhost/api/excel/uploadExcelFile", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.data.success) {
//         setMessage("File uploaded successfully.");
//         setFile(null);
//       } else {
//         setMessage("Failed to upload file.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Server error. Please try again.");
//     }
//   };

//   return (
//     <div className="ml-72 p-6">
//       <h1 className="text-2xl font-bold mb-4">Upload Excel File</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="file"
//           accept=".xlsx, .xls"
//           onChange={handleFileChange}
//           className="block w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Upload
//         </button>
//       </form>
//       {message && <p className="mt-4 text-red-500">{message}</p>}
//     </div>
//   );
// };

// export default UploadFile;




import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Sidebar from './CustomerSidebar'

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setMessage("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("File", file);

    try {
      const token = localStorage.getItem("token");
      console.log(token)

      const res = await axios.post("http://localhost:80/api/excel/uploadExcelFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setMessage("✅ File uploaded successfully.");
        setFile(null);
      } else {
        setMessage("❌ Failed to upload file.");
      }
    } catch (err) {
      // console.error(err);
      // setMessage("❌ Server error. Please try again.");
      console.error("Upload failed:", err.response?.data || err.message);
    }
  };

  return (
    
    <div className="max-w-3xl mx-auto mt-28 p-8 bg-white shadow-lg rounded-lg">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#ffffff_40%,#006494_100%)]"></div>

      <Sidebar/>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center montserrat-mont1">📤 Upload Excel File</h1>
      
      <div
        {...getRootProps()}
        className={`border-4 border-dashed p-10 rounded-lg text-center cursor-pointer transition-all ${
          isDragActive ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <p className="text-lg text-green-600 font-medium">{file.name}</p>
        ) : isDragActive ? (
          <p className="text-blue-600 font-semibold">Drop the file here ...</p>
        ) : (
          <p className="text-gray-600">
            Drag & drop an Excel file here, or <span className="text-[#006494] font-medium poppins-medium underline">click to select</span>
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 text-center">
        <button
          type="submit"
          className="bg-[#1b79a5] cursor-pointer hover:bg-[#006494] text-white poppins-medium px-6 py-3 rounded-lg shadow-md hover:scale-110 transform duration-300 ease-in-out font-bold transition "
        >
          Upload File
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-md font-medium text-red-600">{message}</p>
      )}
    </div>
  );
};

export default UploadFile;
