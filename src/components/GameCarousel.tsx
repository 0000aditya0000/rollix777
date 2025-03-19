import React, { useState } from "react";
import JDBGames from "../gamesData/gamesData.json";
import axios from "axios";
import CryptoJS from "crypto-js";
import AuthModal from "./AuthModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
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
const openJsGame = async (game_uid: string, element: HTMLButtonElement) => { 
  const userId = localStorage.getItem("userId");
  const response = await axios.get(`https://rollix777.com/api/user/wallet/${userId}`);
  const balance = response.data[10].balance;
  console.log(balance);
 
  console.log(`Game UID: ${game_uid}`);
  console.log(`Button element:`, element);

  const memberAccount = `h43929rollix777${userId}`;
  const transferId = `${memberAccount}_${generateRandom10Digits()}`;
  const timestamp = Date.now();

  try {
    // Step 1: Initialize the payload with a balance of 0
    const initPayload = {
      agency_uid: "fd37fafd6af3eb5af8dee92101100347",
      member_account: memberAccount,
      timestamp,
      credit_amount: "0", // Set balance to 0
      currency_code: "BRL",
      language: "en",
      platform: "2",
      home_url: "https://rollix777.com",
      transfer_id: transferId,
    };

    const initEncryptedPayload = encryptAES256(
      JSON.stringify(initPayload),
      aesKey
    );

    const initRequestPayload = {
      agency_uid: "fd37fafd6af3eb5af8dee92101100347",
      timestamp,
      payload: initEncryptedPayload,
    };

    // Send the initial request to the server
    const initResponse = await axios.post(serverUrl, initRequestPayload);

    if (initResponse.data.code !== 0) {
      console.error("Initialization Error:", initResponse.data.msg);
      alert("Failed to initialize game: " + initResponse.data.msg);
      return;
    }

    console.log("Initialization successful:", initResponse.data);

    // Get the amount to deduct from the user balance
    const afterAmount = initResponse.data.payload.after_amount; // Amount to deduct
    console.log(afterAmount);

    // Step 2: Deduct the user's balance
    const deductPayload = {
      agency_uid: "fd37fafd6af3eb5af8dee92101100347",
      member_account: memberAccount,
      timestamp: Date.now(),
      credit_amount: `-${afterAmount}`, // Deduct the current balance
      currency_code: "BRL",
      language: "en",
      platform: "2",
      home_url: "https://thalaclub.com",
      transfer_id: `${memberAccount}_${generateRandom10Digits()}`,
    };

    const deductEncryptedPayload = encryptAES256(
      JSON.stringify(deductPayload),
      aesKey
    );

    const deductRequestPayload = {
      agency_uid: "fd37fafd6af3eb5af8dee92101100347",
      timestamp: Date.now(),
      payload: deductEncryptedPayload,
    };

    const deductResponse = await axios.post(serverUrl, deductRequestPayload);

    if (deductResponse.data.code !== 0) {
      console.error("Deduct Error:", deductResponse.data.msg);
      alert("Failed to deduct balance: " + deductResponse.data.msg);
      return;
    }

    console.log("Deduct successful:", deductResponse.data);

    // Step 3: Launch the game
    const gamePayload = {
      agency_uid: "fd37fafd6af3eb5af8dee92101100347",
      member_account: memberAccount,
      game_uid: game_uid,
      timestamp: Date.now(),
      credit_amount: "5000",
      currency_code: "BRL",
      language: "en",
      platform: "2",
      home_url: "https://thalaclub.com",
      transfer_id: `${memberAccount}_${generateRandom10Digits()}`,
    };

    const gameEncryptedPayload = encryptAES256(
      JSON.stringify(gamePayload),
      aesKey
    );

    const gameRequestPayload = {
      agency_uid: "fd37fafd6af3eb5af8dee92101100347",
      timestamp: Date.now(),
      payload: gameEncryptedPayload,
    };

    const gameResponse = await axios.post(serverUrl, gameRequestPayload);

    if (gameResponse.data.code !== 0) {
      console.error("Game Launch Error:", gameResponse.data.msg);
      alert("Failed to launch game: " + gameResponse.data.msg);
      return;
    }

    // Fetch the game launch URL
    const gameLaunchUrl = gameResponse.data.payload?.game_launch_url;

    if (!gameLaunchUrl) {
      console.error("Game Launch URL not found.");
      alert("Game launch URL not found.");
      return;
    }

    console.log("Game Launch URL:", gameLaunchUrl);

    // Open the game launch URL in a new tab
    window.open(gameLaunchUrl, "_blank");
  } catch (error) {
    console.error("Error in game launch process:", error);
    alert("An error occurred while launching the game.");
  }
};

const featuredGames = JDBGames;

const popularGames = JDBGames;

const GameCarousel: React.FC<GameCarouselProps> = ({ title, type }) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const userToken = useSelector((state: RootState) => state.auth.token);

  const handlePlayNow = () => {
    if (!userToken) {
      setAuthModalOpen(true); // Open login modal if not logged in
    } else {
      console.log("Redirecting to game...");
      // Implement redirection to the game page here
    }
  };
  const games = JDBGames.filter((game) => game.game_category === "popular");

  return (
    <section className="py-8 px-4 bg-[#1A1A2E]">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x hide-scrollbar">
        {games.map((game) => (
          <div key={game.game_uid} className="flex-none w-[280px] snap-start">
            <div className="bg-[#252547] rounded-xl overflow-hidden border border-purple-500/10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <img
                  src={game.icon}
                  alt={game.game_name}
                  className="w-full h-40 object-cover"
                />
                <span className="absolute bottom-2 left-2 text-sm text-white z-20 bg-purple-500/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  {game.game_type}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg">
                  {game.game_name}
                </h3>
                <button
                  onClick={(e) => openJsGame(game.game_uid, e.currentTarget)}
                  className="mt-2 w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
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

export default GameCarousel;