// import React, { useState, useCallback } from "react";
// import axios from "axios";
// import { useDropzone } from "react-dropzone";
// import Sidebar from './CustomerSidebar';
// import { Bar, Line, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   ArcElement,
//   PointElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import Papa from 'papaparse';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   ArcElement,
//   PointElement,
//   Tooltip,
//   Legend
// );

// const UploadFile = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [excelData, setExcelData] = useState([]);
//   const [chartType, setChartType] = useState("bar");
//   const [selectedColumns, setSelectedColumns] = useState([]);
//   const [loading, setLoading] = useState(false);


//   const onDrop = useCallback((acceptedFiles) => {
//     setFile(acceptedFiles[0]);
//     setMessage("");
//     setExcelData([]);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
//       'application/vnd.ms-excel': ['.xls'],
//     },
//     multiple: false,
//   });

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!file) return setMessage("Please select a file to upload.");

//   //   const formData = new FormData();
//   //   formData.append("File", file);

//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     const res = await axios.post("http://localhost:80/api/excel/uploadExcelFile", formData, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });

//   //     if (res.data.success) {
//   //       setMessage("✅ File uploaded successfully.");
//   //       setFile(null);

//   //       const allData = await axios.get("http://localhost:80/api/excel/ExcelAllData", {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       });

//   //       const latest = allData.data.message.at(-1);
//   //       const firstSheet = Object.keys(latest.ExcelData)[0];
//   //       setExcelData(latest.ExcelData[firstSheet]);
//   //     } else {
//   //       setMessage("❌ Failed to upload file.");
//   //     }
//   //   } catch (err) {
//   //     console.error("Upload failed:", err.response?.data || err.message);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!file) return setMessage("Please select a file to upload.");

//   const formData = new FormData();
//   formData.append("File", file);
//   setLoading(true); // Start loading

//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.post("http://localhost:80/api/excel/uploadExcelFile", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.data.success) {
//       toast.success("File uploaded successfully!");
//       // setMessage("✅ File uploaded successfully.");
//       setFile(null);

//       const allData = await axios.get("http://localhost:80/api/excel/ExcelAllData", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const latest = allData.data.message.at(-1);
//       const firstSheet = Object.keys(latest.ExcelData)[0];
//       setExcelData(latest.ExcelData[firstSheet]);
//     } else {
//       // setMessage("❌ Failed to upload file.");
//       toast.error("Failed to upload file.");
//     }
//   } catch (err) {
//     console.error("Upload failed:", err.response?.data || err.message);
//     // setMessage("❌ Upload failed. Please try again.");
//      toast.error("Failed to upload file.");
//   } finally {
//     setLoading(false);
//   }
// };


//   const numericKeys = Object.keys(excelData[0] || {}).filter(
//     key => typeof excelData[0][key] === "number"
//   );

//   const getChartData = () => {
//     if (!excelData || selectedColumns.length === 0) return null;

//     const labels = excelData.map((_, i) => `Row ${i + 1}`);
//     const datasets = selectedColumns.map((key, idx) => ({
//       label: key,
//       data: excelData.map(row => row[key]),
//       backgroundColor: `hsl(${(idx * 80) % 360}, 70%, 60%)`,
//       borderColor: `hsl(${(idx * 80) % 360}, 70%, 40%)`,
//       borderWidth: 1,
//     }));

//     return { labels, datasets };
//   };

//   const renderChart = () => {
//     const data = getChartData();
//     if (!data) return <p className="text-center text-red-600 mt-4">No numeric data to display.</p>;

//     switch (chartType) {
//       case "bar": return <Bar data={data} />;
//       case "line": return <Line data={data} />;
//       case "pie": return <Pie data={data} />;
//       default: return null;
//     }
//   };

//   const handleExportCSV = () => {
//     const csv = Papa.unparse(excelData);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "excel_data.csv";
//     link.click();
//   };

//   const handleExportPDF = async () => {
//     const chartCanvas = document.querySelector("canvas");
//     const canvas = await html2canvas(chartCanvas.parentElement);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF();
//     pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
//     pdf.save("chart.pdf");
//   };

//   const getStats = () => {
//     return selectedColumns.map((col) => {
//       const values = excelData.map(row => row[col]).filter(v => typeof v === 'number');
//       const min = Math.min(...values);
//       const max = Math.max(...values);
//       const mean = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
//       return { col, min, max, mean };
//     });
//   };

//   return (
//     // <div className="max-w-4xl mx-auto mt-28 p-8  shadow-lg rounded-lg relative">
//     <div className="ml-72 p-6 shadow-xl mt-2.5 rounded-lg">
//       {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div> */}

//       <Sidebar />
//       <ToastContainer position="top-right" toastStyle={{ backgroundColor: "black", color: "white" }} autoClose={3000} hideProgressBar={false} />
//         <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center montserrat-mont1">📤 Upload Excel File</h1>

//       <div
//         {...getRootProps()}
//         className={`border-4 border-dashed p-10 rounded-lg text-center cursor-pointer transition-all ${
//           isDragActive ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-300"
//         }`}
//       >
//         <input {...getInputProps()} />
//         {file ? (
//           <p className="text-lg text-green-600 font-medium">{file.name}</p>
//         ) : isDragActive ? (
//           <p className="text-blue-600 font-semibold">Drop the file here ...</p>
//         ) : (
//           <p className="text-gray-600">
//             Drag & drop an Excel file here, or <span className="text-[#006494] font-medium underline">click to select</span>
//           </p>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="mt-6 text-center">
//         <button
//           type="submit"
//           className="bg-[#1b79a5] hover:bg-[#006494] text-white cursor-pointer px-6 py-3 rounded-lg shadow-md hover:scale-110 transform duration-300 ease-in-out font-bold"
//         >
//           {loading ? <p className="text-center text-white flex justify-center items-center font-medium">📡 Uploading file, please wait...</p> : "Upload File"}
//         </button>
//       </form>

//       {message && <p className="mt-4 text-center text-md font-medium text-red-600">{message}</p>}

//       {excelData.length > 0 && (
//         <div className="mt-10 p-6 bg-gray-100 rounded-lg">
//           <div className="mb-4">
//             <label className="block text-md font-semibold text-gray-700 mb-2">Select Chart Type:</label>
//             <select
//               className="block w-full p-2 border border-gray-300 rounded"
//               value={chartType}
//               onChange={(e) => setChartType(e.target.value)}
//             >
//               <option value="bar">Bar Chart</option>
//               <option value="line">Line Chart</option>
//               <option value="pie">Pie Chart</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-md font-semibold text-gray-700 mb-2">Select Columns to Plot:</label>
//             <select
//               multiple
//               className="block w-full p-2 border border-gray-300 rounded"
//               value={selectedColumns}
//               onChange={(e) =>
//                 setSelectedColumns(Array.from(e.target.selectedOptions, option => option.value))
//               }
//             >
//               {numericKeys.map((key) => (
//                 <option key={key} value={key}>{key}</option>
//               ))}
//             </select>
//           </div>

//           {renderChart()}

//           <div className="mt-4 flex gap-4">
//             <button onClick={handleExportCSV} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//               Export CSV
//             </button>
//             <button onClick={handleExportPDF} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//               Export Chart PDF
//             </button>
//           </div>

//           <div className="mt-6">
//             <h3 className="text-lg font-bold mb-2">Summary Statistics</h3>
//             <ul className="list-disc list-inside text-sm">
//               {getStats().map(({ col, min, max, mean }) => (
//                 <li key={col}>
//                   <strong>{col}</strong>: Min = {min}, Max = {max}, Mean = {mean}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadFile;







// import React, { useState, useCallback } from "react";
// import axios from "axios";
// import { useDropzone } from "react-dropzone";
// import Sidebar from './CustomerSidebar';
// import { Bar, Line, Pie, Scatter, Doughnut } from 'react-chartjs-2';
// import Plot from 'react-plotly.js';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   ArcElement,
//   PointElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import Papa from 'papaparse';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   ArcElement,
//   PointElement,
//   Tooltip,
//   Legend,
//   MatrixController,
//   MatrixElement
// );

// const UploadFile = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [excelData, setExcelData] = useState([]);
//   const [chartType, setChartType] = useState("bar");
//   const [xAxis, setXAxis] = useState("");
//   const [yAxis, setYAxis] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [is3D, setIs3D] = useState(false);

//   const onDrop = useCallback((acceptedFiles) => {
//     setFile(acceptedFiles[0]);
//     setMessage("");
//     setExcelData([]);
//     setXAxis("");
//     setYAxis("");
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
//       'application/vnd.ms-excel': ['.xls'],
//     },
//     multiple: false,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return setMessage("Please select a file to upload.");
//     const formData = new FormData();
//     formData.append("File", file);
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post("http://localhost:80/api/excel/uploadExcelFile", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.data.success) {
//         toast.success("File uploaded successfully!");
//         setFile(null);
//         const allData = await axios.get("http://localhost:80/api/excel/ExcelAllData", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const latest = allData.data.message.at(-1);
//         const firstSheet = Object.keys(latest.ExcelData)[0];
//         setExcelData(latest.ExcelData[firstSheet]);
//       } else toast.error("Failed to upload file.");
//     } catch (err) {
//       console.error("Upload failed:", err.response?.data || err.message);
//       toast.error("Failed to upload file.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const numericKeys = Object.keys(excelData[0] || {}).filter(
//     key => typeof excelData[0][key] === "number"
//   );

//   const XAxis = Object.keys(excelData[0] || {}).filter(
//     key => typeof excelData[0][key] === "string"
//   );

//   const getChartData = () => {
//     if (!excelData || !xAxis || !yAxis) return null;
//     const xValues = excelData.map(row => row[xAxis]);
//     const yValues = excelData.map(row => row[yAxis]);

//     if (chartType === "pie" || chartType === "donut") {
//       return {
//         labels: xValues,
//         datasets: [{
//           label: yAxis,
//           data: yValues,
//           backgroundColor: [
//             "#1b79a5", "#f44336", "#4caf50", "#ff9800", "#9c27b0",
//             "#00bcd4", "#8bc34a", "#ffc107", "#e91e63", "#3f51b5"
//           ],
//         }],
//       };
//     }

//     return {
//       labels: xValues,
//       datasets: [{
//         label: yAxis,
//         data: yValues,
//         backgroundColor: "rgba(75, 192, 192, 0.5)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       }],
//     };
//   };

//   const renderChart = () => {
//     const data = getChartData();
//     if (!data) return <p className="text-center text-red-600 mt-4">No numeric data to display.</p>;

//     if (is3D && ["bar", "scatter", "line"].includes(chartType)) {
//   const x = excelData.map(row => row[xAxis]);
//   const y = excelData.map(row => row[yAxis]);
//   const z = excelData.map((_, i) => i);

//   let trace;

//   if (chartType === "line") {
//     trace = {
//       type: "scatter3d",
//       mode: "lines+markers",
//       x,
//       y,
//       z,
//       line: { color: 'blue', width: 2 },
//       marker: { size: 4 },
//     };
//   } else {
//     trace = {
//       type: "scatter3d",
//       mode: "markers",
//       x, y, z,
//       marker: { size: 5, color: y, colorscale: "Viridis" },
//     };
//   }

//   return (
//     <Plot
//       data={[trace]}
//       layout={{
//         width: 700,
//         height: 500,
//         title: `${chartType.toUpperCase()} Chart (3D)`,
//         scene: {
//           xaxis: { title: xAxis },
//           yaxis: { title: yAxis },
//           zaxis: { title: "Index" },
//         },
//       }}
//     />
//   );
// }


//     const options = {
//       responsive: true,
//       scales: {
//         x: { title: { display: true, text: xAxis } },
//         y: { title: { display: true, text: yAxis } },
//       },
//     };

//     switch (chartType) {
//       case "scatter": return <Scatter data={data} options={options} />;
//       case "bar": return <Bar data={data} options={options} />;
//       case "line": return <Line data={data} options={options} />;
//       case "pie": return <Pie data={data} />;
//       case "donut": return <Doughnut data={data} />;
//       case "histogram":
//         const histogramData = {
//           labels: data.datasets[0].data.sort((a, b) => a - b),
//           datasets: [{
//             label: yAxis,
//             data: data.datasets[0].data,
//             backgroundColor: "rgba(153, 102, 255, 0.5)",
//             borderColor: "rgba(153, 102, 255, 1)",
//             borderWidth: 1,
//           }],
//         };
//         return <Bar data={histogramData} options={options} />;
//       default: return null;
//     }
//   };

//   const handleExportCSV = () => {
//     const csv = Papa.unparse(excelData);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "excel_data.csv";
//     link.click();
//   };

//   const handleExportPDF = async () => {
//     const chartCanvas = document.querySelector("canvas");
//     const canvas = await html2canvas(chartCanvas.parentElement);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF();
//     pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
//     pdf.save("chart.pdf");
//   };

//   const getStats = () => {
//     return [yAxis].map((col) => {
//       const values = excelData.map(row => row[col]).filter(v => typeof v === 'number');
//       const min = Math.min(...values);
//       const max = Math.max(...values);
//       const mean = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
//       return { col, min, max, mean };
//     });
//   };

//   return (
//     <div className="ml-72 p-6 shadow-xl mt-2.5 rounded-lg">
//       <Sidebar />
//       <ToastContainer position="top-right" toastStyle={{ backgroundColor: "black", color: "white" }} autoClose={3000} />
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📤 Upload Excel File</h1>

//       <div {...getRootProps()} className={`border-4 border-dashed p-10 rounded-lg text-center cursor-pointer transition-all ${isDragActive ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-300"}`}>
//         <input {...getInputProps()} />
//         {file ? <p className="text-lg text-green-600 font-medium">{file.name}</p> : isDragActive ? <p className="text-blue-600 font-semibold">Drop the file here ...</p> : <p className="text-gray-600">Drag & drop an Excel file here, or <span className="text-[#006494] font-medium underline">click to select</span></p>}
//       </div>

//       <form onSubmit={handleSubmit} className="mt-6 text-center">
//         <button type="submit" className="bg-[#1b79a5] hover:bg-[#006494] text-white px-6 py-3 rounded-lg shadow-md font-bold">
//           {loading ? "📡 Uploading..." : "Upload File"}
//         </button>
//       </form>

//       {message && <p className="mt-4 text-center text-md font-medium text-red-600">{message}</p>}

//       {excelData.length > 0 && (
//         <div className="mt-10 p-6 bg-gray-100 rounded-lg">
//           <div className="mb-4">
//             <label className="block font-semibold mb-2">Chart Type:</label>
//             <select className="block w-full p-2 border rounded" value={chartType} onChange={(e) => setChartType(e.target.value)}>
//               <option value="bar">Bar Chart</option>
//               <option value="line">Line Chart</option>
//               <option value="pie">Pie Chart</option>
//               <option value="donut">Donut Chart</option>
//               <option value="scatter">Scatter Plot</option>
//               <option value="histogram">Histogram</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block font-semibold mb-2">Chart Dimension:</label>
//             <select className="block w-full p-2 border rounded" value={is3D ? "3d" : "2d"} onChange={(e) => setIs3D(e.target.value === "3d")}>
//               <option value="2d">2D</option>
//                 {["scatter", "bar","line"].includes(chartType) && <option value="3d">3D</option>}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block font-semibold mb-2">X Axis:</label>
//             <select className="block w-full p-2 border rounded" value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
//               {XAxis.map((key) => <option key={key} value={key}>{key}</option>)}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block font-semibold mb-2">Y Axis:</label>
//             <select className="block w-full p-2 border rounded" value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
//               {numericKeys.map((key) => <option key={key} value={key}>{key}</option>)}
//             </select>
//           </div>

//           {renderChart()}

//           <div className="mt-4 flex gap-4">
//             <button onClick={handleExportCSV} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Export CSV</button>
//             <button onClick={handleExportPDF} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Export Chart PDF</button>
//           </div>

//           <div className="mt-6">
//             <h3 className="text-lg font-bold mb-2">Summary Statistics</h3>
//             <ul className="list-disc list-inside text-sm">
//               {getStats().map(({ col, min, max, mean }) => (
//                 <li key={col}><strong>{col}</strong>: Min = {min}, Max = {max}, Mean = {mean}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadFile;










import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useRef } from "react";
import Sidebar from './CustomerSidebar';
import { Bar, Line, Pie, Scatter, Doughnut } from 'react-chartjs-2';
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
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThreeDChart from './ThreeDChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  MatrixController,
  MatrixElement
);


const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [loading, setLoading] = useState(false);
  const threeDRef = useRef(null);
  const [is3D, setIs3D] = useState(false);
  const [chartCanvas, setChartCanvas] = useState(null);
const chartRef = useRef(null);  



  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setMessage("");
    setExcelData([]);
    setXAxis("");
    setYAxis("");
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
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:80/api/excel/uploadExcelFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        toast.success("File uploaded successfully!");
        setFile(null);
        const allData = await axios.get("http://localhost:80/api/excel/ExcelAllData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const latest = allData.data.message.at(-1);
        const firstSheet = Object.keys(latest.ExcelData)[0];
        setExcelData(latest.ExcelData[firstSheet]);
      } else toast.error("Failed to upload file.");
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      toast.error("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  const download3DChart = (format = "png") => {
  if (!threeDRef.current || !threeDRef.current.getCanvas) {
    alert("3D chart is not ready.");
    return;
  }

  const canvas = threeDRef.current.getCanvas();
  const imgData = canvas.toDataURL("image/png");

  if (format === "pdf") {
    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("3d_chart.pdf");
    return;
  }

  const link = document.createElement("a");
  link.href = imgData;
  link.download = `3d_chart.${format}`;
  link.click();
};


  const numericKeys = Object.keys(excelData[0] || {}).filter(
    key => typeof excelData[0][key] === "number"
  );

  const XAxis = Object.keys(excelData[0] || {}).filter(
    key => typeof excelData[0][key] === "string"
  );

  const getChartData = () => {
    if (!excelData || !xAxis || !yAxis) return null;
    const xValues = excelData.map(row => row[xAxis]);
    const yValues = excelData.map(row => row[yAxis]);

    if (chartType === "pie" || chartType === "donut") {
      return {
        labels: xValues,
        datasets: [{
          label: yAxis,
          data: yValues,
          backgroundColor: [
            "#1b79a5", "#f44336", "#4caf50", "#ff9800", "#9c27b0",
            "#00bcd4", "#8bc34a", "#ffc107", "#e91e63", "#3f51b5"
          ],
        }],
      };
    }

    return {
      labels: xValues,
      datasets: [{
        label: yAxis,
        data: yValues,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      }],
    };
  };

  const renderChart = () => {
    const data = getChartData();
    if (!data) return <p className="text-center text-red-600 mt-4">No numeric data to display.</p>;

    // Custom 3D bar & scatter support using ThreeDChart
    if (is3D && ["bar", "scatter"].includes(chartType)) {
      const chartData = excelData.map((row, index) => ({
        [xAxis]: row[xAxis],
        [yAxis]: row[yAxis],
        z: index, // use index for z-axis
      }));

      return (
        <div className="mt-6">
          <ThreeDChart
           ref={threeDRef}
            chartData={chartData}
            chartType={chartType}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis="z"
          />
        </div>
      );
    }

    const options = {
      responsive: true,
      scales: {
        x: { title: { display: true, text: xAxis } },
        y: { title: { display: true, text: yAxis } },
      },
    };

    switch (chartType) {
      case "scatter": return <Scatter ref={chartRef} data={data} options={options} />;
      case "bar": return <Bar ref={chartRef} data={data} options={options} />;
      case "line": return <Line ref={chartRef} data={data} options={options} />;
      case "pie": return <Pie ref={chartRef} data={data} />;
      case "donut": return <Doughnut ref={chartRef} data={data} />;
      case "histogram":
        const histogramData = {
          labels: data.datasets[0].data.sort((a, b) => a - b),
          datasets: [{
            label: yAxis,
            data: data.datasets[0].data,
            backgroundColor: "rgba(153, 102, 255, 0.5)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          }],
        };
        return <Bar data={histogramData} options={options} />;
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

  
 const downloadChart = (format = "png") => {
  if (!chartRef.current) {
    alert("Chart is not ready yet.");
    return;
  }

  const chartInstance = chartRef.current;
  const canvas = chartInstance.canvas;

  const mimeTypeMap = {
    png: "image/png",
    jpg: "image/jpeg",
  };

  if (format === "pdf") {
    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${chartType}_chart.pdf`);
    return;
  }

  if (format === "svg") {
    alert("SVG export is not supported with canvas charts.");
    return;
  }

  const link = document.createElement("a");
  link.download = `${chartType}_chart.${format}`;
  link.href = canvas.toDataURL(mimeTypeMap[format] || "image/png");
  link.click();
};



  const getStats = () => {
    return [yAxis].map((col) => {
      const values = excelData.map(row => row[col]).filter(v => typeof v === 'number');
      const min = Math.min(...values);
      const max = Math.max(...values);
      const mean = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
      return { col, min, max, mean };
    });
  };

  return (
    <div className="ml-72 p-6 shadow-xl mt-2.5 rounded-lg">
      <Sidebar />
      <ToastContainer position="top-right" toastStyle={{ backgroundColor: "black", color: "white" }} autoClose={3000} />
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center montserrat-mont1">📤 Upload Excel File</h1>

      <div {...getRootProps()} className={`border-4 border-dashed p-10 rounded-lg text-center cursor-pointer transition-all ${isDragActive ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-300"}`}>
        <input {...getInputProps()} />
        {file ? <p className="text-lg text-green-600 font-medium">{file.name}</p> : isDragActive ? <p className="text-blue-600 font-semibold poppins-medium">Drop the file here ...</p> : <p className="text-gray-600">Drag & drop an Excel file here, or <span className="text-[#006494] font-medium underline">click to select</span></p>}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 text-center">
        <button type="submit" className="bg-[#1b79a5] hover:bg-[#006494] text-white px-6 py-3 cursor-pointer hover:scale-103 transform duration-300 ease-in-out poppins-medium rounded-lg shadow-md font-bold">
          {loading ? "📡 Uploading..." : "Upload File"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-md font-medium text-red-600">{message}</p>}

      {excelData.length > 0 && (
        <div className="mt-10 p-6 bg-blue-50 rounded-lg">
          <div className="mb-4">
            <label className="block font-semibold mb-2 poppins-medium">Chart Type:</label>
            <select className="block w-full p-2 border rounded winky-sans" value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="donut">Donut Chart</option>
              <option value="scatter">Scatter Plot</option>
              <option value="histogram">Histogram</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2 poppins-medium">Chart Dimension:</label>
            <select className="block w-full p-2 border rounded winky-sans" value={is3D ? "3d" : "2d"} onChange={(e) => setIs3D(e.target.value === "3d")}>
              <option value="2d">2D</option>
              {["bar", "scatter"].includes(chartType) && <option value="3d">3D</option>}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2 poppins-medium">X Axis:</label>
            <select className="block w-full p-2 border rounded winky-sans" value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
              {XAxis.map((key) => <option key={key} value={key}>{key}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2 poppins-medium">Y Axis:</label>
            <select className="block w-full p-2 border rounded winky-sans" value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
              {numericKeys.map((key) => <option key={key} value={key}>{key}</option>)}
            </select>
          </div>

          {renderChart()}

          {/* <div onChartReady={(canvas) => setChartCanvas(canvas)} className="mt-4 flex gap-4">
            <button  onClick={() => downloadChart("png")} className="bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">Download PNG</button>
            <button onClick={() => downloadChart("jpg")} className="bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">Download JPG</button>
            <button onClick={() => downloadChart("pdf")} className="bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">Download PDF</button>
          </div> */}

          {is3D && ["bar", "scatter"].includes(chartType) ? (
  <div className="mt-4 flex gap-4">
    <button onClick={() => download3DChart("png")} className="btn mt-4 mr-3 bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">Download 3D PNG</button>
    <button onClick={() => download3DChart("jpg")} className="btn mt-4 mr-3 bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">Download 3D JPG</button>
    <button onClick={() => download3DChart("pdf")} className="btn mt-4 mr-3 bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">Download 3D PDF</button>
  </div>
) : (
  <div className="mt-4 flex gap-4">
    <button onClick={() => downloadChart("png")} className="btn mt-4 mr-3 bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">Download PNG</button>
    <button onClick={() => downloadChart("jpg")} className="btn mt-4 mr-3 bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">Download JPG</button>
    <button onClick={() => downloadChart("pdf")} className="btn mt-4 mr-3 bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">Download PDF</button>
  </div>
)}


          <div className="mt-6 poppins-medium">
            <h3 className="text-lg font-bold mb-2">Summary Statistics</h3>
            <ul className="list-disc list-inside text-sm">
              {getStats().map(({ col, min, max, mean }) => (
                <li key={col}><strong>{col}</strong>: Min = {min}, Max = {max}, Mean = {mean}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
