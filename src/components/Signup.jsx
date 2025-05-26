// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const response = await axios.post("http://localhost:5000/register/register", formData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       setSuccess(response.data.message);
//       setFormData({ fullname: "", email: "", password: "" });
//       navigate("/customer-dashboard");
//     } catch (err) {
//       setError(err.response?.data?.error || "Registration failed!");
//     }
//   };

//   return (
//     <section
//       className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg bg-gradient-to-br from-[#81c3d7] via-[#3a7ca5] to-[#0582ca] z-50"
//     >
//       <div className="w-[90vw] max-w-md bg-white shadow-lg rounded-xl p-8">
//         <h2 className="text-3xl font-bold text-[#064848] mt-2 text-center mb-6">
//           Customer Signup
//         </h2>

//         <button
//           className="absolute top-6 right-6 text-gray-500 text-xl font-bold"
//           onClick={() => navigate("/")}
//         >
//           ✖
//         </button>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         {success && <p className="text-green-500 text-center mb-4">{success}</p>}

//         <form className="flex flex-col gap-4 text-gray-600" onSubmit={handleSubmit}>
//           {/* Full Name */}
//           <div className="relative">
//             <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               name="fullname"
//               value={formData.fullname}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email Address"
//               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-[#064848] text-white font-semibold text-lg py-3 rounded-lg hover:bg-[#056b6b] transition duration-300"
//           >
//             Register as Customer
//           </button>

//           <p className="text-center text-sm text-gray-500">
//             Already have an account?{" "}
//             <button
//               type="button"
//               className="text-[#064848] hover:underline font-semibold"
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </button>
//           </p>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/register/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess(response.data.message);
      setFormData({ fullname: "", email: "", password: "" });
      navigate("/customer-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg bg-gradient-to-br from-[#81c3d7] via-[#3a7ca5] to-[#0582ca] z-50">
      <div className="w-[90vw] max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-[#006494] text-center mb-6">
          Signup
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form className="flex flex-col gap-4 text-gray-600" onSubmit={handleSubmit}>
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
              required
            />
          </div>

          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
              required
            />
          </div>

          <div className="relative">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
              required
            />
          </div>

          <button
            type="submit"
            className=" text-white font-semibold text-lg py-3 border cursor-pointer rounded-lg bg-[#006494] hover:scale-105 transition duration-300"
          >
            Register as Customer
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              className="text-[#006494] cursor-pointer hover:underline font-semibold"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">Or continue with</p>
          <div className="flex justify-center gap-4">
            <button
              className="flex items-center cursor-pointer gap-2 px-4 py-2 border rounded-lg hover:bg-gray-200 transition"
              onClick={() => alert("Google Sign-in")}
            >
              <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
              Google
            </button>
            <button
              className="flex items-center cursor-pointer gap-2 px-4 py-2 border rounded-lg hover:bg-gray-200 transition"
              onClick={() => alert("GitHub Sign-in")}
            >
              <FontAwesomeIcon icon={faGithub} className="text-black" />
              GitHub
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-[#006494] cursor-pointer font-medium hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default Signup;

