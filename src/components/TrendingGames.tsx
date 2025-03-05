import React, { useState } from "react";
import { Flame } from "lucide-react";
import GameData from "../gamesData/gamesData.json";
import AuthModal from "./AuthModal"; // Import the modal component

const TrendingGames = ({ isLoggedIn}) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  console.log("📌 isLoggedIn in TrendingGames:", isLoggedIn);

  // Function to check if user is logged in
  const isUserLoggedIn = () => localStorage.getItem("userToken");

  // Corrected handlePlayNow function
  const handlePlayNow = (gameId) => {
    if (!isUserLoggedIn()) {
      setAuthModalOpen(true); // Show login popup if user is not logged in
      return;
    }

    // Launch game if user is logged in
    console.log(`Launching game with ID: ${gameId}`);
    // Redirect to game page or open game logic here
  };

  const trendingGames = GameData.filter(
    (game) => game.game_category === "trending"
  );

  return (
    <section className="py-8 px-4 bg-[#1A1A2E]">
      <div className="flex items-center gap-3 mb-6">
        <Flame className="w-6 h-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-white">Trending Now</h2>
      </div>

      {/* ✅ Show Login Status Here */}
      <div className="mb-4 text-white text-center">
        {isLoggedIn ? <p>✅ Welcome back!</p> : <p>🔑 Please log in to play.</p>}
      </div>

      {/* Scrollable Container */}
      <div className="flex gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar px-1">
        {trendingGames.length > 0 ? (
          trendingGames.map((game) => (
            <div
              key={game.game_uid}
              className="min-w-[150px] sm:min-w-[200px] md:min-w-[250px] bg-[#252547] rounded-xl hide-scrollbar border border-purple-500/10 shadow-lg"
            >
              <img
                src={game.icon}
                alt={game.game_name}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm md:text-base">
                  {game.game_name}
                </h3>
                <button
                  onClick={() => handlePlayNow(game.game_uid)} // ✅ Fixed function call
                  className="mt-2 w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Play Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No trending games available.</p>
        )}
      </div>

      {/* Authentication Modal (Always Present) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
        onLoginSuccess={() => setAuthModalOpen(false)}
      />
    </section>
  );
};

export default TrendingGames;
