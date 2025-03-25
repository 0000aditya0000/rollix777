import React, { useState } from "react";
import { Home, Gamepad2, Gift, User, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Footer: React.FC = () => {
  const [showAdminButton, setShowAdminButton] = useState(true);
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    window.location.href = "/admin";
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate('/account');
    } else {
      // Handle login modal or navigation
      navigate('/login');
    }
  };

  return (
    <footer className="fixed bottom-0 w-full max-w-[430px] bg-[#0F0F19]/90 backdrop-blur-lg border-t border-gray-800 z-30">
      {showAdminButton && (
        <div className="px-4 py-2 flex justify-center">
          <button
            onClick={handleAdminAccess}
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Access Admin Dashboard
          </button>
        </div>
      )}
      <nav className="flex justify-around py-3 px-4">
        <Link to="/" className="flex flex-col items-center gap-1">
          <Home
            className={`w-6 h-6 ${
              location.pathname === "/" ? "text-purple-500" : "text-gray-400"
            }`}
          />
          <span
            className={`text-xs ${
              location.pathname === "/" ? "text-purple-500" : "text-gray-400"
            }`}
          >
            Home
          </span>
        </Link>
        <Link to="/games" className="flex flex-col items-center gap-1">
          <Gamepad2
            className={`w-6 h-6 ${
              location.pathname === "/games"
                ? "text-purple-500"
                : "text-gray-400"
            }`}
          />
          <span
            className={`text-xs ${
              location.pathname === "/games"
                ? "text-purple-500"
                : "text-gray-400"
            }`}
          >
            Games
          </span>
        </Link>
        <button className="flex flex-col items-center gap-1">
          <Gift className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">
            {isLoggedIn ? "Rewards" : "Promotions"}
          </span>
        </button>
        <button 
          onClick={handleAccountClick} 
          className="flex flex-col items-center gap-1"
        >
          <User 
            className={`w-6 h-6 ${
              location.pathname === "/account" 
                ? "text-purple-500" 
                : "text-gray-400"
            }`}
          />
          <span 
            className={`text-xs ${
              location.pathname === "/account" 
                ? "text-purple-500" 
                : "text-gray-400"
            }`}
          >
            {isLoggedIn ? "Account" : "Login"}
          </span>
        </button>
      </nav>
    </footer>
  );
};

export default Footer;
