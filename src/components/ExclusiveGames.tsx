import React, { useState } from "react";
import { Flame, ChevronRight } from "lucide-react";
// @ts-expect-error: No type definitions for 'crypto-js'.
declare module "crypto-js";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import exclusiveGames from "../gamesData/exclusive.json";

interface ExclusiveGamesProps {
  title: string;
}

const ExclusiveGames: React.FC<ExclusiveGamesProps> = ({ title }) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const gamesPerPage = 6;
  const exclusiveGamesList = exclusiveGames;
  const navigate = useNavigate();

  // Filter games based on search query
  const filteredGames = exclusiveGamesList.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentGames = filteredGames.slice(
    currentPage * gamesPerPage,
    (currentPage + 1) * gamesPerPage
  );

  // Function to launch the game
  const launchGame = (gameId: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setAuthModalOpen(true);
      return;
    }
    const mobile = userId;
    const signRaw = mobile + gameId;
    const sign = CryptoJS.MD5(signRaw).toString().toUpperCase();
    const url = `https://inout.rollix777.com/?mobile=${mobile}&gameId=${gameId}&sign=${sign}`;
    window.location.href = url;
  };

  return (
    <>
      {/* Mobile View */}
      <section className="md:hidden py-8 px-4 bg-[#1A1A2E]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={() => navigate("/games")}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 ml-2"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {filteredGames.slice(0, 9).map((game) => (
            <div key={game.id} className="flex flex-col items-center">
              <div
                onClick={() => launchGame(game.id)}
                className="relative w-full h-[100px] bg-[#252547] rounded-xl border border-purple-500/10 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] mb-2 group"
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-fit"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors">
                    Play Now
                  </button>
                </div>
              </div>
              <h3 className="text-white font-medium text-sm text-center line-clamp-1">
                {game.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Desktop View */}
      <section className="hidden md:block py-6 px-6 bg-[#1A1A2E] relative rounded-xl border border-purple-500/10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={() => navigate("/games")}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 ml-2"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
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
        <div className="grid grid-cols-6 gap-4">
          {currentGames.map((game) => (
            <div
              key={game.id}
              className="group cursor-pointer transform hover:scale-105 transition-transform duration-200 max-w-[200px] mx-auto w-full"
              onClick={() => launchGame(game.id)}
            >
              {/* Game Image */}
              <div className="relative overflow-hidden bg-gray-800">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-52 object-fill"
                  style={{ objectPosition: "center" }}
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
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

export default ExclusiveGames;
