import React, { useState, useRef } from "react";
import { Zap } from "lucide-react";
import CryptoJS from "crypto-js";
import rubyplayGames from "../gamesData/rubyplay.json";
import netentGames from "../gamesData/netent.json";
import microgamingGames from "../gamesData/microgaming.json";
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

    const response = await axios.post("http://191.101.81.104:5000/api/color/launchGame", {
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

  // Get 3 random games from each provider
  const getRandomGames = (games: any[], count: number) => {
    const shuffled = [...games].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Combine games from all providers
  const latestGames = [
    ...getRandomGames(rubyplayGames, 3),
    ...getRandomGames(netentGames, 3),
    ...getRandomGames(microgamingGames, 3)
  ];

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
        <div className="flex items-center gap-3 ">
          <Zap className="w-6 h-6 text-yellow-500 border-2 " />
          <h2 className="text-2xl font-bold text-white">Latest Games</h2>
        </div>
        <div className="flex gap-2 ">
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
              className="group cursor-pointer transform hover:scale-105 transition-transform duration-200 min-w-[180px]"
              onClick={() => openJsGame(game.id)}
            >
              {/* Game Image */}
              <div className="relative overflow-hidden bg-gray-800">
                <img 
                  src={game.img} 
                  alt={game.name}
                  className="w-full h-52 object-fill"
                  style={{ objectPosition: 'center' }}
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors">
                    Play Now
                  </button>
                </div>
              </div>
              
              {/* Game Title on Black Background */}
              
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