import React from "react";
import { Link } from "react-router-dom";
import { UploadCloud, BarChart3, FileSpreadsheet, LockKeyhole } from "lucide-react";
import '../App.css'

const features = [
  {
    icon: <UploadCloud className="w-8 h-8 text-blue-600" />,
    title: "Upload Excel Files",
    description: "Drag and drop your Excel files with ease using our intuitive uploader.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-green-600" />,
    title: "Visualize Data",
    description: "Get powerful 2D and 3D charts instantly using Chart.js and Three.js.",
  },
  {
    icon: <FileSpreadsheet className="w-8 h-8 text-yellow-600" />,
    title: "Download Reports",
    description: "Download processed data and graphs for presentations and reports.",
  },
  {
    icon: <LockKeyhole className="w-8 h-8 text-red-600" />,
    title: "Secure Access",
    description: "Your data is protected with JWT-based authentication and role control.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
    

      <header className="relative bg-[#006494] text-white py-20 px-6 text-center overflow-hidden">
      <div className="shiny-strip" />

      <h1 className="relative z-20 text-4xl md:text-5xl font-bold mb-4 montserrat-mont">
        Excellytics
      </h1>
      <p className="relative z-20 text-lg md:text-xl mb-8 max-w-2xl mx-auto poppins-medium">
        Upload, visualize, and download data insights with powerful interactive charts.
      </p>
      <Link
        to="/signup"
        className="relative z-20 bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
      >
        Get Started
      </Link>
    </header>


      
      <section className="py-10 poppins-medium px-6 bg-[#E2DBCB]">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      
      <footer className="mt-auto py-6 text-center bg-white border-t">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Excel Analytics. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
