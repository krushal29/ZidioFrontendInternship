import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart2, BarChart3 } from "lucide-react";
import ChartRenderer from "./ChartRenderer";
import Sidebar from './CustomerSidebar';
import jsPDF from "jspdf";

const AnalyzeData = () => {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [fileData, setFileData] = useState(null);
  const [selectedXAxis, setSelectedXAxis] = useState("");
  const [selectedYAxis, setSelectedYAxis] = useState("");
  const [chartType, setChartType] = useState("");
  const [chartData, setChartData] = useState([]);
  const [chartCanvas, setChartCanvas] = useState(null);
  const [loading, setLoading] = useState(false);
const [loadingMessage, setLoadingMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
       setLoading(true);
    setLoadingMessage("Fetching uploaded files...");
      const res = await axios.get("http://localhost:80/api/excel/ExcelAllData", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.data) {
        setFiles(res.data.message);
      }
    } catch (err) {
      console.error("Failed to fetch files", err);
    }finally {
    setLoading(false);
    setLoadingMessage("");
  }
  };

  const handleFileSelect = async (fileId) => {
    setSelectedFileId(fileId);
    setFileData(null);
    setSelectedXAxis("");
    setSelectedYAxis("");
    setChartType("");
    setChartData([]);

    try {
       setLoading(true);
    setLoadingMessage("Loading file and analyzing data...");
      const res = await axios.get(`http://localhost:80/api/excel/get/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const fileMeta = res.data.data;

        const analyzeRes = await axios.post(
          "http://localhost:80/api/excel/fetchData",
          { url: fileMeta?.FileURl },
          { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        );

        if (analyzeRes.data.data) {
          setFileData({
            ...fileMeta,
            xAxis: analyzeRes.data.xAxis,
            yAxis: analyzeRes.data.yAxis,
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch selected file or analyze Excel", error);
    }finally {
    setLoading(false);
    setLoadingMessage("");
  }
  };


const downloadChart = (format = "png") => {
  if (!chartCanvas) {
    alert("Chart not ready.");
    return;
  }

  const mimeTypeMap = {
    png: "image/png",
    jpeg: "image/jpeg",
  };

  const fileExtension = format.toLowerCase();

  if (fileExtension === "pdf") {
    const canvasData = chartCanvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [chartCanvas.width, chartCanvas.height],
    });
    pdf.addImage(canvasData, "PNG", 0, 0, chartCanvas.width, chartCanvas.height);
    pdf.save(`${chartType}_chart.pdf`);
    return;
  }

  if (fileExtension === "svg") {
    alert("SVG export is not supported with canvas charts. Consider using a library like Chartist.js or D3.js.");
    return;
  }

  const link = document.createElement("a");
  link.download = `${chartType}_chart.${fileExtension}`;
  link.href = chartCanvas.toDataURL(mimeTypeMap[fileExtension] || "image/png");
  link.click();
};

const isSingleAxisChart = (type) => ["pie", "donut"].includes(type);


const generateChart = async (type, is3D = false) => {
  if (!selectedXAxis) {
    return alert("Please select a column.");
  }

  try {
     setLoading(true);
    setLoadingMessage(`Generating ${type.toUpperCase()} chart...`);
    const res = await axios.post(
      "http://localhost:80/api/excel/fetchData",
      {
        url: fileData.FileURl,
        xAxis: selectedXAxis,
        yAxis: isSingleAxisChart(type) ? undefined : selectedYAxis,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.chartData) {
      setChartData(res.data.chartData);
      setChartType(type);
    } else {
      console.warn("No chartData in response");
    }
  } catch (e) {
    console.error("Chart fetch error:", e);
  }finally {
    setLoading(false);
    setLoadingMessage("");
  }
};


  return (
    <div className="p-6 ml-72">
      <Sidebar />
      {loading && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
    <div className="bg-white rounded-lg p-6 shadow-lg text-center">
      <div className="loader mb-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin mx-auto"></div>
      <p className="text-sm text-gray-700">{loadingMessage || "Loading..."}</p>
    </div>
  </div>
)}
      <h2 className="text-xl font-bold mb-4 montserrat-mont1 flex items-center gap-3">📊 Analyze Uploaded Excel Data</h2>

      <div className="mb-4">
        <label className="block font-medium mb-2 poppins-medium">Select a file to analyze:</label>
        <select
          className="border p-2 rounded w-full max-w-md winky-sans"
          value={selectedFileId}
          onChange={(e) => handleFileSelect(e.target.value)}
        >
          <option value="">-- Choose File --</option>
          {files.map((file) => (
            <option key={file._id} value={file._id}>{file.FileName}</option>
          ))}
        </select>
      </div>

      {fileData && (
        <div className="bg-[#d8f1fcc2] p-4 rounded-lg shadow-xl space-y-5">
          <p className="poppins-medium"><strong>File:</strong> {fileData.FileName}</p>

          <div className="flex flex-wrap  gap-3 poppins-medium">
            {["bar", "line", "pie", "donut", "scatter"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setChartType(type);
                  setSelectedXAxis("");
                  setSelectedYAxis("");
                  setChartData([]);
                }}
                className={`btn px-4 py-2 hover:scale-103 transform duration-300 ease-in-out cursor-pointer rounded ${chartType === type ? 'bg-[#0b7db3] text-white' : 'bg-white  border'}`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>


          {chartType && (
  <div className="flex flex-wrap gap-6 mt-4 poppins-medium">
    <div>
      <label className="block font-medium mb-1">Select X-Axis:</label>
      <select
        className="border p-2 rounded"
        value={selectedXAxis}
        onChange={(e) => setSelectedXAxis(e.target.value)}
      >
        <option value="">Select X-Axis</option>
        {fileData.xAxis?.map((col, idx) => (
          <option key={idx} value={col}>{col}</option>
        ))}
      </select>
    </div>

  
    {!isSingleAxisChart(chartType) && (
      <div>
        <label className="block font-medium mb-1">Select Y-Axis:</label>
        <select
          className="border p-2 rounded"
          value={selectedYAxis}
          onChange={(e) => setSelectedYAxis(e.target.value)}
        >
          <option value="">Select Y-Axis</option>
          {fileData.yAxis?.map((col, idx) => (
            <option key={idx} value={col}>{col}</option>
          ))}
        </select>
      </div>
    )}
  </div>
)}


          {chartType && selectedXAxis && (isSingleAxisChart(chartType) || selectedYAxis) && (
  <div className="flex gap-4 mt-4 poppins-medium">
    <button
      onClick={() => generateChart(chartType, false)}
      className="bg-blue-600 hover:scale-103 transform duration-300 ease-in-out cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
    >
      <BarChart2 size={18} /> Generate 2D Chart
    </button>

    <button
      onClick={() => generateChart(chartType, true)}
      className="bg-green-600 cursor-pointer hover:scale-103 transform duration-300 ease-in-out text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
    >
      <BarChart3 size={18} /> Generate 3D Chart
    </button>
  </div>
)}


          {Array.isArray(chartData) && chartData.length > 0 && chartType && (
            <div className="mt-8">
              <h3 className="font-bold text-lg mb-2 montserrat-mont1">📈 {chartType.toUpperCase()} Chart</h3>
              <ChartRenderer
                type={chartType}
                data={chartData}
                xLabel={selectedXAxis}
                yLabel={selectedYAxis}
                 onChartReady={(canvas) => setChartCanvas(canvas)}
              />
               <button
      onClick={() => downloadChart("png")}
      className="mt-4 mr-3 bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer"
    >
      ⬇️ Download PNG
    </button>
     <button
    onClick={() => downloadChart("jpeg")}
    className=" bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] mr-3 cursor-pointer hover:scale-103 transform duration-300 ease-in-out poppins-medium px-4 py-2 rounded"
  >
    🖼️ Download JPEG
  </button>

  <button
    onClick={() => downloadChart("pdf")}
    className="  bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] cursor-pointer  hover:scale-103 transform duration-300 ease-in-out poppins-medium px-4 py-2 rounded "
  >
    📄 Download PDF
  </button>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyzeData;
