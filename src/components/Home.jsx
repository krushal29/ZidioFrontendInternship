import React from "react";
import { Link } from "react-router-dom";
import { UploadCloud, BarChart3, FileSpreadsheet, LockKeyhole } from "lucide-react";
import '../App.css'
import LandingImage from "../../public/excel.jpg";
import { Link as ScrollLink } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faHome, faHeart, faCalendarCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';

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

      <nav className="w-full fixed z-10 bg-yellow-600 py-3 px-8 poppins">
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">

                    <div className="text-white text-2xl font-bold montserrat">Excellytics</div>
                </div>
                <ul className="flex space-x-3">
                    <li className="text-white flex gap-2 items-center hover:text-[#81dede] cursor-pointer text-xl px-4 py-2 rounded-full hover:bg-[#0d3733] hover:scale-105 transform duration-300 ease-in-out">
                        <FontAwesomeIcon icon={faHome} className='fa-solid text-white text-xl' />Home
                    </li>
                    <li className="text-white flex gap-2 items-center hover:text-[#81dede] cursor-pointer text-xl px-4 py-2 rounded-full hover:bg-[#0d3733] hover:scale-105 transform duration-300 ease-in-out">
                        <FontAwesomeIcon icon={faCalendarCheck} className='fa-solid text-white text-xl' />Features
                    </li>
                    
                    
                        <button
                            className="text-[#0d3733] bg-white flex gap-2 items-center hover:text-[#81dede] cursor-pointer text-lg px-4 py-2 rounded-full hover:bg-[#0d3733] hover:scale-105 transform duration-300 ease-in-out font-bold"
                            onClick={() => setIsSignupOpen(true)}
                        >
                            <FontAwesomeIcon icon={faUserPlus} className='fa-solid text-lg' />SignUp
                        </button>
                    
                </ul>
            </div>
        </nav>
    

      {/* <header className="relative bg-[#006494] text-white min-h-screen  py-30 px-6 text-center overflow-hidden">
      <div className="shiny-strip" />

      <h1 className="z-20 text-4xl  relative md:text-5xl font-bold mb-4 montserrat-mont " >
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
    </header> */}

 
    <div 
                className="w-full min-h-screen bg-no-repeat bg-cover bg-[#006494] bg-center flex justify-end p-8 items-center poppins" 
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0.9) 70%),
                        url(${LandingImage})
                    `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'left'
                }}
            >
                <div className='flex flex-col gap-5 text-right w-[55%] relative justify-center items-end '>
                    <h1 className='font-bold text-7xl poppins text-[#81dede] montserrat' 
                        style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.8)" }}>
                        Excellytics
                    </h1>
                    <p className='font-bold text-2xl montserrat text-white' 
                        style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.8)" }}>
                        Upload, visualize, and download data insights with powerful interactive charts.
                    </p>
                    

                    <Link to="/signup" smooth={true} className='bg-yellow-600 text-white mt-5 w-52 px-6 py-3 tracking-wider text-center text-xl rounded-full cursor-pointer poppins hover:bg-[#81dede] hover:text-[#064747] hover:scale-110 transform duration-300 ease-in-out font-bold'>
                        Get Started <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </div>
            </div>

      
      <section className="py-10 min-h-screen poppins-medium px-6 bg-[#E2DBCB]">
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

      
      <footer className="mt-auto py-6 text-center bg-yellow-600 text-white border-t">
        <p className="text-white text-sm">
          &copy; {new Date().getFullYear()} Excel Analytics. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
