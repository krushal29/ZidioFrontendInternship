import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUserShield } from "@fortawesome/free-solid-svg-icons";
import {backendurl} from '../App'

const AdminSignup = () => {
  const [formData, setFormData] = useState({
  AdminName: "",
  AdminEmail: "",
  Password: "",
});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${backendurl}/admin/admin-signup`, formData);
      setSuccess(response.data.message);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg bg-gradient-to-br from-[#81c3d7] via-[#3a7ca5] to-[#0582ca] z-50">
      <div className="w-[90vw] max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-[#006494] text-center mb-6">Admin Signup</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form className="flex flex-col gap-4 text-gray-600" onSubmit={handleSubmit}>
          <div className="relative">
            <FontAwesomeIcon icon={faUserShield} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="AdminName"
              value={formData.AdminName}
              onChange={handleChange}
              placeholder="Admin Name"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
              required
            />
          </div>

          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="AdminEmail"
              value={formData.AdminEmail}
              onChange={handleChange}
              placeholder="Admin Email"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
              required
            />
          </div>

          <div className="relative">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#064848]"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white font-semibold text-lg py-3 border cursor-pointer rounded-lg bg-[#006494] hover:scale-105 transition duration-300"
          >
            Register as Admin
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an admin account?{" "}
            <button
              type="button"
              className="text-[#006494] cursor-pointer hover:underline font-semibold"
              onClick={() => navigate("/admin-login")}
            >
              Login
            </button>
          </p>
        </form>

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

export default AdminSignup;
