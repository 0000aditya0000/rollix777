import React, { useState, useEffect } from "react";
import { 
  Gamepad2, 
  Star, 
  Users, 
  Trophy, 
  Layout  // For Casino
} from "lucide-react";
import ColorGame from "./ColorGame"; // Import the ColorGame component

// Import games data
import gamesData from "../gamesData/gamesData.json";

const Hero: React.FC = () => {
  // State to store featured games
  const [featuredGames, setFeaturedGames] = useState([]);

  // Load games from the JSON file
  useEffect(() => {
    // Get 6 random games from the data instead of 3
    if (gamesData && gamesData.length > 0) {
      const randomGames = [...gamesData]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6) // Increased to 6 games
        .map(game => ({
          id: game.id || Math.random().toString(),
          title: game.name || "Game",
          image: game.icon || "", // Use the icon key for the image
          provider: game.provider || "Provider"
        }));
      
      setFeaturedGames(randomGames);
    }
  }, []);

  return (
    <>
      {/* Mobile Hero */}
      <section className="md:hidden pt-20 px-4 pb-12 bg-[#1A1A2E] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-pink-600/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50" />
              <div className="relative p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/20">
                <Gamepad2 size={32} className="text-purple-400" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center mb-3">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Play & Win
            </span>
          </h1>
          <p className="text-gray-400 text-center mb-8 text-lg">
            Join millions of players worldwide
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-[#252547] p-3 rounded-xl text-center border border-purple-500/10">
              <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-semibold">50K+</p>
              <p className="text-xs text-gray-400">Players</p>
            </div>
            <div className="bg-[#252547] p-3 rounded-xl text-center border border-purple-500/10">
              <Trophy className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-white font-semibold">$100K</p>
              <p className="text-xs text-gray-400">Prize Pool</p>
            </div>
            <div className="bg-[#252547] p-3 rounded-xl text-center border border-purple-500/10">
              <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-semibold">4.9/5</p>
              <p className="text-xs text-gray-400">Rating</p>
            </div>
          </div>

          <button className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-lg hover:opacity-90 transition-opacity relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse" />
            <span className="relative">Start Playing Now</span>
          </button>
        </div>
      </section>

      {/* Enhanced Desktop Hero */}
      <section className="hidden md:block bg-[#1A1A2E] relative overflow-hidden rounded-2xl mt-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl" />

        <div className="relative py-16 px-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Text Content */}
            <div className="col-span-5 flex flex-col justify-center">
              <h1 className="text-6xl font-bold mb-6 text-left">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                World's largest and most trusted 
                </span>
              </h1>
              <h2 className="text-4xl font-bold text-white mb-8 text-left">
              Gaming Platform
              </h2>
              
              <button className="py-4 px-12 rounded-xl bg-[#0066FF] text-white font-medium text-lg hover:bg-[#0052cc] transition-colors w-48">
                Register
              </button>
            </div>

            {/* Right Column - Game Categories */}
            <div className="col-span-7">
              <div className="grid grid-cols-2 gap-6">
                {/* Casino Card - Improved */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#252547] to-[#1A1A2E] border border-purple-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-purple-500/10 rounded-xl">
                        <Layout className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-gray-400">64,414</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Casino</h3>
                    <p className="text-gray-400 text-sm mb-4">Experience the thrill of live casino games</p>
                    
                    {/* Game Images - Better Grid Layout */}
                    <div className="grid grid-cols-3 gap-3">
                      {featuredGames.length > 0 ? (
                        featuredGames.map(game => (
                          <div key={game.id} className="group/game aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#252547] to-[#1A1A2E] border border-purple-500/10 relative">
                            {/* Image with better sizing */}
                            <img 
                              src={game.image} 
                              alt={game.title}
                              className="absolute inset-0 w-full h-full object-contain p-1"
                              onError={(e) => {
                                // If image fails to load, show game title
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            
                            {/* Fallback if image fails */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 z-0">
                              <span className="text-white text-xs font-medium text-center">{game.title}</span>
                            </div>
                            
                            {/* Game Info on Hover */}
                            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover/game:opacity-100 transition-opacity z-20 p-2">
                              <p className="text-white text-xs font-medium text-center mb-1">{game.title}</p>
                              <p className="text-gray-400 text-[10px] text-center">{game.provider}</p>
                              <button className="mt-2 px-3 py-1 bg-purple-500/20 text-purple-400 text-[10px] rounded-full hover:bg-purple-500/30 transition-colors">
                                Play Now
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        // Fallback placeholders
                        Array(6).fill(0).map((_, index) => (
                          <div 
                            key={index} 
                            className={`aspect-square rounded-lg overflow-hidden bg-${['pink', 'purple', 'blue', 'indigo', 'cyan', 'green'][index % 6]}-500/20`}
                          ></div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* ColorGame Component - Remains the same */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#252547] to-[#1A1A2E] border border-purple-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-5">
                    <ColorGame />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
