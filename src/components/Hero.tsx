import React, { useState, useEffect } from "react";
import { 
  Star, 
  Users, 
  Trophy,
  Play,
  Crown,
  Heart,
  ChevronRight,
  Search,
  Menu,
  Bell,
  Gamepad2,
  ArrowRight
} from "lucide-react";
import WingoGame from "./WingoGame";

// Import games data
import gamesData from "../gamesData/apex.json";

interface GameData {
  game_name: string;
  game_uid: string;
  game_type: string;
  icon: string;
  game_category: string;
}

interface FeaturedGame {
  id: string;
  title: string;
  image: string;
  provider: string;
  category: string;
  players?: number;
  rating?: number;
}

const Hero: React.FC = () => {
  const [featuredGames, setFeaturedGames] = useState<FeaturedGame[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (gamesData && gamesData.length > 0) {
      const randomGames = [...(gamesData as GameData[])]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6)
        .map(game => ({
          id: game.game_uid,
          title: game.game_name,
          image: game.icon,
          provider: game.game_type,
          category: game.game_category,
          players: Math.floor(Math.random() * 5000) + 500,
          rating: Number((Math.random() * (5 - 4) + 4).toFixed(1))
        }));
      
      setFeaturedGames(randomGames);
    }
  }, []);

  const categories = [
    { id: 'all', name: 'All Games' },
    { id: 'slots', name: 'Slots' },
    { id: 'live', name: 'Live Casino' },
    { id: 'table', name: 'Table Games' },
    { id: 'sports', name: 'Sports' }
  ];

  return (
    <>
      {/* Mobile Hero - Old Design */}
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

      {/* Desktop Hero - New Design */}
      <div className="hidden md:block min-h-screen bg-[#0F0F1E]">
        {/* Navigation Bar */}
        <nav className="bg-[#1A1A2E]/80 backdrop-blur-lg border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold text-white">Rollix777</h1>
                <div className="hidden md:flex items-center space-x-6">
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`text-sm font-medium transition-colors ${
                        activeCategory === cat.id 
                          ? 'text-purple-400' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search games..."
                    className="w-64 py-2 pl-10 pr-4 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-white">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="md:hidden">
                  <Menu className="w-6 h-6 text-white" />
                </button>
                <div className="hidden md:flex items-center space-x-4">
                  <button className="px-4 py-2 text-sm font-medium text-white hover:text-purple-400 transition-colors">
                    Sign In
                  </button>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-sm font-medium text-white rounded-lg transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-purple-400 font-medium">
                  <Crown className="w-5 h-5" />
                  <span>Welcome to Rollix777</span>
                </div>
                <h1 className="text-5xl font-bold text-white leading-tight">
                  Experience the Next Level of{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Online Gaming
                  </span>
                </h1>
                <p className="text-lg text-gray-400 max-w-lg">
                  Join millions of players worldwide in the most thrilling gaming experience. Play, win, and become a legend.
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Playing</span>
                </button>
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">
                  Explore Games
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="p-6 bg-[#1A1A2E] rounded-xl border border-white/10">
                  <Trophy className="w-8 h-8 text-yellow-400 mb-3" />
                  <div className="text-2xl font-bold text-white">$1M+</div>
                  <div className="text-sm text-gray-400">Total Winnings</div>
                </div>
                <div className="p-6 bg-[#1A1A2E] rounded-xl border border-white/10">
                  <Users className="w-8 h-8 text-purple-400 mb-3" />
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-sm text-gray-400">Active Players</div>
                </div>
                <div className="p-6 bg-[#1A1A2E] rounded-xl border border-white/10">
                  <Star className="w-8 h-8 text-pink-400 mb-3" />
                  <div className="text-2xl font-bold text-white">4.9/5</div>
                  <div className="text-sm text-gray-400">User Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30"></div>
              <WingoGame />
            </div>
          </div>

          {/* Popular Games Section */}
           <div>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white">  Popular Games</h3>
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
      </div>
    </>
  );
};

export default Hero;