import React, { useState, useEffect } from "react";
import { X, Mail, Lock, User, Phone, Gift, Eye, EyeOff, Check } from "lucide-react";
import axios from "axios";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
  onLoginSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = "login", onLoginSuccess }) => {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referalCode, setReferalCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        if (!email || !password) {
          setError("Please enter both email and password");
          return;
        }
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/user/login`,
          { email, password }
        );
        console.log("Login Successful:", response.data);
        onLoginSuccess?.();
      } else {
        if (!username || !email || !password) {
          setError("Please fill in all required fields");
          return;
        }
        if (!acceptTerms) {
          setError("Please accept the terms and conditions");
          return;
        }
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/user/register`,
          { name: username, email, password, phoneNumber, dob: "20-11-2000", referalCode }
        );
        console.log("Registration Successful:", response.data);
        onLoginSuccess?.();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-gradient-to-b from-[#252547] to-[#1A1A2E] rounded-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-purple-500/10">
          <h2 className="text-xl font-bold text-white">
            {mode === "login" ? "Login to Rollix777" : "Create Account"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A2E] text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">{error}</div>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "register" && (
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Username</label>
                <div className="relative">
                  <User className="absolute inset-y-0 left-0 w-5 h-5 text-purple-400 ml-3" />
                  <input type="text" className="w-full py-3 pl-10 pr-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white" placeholder="Choose a username"
                    value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 w-5 h-5 text-purple-400 ml-3" />
                <input type="email" className="w-full py-3 pl-10 pr-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white" placeholder="Enter your email"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-0 w-5 h-5 text-purple-400 ml-3" />
                <input type={showPassword ? "text" : "password"} className="w-full py-3 pl-10 pr-10 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white"
                  placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 cursor-pointer ${acceptTerms ? "bg-purple-600" : "bg-[#1A1A2E] border border-purple-500/20"}`} onClick={() => setAcceptTerms(!acceptTerms)}>
                  {acceptTerms && <Check className="w-4 h-4 text-white" />}
                </div>
                <label className="text-sm text-gray-300 cursor-pointer">I accept the <span className="text-purple-400">Terms of Service</span> and <span className="text-purple-400">Privacy Policy</span></label>
              </div>
            )}

            <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium disabled:opacity-50" disabled={loading}>{loading ? "Processing..." : mode === "login" ? "Login" : "Register"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
