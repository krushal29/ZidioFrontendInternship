import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotData, setForgotData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [forgotMessage, setForgotMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleRole = () => {
    setFormData((prev) => ({
      ...prev,
      role: prev.role === "user" ? "admin" : "user",
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  try {
    const response = await axios.post("http://localhost/api/user/login", formData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Full response from login:", response.data);

    
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("user", JSON.stringify(response.data.user)); 

    setSuccess(response.data.message);
    setFormData({ Email: "", Password: "", role: "user" });

    if (formData.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed!");
  }
};



  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage("");

    try {
      const res = await axios.post("http://localhost/api/user/forgotPassword", forgotData, {
        headers: { "Content-Type": "application/json" },
      });

      setForgotMessage(res.data.message);
      setForgotData({ email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setForgotMessage(err.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg bg-gradient-to-br from-[#81c3d7] via-[#3a7ca5] to-[#0582ca] z-50">
      <div className="w-[90vw] max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-[#006494] text-center mb-6">
          {showForgotPassword ? "Reset Password" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        
        {!showForgotPassword && (
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className={`text-sm font-medium ${formData.role === "user" ? "text-[#006494]" : "text-gray-400"}`}>Customer</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.role === "admin"}
                onChange={toggleRole}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600 relative"></div>
            </label>
            <span className={`text-sm font-medium ${formData.role === "admin" ? "text-[#006494]" : "text-gray-400"}`}>Admin</span>
          </div>
        )}

        {/* Login Form */}
        {!showForgotPassword ? (
          <form className="flex flex-col gap-4 text-gray-600" onSubmit={handleSubmit}>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="Email"
                value={formData.Email}
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
              {formData.role === "admin" ? "Login as Admin" : "Login as Customer"}
            </button>

            <button
              type="button"
              className="text-sm text-[#006494] hover:underline font-medium text-center mt-2"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot password?
            </button>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-[#006494] cursor-pointer hover:underline font-semibold"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </p>
          </form>
        ) : (
          <form
            className="mt-6 flex flex-col gap-3 text-gray-600"
            onSubmit={handleForgotPassword}
          >
            {forgotMessage && (
              <p
                className={`text-center text-sm ${
                  forgotMessage.toLowerCase().includes("success") ? "text-green-500" : "text-red-500"
                }`}
              >
                {forgotMessage}
              </p>
            )}

            <input
              type="email"
              name="email"
              value={forgotData.email}
              onChange={(e) => setForgotData({ ...forgotData, email: e.target.value })}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border rounded-lg"
            />

            <input
              type="password"
              name="password"
              value={forgotData.password}
              onChange={(e) => setForgotData({ ...forgotData, password: e.target.value })}
              placeholder="New password"
              required
              className="w-full px-3 py-2 border rounded-lg"
            />

            <input
              type="password"
              name="confirmPassword"
              value={forgotData.confirmPassword}
              onChange={(e) =>
                setForgotData({ ...forgotData, confirmPassword: e.target.value })
              }
              placeholder="Confirm new password"
              required
              className="w-full px-3 py-2 border rounded-lg"
            />

            <button
              type="submit"
              className="text-white bg-[#006494] rounded-lg py-2 hover:bg-[#005377] transition"
            >
              Reset Password
            </button>

            <button
              type="button"
              className="text-sm text-[#006494] mt-2 hover:underline"
              onClick={() => setShowForgotPassword(false)}
            >
              ← Back to Login
            </button>
          </form>
        )}

        {/* Social Login */}
        {!showForgotPassword && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Or continue with</p>
            <div className="flex justify-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-200 transition">
                <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                Google
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-200 transition">
                <FontAwesomeIcon icon={faGithub} className="text-black" />
                GitHub
              </button>
            </div>
          </div>
        )}

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

export default Login;
