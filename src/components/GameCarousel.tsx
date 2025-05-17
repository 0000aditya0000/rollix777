import React, { useState, useRef } from "react";
import sportBettingGames from "../gamesData/sportbetting.json";
import axios from "axios";
import CryptoJS from "crypto-js";
import AuthModal from "./AuthModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Flame, Search } from "lucide-react";

interface GameCarouselProps {
  title: string;
  type: "featured" | "popular";
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

// Generate a random 10-digit number
const generateRandom10Digits = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// Open JS Game Function
const openJsGame = async (id: string): Promise<void> => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID not found. Please log in.");
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
    }
  } catch (error) {
    console.error("Error launching game:", error);
    alert("An error occurred while launching the game.");
  }
};

const GameCarousel: React.FC<GameCarouselProps> = ({ title, type }) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = useSelector((state: RootState) => state.auth.token);
  const scrollRef = useRef<HTMLDivElement>(null);
  const desktopGridRef = useRef<HTMLDivElement>(null);

  const handlePlayNow = () => {
    if (!userToken) {
      setAuthModalOpen(true);
    } else {
      console.log("Redirecting to game...");
    }
  };

  // For desktop pagination - show only 8 games (one row)
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 8;

  const games = sportBettingGames;
  const totalPages = Math.ceil(games.length / gamesPerPage);
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Filter games based on search query
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current page of games for desktop
  const currentGames = filteredGames.slice(
    currentPage * gamesPerPage,
    (currentPage + 1) * gamesPerPage
  );

  return (
    <>
      {/* Mobile View */}
      <section className="md:hidden py-8 px-4 bg-[#1A1A2E]">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
          </div>
          
          {/* Search Bar for Mobile */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#252547] text-white rounded-lg pl-10 pr-4 py-2 border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="flex flex-col items-center"
            >
              <div 
                onClick={() => openJsGame(game.id)}
                className="relative w-full h-[160px] bg-[#252547] rounded-xl border border-purple-500/10 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] mb-2"
              >
                <img
                  src={game.img}
                  alt={game.name}
                  className="w-full h-[160px] object-fit"
                />
              </div>
              <h3 className="text-white font-medium text-sm text-center line-clamp-1">
                {game.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Desktop View - Single row */}
      <section className="hidden md:block py-6 px-6 bg-[#1A1A2E] relative rounded-xl border border-purple-500/10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
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
        
        {/* Game grid */}
        <div ref={desktopGridRef} className="grid grid-cols-4 lg:grid-cols-6 gap-6">
          {currentGames.map((game) => (
            <div 
              key={game.id} 
              className="flex flex-col items-center group"
            >
              <div 
                onClick={() => openJsGame(game.id)}
                className="relative w-full h-[280px] bg-[#252547] rounded-2xl border border-purple-500/10 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] mb-3 flex items-center justify-center"
              >
                <img
                  src={game.img}
                  alt={game.name}
                  className="w-full h-[280px] object-fit"
                />
              </div>
              <h3 className="text-gray-400 font-medium text-sm text-center">
                {game.name}
              </h3>
            </div>
          ))}
        </div>
        
        {/* Page indicators */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full mx-1 ${
                currentPage === index ? 'bg-orange-500' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
        onLoginSuccess={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default GameCarousel;