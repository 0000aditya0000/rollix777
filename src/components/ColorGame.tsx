import { useState } from "react";
import { Dices } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import WingoRollix from "../assets/WingoRollix.png";

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
      <section className="md:hidden h-full w-full">
        <div className="h-[320px] w-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-4 border border-purple-500/20 flex flex-col justify-between">
          {/* Top Section - Icon and Title */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Dices className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-lg font-bold text-white text-center">WinGo</h2>
          </div>

          {/* Middle Section - Color Buttons */}
          <div className="flex gap-2 px-1">
            <div className="flex-1 bg-red-500 h-14 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
              <span
                onClick={handlePlayNow}
                className="text-base font-bold text-white"
              >
                Red
              </span>
            </div>
            <div className="flex-1 bg-green-500 h-14 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
              <span
                onClick={handlePlayNow}
                className="text-base font-bold text-white"
              >
                Green
              </span>
            </div>
          </div>

          {/* Bottom Section - Message and Button */}
          <div className="text-center">
            <p className="text-gray-300 text-center text-sm mb-3">
              Choose your color and win big!
            </p>
            <button
              onClick={handlePlayNow}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity text-sm"
            >
              Play Now
            </button>
          </div>
        </div>
      </section>

      {/* Desktop View - Fixed height to match other components */}
      <section className="hidden md:block h-[320px] w-full">
        <div className="h-full w-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/20 flex flex-col justify-between">
          {/* Top Section - Icon and Title */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Dices className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">WinGo</h2>
          </div>

          {/* Middle Section - Color Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-500 h-24 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
              <span
                onClick={handlePlayNow}
                className="text-2xl font-bold text-white"
              >
                Red
              </span>
            </div>
            <div className="bg-green-500 h-24 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
              <span
                onClick={handlePlayNow}
                className="text-2xl font-bold text-white"
              >
                Green
              </span>
            </div>
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
