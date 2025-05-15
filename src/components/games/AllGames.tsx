import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CryptoJS from 'crypto-js';
import axios from 'axios';
// Import all game data files
import apexGames from '../../../gamesData/apex.json';
import amaticGames from '../../../gamesData/amatic.json';
import ainsworthGames from '../../../gamesData/ainsworth.json';
import apolloGames from '../../../gamesData/apollo.json';
import aristocratGames from '../../../gamesData/aristocrat.json';
import bingoGames from '../../../gamesData/bingo.json';
import boomingGames from '../../../gamesData/booming.json';
import egtGames from '../../../gamesData/egt.json';
import firekirinGames from '../../../gamesData/firekirin.json';
import fishGames from '../../../gamesData/fish.json';
import gclubGames from '../../../gamesData/gclub.json';
import habenaroGames from '../../../gamesData/habenaro.json';
import holibetGames from '../../../gamesData/holibet.json';
import igrosoftGames from '../../../gamesData/igrosoft.json';
import igtGames from '../../../gamesData/igt.json';
import jiliGames from '../../../gamesData/jili.json';
import kjotGames from '../../../gamesData/kjot.json';
import kenoGames from '../../../gamesData/keno.json';
import merkurGames from '../../../gamesData/merkur.json';
import microgamingGames from '../../../gamesData/microgaming.json';
import netentGames from '../../../gamesData/netent.json';
import novomaticGames from '../../../gamesData/novomatic.json';
import playngoGames from '../../../gamesData/playngo.json';
import pragmaticGames from '../../../gamesData/pragmatic.json';
import quickspinGames from '../../../gamesData/quickspin.json';
import rouletteGames from '../../../gamesData/roulette.json';
import rubyplayGames from '../../../gamesData/rubyplay.json';
import scientificgamesGames from '../../../gamesData/scientificgames.json';
import sportbettingGames from '../../../gamesData/sportbetting.json';
import spribeGames from '../../../gamesData/spribe.json';
import vegasGames from '../../../gamesData/vegas.json';
import wazdanGames from '../../../gamesData/wazdan.json';
import zitroGames from '../../../gamesData/zitro.json';

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

interface GameProvider {
  id: string;
  name: string;
  games: any[];
}

const AllGames: React.FC = () => {
  const gameProviders: GameProvider[] = [
    { id: 'apex', name: 'APEX', games: apexGames },
    { id: 'amatic', name: 'AMATIC', games: amaticGames },
    { id: 'ainsworth', name: 'AINSWORTH', games: ainsworthGames },
    { id: 'apollo', name: 'APOLLO', games: apolloGames },
    { id: 'aristocrat', name: 'ARISTOCRAT', games: aristocratGames },
    { id: 'bingo', name: 'BINGO', games: bingoGames },
    { id: 'booming', name: 'BOOMING', games: boomingGames },
    { id: 'egt', name: 'EGT', games: egtGames },
    { id: 'firekirin', name: 'FIREKIRIN', games: firekirinGames },
    { id: 'fish', name: 'FISH', games: fishGames },
    { id: 'gclub', name: 'GCLUB', games: gclubGames },
    { id: 'habenaro', name: 'HABENARO', games: habenaroGames },
    { id: 'holibet', name: 'HOLIBET', games: holibetGames },
    { id: 'igrosoft', name: 'IGROSOFT', games: igrosoftGames },
    { id: 'igt', name: 'IGT', games: igtGames },
    { id: 'jili', name: 'JILI', games: jiliGames },
    { id: 'kjot', name: 'KJOT', games: kjotGames },
    { id: 'keno', name: 'KENO', games: kenoGames },
    { id: 'merkur', name: 'MERKUR', games: merkurGames },
    { id: 'microgaming', name: 'MICROGAMING', games: microgamingGames },
    { id: 'netent', name: 'NETENT', games: netentGames },
    { id: 'novomatic', name: 'NOVOMATIC', games: novomaticGames },
    { id: 'playngo', name: 'PLAY\'N GO', games: playngoGames },
    { id: 'pragmatic', name: 'PRAGMATIC', games: pragmaticGames },
    { id: 'quickspin', name: 'QUICKSPIN', games: quickspinGames },
    { id: 'roulette', name: 'ROULETTE', games: rouletteGames },
    { id: 'rubyplay', name: 'RUBYPLAY', games: rubyplayGames },
    { id: 'scientificgames', name: 'SCIENTIFIC GAMES', games: scientificgamesGames },
    { id: 'sportbetting', name: 'SPORT BETTING', games: sportbettingGames },
    { id: 'spribe', name: 'SPRIBE', games: spribeGames },
    { id: 'vegas', name: 'VEGAS', games: vegasGames },
    { id: 'wazdan', name: 'WAZDAN', games: wazdanGames },
    { id: 'zitro', name: 'ZITRO', games: zitroGames },
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
                key={game.id || game.game_uid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img 
                  src={game.img || game.icon} 
                  alt={game.name || game.game_name}
                  onClick={() => openJsGame(game.id)}
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