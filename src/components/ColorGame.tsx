import { useState } from "react";
import { Dices } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Wingo from "../assets/Wingo.jpg";
import WINGOOO from "../assets/WINGOOO.png";

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
          className="w-full max-w-[180px] mx-auto rounded-xl overflow-hidden relative group"
          style={{ height: "200px" }}
        >
          <img
            src={WINGOOO}
            alt="WinGo TRX"
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Overlay with Play button - shown on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
            <button
              onClick={handlePlayNow}
              className="px-5 py-1 text-sm text-white rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
            >
              Play
            </button>
          </div>
        </div>
      </section>

      {/* Desktop View - Fixed height to match other components */}
      <section className="hidden md:block h-[200px] w-full">
        <div className="h-full w-full rounded-2xl overflow-hidden relative group">
          <img
            src={WINGOOO}
            alt="WinGo TRX"
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Overlay with Play Now button - shown on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
            <button
              onClick={handlePlayNow}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity text-lg"
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
