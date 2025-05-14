import React, { useState, useRef } from "react";
import { Flame } from "lucide-react";
import CryptoJS from "crypto-js";

import AuthModal from "./AuthModal";
import axios from "axios";
import spribeGames from "../gamesData/spribe.json";

interface TrendingGamesProps {
  title: string;
  type: "featured" | "trending";
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

const TrendingGames: React.FC<TrendingGamesProps> = ({ title, type }) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const desktopGridRef = useRef<HTMLDivElement>(null);
  const trendingGames = spribeGames;

  // For mobile scrolling
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // For desktop pagination - show only 8 games (one row)
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 8; // Show only 8 games (single row)
  
  const totalPages = Math.ceil(trendingGames.length / gamesPerPage);
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Get current page of games for desktop
  const currentGames = trendingGames.slice(
    currentPage * gamesPerPage,
    (currentPage + 1) * gamesPerPage
  );

  return (
    <>
      {/* Mobile View */}
      <section className="md:hidden py-8 px-4 bg-[#1A1A2E]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-white">Trending Games</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="text-white bg-purple-900/20 p-2 rounded-full transition-colors hover:bg-purple-700 flex items-center justify-center w-8 h-8"
            >
              &lt;
            </button>
            <button
              onClick={scrollRight}
              className="text-white bg-purple-900/20 p-2 rounded-full transition-colors hover:bg-purple-700 flex items-center justify-center w-8 h-8"
            >
              &gt;
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar px-1"
        >
          {trendingGames.length > 0 ? (
            trendingGames.map((game) => (
              <div
                key={game.id}
                className="min-w-[100px] bg-[#252547] rounded-xl border border-purple-500/10 shadow-lg relative"
              >
                <div className="relative aspect-square">
                  <img
                    src={game.img}
                    alt={game.name}
                    onClick={() => openJsGame(game.id)}
                    className="w-full h-full object-contain cursor-pointer rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1">
                    <h3 className="text-white font-medium text-xs text-center line-clamp-1 mb-3">{game.name}</h3>
                    <button 
                      onClick={() => openJsGame(game.id)}
                      className="py-1.5 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium text-base hover:opacity-90 transition-opacity"
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No trending games available.</p>
          )}
        </div>
      </section>

      {/* Desktop View - Single row */}
      <section className="hidden md:block py-6 px-6 bg-[#1A1A2E] relative rounded-xl border border-purple-500/10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-white">Trending Games</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">
              Page {currentPage + 1} of {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={prevPage}
                className="text-white bg-purple-900/20 p-1 rounded-full transition-colors hover:bg-purple-700 flex items-center justify-center w-6 h-6 text-xs"
              >
                &lt;
              </button>
              <button
                onClick={nextPage}
                className="text-white bg-purple-900/20 p-1 rounded-full transition-colors hover:bg-purple-700 flex items-center justify-center w-6 h-6 text-xs"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        
        {/* Single row with 8 columns */}
        <div ref={desktopGridRef} className="grid grid-cols-8 gap-2">
          {currentGames.map((game) => (
            <div 
              key={game.id} 
              className="group bg-[#252547] rounded-md border border-purple-500/10 overflow-hidden transition-transform hover:scale-[1.05]"
            >
              <div className="relative aspect-square">
                <img
                  src={game.img}
                  alt={game.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1">
                  <h3 className="text-white font-medium text-xs text-center line-clamp-1 mb-3">{game.name}</h3>
                  <button 
                    onClick={() => openJsGame(game.id)}
                    className="py-1.5 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium text-base hover:opacity-90 transition-opacity"
                  >
                    Play
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Page indicators */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-1.5 h-1.5 rounded-full mx-0.5 ${
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

export default TrendingGames;