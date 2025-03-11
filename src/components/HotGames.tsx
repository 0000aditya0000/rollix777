import React, { useState } from "react";
import { Zap } from "lucide-react";
import CryptoJS from "crypto-js";
import GameData from "../gamesData/gamesData.json";
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

const openJsGame = async (game_uid: string, element: HTMLButtonElement) => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(`https://rollix777.com/api/user/wallet/${userId}`);
  const balance = response.data[10].balance;
 console.log(balance)
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
      home_url: "https://rollix777.com",
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

    const afterAmount = balance;
    const deductPayload = { ...initPayload, credit_amount: `-${afterAmount}` };
    const deductEncryptedPayload = encryptAES256(JSON.stringify(deductPayload), aesKey);
    const deductRequestPayload = { ...initRequestPayload, payload: deductEncryptedPayload };
    const deductResponse = await axios.post(serverUrl, deductRequestPayload);

    if (deductResponse.data.code !== 0) {
      console.error("Deduct Error:", deductResponse.data.msg);
      alert("Failed to deduct balance: " + deductResponse.data.msg);
      return;
    }

    const gamePayload = { ...initPayload, game_uid, credit_amount: afterAmount.toString() };
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

const HotGames: React.FC<HotGamesProps> = ({ title, type }) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const hotGames = GameData.filter((game) => game.game_category === "hot");

  return (
    <section className="py-8 px-4 bg-[#1A1A2E]">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-white">Hot Games</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar px-1">
        {hotGames.length > 0 ? (
          hotGames.map((game) => (
            <div key={game.game_uid} className="min-w-[250px] bg-[#252547] rounded-xl border border-purple-500/10 shadow-lg">
              <img src={game.icon} alt={game.game_name} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm md:text-base">{game.game_name}</h3>
                <button
                  onClick={(e) => openJsGame(game.game_uid, e.currentTarget)}
                  className="mt-2 w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Play Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No hot games available.</p>
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} initialMode="login" onLoginSuccess={() => setAuthModalOpen(false)} />
    </section>
  );
};

export default HotGames;