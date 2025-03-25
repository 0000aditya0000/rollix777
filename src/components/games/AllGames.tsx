import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CryptoJS from 'crypto-js';
import axios from 'axios';
// Import JSON files
import jdbGames from '../../gamesData/jdb.json';
import jiliGames from '../../gamesData/jili.json';
import pgsoftGames from '../../gamesData/pgsoft.json';
import pgsGames from '../../gamesData/pgs.json';
import kingmidasGames from '../../gamesData/kingmidas.json';
import idealGames from '../../gamesData/ideal.json';
import eazyGames from '../../gamesData/eazygaming.json';
import cq9Games from '../../gamesData/cq9.json';
import bflottoGames from '../../gamesData/bflotto.json';
import v8Games from '../../gamesData/v8.json';

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

const openJsGame = async (game_uid: string, element: HTMLImageElement) => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(`https://rollix777.com/api/user/wallet/${userId}`);
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

interface GameProvider {
  id: string;
  name: string;
  games: any[];
}

const AllGames: React.FC = () => {
  const gameProviders: GameProvider[] = [
    { id: 'jdb', name: 'JDB', games: jdbGames },
    { id: 'jili', name: 'JILI', games: jiliGames },
    { id: 'pgsoft', name: 'PGSOFT', games: pgsoftGames },
    { id: 'pgs', name: 'PGS', games: pgsGames },
    { id: 'kingmidas', name: 'KING MIDAS', games: kingmidasGames },
    { id: 'ideal', name: 'IDEAL', games: idealGames },
    { id: 'eazygaming', name: 'EAZY GAMING', games: eazyGames },
    { id: 'cq9', name: 'CQ9', games: cq9Games },
    { id: 'bflotto', name: 'BF LOTTO', games: bflottoGames },
    { id: 'v8', name: 'V8', games: v8Games },
  ];

  const [activeProvider, setActiveProvider] = useState(gameProviders[0].id);

  return (
    <div className="pt-16 pb-24 bg-[#0F0F19]">
      {/* Header */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-white">All Games</h1>
      </div>

      {/* Provider Tabs */}
      <div className="w-full overflow-x-auto hide-scrollbar">
        <div className="flex gap-2 px-4">
          {gameProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => setActiveProvider(provider.id)}
              className={`
                px-6 py-3 
                rounded-lg 
                text-sm 
                font-medium 
                whitespace-nowrap 
                transition-colors
                ${activeProvider === provider.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#252547] text-gray-400 hover:bg-[#2f2f5a]'
                }
              `}
            >
              {provider.name}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="px-4 mt-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 gap-3"
        >
          {gameProviders
            .find(p => p.id === activeProvider)
            ?.games.map((game) => (
              <motion.div
                key={game.game_uid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img 
                  src={game.icon} 
                  alt={game.name || game.game_name}
                  onClick={(e) => openJsGame(game.game_uid, e.currentTarget)}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
        </motion.div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AllGames; 