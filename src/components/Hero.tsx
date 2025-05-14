import React, { useState, useEffect } from "react";
import { 
  Gamepad2, 
  Star, 
  Users, 
  Trophy, 
  Layout,
  ArrowRight,
  Play,
  Flame,
  Sparkles,
  Zap,
  Crown,
  Timer,
  Heart,
  ChevronRight,
  Dice1,
  Gem,
  TrendingUp
} from "lucide-react";
import ColorGame from "./ColorGame";
import axios from "axios";

// Import games data
import apexgames from "../gamesData/apex.json";

// Define types for our game data
interface GameData {
  id: string;
  name: string;
  img: string;
  title: string;
  categories: string;
}

interface FeaturedGame {
  id: string;
  title: string;
  image: string;
  provider: string;
  category: string;
}

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
      window.open(response.data.gameUrl, "_blank");
    } else {
      alert("Failed to launch game.");
    }
  } catch (error) {
    console.error("Error launching game:", error);
    alert("An error occurred while launching the game.");
  }
};

const Hero: React.FC = () => {
  const [featuredGames, setFeaturedGames] = useState<FeaturedGame[]>([]);
  const [activeTab, setActiveTab] = useState<string>("featured");
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  // Load games from the JSON file
  useEffect(() => {
    if (apexgames && apexgames.length > 0) {
      const randomGames = [...apexgames]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6)
        .map(game => ({
          id: game.id,
          title: game.name,
          image: game.img,
          provider: game.title,
          category: game.categories
        }));
      
      setFeaturedGames(randomGames);
    }
  }, []);

  const tabs = [
    { id: "featured", name: "Featured", icon: Crown, color: "from-violet-600 to-indigo-600" },
    { id: "trending", name: "Trending", icon: Flame, color: "from-rose-600 to-pink-600" },
    { id: "hot", name: "Hot Games", icon: Zap, color: "from-amber-500 to-orange-600" },
  ];

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

      {/* Premium Modern Desktop Hero */}
      <section className="hidden md:block bg-[#080810] relative overflow-hidden rounded-[2rem] mt-8">
        {/* Enhanced animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-violet-600/5 to-fuchsia-600/5" />
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-fuchsia-500/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          
          {/* Animated glow effects */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-glow-slow"
                style={{
                  width: `${300 + i * 100}px`,
                  height: `${300 + i * 100}px`,
                  background: `radial-gradient(circle, ${
                    i === 0 ? 'rgba(129, 140, 248, 0.1)' :
                    i === 1 ? 'rgba(167, 139, 250, 0.1)' :
                    'rgba(217, 70, 239, 0.1)'
                  } 0%, transparent 70%)`,
                  left: '50%',
                  top: '30%',
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative py-20 px-16">
          {/* Featured Wingo Game Section */}
          <div className="mb-24">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                    <Crown className="w-4 h-4 text-indigo-400" />
                    <span className="text-indigo-400 text-sm font-medium">Featured Game</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">Live</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-fuchsia-500/10 rounded-full border border-fuchsia-500/20">
                    <TrendingUp className="w-4 h-4 text-fuchsia-400" />
                    <span className="text-fuchsia-400 text-sm font-medium">Trending Now</span>
                  </div>
                </div>
                <h2 className="text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Wingo Game
                  </span>
                </h2>
                <p className="text-gray-400 text-xl max-w-2xl">
                  Experience the next evolution of gaming with our signature multiplayer game
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="group relative px-6 py-3 bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
                  <span className="text-gray-300 font-medium">How to Play</span>
                </button>
                <button className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center space-x-2">
                    <Play className="w-5 h-5 text-white" />
                    <span className="text-white font-medium" onClick={() => openJsGame(featuredGames[0].id)}>Play Now</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Main Game Content */}
            <div className="grid grid-cols-12 gap-8">
              {/* Game Preview */}
              <div className="col-span-8">
                <div className="group relative aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-fuchsia-500/10 backdrop-blur-xl border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Game Component */}
                  <div className="relative h-full">
                    <ColorGame />
                  </div>

                  {/* Game Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="flex items-center justify-between">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-8">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-indigo-500/20 rounded-lg">
                              <Users className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">2.5k Playing</p>
                              <p className="text-gray-400 text-sm">Active Players</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-violet-500/20 rounded-lg">
                              <Timer className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">Next Round</p>
                              <p className="text-gray-400 text-sm">Starting in 1:30</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-fuchsia-500/20 rounded-lg">
                              <Trophy className="w-5 h-5 text-fuchsia-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">$10,000</p>
                              <p className="text-gray-400 text-sm">Prize Pool</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center space-x-2">
                            <Play className="w-4 h-4" />
                            <span>Quick Play</span>
                          </button>
                          <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors flex items-center space-x-2">
                            <Dice1 className="w-4 h-4 text-violet-400" />
                            <span>Practice Mode</span>
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400" fill="#FBBF24" />
                          ))}
                        </div>
                        <p className="text-white font-medium">15k+ Reviews</p>
                        <p className="text-gray-400 text-sm">4.9 Average Rating</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="col-span-4 grid grid-rows-3 gap-6">
                <div className="group relative bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-hidden hover:border-indigo-500/20 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start space-x-4">
                    <div className="p-3 bg-indigo-500/20 rounded-xl">
                      <Gem className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white mb-1">$250,000</p>
                      <p className="text-gray-400">Total Prize Pool</p>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-hidden hover:border-violet-500/20 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start space-x-4">
                    <div className="p-3 bg-violet-500/20 rounded-xl">
                      <Users className="w-8 h-8 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white mb-1">50,000+</p>
                      <p className="text-gray-400">Active Players</p>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-fuchsia-500/10 via-pink-500/10 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-hidden hover:border-fuchsia-500/20 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start space-x-4">
                    <div className="p-3 bg-fuchsia-500/20 rounded-xl">
                      <TrendingUp className="w-8 h-8 text-fuchsia-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white mb-1">98.5%</p>
                      <p className="text-gray-400">Win Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Games Section */}
          <div>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white">  r Games</h3>
                <p className="text-gray-400">Discover our most played games</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white flex items-center space-x-2">
                  <span>View All Games</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-8 gap-2">
              {featuredGames.map(game => (
                <div
                  key={game.id}
                  className="group relative aspect-square rounded-md overflow-hidden bg-[#252547] border border-purple-500/10"
                  onMouseEnter={() => setHoveredGame(game.id)}
                  onMouseLeave={() => setHoveredGame(null)}
                >
                  {/* Game Image */}
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Game Info Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1`}>
                    <h3 className="text-white font-medium text-xs text-center line-clamp-1 mb-3">{game.title}</h3>
                    <button 
                      onClick={() => openJsGame(game.id)}
                      className="py-1.5 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium text-base hover:opacity-90 transition-opacity"
                    >
                      Play
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;


