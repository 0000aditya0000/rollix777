import React, { useState, useRef } from "react";
import { Zap } from "lucide-react";
import CryptoJS from "crypto-js";
import vegasGames from "../gamesData/vegas.json";
import AuthModal from "./AuthModal";
import axios from "axios";

interface LatestGamesProps {
  title: string;
  type: "featured" | "latest";
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

const LatestGames: React.FC<LatestGamesProps> = ({ title, type }) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const latestGames = vegasGames;

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

  return (
    <section className="py-8 px-4 bg-[#1A1A2E]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-white">Latest Games</h2>
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
        className="flex gap-4 overflow-x-auto hide-scrollbar px-1"
      >
        {latestGames.length > 0 ? (
          latestGames.map((game) => (
            <div
              key={game.id}
              className="min-w-[140px] bg-[#252547] rounded-xl border border-purple-500/10 shadow-lg relative"
            >
              <div className="relative">
                <img
                  src={game.img}
                  alt={game.name}
                  onClick={() => openJsGame(game.id)}
                  className="w-full h-full object-cover cursor-pointer rounded-xl"
                />
                {/* Game Name Overlay */}
                {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-xl">
                  <h3 className="text-white font-bold text-center text-lg rounded-lg">
                    {game.game_name}
                  </h3>
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No latest games available.</p>
        )}
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

export default LatestGames;