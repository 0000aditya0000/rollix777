import React from "react";
import { Home, Gamepad2, Gift, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Footer: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 w-full max-w-[430px] bg-[#0F0F19]/90 backdrop-blur-lg border-t border-gray-800 z-30">
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
              location.pathname === "/games" ? "text-purple-500" : "text-gray-400"
            }`}
          />
          <span
            className={`text-xs ${
              location.pathname === "/games" ? "text-purple-500" : "text-gray-400"
            }`}
          >
            Games
          </span>
        </Link>

        <Link to="/promotions" className="flex flex-col items-center gap-1">
          <Gift
            className={`w-6 h-6 ${
              location.pathname === "/promotions" ? "text-purple-500" : "text-gray-400"
            }`}
          />
          <span
            className={`text-xs ${
              location.pathname === "/promotions" ? "text-purple-500" : "text-gray-400"
            }`}
          >
            Promotions
          </span>
        </Link>

        <Link to="/account" className="flex flex-col items-center gap-1">
          <User
            className={`w-6 h-6 ${
              location.pathname === "/account" ? "text-purple-500" : "text-gray-400"
            }`}
          />
          <span
            className={`text-xs ${
              location.pathname === "/account" ? "text-purple-500" : "text-gray-400"
            }`}
          >
            {isLoggedIn ? "Account" : "Login"}
          </span>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
