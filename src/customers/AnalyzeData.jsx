// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BarChart2, BarChart3 } from "lucide-react";
// import ChartRenderer from "./ChartRenderer";
// import Sidebar from './CustomerSidebar';
// import jsPDF from "jspdf";
// import ThreeDChart from "./ThreeDChart";

// const AnalyzeData = () => {
//   const [files, setFiles] = useState([]);
//   const [selectedFileId, setSelectedFileId] = useState("");
//   const [fileData, setFileData] = useState(null);
//   const [selectedXAxis, setSelectedXAxis] = useState("");
//   const [selectedYAxis, setSelectedYAxis] = useState("");
//   const [chartType, setChartType] = useState("");
//   const [chartData, setChartData] = useState([]);
//   const [chartCanvas, setChartCanvas] = useState(null);
//   const [loading, setLoading] = useState(false);
// const [loadingMessage, setLoadingMessage] = useState("");
//   const token = localStorage.getItem("token");
//   const [selectedZAxis, setSelectedZAxis] = useState("");
// const [threeDData, setThreeDData] = useState(null);


//   useEffect(() => {
//     fetchUploadedFiles();
//   }, []);

//   const fetchUploadedFiles = async () => {
//     try {
//        setLoading(true);
//     setLoadingMessage("Fetching uploaded files...");
//       const res = await axios.get("http://localhost:80/api/excel/ExcelAllData", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.data) {
//         setFiles(res.data.message);
//       }
//     } catch (err) {
//       console.error("Failed to fetch files", err);
//     }finally {
//     setLoading(false);
//     setLoadingMessage("");
//   }
//   };

//   const handleFileSelect = async (fileId) => {
//     setSelectedFileId(fileId);
//     setFileData(null);
//     setSelectedXAxis("");
//     setSelectedYAxis("");
//     setChartType("");
//     setChartData([]);

//     try {
//        setLoading(true);
//     setLoadingMessage("Loading file and analyzing data...");
//       const res = await axios.get(`http://localhost:80/api/excel/get/${fileId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) {
//         const fileMeta = res.data.data;

//         const analyzeRes = await axios.post(
//           "http://localhost:80/api/excel/fetchData",
//           { url: fileMeta?.FileURl },
//           { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
//         );

//         if (analyzeRes.data.data) {
//           setFileData({
//             ...fileMeta,
//             xAxis: analyzeRes.data.xAxis,
//             yAxis: analyzeRes.data.yAxis,
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Failed to fetch selected file or analyze Excel", error);
//     }finally {
//     setLoading(false);
//     setLoadingMessage("");
//   }
//   };


// const downloadChart = (format = "png") => {
//   if (!chartCanvas) {
//     alert("Chart not ready.");
//     return;
//   }

//   const mimeTypeMap = {
//     png: "image/png",
//     jpeg: "image/jpeg",
//   };

//   const fileExtension = format.toLowerCase();

//   if (fileExtension === "pdf") {
//     const canvasData = chartCanvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [chartCanvas.width, chartCanvas.height],
//     });
//     pdf.addImage(canvasData, "PNG", 0, 0, chartCanvas.width, chartCanvas.height);
//     pdf.save(`${chartType}_chart.pdf`);
//     return;
//   }

//   if (fileExtension === "svg") {
//     alert("SVG export is not supported with canvas charts. Consider using a library like Chartist.js or D3.js.");
//     return;
//   }

//   const link = document.createElement("a");
//   link.download = `${chartType}_chart.${fileExtension}`;
//   link.href = chartCanvas.toDataURL(mimeTypeMap[fileExtension] || "image/png");
//   link.click();
// };

// const isSingleAxisChart = (type) => ["pie", "donut"].includes(type);


// const generateChart = async (type, is3D = false) => {
//   if (!selectedXAxis) {
//     return alert("Please select a column.");
//   }

//   try {
//      setLoading(true);
//     setLoadingMessage(`Generating ${type.toUpperCase()} chart...`);
//     const res = await axios.post(
//       "http://localhost:80/api/excel/fetchData",
//       {
//         url: fileData.FileURl,
//         xAxis: selectedXAxis,
//         yAxis: isSingleAxisChart(type) ? undefined : selectedYAxis,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (res.data.chartData) {
//       setChartData(res.data.chartData);
//       setChartType(type);
//     } else {
//       console.warn("No chartData in response");
//     }
//   } catch (e) {
//     console.error("Chart fetch error:", e);
//   }finally {
//     setLoading(false);
//     setLoadingMessage("");
//   }
// };


// const generate3DChart = async () => {
//   if (!selectedXAxis || !selectedYAxis || !selectedZAxis) {
//     alert("Please select X, Y, and Z axes.");
//     return;
//   }

//   try {
//     setLoading(true);
//     setLoadingMessage("Generating 3D chart...");
//     const res = await axios.post("http://localhost:80/api/excel/analyze3D", {
//       url: fileData.FileURl,
//       xAxis: selectedXAxis,
//       yAxis: selectedYAxis,
//       zAxis: selectedZAxis,
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.data.success) {
//       setThreeDData(res.data.processedData);
//     } else {
//       alert("Failed to fetch 3D chart data.");
//     }
//   } catch (e) {
//     console.error("3D chart error:", e);
//   } finally {
//     setLoading(false);
//     setLoadingMessage("");
//   }
// };



//   return (
//     <div className="p-6 ml-72">
//       <Sidebar />
//       {loading && (
//   <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
//     <div className="bg-white rounded-lg p-6 shadow-lg text-center">
//       <div className="loader mb-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin mx-auto"></div>
//       <p className="text-sm text-gray-700">{loadingMessage || "Loading..."}</p>
//     </div>
//   </div>
// )}
//       <h2 className="text-xl font-bold mb-4 montserrat-mont1 flex items-center gap-3">📊 Analyze Uploaded Excel Data</h2>

//       <div className="mb-4">
//         <label className="block font-medium mb-2 poppins-medium">Select a file to analyze:</label>
//         <select
//           className="border p-2 rounded w-full max-w-md winky-sans"
//           value={selectedFileId}
//           onChange={(e) => handleFileSelect(e.target.value)}
//         >
//           <option value="">-- Choose File --</option>
//           {files.map((file) => (
//             <option key={file._id} value={file._id}>{file.FileName}</option>
//           ))}
//         </select>
//       </div>

//       {fileData && (
//         <div className="bg-[#d8f1fcc2] p-4 rounded-lg shadow-xl space-y-5">
//           <p className="poppins-medium"><strong>File:</strong> {fileData.FileName}</p>

//           <div className="flex flex-wrap  gap-3 poppins-medium">
//             {["bar", "line", "pie", "donut", "scatter"].map((type) => (
//               <button
//                 key={type}
//                 onClick={() => {
//                   setChartType(type);
//                   setSelectedXAxis("");
//                   setSelectedYAxis("");
//                   setChartData([]);
//                 }}
//                 className={`btn px-4 py-2 hover:scale-103 transform duration-300 ease-in-out cursor-pointer rounded ${chartType === type ? 'bg-[#0b7db3] text-white' : 'bg-white  border'}`}
//               >
//                 {type.toUpperCase()}
//               </button>
//             ))}
//           </div>


//           {chartType && (
//   <div className="flex flex-wrap gap-6 mt-4 poppins-medium">
//     <div>
//       <label className="block font-medium mb-1">Select X-Axis:</label>
//       <select
//         className="border p-2 rounded"
//         value={selectedXAxis}
//         onChange={(e) => setSelectedXAxis(e.target.value)}
//       >
//         <option value="">Select X-Axis</option>
//         {fileData.xAxis?.map((col, idx) => (
//           <option key={idx} value={col}>{col}</option>
//         ))}
//       </select>
//     </div>

  
//     {!isSingleAxisChart(chartType) && (
//       <div>
//         <label className="block font-medium mb-1">Select Y-Axis:</label>
//         <select
//           className="border p-2 rounded"
//           value={selectedYAxis}
//           onChange={(e) => setSelectedYAxis(e.target.value)}
//         >
//           <option value="">Select Y-Axis</option>
//           {fileData.yAxis?.map((col, idx) => (
//             <option key={idx} value={col}>{col}</option>
//           ))}
//         </select>
//       </div>
//     )}
//   </div>
// )}


//           {chartType && selectedXAxis && (isSingleAxisChart(chartType) || selectedYAxis) && (
//   <div className="flex gap-4 mt-4 poppins-medium">
//     <button
//       onClick={() => generateChart(chartType, false)}
//       className="bg-blue-600 hover:scale-103 transform duration-300 ease-in-out cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
//     >
//       <BarChart2 size={18} /> Generate 2D Chart
//     </button>

//     <button
//        onClick={generate3DChart}
//       className="bg-green-600 cursor-pointer hover:scale-103 transform duration-300 ease-in-out text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
//     >
//       <BarChart3 size={18} /> Generate 3D Chart
//     </button>
//     <button
//   onClick={() => {
//     setChartType("3d");
//     setSelectedXAxis("");
//     setSelectedYAxis("");
//     setSelectedZAxis("");
//     setThreeDData(null);
//   }}
//   className={`btn px-4 py-2 rounded ${chartType === '3d' ? 'bg-[#0b7db3] text-white' : 'bg-white border'}`}
// >
//   3D
// </button>

//   </div>
// )}

// {chartType === "3d" && (
//   <div>
//     <label className="block font-medium mb-1">Select Z-Axis:</label>
//     <select
//       className="border p-2 rounded"
//       value={selectedZAxis}
//       onChange={(e) => setSelectedZAxis(e.target.value)}
//     >
//       <option value="">Select Z-Axis</option>
//       {fileData.yAxis?.map((col, idx) => (
//         <option key={idx} value={col}>{col}</option>
//       ))}
//     </select>
//   </div>
// )}


// {threeDData && chartType === "3d" && (
//   <div className="mt-6">
//     <ThreeDChart data={threeDData} />
//   </div>
// )}



//           {Array.isArray(chartData) && chartData.length > 0 && chartType && (
//             <div className="mt-8">
//               <h3 className="font-bold text-lg mb-2 montserrat-mont1">📈 {chartType.toUpperCase()} Chart</h3>
//               <ChartRenderer
//                 type={chartType}
//                 data={chartData}
//                 xLabel={selectedXAxis}
//                 yLabel={selectedYAxis}
//                  onChartReady={(canvas) => setChartCanvas(canvas)}
//               />
//                <button
//       onClick={() => downloadChart("png")}
//       className="mt-4 mr-3 bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer"
//     >
//       ⬇️ Download PNG
//     </button>
//      <button
//     onClick={() => downloadChart("jpeg")}
//     className=" bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] mr-3 cursor-pointer hover:scale-103 transform duration-300 ease-in-out poppins-medium px-4 py-2 rounded"
//   >
//     🖼️ Download JPEG
//   </button>

//   <button
//     onClick={() => downloadChart("pdf")}
//     className="  bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] cursor-pointer  hover:scale-103 transform duration-300 ease-in-out poppins-medium px-4 py-2 rounded "
//   >
//     📄 Download PDF
//   </button>

//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnalyzeData;



  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { BarChart2, BarChart3 } from "lucide-react";
  import ChartRenderer from "./ChartRenderer";
  import Sidebar from './CustomerSidebar';
  import jsPDF from "jspdf";
  import ThreeDChart from "./ThreeDChart";
import { backendurl } from "../App";

  const AnalyzeData = () => {
    const [files, setFiles] = useState([]);
    const [selectedFileId, setSelectedFileId] = useState("");
    const [fileData, setFileData] = useState(null);
    const [selectedXAxis, setSelectedXAxis] = useState("");
    const [selectedYAxis, setSelectedYAxis] = useState("");
    const [selectedZAxis, setSelectedZAxis] = useState("");
    const [chartType, setChartType] = useState("");
    const [dimension, setDimension] = useState(""); // "2d" or "3d"
    const [chartData, setChartData] = useState([]);
    const [threeDData, setThreeDData] = useState(null);
    const [chartCanvas, setChartCanvas] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    // const [threeDCanvas, setThreeDCanvas] = useState(null);


    const token = localStorage.getItem("token");

    const isSingleAxisChart = (type) => ["pie", "donut"].includes(type);

    useEffect(() => {
      fetchUploadedFiles();
    }, []);

    const fetchUploadedFiles = async () => {
      try {
        setLoading(true);
        setLoadingMessage("Fetching uploaded files...");
        const res = await axios.get(`${backendurl}/excel/ExcelAllData`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.data) setFiles(res.data.message);
      } catch (err) {
        console.error("Failed to fetch files", err);
      } finally {
        setLoading(false);
        setLoadingMessage("");
      }
    };

    const handleFileSelect = async (fileId) => {
      setSelectedFileId(fileId);
      setFileData(null);
      resetSelections();

      try {
        setLoading(true);
        setLoadingMessage("Loading file and analyzing data...");
        const res = await axios.get(`${backendurl}/excel/get/${fileId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const fileMeta = res.data.data;
          const analyzeRes = await axios.post(
            `${backendurl}/excel/fetchData`,
            { url: fileMeta?.FileURl },
            { headers: { Authorization: `Bearer ${token}` } }
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
        console.error("Failed to load or analyze file", error);
      } finally {
        setLoading(false);
        setLoadingMessage("");
      }
    };

    const resetSelections = () => {
      setSelectedXAxis("");
      setSelectedYAxis("");
      setSelectedZAxis("");
      setChartType("");
      setChartData([]);
      setThreeDData(null);
      setDimension("");
    };

    const generateChart = async () => {
      if (!selectedXAxis || (!isSingleAxisChart(chartType) && !selectedYAxis)) {
        alert("Please select required axis.");
        return;
      }

      try {
        setLoading(true);
        setLoadingMessage(`Generating ${chartType.toUpperCase()} chart...`);

        const res = await axios.post(
          `${backendurl}/excel/fetchData`,
          {
            url: fileData.FileURl,
            xAxis: selectedXAxis,
            yAxis: isSingleAxisChart(chartType) ? undefined : selectedYAxis,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.chartData) {
          setChartData(res.data.chartData);
          await countGraphUsage(chartType, "2d"); 
        }
      } catch (error) {
        console.error("Error generating chart", error);
      } finally {
        setLoading(false);
        setLoadingMessage("");
      }
    };

    // const generate3DChart = async () => {
    //   if (!selectedXAxis || !selectedYAxis || !selectedZAxis) {
    //     alert("Please select X, Y, and Z axes.");
    //     return;
    //   }

    //   try {
    //     setLoading(true);
    //     setLoadingMessage("Generating 3D chart...");

    //     const res = await axios.post(
    //       "http://localhost:80/api/excel/analyze3DData",
    //       {
    //         url: fileData.FileURl,
    //         xAxis: selectedXAxis,
    //         yAxis: selectedYAxis,
    //         zAxis: selectedZAxis,
    //       },
    //       { headers: { Authorization: `Bearer ${token}` } }
    //     );

    //     if (res.data.success) {
    //       setThreeDData(res.data.processedData);
    //     }
    //   } catch (error) {
    //     console.error("3D chart generation error", error);
    //   } finally {
    //     setLoading(false);
    //     setLoadingMessage("");
    //   }
    // };



//     const generate3DChart = async () => {
// console.log("3D chart generation started");
//     if (!selectedXAxis || !selectedYAxis) {
//       alert("Please select both X and Y axes.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setLoadingMessage("Generating 3D chart...");

//       const payload = {
//         url: fileData.FileURl,
//         xAxis: selectedXAxis,
//         yAxis: selectedYAxis,
//       };

//       // Only add zAxis if user selected one
//       if (selectedZAxis) {
//         payload.zAxis = selectedZAxis;
//       } else {
//         payload.useSyntheticZ = true;  // Signal backend to generate index/time
//       }


//       const res = await axios.post("http://localhost:80/api/excel/analyze3DData", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.data.success) {
//             console.log("Received 3D Data:", res.data);
//         setThreeDData(res.data.processedData);
//       } else {
//         alert("Failed to fetch 3D chart data.");
//       }
//     } catch (e) {
//       console.error("3D chart error:", e);
//     } finally {
//       setLoading(false);
//       setLoadingMessage("");
//     }
//   };


const countGraphUsage = async (graphType, graphDimension) => {
  try {
    await axios.post(
      `${backendurl}/graph/CountGraph`,
      { graphType, graphDimension },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`Graph usage logged: ${graphType} - ${graphDimension}`);
  } catch (err) {
    console.error("Failed to count graph usage", err.response?.data || err.message);
  }
};



const generate3DChart = async () => {
  console.log("3D chart generation started");

  if (!selectedXAxis || !selectedYAxis) {
    alert("Please select both X and Y axes.");
    return;
  }

  const payload = {
    url: fileData.FileURl,
    xAxis: selectedXAxis,
    yAxis: selectedYAxis,
  };

  if (selectedZAxis) {
    payload.zAxis = selectedZAxis;
  } else {
    payload.useSyntheticZ = true;
  }
console.log("X axis:", selectedXAxis, "Y axis:", selectedYAxis, "Z axis:", selectedZAxis);
  console.log("Sending payload to backend:", payload);

  try {
    setLoading(true);
    setLoadingMessage("Generating 3D chart...");

    const res = await axios.post(`${backendurl}/excel/analyze3DData`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("3D chart backend response:", res);

    if (res.data.success) {
      console.log("Received 3D Data:", res.data.processedData);
      setThreeDData(res.data.processedData);
       await countGraphUsage(chartType, "3d"); 
    } else {
      console.warn("Backend responded with success=false");
      alert("Failed to fetch 3D chart data.");
    }
  } catch (e) {
    console.error("3D chart error:", e);
  } finally {
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

//   const download3DChart = (format = "png") => {
//   if (!threeDCanvas) {
//     alert("3D chart not ready.");
//     return;
//   }

//   const dataUrl = threeDCanvas.toDataURL("image/png");

//   if (format === "pdf") {
//     const pdf = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [threeDCanvas.width, threeDCanvas.height],
//     });
//     pdf.addImage(dataUrl, "PNG", 0, 0, threeDCanvas.width, threeDCanvas.height);
//     pdf.save(`3d_chart.pdf`);
//     return;
//   }

//   const mimeMap = {
//     png: "image/png",
//     jpeg: "image/jpeg",
//   };

//   const link = document.createElement("a");
//   link.download = `3d_chart.${format}`;
//   link.href = dataUrl;
//   link.click();
// };


    return (
      <div className="p-6 ml-72 poppins-medium">
        <Sidebar />

        {loading && (
          <div className="fixed inset-0 z-50  bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="loader mb-4 w-12 h-12 border-t-4 border-blue-500 animate-spin mx-auto rounded-full"></div>
              <p>{loadingMessage || "Loading..."}</p>
            </div>
          </div>
        )}

        <h2 className="text-xl font-bold mb-4">📊 Analyze Uploaded Excel Data</h2>

        <div className="mb-4">
          <label className="block mb-1">Select File:</label>
          <select
            className="border p-2 rounded w-full max-w-md"
            value={selectedFileId}
            onChange={(e) => handleFileSelect(e.target.value)}
          >
            <option value="">Choose File</option>
            {files.map((file) => (
              <option key={file._id} value={file._id}>
                {file.FileName}
              </option>
            ))}
          </select>
        </div>

        {fileData && (
          <div className="bg-blue-50 p-4 rounded-lg shadow space-y-5">
            <div>
              <label className="block font-medium mb-1">Chart Type:</label>
              <div className="flex flex-wrap gap-3">
                {["bar", "line", "pie", "donut", "scatter"].map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-2 rounded border ${chartType === type ? "bg-blue-600 text-white" : "bg-white"}`}
                    onClick={() => {
                      resetSelections();
                      setChartType(type);
                    }}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {chartType && (
              <div>
                <label className="block font-medium mb-1">Select Dimension:</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setDimension("2d");
                      setThreeDData(null);
                    }}
                    className={`px-4 py-2 rounded border ${dimension === "2d" ? "bg-blue-500 text-white" : "bg-white"}`}
                  >
                    2D
                  </button>
                  {!isSingleAxisChart(chartType) && (
                    <button
                      onClick={() => {
                        setDimension("3d");
                        setChartData([]);
                      }}
                      className={`px-4 py-2 rounded border ${dimension === "3d" ? "bg-blue-500 text-white" : "bg-white"}`}
                    >
                      3D
                    </button>
                  )}
                </div>
              </div>
            )}

            {dimension && (
              <div className="flex gap-4 flex-wrap">
                <div>
                  <label className="block mb-1">X-Axis:</label>
                  <select
                    value={selectedXAxis}
                    onChange={(e) => setSelectedXAxis(e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="">Select X-Axis</option>
                    {fileData.xAxis?.map((col, i) => (
                      <option key={i} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                {dimension === "2d" && !isSingleAxisChart(chartType) && (
                  <div>
                    <label className="block mb-1">Y-Axis:</label>
                    <select
                      value={selectedYAxis}
                      onChange={(e) => setSelectedYAxis(e.target.value)}
                      className="border p-2 rounded"
                    >
                      <option value="">-- Select Y-Axis --</option>
                      {fileData.yAxis?.map((col, i) => (
                        <option key={i} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                )}

                {dimension === "3d" && (
                  <>
                    <div>
                      <label className="block mb-1">Y-Axis:</label>
                      <select
                        value={selectedYAxis}
                        onChange={(e) => setSelectedYAxis(e.target.value)}
                        className="border p-2 rounded"
                      >
                        <option value="">Select Y-Axis</option>
                        {fileData.yAxis?.map((col, i) => (
                          <option key={i} value={col}>{col}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1">Z-Axis:</label>
                      <select
                        value={selectedZAxis}
                        onChange={(e) => setSelectedZAxis(e.target.value)}
                        className="border p-2 rounded"
                      >
                        <option value="">Auto-generate Z (index/time)</option>
                        {fileData.yAxis?.map((col, i) => (
                          <option key={i} value={col}>{col}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>
            )}

            {dimension === "2d" && ((isSingleAxisChart(chartType) && selectedXAxis) || (selectedXAxis && selectedYAxis)) && (
              <button
                onClick={generateChart}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              >
                <BarChart2 className="inline mr-1 cursor-pointer" /> Generate 2D Chart
              </button>
            )}

            {dimension === "3d" && selectedXAxis && selectedYAxis && (

              <button
                onClick={generate3DChart}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
              >
                <BarChart3 className="inline mr-1 cursor-pointer" /> Generate 3D Chart
              </button>
            )}

            {dimension === "2d" && chartData.length > 0 && (
              <div className="mt-6">
                <ChartRenderer
                  type={chartType}
                  data={chartData}
                  xLabel={selectedXAxis}
                  yLabel={selectedYAxis}
                  onChartReady={(canvas) => setChartCanvas(canvas)}
                />
                <div className="mt-4 flex gap-3">
                  <button onClick={() => downloadChart("png")} className="btn mt-4 mr-3 bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">⬇️ Download PNG</button>
                  <button onClick={() => downloadChart("jpeg")} className="btn mt-4 mr-3 bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">🖼️ Download JPEG</button>
                  <button onClick={() => downloadChart("pdf")} className="btn mt-4 mr-3 bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">📄 Download PDF</button>
                </div>
              </div>
            )}

            {chartType === "3d" && fileData?.yAxis?.length > 0 && (
    <div className="mt-4">
      <label className="block font-medium mb-1">Select Z-Axis (optional):</label>
      <select
        className="border p-2 rounded"
        value={selectedZAxis}
        onChange={(e) => setSelectedZAxis(e.target.value)}
      >
        <option value="">Auto-generate Z (index/time)</option>
        {fileData.yAxis.map((col, idx) => (
          <option key={idx} value={col}>{col}</option>
        ))}
      </select>
    </div>
  )}


  {dimension === '3d' && threeDData && (
  <div className="mt-6">
    <ThreeDChart
      chartData={threeDData}
      chartType={chartType}
      xAxis={selectedXAxis}
      yAxis={selectedYAxis}
      zAxis={selectedZAxis}
      // onChartReady={(canvas) => setThreeDCanvas(canvas)}
    />
    {/* <div className="mt-4 flex gap-3">
      <button onClick={() => download3DChart("png")} className="btn bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">⬇️ Download 3D PNG</button>
      <button onClick={() => download3DChart("jpeg")} className="btn bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">🖼️ Download 3D JPEG</button>
      <button onClick={() => download3DChart("pdf")} className="btn bg-[#88d6fa] text-[#055276] hover:text-white hover:bg-[#1083b8] hover:scale-103 transform duration-300 ease-in-out poppins-medium  px-4 py-2 rounded cursor-pointer">📄 Download 3D PDF</button>
    </div> */}
  </div>
)}


          </div>
        )}
      </div >
    );
  };

  export default AnalyzeData;
