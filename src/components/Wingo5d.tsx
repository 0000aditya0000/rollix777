import React, { useState } from "react";
import { Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import AuthModal from "./AuthModal";

const Wingo5d = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handlePlayNow = () => {
    if (!auth) {
      setAuthModalOpen(true);
    } else {
      navigate("/wingo5d");
    }
  };

  return (
    <>
      {/* Mobile View */}
      <section className="md:hidden h-full w-full">
        <div className="h-[320px] w-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-4 border border-purple-500/20 flex flex-col justify-between">
          {/* Top Section - Icon and Title */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Gamepad2 className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-lg font-bold text-white text-center">
              WinGo 5D
            </h2>
          </div>

          {/* Bottom Section - Message and Button */}
          <div className="text-center">
            <p className="text-gray-300 text-center text-sm mb-3">
              Try your luck and win big!
            </p>
            <button
              onClick={handlePlayNow}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity text-sm"
            >
              Play
            </button>
          </div>
        </div>
      </section>

      {/* Desktop View - Fixed height to match ColorGame */}
      <section className="hidden md:block h-[320px] w-full">
        <div className="h-full w-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/20 flex flex-col justify-between">
          {/* Top Section - Icon and Title */}
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Gamepad2 className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white text-center">
              WinGo 5D
            </h2>
          </div>

          {/* Bottom Section - Message and Button */}
          <div className="text-center">
            <p className="text-gray-300 mb-4 text-sm">
              Try your luck and win big!
            </p>
            <button
              onClick={handlePlayNow}
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Play
            </button>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default Wingo5d;
