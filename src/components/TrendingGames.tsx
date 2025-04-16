import React, { useState, useRef } from "react";
import { Flame } from "lucide-react";
import CryptoJS from "crypto-js";
import GameData from "../gamesData/gamesData.json";
import AuthModal from "./AuthModal";
import axios from "axios";

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

const openJsGame = async (game_uid: string, element: HTMLButtonElement) => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(`http://localhost:5000/api/user/wallet/${userId}`);
  const balance = response.data[10].balance;

  console.log(`Game UID: ${game_uid}`, `Balance: ${balance}`);

  const memberAccount = `h43929rollix777${userId}`;
  const transferId = `${memberAccount}_${generateRandom10Digits()}`;
  const timestamp = Date.now();

  try {
    const initPayload = {
      agency_uid: "fd37fafd6af3eb5af8dee92101100347",
      member_account: memberAccount,
      timestamp,
      credit_amount: "0",
      currency_code: "BRL",
      language: "en",
      platform: "2",
      home_url: "http://localhost:5000",
      transfer_id: transferId,
    };

    const initEncryptedPayload = encryptAES256(JSON.stringify(initPayload), aesKey);
    const initRequestPayload = { agency_uid: initPayload.agency_uid, timestamp, payload: initEncryptedPayload };
    const initResponse = await axios.post(serverUrl, initRequestPayload);

    if (initResponse.data.code !== 0) {
      console.error("Initialization Error:", initResponse.data.msg);
      alert("Failed to initialize game: " + initResponse.data.msg);
      return;
    }

    const afterAmount = initResponse.data.payload.after_amount;
    const deductPayload = { ...initPayload, credit_amount: `-${afterAmount}` };
    const deductEncryptedPayload = encryptAES256(JSON.stringify(deductPayload), aesKey);
    const deductRequestPayload = { ...initRequestPayload, payload: deductEncryptedPayload };
    const deductResponse = await axios.post(serverUrl, deductRequestPayload);

    if (deductResponse.data.code !== 0) {
      console.error("Deduct Error:", deductResponse.data.msg);
      alert("Failed to deduct balance: " + deductResponse.data.msg);
      return;
    }

    const gamePayload = { ...initPayload, game_uid, credit_amount: balance.toString() };
    const gameEncryptedPayload = encryptAES256(JSON.stringify(gamePayload), aesKey);
    const gameRequestPayload = { ...initRequestPayload, payload: gameEncryptedPayload };
    const gameResponse = await axios.post(serverUrl, gameRequestPayload);

    if (gameResponse.data.code !== 0) {
      console.error("Game Launch Error:", gameResponse.data.msg);
      alert("Failed to launch game: " + gameResponse.data.msg);
      return;
    }

    const gameLaunchUrl = gameResponse.data.payload?.game_launch_url;
    if (!gameLaunchUrl) {
      alert("Game launch URL not found.");
      return;
    }

    window.open(gameLaunchUrl, "_blank");
  } catch (error) {
    console.error("Error in game launch process:", error);
    alert("An error occurred while launching the game.");
  }
};

const TrendingGames: React.FC<TrendingGamesProps> = ({ title, type }) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const desktopGridRef = useRef<HTMLDivElement>(null);
  const trendingGames = GameData.filter((game) => game.game_category === "trending");

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
          className="flex gap-4 overflow-x-auto hide-scrollbar px-1"
        >
          {trendingGames.length > 0 ? (
            trendingGames.map((game) => (
              <div
                key={game.game_uid}
                className="min-w-[140px] bg-[#252547] rounded-xl border border-purple-500/10 shadow-lg relative"
              >
                <div className="relative">
                  <img
                    src={game.icon}
                    alt={game.game_name}
                    onClick={(e) => openJsGame(game.game_uid, e.currentTarget)}
                    className="w-full h-60 object-cover cursor-pointer rounded-t-xl"
                  />
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
              key={game.game_uid} 
              className="group bg-[#252547] rounded-md border border-purple-500/10 overflow-hidden transition-transform hover:scale-[1.05]"
            >
              <div className="relative aspect-[3/4]">
                <img
                  src={game.icon}
                  alt={game.game_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-1">
                  <h3 className="text-white font-medium text-xs mb-0.5 text-center line-clamp-1">{game.game_name}</h3>
                  <button 
                    onClick={(e) => openJsGame(game.game_uid, e.currentTarget as HTMLButtonElement)}
                    className="py-0.5 px-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium text-[10px] hover:opacity-90 transition-opacity"
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