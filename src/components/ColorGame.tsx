import { useState } from "react";
import { Dices } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Wingo from "../assets/wingo.png";

const ColorGame = () => {
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handlePlayNow = () => {
    if (!auth) {
      setAuthModalOpen(true);
    } else {
      navigate("/bigsmall");
    }
  };

  const handleOnClose = () => {
    setAuthModalOpen(false);
  };

  return (
    <>
      {/* Mobile View */}
      <section className="md:hidden h-full w-full ">
        <div
          className="w-full max-w-[200px] mx-auto bg-[#1a1e3a] rounded-xl border border-[#2d3263] shadow-inner flex flex-col items-center justify-between overflow-hidden"
          style={{ height: "180px" }}
        >
          {/* Title at the top */}
          <h3 className="text-white font-semibold text-sm text-center mt-3">
            Win Go
          </h3>

          {/* Image in the center */}
          <img
            src={Wingo}
            alt="WinGo"
            className="w-[70px] h-[70px] object-contain"
          />

          {/* GO Button at the bottom */}
          <button
            onClick={handlePlayNow}
            className="mb-3 px-5 py-1 text-sm text-white rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
          >
            Play
          </button>
        </div>
      </section>

      {/* Desktop View - Fixed height to match other components */}
      <section className="hidden md:block h-[350px] w-full">
        <div className="h-full w-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/20 flex flex-col justify-between">
          {/* Top Section - Icon and Title */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Dices className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">WinGo</h2>
          </div>

          {/* Middle Section - Color Buttons */}
          <div className="flex justify-center items-center flex-1">
            <img
              src={Wingo}
              alt="WinGo"
              className="w-[150px] h-[150px] object-contain"
            />
          </div>

          {/* Bottom Section - Message and Button */}
          <div className="text-center">
            <p className="text-gray-300 mb-4">Choose your color and win big!</p>
            <button
              onClick={handlePlayNow}
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Play Now
            </button>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={authModalOpen}
        onClose={handleOnClose}
        onLoginSuccess={handleOnClose}
      />
    </>
  );
};

export default ColorGame;
