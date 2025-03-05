import React, { useState } from "react";
import { Dices } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

const ColorGame = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigation function

  // Function to check if the user is logged in
  const isUserLoggedIn = () => localStorage.getItem("userToken");

  const handlePlayNow = () => {
    if (!isUserLoggedIn()) {
      setAuthModalOpen(true); // Show login popup if the user is not logged in
      return;
    }

    // Navigate to the game page
    console.log("Launching game...");
    navigate("/bigsmall");
  };

  return (
    <section className="py-8 px-4">
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Dices className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Color Game</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-red-500 h-24 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
            <span className="text-2xl font-bold text-white">Red</span>
          </div>
          <div className="bg-green-500 h-24 rounded-xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
            <span className="text-2xl font-bold text-white">Green</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-300 mb-4">Choose your color and win big!</p>

          <button
            onClick={handlePlayNow}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity"
          >
            <span>Play Now</span>
          </button>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
        onLoginSuccess={() => setAuthModalOpen(false)}
      />
    </section>
  );
};

export default ColorGame;
