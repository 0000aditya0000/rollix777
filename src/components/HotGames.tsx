import React, { useState, useRef } from "react";
import { Zap, Search, Loader2 } from "lucide-react";
import CryptoJS from "crypto-js";
import jiliGames from "../gamesData/jili.json";
import AuthModal from "./AuthModal";
import axios from "axios";

interface HotGamesProps {
  title: string;
  type: "featured" | "hot";
}

const aesKey = "126c2e86c418427c4aa717f971063e0e";
const serverUrl = "https://api.workorder.icu/proxy";

const encryptAES256 = (data: string, key: string) => {
  const key256 = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.AES.encrypt(data, key256, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

const generateRandom10Digits = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const HotGames: React.FC<HotGamesProps> = ({ title, type }) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingGameId, setLoadingGameId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hotGames = jiliGames;

  // Filter games based on search query
  const filteredGames = hotGames.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // For desktop pagination
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 6; // Show 6 games per row like in Hero
  
  const totalPages = Math.ceil(hotGames.length / gamesPerPage);
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Get current page of games for desktop
  const currentGames = hotGames.slice(
    currentPage * gamesPerPage,
    (currentPage + 1) * gamesPerPage
  );

  const openJsGame = async (id: string): Promise<void> => {
    try {
      setLoadingGameId(id);
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User ID not found. Please log in.");
        setLoadingGameId(null);
        return;
      }

      const response = await axios.post("https://rollix777.com/api/color/launchGame", {
        userId,
        id,
      });

      if (response.data.success) {
        window.location.href = response.data.gameUrl;
      } else {
        alert("Failed to launch game.");
        setLoadingGameId(null);
      }
    } catch (error) {
      console.error("Error launching game:", error);
      alert("An error occurred while launching the game.");
      setLoadingGameId(null);
    }
  };

  return (
    <>
      {/* Enhanced Loading Overlay */}
      {loadingGameId && (
        <div className="fixed inset-0 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-xl z-50 flex flex-col items-center justify-center">
          <div className="relative flex flex-col items-center gap-8">
            {/* Main Loading Animation */}
            <div className="relative w-32 h-32">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full animate-[spin_3s_linear_infinite]"></div>
              {/* Middle Ring */}
              <div className="absolute inset-2 border-4 border-orange-500/40 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
              {/* Inner Ring */}
              <div className="absolute inset-4 border-4 border-orange-500 rounded-full animate-[spin_1s_linear_infinite] border-t-transparent"></div>
              {/* Center Circle */}
              <div className="absolute inset-6 flex items-center justify-center">
                <div className="w-full h-full bg-orange-500/10 rounded-full animate-pulse"></div>
              </div>
              {/* Orbiting Dots */}
              <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
              <div className="absolute inset-0 animate-[spin_4s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
            </div>

            {/* Text and Dots */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <h2 className="text-3xl font-bold text-white tracking-wider">Game Launching</h2>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500/30 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-orange-500 rounded-full animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-[bounce_1s_infinite_0ms]"></span>
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                <span className="w-3 h-3 bg-orange-500 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-orange-500/20 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile View */}
      <section className="md:hidden py-8 px-4 bg-[#1A1A2E]">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-white">Hot Games</h2>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-[#252547] text-white rounded-lg border border-purple-500/20 focus:outline-none focus:border-purple-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="flex flex-col items-center"
            >
              <div 
                onClick={() => openJsGame(game.id)}
                className="relative w-full h-[100px] bg-[#252547] rounded-xl border border-purple-500/10 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] mb-2"
              >
                <img
                  src={game.img}
                  alt={game.name}
                  className="w-full h-[100px] object-fit"
                />
                {loadingGameId === game.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                      <span className="text-white text-sm">Launching...</span>
                    </div>
                  </div>
                )}
              </div>
              <h3 className="text-white font-medium text-sm text-center line-clamp-1">
                {game.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Desktop View - Matching Hero.tsx style */}
      <div className="hidden md:block py-6 px-6 bg-[#1A1A2E] relative rounded-xl border border-purple-500/10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">
              Page {currentPage + 1} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prevPage}
                className="text-white bg-purple-900/20 p-2 rounded-full transition-colors hover:bg-purple-700 flex items-center justify-center w-8 h-8"
              >
                &lt;
              </button>
              <button
                onClick={nextPage}
                className="text-white bg-purple-900/20 p-2 rounded-full transition-colors hover:bg-purple-700 flex items-center justify-center w-8 h-8"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        
        {/* Game grid - Matching Hero.tsx style */}
        <div className="grid grid-cols-6 gap-6">
          {currentGames.map((game) => (
            <div 
              key={game.id} 
              className="flex flex-col items-center group"
            >
              <div 
                onClick={() => openJsGame(game.id)}
                className="relative w-full h-[240px] bg-[#252547] rounded-2xl border border-purple-500/10 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] mb-3 flex items-center justify-center group"
              >
                <img
                  src={game.img}
                  alt={game.name}
                  className="w-full h-full object-fit"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {loadingGameId === game.id ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                      <span className="text-white">Launching...</span>
                    </div>
                  ) : (
                    <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                      Play Now
                    </button>
                  )}
                </div>
              </div>
              <h3 className="text-gray-400 font-medium text-sm text-center line-clamp-1">
                {game.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
        onLoginSuccess={() => setAuthModalOpen(false)}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </>
  );
};

export default HotGames;