import React, { useState } from "react";
import { ArrowLeft, Lock, Phone, Mail, Eye, EyeOff } from "lucide-react";
import { register } from "../../../lib/services/authService";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (phoneNumber.trim() === "") {
      setError("Please enter your phone number");
      return;
    }
    if (password.trim() === "") {
      setError("Please set your password");
      return;
    }
    if (confirmPassword.trim() === "") {
      setError("Please confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreeToTerms) {
      setError("Please agree to the Privacy Agreement");
      return;
    }

    try {
      console.log("Registration data:", {
        phoneNumber,
        password,
        confirmPassword,
        inviteCode,
      });
      const registerPayload = {
        phoneNumber,
        password,
        confirmPassword,
        inviteCode,
      };
      const data = await register(registerPayload);
      console.log(data, "data");
      // Navigate to login or dashboard after successful registration
      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed:", error.message);
      setError(error.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen bg-[#220904] flex flex-col">
      {/* Header with back button */}
      {/* <div className="absolute left-4 top-6 z-10">
        <ArrowLeft
          className="text-white cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div> */}

      {/* Gradient Header Section */}
      <div className="bg-gradient-to-r from-[#db6903] to-[#f1a903] text-white px-4 py-8 shadow">
        <h2 className="text-xl font-bold mb-2">Register</h2>
        <p className="text-sm leading-relaxed">
          Please register by phone number or email
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleRegister}>
        <div className="flex-1 px-6 py-6 text-white">
          {/* Register your phone/email section */}
          <div className="flex justify-center border-b border-gray-600 mb-8">
            <button
              className={`flex items-center px-6 py-3 text-lg 
                   text-[#db6903] font-semibold border-b-2 border-[#db6903]
                  text-gray-300"
              `}
            >
              <Phone className="mr-2 h-5 w-5" /> Register Your Phone
            </button>
          </div>

          {/* Phone/Email Input */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold text-white mb-3">
              <div className="w-8 h-8 bg-[#d31c02] rounded flex items-center justify-center mr-3">
                <Phone className="h-4 w-4 text-white" />
              </div>
              Phone number
            </label>
            <div className="flex items-center border border-gray-500 rounded-lg px-3 py-3 bg-[#1f0e0e]">
              <span className="mr-2 text-gray-300">+91</span>
              <select className="mr-2 bg-transparent text-gray-300 border-none outline-none"></select>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Please enter the phone number"
                className="flex-1 bg-[#1f0e0e] focus:bg-[#1f0e0e] outline-none text-white text-lg border-none shadow-none focus:ring-0"
              />
            </div>
          </div>

          {/* Set Password */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold text-white mb-3">
              <div className="w-8 h-8 bg-[#d31c02] rounded flex items-center justify-center mr-3">
                <Lock className="h-4 w-4 text-white" />
              </div>
              Set password
            </label>
            <div className="flex items-center border border-gray-500 rounded-lg px-3 py-3 bg-[#1f0e0e]">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set password"
                className="flex-1 bg-[#1f0e0e] focus:bg-[#1f0e0e] outline-none text-white text-lg border-none shadow-none focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold text-white mb-3">
              <div className="w-8 h-8 bg-[#d31c02] rounded flex items-center justify-center mr-3">
                <Lock className="h-4 w-4 text-white" />
              </div>
              Confirm password
            </label>
            <div className="flex items-center border border-gray-500 rounded-lg px-3 py-3 bg-[#1f0e0e]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="flex-1 bg-[#1f0e0e] focus:bg-[#1f0e0e] outline-none text-white text-lg border-none shadow-none focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Invite Code */}
          <div className="mb-6">
            <label className="flex items-center text-lg font-semibold text-white mb-3">
              <div className="w-8 h-8 bg-[#d31c02] rounded flex items-center justify-center mr-3">
                <Mail className="h-4 w-4 text-white" />
              </div>
              Invite code
            </label>
            <div className="flex items-center border border-gray-500 rounded-lg px-3 py-3 bg-[#1f0e0e]">
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Please enter the invitation code"
                className="flex-1 bg-[#1f0e0e] focus:bg-[#1f0e0e] outline-none text-white text-lg border-none shadow-none focus:ring-0"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Privacy Agreement */}
          <div className="flex items-center mb-8">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mr-3 w-5 h-5"
            />
            <span className="text-sm text-gray-300">
              I have read and agree{" "}
              <span className="text-[#d31c02] underline cursor-pointer">
                【Privacy Agreement】
              </span>
            </span>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#db6903] to-[#f1a903] text-white font-semibold py-4 rounded-full mb-4 text-lg"
          >
            Register
          </button>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleLoginRedirect}
            className="w-full border border-[#db6903] text-[#db6903] font-semibold py-4 rounded-full text-lg mb-20"
          >
            I have an account <span className="text-[#d31c02]">Login</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
