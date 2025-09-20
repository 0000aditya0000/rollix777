import React, { useState } from "react";
import { ArrowLeft, Lock, Phone, Mail } from "lucide-react";
import { signin } from "../../../lib/services/authService";
import { login, logout } from "../../../slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === "") {
      setError("Please enter your password");
      return;
    }

    try {
      const data = await signin({ email, password });
      console.log(data, "data");
      localStorage.setItem("userToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.username);
      localStorage.setItem("referralCode", data.user.referalCode);
      dispatch(
        login({
          user: { id: data.user.id, name: data.user.username },
          token: data.accessToken,
        })
      );
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setError(error.message);
      dispatch(logout());
    }
  };

  return (
    <div className="w-full h-screen bg-[#220904] flex flex-col">
      {/* <ArrowLeft className="absolute left-4 top-1/2 -translate-y-1/2" /> */}
      {/* Gradient Login Section - full width */}
      <div className="bg-gradient-to-r from-[#db6903] to-[#f1a903] text-white px-4 py-4 shadow">
        <h2 className="text-xl font-bold mb-2">Log in</h2>
        <p className="text-sm leading-relaxed">
          Please log in with your phone number or email. <br />
          If you forget your password, please contact customer service.
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleLogin}>
        <div className="flex-1 px-6 py-6 text-white">
          {/* Tabs */}
          <div className="flex justify-center border-b border-gray-600 mb-8">
            <button
              onClick={() => setActiveTab("phone")}
              className={`flex items-center px-6 py-3 text-lg ${
                activeTab === "phone"
                  ? "text-[#db6903] font-semibold border-b-2 border-[#db6903]"
                  : "text-gray-300"
              }`}
            >
              <Phone className="mr-2 h-5 w-5" /> Phone Number
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`flex items-center px-6 py-3 text-lg ${
                activeTab === "email"
                  ? "text-[#db6903] font-semibold border-b-2 border-[#db6903]"
                  : "text-gray-300"
              }`}
            >
              <Mail className="mr-2 h-5 w-5" /> Email Login
            </button>
          </div>

          {/* Phone Input */}
          {activeTab === "phone" ? (
            // Phone Input
            <div className="mb-8">
              <label className="flex items-center text-lg font-semibold text-white mb-3">
                <Phone className="mr-2 h-5 w-5 text-[#db6903]" /> Phone Number
              </label>
              <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 bg-[#1f0e0e]">
                <span className="mr-2 text-gray-300">+91</span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#1f0e0e] focus:bg-[#1f0e0e] outline-none text-white text-lg border-none shadow-none focus:ring-0"
                />
              </div>
            </div>
          ) : (
            // Email Input
            <div className="mb-8">
              <label className="flex items-center text-lg font-semibold text-white mb-3">
                <Mail className="mr-2 h-5 w-5 text-[#db6903]" /> Email
              </label>
              <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 bg-[#1f0e0e]">
                <Mail className="mr-2 h-5 w-5 text-gray-300" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#1f0e0e] focus:bg-[#1f0e0e] outline-none text-white text-lg border-none shadow-none focus:ring-0"
                />
              </div>
            </div>
          )}

          {/* Password Input */}
          <div className="mb-8">
            <label className="flex items-center text-lg font-semibold text-white mb-3">
              <Lock className="mr-2 h-5 w-5 text-[#db6903]" /> Password
            </label>
            <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 bg-[#1f0e0e]">
              <Lock className="mr-2 h-5 w-5 text-gray-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-[#1f0e0e] focus:bg-[#1f0e0e] outline-none text-white text-lg border-none shadow-none focus:ring-0"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Remember password */}
          <div className="flex items-center mb-6">
            <input type="checkbox" defaultChecked className="mr-2" />
            <span className="text-sm text-gray-300">Remember password</span>
          </div>
          {/* Buttons */}
          <button className="w-full bg-gradient-to-r from-[#db6903] to-[#f1a903] text-white font-semibold py-3 rounded-full mb-4">
            Log in
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full border border-[#db6903] text-[#db6903] font-semibold py-3 rounded-full"
          >
            Register
          </button>
          {/* Footer Links */}
          <div className="flex justify-evenly items-center mt-8 text-sm text-gray-300">
            {/* Forgot Password */}
            <button className="flex flex-col items-center">
              <Lock className="h-7 w-7 text-[#db6903] mb-1" />
              <span className="text-sm">Forgot Password</span>
            </button>

            {/* Customer Service */}
            <button className="flex flex-col items-center">
              <Mail className="h-7 w-7 text-[#db6903] mb-1" />
              <span className="text-sm">Customer Service</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
