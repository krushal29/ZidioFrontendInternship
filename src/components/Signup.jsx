import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FaSpinner } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    UserName: "",
    UserEmail: "",
    Password: "",
  });

   const [errors, setErrors] = useState({
    UserName: "",
    UserEmail: "",
    Password: "",
  });


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]:value });

    let fieldError = "";

    if (name === "UserName") {
      fieldError = value.trim().length > 1 ? "" : "Full name must be at least 2 characters.";
    } else if (name === "UserEmail") {
      const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      fieldError = emailRegex.test(value) ? "" : "Please enter a valid email address.";
    } else if (name === "Password") {
      const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      fieldError = passwordRegex.test(value)
        ? ""
        : "Password must be at least 6 characters, include uppercase, lowercase, and a number.";
    }

    setErrors({ ...errors, [name]: fieldError });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (Object.values(errors).some((err) => err !== "")) {
      setError("Please fix the errors before submitting.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:80/api/user/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess(response.data.message);
      setFormData({ UserName: "", UserEmail: "", Password: "" });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/customer-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg bg-gradient-to-br from-[#81c3d7] via-[#3a7ca5] to-[#0582ca] z-50">
      <div className="w-[90vw] max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-[#006494] text-center mb-6">
          Customer Signup
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form className="flex flex-col gap-4 text-gray-600" onSubmit={handleSubmit}>
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className={`absolute left-3  transform -translate-y-1/2  text-gray-400
      ${errors.UserName ? 'top-1/3' : 'top-1/2'}`} />
            <input
              type="text"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
              required
            />
            {errors.UserName && <p className="text-sm text-red-500 mt-1">{errors.UserName}</p>}
          </div>

          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className={`absolute left-3  transform -translate-y-1/2  text-gray-400
      ${errors.UserEmail ? 'top-1/3' : 'top-1/2'}`} />
            <input
              type="email"
              name="UserEmail"
              value={formData.UserEmail}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
              required
            />
            {errors.UserEmail && <p className="text-sm text-red-500 mt-1">{errors.UserEmail}</p>}
          </div>

          <div className="relative">
            <FontAwesomeIcon icon={faLock} className={`absolute left-3  transform -translate-y-1/2  text-gray-400
      ${errors.Password ? 'top-1/4' : 'top-1/2'}`} />
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
              required
            />
            {errors.Password && <p className="text-sm text-red-500 mt-1">{errors.Password}</p>}
          </div>

          {loading ? (
            <button
              type="button"
              disabled
              className="flex justify-center items-center gap-2 bg-gray-400 text-white font-semibold text-lg py-3 border rounded-lg cursor-not-allowed"
            >
              <FaSpinner className="animate-spin" />
              Creating your account...
            </button>
          ) : (
            <button
              type="submit"
              className="text-white font-semibold text-lg py-3 border cursor-pointer rounded-lg bg-[#006494] hover:scale-105 transition duration-300"
            >
              Register as Customer
            </button>
          )}


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
            <a href="http://localhost:80/api/user/google">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-200 transition">
                <FontAwesomeIcon icon={faGoogle} className="" />
                Google
              </button>
            </a>
            <a href="http://localhost:80/api/user/github">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-200 transition">
                <FontAwesomeIcon icon={faGithub} className="text-black" />
                GitHub
              </button>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/admin-signup")}
            className="text-sm text-[#006494] font-semibold hover:underline"
          >
            Signup as Admin →
          </button>
        </div>

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

