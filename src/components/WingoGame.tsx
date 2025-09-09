import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Timer, Trophy, Star, Play, MedalIcon } from "lucide-react";

const WingoGame = () => {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    navigate("/bigsmall");
  };

  return (
    <div className="relative bg-[#1E1B3F] rounded-2xl overflow-hidden">
      {/* Telegram Button */}
      <button
        onClick={() => window.open("https://t.me/rollix777_support", "_blank")}
        className="fixed bottom-10 right-6 z-50 w-16 h-16 rounded-full 
             bg-gradient-to-br from-[#0088cc] to-[#005f8a] 
             flex items-center justify-center shadow-lg 
             transition-all duration-300 hover:scale-110 
             hover:shadow-xl active:scale-95"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-.962 6.502-.613 1.938-1.425 2.278-2.313 1.467l-1.86-1.373-1.017.979c-.112.112-.207.207-.422.207-.272 0-.221-.126-.31-.437l-.697-2.292L6.85 11.88c-.57-.159-.578-.57.126-.854l9.386-3.62c.46-.188.882.11.752.818z" />
        </svg>
      </button>
      {/* Game Header */}
      <div className="flex items-center gap-4 p-6">
        <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
          <MedalIcon></MedalIcon>
        </div>
        <h3 className="text-2xl font-bold text-white">WinGo</h3>
      </div>

      {/* Game Content */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handlePlayGame}
            className="h-32 bg-red-500 hover:bg-red-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white transition-colors"
          >
            Red
          </button>
          <button
            onClick={handlePlayGame}
            className="h-32 bg-green-500 hover:bg-green-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white transition-colors"
          >
            Green
          </button>
        </div>

        <p className="text-center text-gray-400 mb-8">
          Choose your color and win big!
        </p>

        {/* Game Stats */}
        <div className="bg-[#2A2756] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">2.5k Playing</p>
                <p className="text-sm text-gray-400">Active Players</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Timer className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">Next Round</p>
                <p className="text-sm text-gray-400">Starting in 1:30</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">$10,000</p>
                <p className="text-sm text-gray-400">Prize Pool</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={handlePlayGame}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium flex items-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4" />
                Quick Play
              </button>
              <button
                onClick={handlePlayGame}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-white font-medium transition-colors"
              >
                Practice Mode
              </button>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="#FBBF24"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400">
                15k+ Reviews • 4.9 Average
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WingoGame;
