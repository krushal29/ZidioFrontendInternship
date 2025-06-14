// // components/ThreeDChart.js
// import Plot from "react-plotly.js";

// const ThreeDChart = ({ data }) => {
//   return (
//     <Plot
//       data={[
//         {
//           x: data.map((d) => d.x),
//           y: data.map((d) => d.y),
//           z: data.map((d) => d.z),
//           type: "scatter3d",
//           mode: "markers",
//           marker: {
//             size: 4,
//             color: data.map((d) => d.z),
//             colorscale: "Viridis",
//           },
//         },
//       ]}
//       layout={{
//         width: 800,
//         height: 600,
//         title: "3D Scatter Chart",
//         scene: {
//           xaxis: { title: "X Axis" },
//           yaxis: { title: "Y Axis" },
//           zaxis: { title: "Z Axis" },
//         },
//       }}
//     />
//   );
// };

// export default ThreeDChart;




// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import helvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';

// const ThreeDChart = ({ chartData, chartType }) => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     if (!chartData || chartData.length === 0) return;

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xf0f0f0);
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;

//     const light = new THREE.AmbientLight(0xffffff, 0.8);
//     const dirLight = new THREE.DirectionalLight(0xffffff, 1);
//     dirLight.position.set(1, 2, 3);
//     scene.add(light, dirLight);

//     const grid = new THREE.GridHelper(100, 20);
//     scene.add(grid);

//     const axesHelper = new THREE.AxesHelper(10);
//     scene.add(axesHelper);

//     // Load font for labels
//     const fontLoader = new FontLoader();
//     const font = fontLoader.parse(helvetikerFont);

//     const addLabel = (text, x, y, z) => {
//       const geometry = new TextGeometry(text, {
//         font,
//         size: 0.5,
//         height: 0.05,
//       });
//       const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
//       const mesh = new THREE.Mesh(geometry, material);
//       mesh.position.set(x, y, z);
//       scene.add(mesh);
//     };

//     // Add axis labels
//     addLabel("X", 10, 0, 0);
//     addLabel("Y", 0, 10, 0);
//     addLabel("Z", 0, 0, 10);

//     const colorMap = {
//       Petrol: 0xff0000,
//       Diesel: 0x0000ff,
//       CNG: 0x00ff00,
//       Electric: 0xffff00,
//       Hybrid: 0xff00ff,
//     };

//     const createScatterChart = () => {
//       chartData.forEach((data) => {
//         const material = new THREE.MeshStandardMaterial({
//           color: colorMap[data.x] || 0x888888,
//         });
//         const geometry = new THREE.SphereGeometry(0.3, 16, 16);
//         const sphere = new THREE.Mesh(geometry, material);
//         sphere.position.set(data.xIndex || 0, data.y, data.z || 0);
//         scene.add(sphere);
//       });

//       // Legend
//       const keys = Object.keys(colorMap);
//       keys.forEach((key, index) => {
//         const mat = new THREE.MeshBasicMaterial({ color: colorMap[key] });
//         const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
//         const box = new THREE.Mesh(geo, mat);
//         box.position.set(-5, 5 - index, 0);
//         scene.add(box);
//         addLabel(key, -4.4, 5 - index, 0);
//       });
//     };

//     const createBarChart = () => {
//       const barWidth = 1;
//       const barDepth = 1;
//       const barSpacing = 2;

//       chartData.forEach((data, i) => {
//         const barHeight = data.y;
//         const geometry = new THREE.BoxGeometry(barWidth, barHeight, barDepth);
//         const material = new THREE.MeshStandardMaterial({ color: 0x4e91fc });
//         const bar = new THREE.Mesh(geometry, material);
//         bar.position.set(i * barSpacing, barHeight / 2, 0);
//         scene.add(bar);
//         addLabel(data.x.toString(), i * barSpacing - 0.5, 0, 1);
//         addLabel(data.y.toFixed(1), i * barSpacing - 0.3, barHeight + 0.3, 1);
//       });
//     };

//     const createPieChart = () => {
//       const total = chartData.reduce((acc, cur) => acc + cur.value, 0);
//       let startAngle = 0;

//       chartData.forEach((data, index) => {
//         const angle = (data.value / total) * Math.PI * 2;
//         const geometry = new THREE.CylinderGeometry(5, 5, 0.5, 32, 1, false, startAngle, angle);
//         const material = new THREE.MeshStandardMaterial({ color: colorMap[data.x] || Math.random() * 0xffffff });
//         const pie = new THREE.Mesh(geometry, material);
//         pie.rotation.x = Math.PI / 2;
//         scene.add(pie);
//         startAngle += angle;
//       });
//     };

//     // Chart selector
//     switch (chartType) {
//       case 'bar':
//         createBarChart();
//         break;
//       case 'scatter':
//         createScatterChart();
//         break;
//       case 'pie':
//         createPieChart();
//         break;
//       default:
//         createScatterChart();
//     }

//     camera.position.set(10, 10, 20);
//     controls.update();

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     animate();

//     return () => {
//       mountRef.current.removeChild(renderer.domElement);
//     };
//   }, [chartData, chartType]);

//   return <div ref={mountRef} />;
// };

// export default ThreeDChart;




import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import helvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';

const ThreeDChart = ({ chartData, chartType = "scatter", xAxis = "x", yAxis = "y", zAxis = "z" }) => {
  const mountRef = useRef(null);
  const [font, setFont] = useState(null);

  useEffect(() => {
    const loader = new FontLoader();
    setFont(loader.parse(helvetikerFont));
  }, []);

  useEffect(() => {
    if (!chartData || !chartData.length || !font) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Clean up previous scene
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(20, 30, 10);
    scene.add(dirLight);

    // Compute data bounds
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    chartData.forEach((item) => {
      const x = parseFloat(item[xAxis]);
      const y = parseFloat(item[yAxis]);
      const z = parseFloat(item[zAxis]) || 0;

      if (isNaN(x) || isNaN(y) || isNaN(z)) return;

      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      minZ = Math.min(minZ, z);
      maxZ = Math.max(maxZ, z);
    });

    const axisLength = Math.max(maxX - minX, maxY - minY, maxZ - minZ) + 5;
    const tickSpacing = Math.ceil(axisLength / 6);

    // Axes with arrows
    const axes = {
      x: { dir: new THREE.Vector3(1, 0, 0), color: 0xff4444, label: "X" },
      y: { dir: new THREE.Vector3(0, 1, 0), color: 0x44ff44, label: "Y" },
      z: { dir: new THREE.Vector3(0, 0, 1), color: 0x4444ff, label: "Z" },
    };

    Object.entries(axes).forEach(([axis, { dir, color, label }]) => {
      const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(0, 0, 0), axisLength, color);
      scene.add(arrow);
      addTextLabel(label, ...dir.clone().multiplyScalar(axisLength + 1).toArray(), color);
    });

    // Grid and ticks
    for (let i = tickSpacing; i <= axisLength; i += tickSpacing) {
      createTick([i, 0, 0], [i, 0.5, 0]);
      addTextLabel(`${i}`, i, -1, 0);
      createTick([0, i, 0], [0.5, i, 0]);
      addTextLabel(`${i}`, -1.2, i, 0);
      createTick([0, 0, i], [0.5, 0, i]);
      addTextLabel(`${i}`, -1.2, 0, i);
    }

    function createTick(from, to) {
      const geom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...from),
        new THREE.Vector3(...to),
      ]);
      const line = new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0x999999 }));
      scene.add(line);
    }

    function addTextLabel(text, x, y, z, color = 0x000000) {
      const geometry = new TextGeometry(text, {
        font,
        size: 0.5,
        height: 0.05,
      });
      geometry.computeBoundingBox();
      const material = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);
    }

    // Color palette
    const palette = [
      0xff6f61, 0x6a5acd, 0x40e0d0, 0xffc107,
      0x8bc34a, 0xe91e63, 0x3f51b5, 0x009688
    ];

    const linePoints = [];

    chartData.forEach((item, i) => {
      let x = parseFloat(item[xAxis]) - minX;
      let y = parseFloat(item[yAxis]) - minY;
      let z = parseFloat(item[zAxis]) - minZ || 0;

      if (isNaN(x) || isNaN(y) || isNaN(z)) return;

      const color = palette[i % palette.length];
      const material = new THREE.MeshStandardMaterial({ color });
      let mesh;

      if (chartType === "bar") {
        const height = y;
        mesh = new THREE.Mesh(new THREE.BoxGeometry(1, height, 1), material);
        mesh.position.set(x, height / 2, z);
      } else {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), material);
        mesh.position.set(x, y, z);
        if (chartType === "line") {
          linePoints.push(new THREE.Vector3(x, y, z));
        }
      }

      scene.add(mesh);
    });

    if (chartType === "line" && linePoints.length > 1) {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }

    // Camera setup
    camera.position.set(axisLength, axisLength, axisLength);
    camera.lookAt(0, 0, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      controls.dispose();
      renderer.dispose();
    };
  }, [chartData, chartType, font, xAxis, yAxis, zAxis]);

  return <div ref={mountRef} style={{ width: "100%", height: "600px" }} />;
};

export default ThreeDChart;









// import React, { useRef, useEffect, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
// import helvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const ThreeDChart = ({ chartData, chartType = "scatter", xAxis = "x", yAxis = "y", zAxis = "z" }) => {
//   const mountRef = useRef(null);
//   const tooltipRef = useRef(null);
//   const [font, setFont] = useState(null);
//   const [points, setPoints] = useState([]);

//   useEffect(() => {
//     const loader = new FontLoader();
//     setFont(loader.parse(helvetikerFont));
//   }, []);

//   useEffect(() => {
//     if (!chartData || !chartData.length || !font) return;

//     const container = mountRef.current;
//     const width = container.clientWidth;
//     const height = container.clientHeight;

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xf0f0f0);

//     const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
//     camera.position.set(40, 30, 40);

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(width, height);
//     container.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;

//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();

//     // Lighting
//     scene.add(new THREE.AmbientLight(0xffffff, 0.6));
//     const dirLight = new THREE.DirectionalLight(0xffffff, 1);
//     dirLight.position.set(20, 30, 10);
//     scene.add(dirLight);

//     // Grid
//     const grid = new THREE.GridHelper(60, 30);
//     grid.rotation.x = Math.PI / 2;
//     scene.add(grid);

//     // Axis
//     const axisLength = 30;
//     const axes = {
//       x: { dir: new THREE.Vector3(1, 0, 0), color: 0xff4444, label: "X" },
//       y: { dir: new THREE.Vector3(0, 1, 0), color: 0x44ff44, label: "Y" },
//       z: { dir: new THREE.Vector3(0, 0, 1), color: 0x4444ff, label: "Z" },
//     };

//     Object.entries(axes).forEach(([axis, { dir, color, label }]) => {
//       const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(0, 0, 0), axisLength, color);
//       scene.add(arrow);
//       addTextLabel(label, ...dir.clone().multiplyScalar(axisLength + 1).toArray(), color);
//     });

//     // Axis ticks
//     const tickSpacing = 5;
//     for (let i = tickSpacing; i <= axisLength; i += tickSpacing) {
//       createTick([i, 0, 0], [i, 0.5, 0]); addTextLabel(`${i}`, i, -1, 0);
//       createTick([0, i, 0], [0.5, i, 0]); addTextLabel(`${i}`, -1.5, i, 0);
//       createTick([0, 0, i], [0.5, 0, i]); addTextLabel(`${i}`, -1.5, 0, i);
//     }

//     function createTick(from, to) {
//       const geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...from), new THREE.Vector3(...to)]);
//       const line = new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0x999999 }));
//       scene.add(line);
//     }

//     function addTextLabel(text, x, y, z, color = 0x000000) {
//       const geometry = new TextGeometry(text, { font, size: 0.5, height: 0.05 });
//       const material = new THREE.MeshBasicMaterial({ color });
//       const mesh = new THREE.Mesh(geometry, material);
//       mesh.position.set(x, y, z);
//       scene.add(mesh);
//     }

//     const palette = [0xff6f61, 0x6a5acd, 0x40e0d0, 0xffc107, 0x8bc34a, 0xe91e63, 0x3f51b5, 0x009688];
//     const linePoints = [];
//     const dataPoints = [];

//     chartData.forEach((item, i) => {
//       const x = parseFloat(item[xAxis]) || 0;
//       const y = parseFloat(item[yAxis]) || 0;
//       const z = parseFloat(item[zAxis]) || 0;

//       const color = palette[i % palette.length];
//       const material = new THREE.MeshStandardMaterial({ color });
//       let mesh;

//       if (chartType === "bar") {
//         mesh = new THREE.Mesh(new THREE.BoxGeometry(0.8, y, 0.8), material);
//         mesh.position.set(x, y / 2, z);
//       } else {
//         mesh = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), material);
//         mesh.position.set(x, y, z);
//         if (chartType === "line") linePoints.push(new THREE.Vector3(x, y, z));
//       }

//       mesh.userData = { ...item };
//       scene.add(mesh);
//       dataPoints.push(mesh);
//     });

//     setPoints(dataPoints);

//     if (chartType === "line" && linePoints.length > 1) {
//       const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
//       const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
//       const line = new THREE.Line(lineGeometry, lineMaterial);
//       scene.add(line);
//     }

//     const tooltip = tooltipRef.current;

//     function onMouseMove(event) {
//       const bounds = container.getBoundingClientRect();
//       mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
//       mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObjects(dataPoints);

//       if (intersects.length > 0) {
//         const data = intersects[0].object.userData;
//         tooltip.style.display = "block";
//         tooltip.style.left = `${event.clientX + 10}px`;
//         tooltip.style.top = `${event.clientY + 10}px`;
//         tooltip.innerHTML = `x: ${data[xAxis]}<br>y: ${data[yAxis]}<br>z: ${data[zAxis] || 0}`;
//       } else {
//         tooltip.style.display = "none";
//       }
//     }

//     container.addEventListener("mousemove", onMouseMove);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//       controls.dispose();
//       renderer.dispose();
//       container.removeChild(renderer.domElement);
//       container.removeEventListener("mousemove", onMouseMove);
//     };
//   }, [chartData, chartType, font, xAxis, yAxis, zAxis]);

//   const exportPNG = async () => {
//     const canvas = await html2canvas(mountRef.current);
//     const link = document.createElement("a");
//     link.download = "chart.png";
//     link.href = canvas.toDataURL();
//     link.click();
//   };

//   const exportPDF = async () => {
//     const canvas = await html2canvas(mountRef.current);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF();
//     const ratio = canvas.width / canvas.height;
//     const width = 190;
//     const height = width / ratio;
//     pdf.addImage(imgData, "PNG", 10, 10, width, height);
//     pdf.save("chart.pdf");
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", gap: "1rem", marginBottom: "10px" }}>
//         <button onClick={exportPNG}>Export PNG</button>
//         <button onClick={exportPDF}>Export PDF</button>
//       </div>
//       <div ref={mountRef} style={{ width: "100%", height: "600px", position: "relative" }} />
//       <div ref={tooltipRef} style={{
//         position: "fixed",
//         display: "none",
//         background: "#333",
//         color: "#fff",
//         padding: "5px 8px",
//         borderRadius: "4px",
//         fontSize: "12px",
//         pointerEvents: "none",
//         zIndex: 1000
//       }} />
//     </div>
//   );
// };

// export default ThreeDChart;
