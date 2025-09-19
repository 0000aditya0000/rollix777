import { useState } from "react";
import { Smartphone, Mail, KeyRound, Headset } from "lucide-react"; // premium clean icons
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [tab, setTab] = useState<"phone" | "email">("phone");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCnf, setPasswordConfirm] = useState("");
  const [invite, setInvite] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPasswordCfm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECEBDE] font-poppins overflow-y-auto">
      {/* Mobile Container */}
      <div className="w-full max-w-md bg-[#000] shadow-[0_0_35px_rgba(219,105,3,0.3)] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#db6903] via-[#e1910a] to-[#bc9713] p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wide">Rollix 777</h1>
            <span className="text-sm font-medium">🌐 EN</span>
          </div>
          <p className="text-sm mt-2 opacity-90 leading-snug">
            Please register by using your phone number or email id.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#4f350e] text-center bg-[#000]">
          <button
            className={`flex-1 py-3 font-medium flex flex-col items-center justify-center transition ${
              tab === "phone"
                ? "text-[#f1a903] border-b-2 border-[#f1a903]"
                : "text-gray-400 hover:text-[#bc9713]"
            }`}
            onClick={() => setTab("phone")}
          >
            <Smartphone className="w-5 h-5 mb-1" />
            <span className="text-sm">Register Phone Number</span>
          </button>

          <button
            className={`flex-1 py-3 font-medium flex flex-col items-center justify-center transition ${
              tab === "email"
                ? "text-[#f1a903] border-b-2 border-[#f1a903]"
                : "text-gray-400 hover:text-[#bc9713]"
            }`}
            onClick={() => setTab("email")}
          >
            <Mail className="w-5 h-5 mb-1" />
            <span className="text-sm">Register Email Id</span>
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-2 text-[#f1a903] font-medium">
              {tab === "phone" ? "Phone Number" : "Email"}
            </label>
            <input
              type={tab === "phone" ? "tel" : "email"}
              placeholder={
                tab === "phone" ? "Enter your phone number" : "Enter your email"
              }
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#000] border border-[#4f350e] text-[#f1a903] placeholder-[#fff]/60 focus:outline-none focus:ring-2 focus:ring-[#db6903] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-[#f1a903] font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#000] border border-[#4f350e] text-[#f1a903] placeholder-[#fff]/60 focus:outline-none focus:ring-2 focus:ring-[#db6903] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#e1910a] text-sm"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-[#f1a903] font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Enter your password"
                value={passwordCnf}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#000] border border-[#4f350e] text-[#f1a903] placeholder-[#fff]/60 focus:outline-none focus:ring-2 focus:ring-[#db6903] transition"
              />
              <button
                type="button"
                onClick={() => setShowPasswordCfm(!showPassword2)}
                className="absolute right-3 top-3 text-[#e1910a] text-sm"
              >
                {showPassword2 ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Invite Code */}
          <div>
            <label className="block mb-2 text-[#f1a903] font-medium">
              Invite Code
            </label>
            <div className="relative">
              <input
                type={"number"}
                placeholder="Please enter your invite code"
                onChange={(e) => setInvite(e.target.value)}
                value={invite}
                className="w-full px-4 py-3 rounded-lg bg-[#000] border border-[#4f350e] text-[#f1a903] placeholder-[#fff]/60 focus:outline-none focus:ring-2 focus:ring-[#db6903] transition"
              />
            </div>
          </div>
          
<br />
          {/* Register */}
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#db6903] via-[#e1910a] to-[#bc9713] text-black font-semibold text-lg tracking-wide shadow-[0_0_25px_rgba(241,169,3,0.5)] hover:scale-[1.02] transform transition">
            Register
          </button>

          {/* Register */}
          <button className="w-full py-3 rounded-lg border border-[#db6903] text-[#db6903] font-medium text-lg tracking-wide bg-[#220904] hover:bg-[#3d1601] transition"
          onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
        {/* Bottom links */}
        <div className="flex justify-around items-center p-4 text-sm">
          <button className="flex flex-col items-center justify-center text-white hover:text-white-400 transition transform hover:scale-110 duration-300">
            <KeyRound className="w-6 h-6 mb-1 drop-shadow-[0_0_8px_rgba(255,215,0,0.7)]" />
            <span className="font-medium">Forgot Password</span>
          </button>

          <div className="h-8 w-px bg-gradient-to-b from-yellow-500 via-yellow-300 to-yellow-500 opacity-40"></div>

          <button className="flex flex-col items-center justify-center text-white hover:text-white-400 transition transform hover:scale-110 duration-300">
            <Headset className="w-6 h-6 mb-1 drop-shadow-[0_0_8px_rgba(255,215,0,0.7)]" />
            <span className="font-medium">Customer Service</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
