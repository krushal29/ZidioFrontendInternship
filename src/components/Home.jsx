import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  UploadCloud,
  BarChart3,
  FileSpreadsheet,
  LockKeyhole,
} from "lucide-react";
import "../App.css";
// import LandingImage from "../../public/excel.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  faHome,
  faCalendarCheck,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: <UploadCloud className="w-10 h-10 text-[#17BEBB]" />,
    title: "Upload Excel Files",
    description:
      "Drag and drop your Excel files with ease using our intuitive uploader.",
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-[#227C9D]" />,
    title: "Visualize Data",
    description:
      "Get powerful 2D and 3D charts instantly using Chart.js and Three.js.",
  },
  {
    icon: <FileSpreadsheet className="w-10 h-10 text-[#669BBC]" />,
    title: "Download Reports",
    description:
      "Download processed data and graphs for presentations and reports.",
  },
  {
    icon: <LockKeyhole className="w-10 h-10 text-[#c1121f]" />,
    title: "Secure Access",
    description:
      "Your data is protected with JWT-based authentication and role control.",
  },
];

const Home = () => {

  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col bg-[#FDF0D5] relative">
      {/* Navigation Bar - Fixed at top with highest z-index */}
      <nav className="w-full fixed top-0 z-50 bg-[#003049] py-4 px-8 poppins shadow-lg">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-[#FDF0D5] text-3xl font-bold savate-svt">
              ExcelFlow
            </div>
          </div>
          <ul className="flex space-x-4">
            <li className="text-[#FDF0D5] flex gap-2 items-center font-semibold hover:bg-[#FDF0D5] hover:text-[#003049] cursor-pointer text-xl px-5 py-2 rounded-full transition-all duration-300">
              <FontAwesomeIcon icon={faHome} className="text-xl" /> Home
            </li>
            <li className="text-[#FDF0D5] flex gap-2 items-center font-semibold hover:bg-[#FDF0D5] hover:text-[#003049] cursor-pointer text-xl px-5 py-2 rounded-full transition-all duration-300">
              <FontAwesomeIcon icon={faCalendarCheck} className="text-xl" />{" "}
              Features
            </li>
            <button onClick={() => navigate("/signup")} className="text-[#003049] bg-[#FDF0D5]  hover:bg-[#003049] hover:text-[#FDF0D5] flex gap-2 items-center cursor-pointer text-lg px-6 py-2 rounded-full transition-all duration-300 font-bold border-2 border-[#003049]">
              <FontAwesomeIcon icon={faUserPlus} /> Sign Up
            </button>
          </ul>
        </div>
      </nav>

      {/* Main Content - Pushed down by navbar height */}
      <div className="flex-1 pt-20">
        {" "}
        {/* Added pt-20 to account for fixed navbar height */}
        {/* Hero Section - Using original gradient filter */}
        <div
          className="w-full min-h-screen bg-no-repeat bg-cover bg-center flex justify-end p-12 items-center poppins"
          style={{
            backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0.9) 70%),
    url('/excel.jpg')
  `,
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        >
          <div className="flex flex-col gap-6 text-right w-[55%] relative z-10 justify-center items-end">
            <h1
              className="font-extrabold text-7xl text-[#FDF0D5] montserrat-mont tracking-tight"
              style={{ textShadow: "3px 3px 8px rgba(0, 0, 0, 0.8)" }}
            >
              ExcelFlow
            </h1>
            <p
              className="font-semibold text-3xl text-[#669BBC] poppins-medium leading-tight"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Upload, visualize, and download data insights with powerful
              interactive charts.
            </p>
            <Link
              to="/signup"
              className="bg-[#17BEBB] text-[#003049] mt-8 w-60 px-8 py-4 tracking-wider text-center text-xl rounded-full cursor-pointer poppins hover:bg-[#227C9D] hover:text-[#FDF0D5] hover:scale-105 transition-all duration-300 font-bold flex items-center justify-center gap-2"
            >
              Get Started <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
        {/* Features Section */}
        <section className="py-20 min-h-screen poppins-medium px-6 bg-[#FDF0D5]">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#003049]">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#003049] rounded-xl shadow-xl p-8 text-center hover:translate-y-[-5px] transition-all duration-300 text-[#FDF0D5]"
              >
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="font-bold text-2xl mb-4">{feature.title}</h3>
                <p className="text-[#FDF0D5]/90">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Footer */}
        <footer className="py-10 text-center bg-[#003049] text-[#FDF0D5] border-t-2 border-[#736F4E]">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} Excel Analytics. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
