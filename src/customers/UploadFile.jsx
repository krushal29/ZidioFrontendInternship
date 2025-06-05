import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Sidebar from './CustomerSidebar';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Papa from 'papaparse';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
);

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [selectedColumns, setSelectedColumns] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setMessage("");
    setExcelData([]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file to upload.");

    const formData = new FormData();
    formData.append("File", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:80/api/excel/uploadExcelFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setMessage("✅ File uploaded successfully.");
        setFile(null);

        const allData = await axios.get("http://localhost:80/api/excel/ExcelAllData", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const latest = allData.data.message.at(-1);
        const firstSheet = Object.keys(latest.ExcelData)[0];
        setExcelData(latest.ExcelData[firstSheet]);
      } else {
        setMessage("❌ Failed to upload file.");
      }
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
    }
  };

  const numericKeys = Object.keys(excelData[0] || {}).filter(
    key => typeof excelData[0][key] === "number"
  );

  const getChartData = () => {
    if (!excelData || selectedColumns.length === 0) return null;

    const labels = excelData.map((_, i) => `Row ${i + 1}`);
    const datasets = selectedColumns.map((key, idx) => ({
      label: key,
      data: excelData.map(row => row[key]),
      backgroundColor: `hsl(${(idx * 80) % 360}, 70%, 60%)`,
      borderColor: `hsl(${(idx * 80) % 360}, 70%, 40%)`,
      borderWidth: 1,
    }));

    return { labels, datasets };
  };

  const renderChart = () => {
    const data = getChartData();
    if (!data) return <p className="text-center text-red-600 mt-4">No numeric data to display.</p>;

    switch (chartType) {
      case "bar": return <Bar data={data} />;
      case "line": return <Line data={data} />;
      case "pie": return <Pie data={data} />;
      default: return null;
    }
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(excelData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "excel_data.csv";
    link.click();
  };

  const handleExportPDF = async () => {
    const chartCanvas = document.querySelector("canvas");
    const canvas = await html2canvas(chartCanvas.parentElement);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
    pdf.save("chart.pdf");
  };

  const getStats = () => {
    return selectedColumns.map((col) => {
      const values = excelData.map(row => row[col]).filter(v => typeof v === 'number');
      const min = Math.min(...values);
      const max = Math.max(...values);
      const mean = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
      return { col, min, max, mean };
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-28 p-8 bg-white shadow-lg rounded-lg relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#ffffff_40%,#006494_100%)]"></div>
      <Sidebar />
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📤 Upload Excel File</h1>

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
            Drag & drop an Excel file here, or <span className="text-[#006494] font-medium underline">click to select</span>
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 text-center">
        <button
          type="submit"
          className="bg-[#1b79a5] hover:bg-[#006494] text-white px-6 py-3 rounded-lg shadow-md hover:scale-110 transform duration-300 ease-in-out font-bold"
        >
          Upload File
        </button>
      </form>

      {message && <p className="mt-4 text-center text-md font-medium text-red-600">{message}</p>}

      {excelData.length > 0 && (
        <div className="mt-10 p-6 bg-gray-100 rounded-lg">
          <div className="mb-4">
            <label className="block text-md font-semibold text-gray-700 mb-2">Select Chart Type:</label>
            <select
              className="block w-full p-2 border border-gray-300 rounded"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold text-gray-700 mb-2">Select Columns to Plot:</label>
            <select
              multiple
              className="block w-full p-2 border border-gray-300 rounded"
              value={selectedColumns}
              onChange={(e) =>
                setSelectedColumns(Array.from(e.target.selectedOptions, option => option.value))
              }
            >
              {numericKeys.map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          {renderChart()}

          <div className="mt-4 flex gap-4">
            <button onClick={handleExportCSV} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Export CSV
            </button>
            <button onClick={handleExportPDF} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Export Chart PDF
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Summary Statistics</h3>
            <ul className="list-disc list-inside text-sm">
              {getStats().map(({ col, min, max, mean }) => (
                <li key={col}>
                  <strong>{col}</strong>: Min = {min}, Max = {max}, Mean = {mean}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
