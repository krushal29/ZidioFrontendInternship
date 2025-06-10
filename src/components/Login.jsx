import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

   const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
setLoading(true); 
    try {
      const response = await axios.post("http://localhost/api/user/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setSuccess(response.data.message);
      setFormData({ Email: "", Password: "" });

      navigate("/customer-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
    finally {
  setLoading(false);
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
          {showForgotPassword ? "Reset Password" : "Customer Login"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

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

            {loading ? (
              <button
                type="button"
                disabled
                className="flex justify-center items-center gap-2 bg-gray-400 text-white font-semibold text-lg py-3 border rounded-lg cursor-not-allowed"
              >
                <FaSpinner className="animate-spin" />
                Logging you in...
              </button>
            ) : (
              <button
                type="submit"
                className="text-white font-semibold text-lg py-3 border cursor-pointer rounded-lg bg-[#006494] hover:scale-105 transition duration-300"
              >
                Login
              </button>
            )}

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

        {!showForgotPassword && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Or continue with</p>
            <div className="flex justify-center gap-4">
              <a href="http://localhost:80/api/user/google">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-200 transition">
                  <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
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
        )}

        {/* Admin Login Button */}
        {!showForgotPassword && (
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/admin-login")}
              className="text-sm text-[#006494] font-semibold hover:underline"
            >
              Login as Admin →
            </button>
          </div>
        )}

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
