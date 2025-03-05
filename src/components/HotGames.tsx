import { Zap } from 'lucide-react';
import GameData from "../gamesData/gamesData.json";
import AuthModal from './AuthModal';
import { useState } from 'react';

// const games = [
//   {
//     id: 1,
//     title: "Dragon Quest",
//     image: "https://images.unsplash.com/photo-1642479755415-2c4f6c6a8c8f?w=400&h=300&fit=crop",
//     winRate: "96%"
//   },
//   {
//     id: 2,
//     title: "Fortune Wheel",
//     image: "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=400&h=300&fit=crop",
//     winRate: "94%"
//   },
//   {
//     id: 3,
//     title: "Lucky Slots",
//     image: "https://images.unsplash.com/photo-1595731557209-7d27a5e0de05?w=400&h=300&fit=crop",
//     winRate: "92%"
//   }
// ];

const HotGames = ({ isLoggedIn }) => {
   const [isAuthModalOpen, setAuthModalOpen] = useState(false);
console.log(isLoggedIn)
  const handlePlayNow = () => {
    
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      setAuthModalOpen(true); // Open login modal if not logged in
    } else {
      console.log("Redirecting to game..."); 
      // Implement redirection to the game page here
    }
  };
  const hot = GameData.filter(
    (game) => game.game_category === "hot"
  );
  return (
    <section className="py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-white">Hot Games</h2>
      </div>
      <div className="flex overflow-x-auto gap-4 -mx-4 px-4 pb-4 hide-scrollbar snap-x">
        {hot.map((game) => (
          <div
            key={game.game_uid}
            className="flex-none w-[200px] snap-start"
          >
            <div className="bg-[#252547] rounded-xl overflow-hidden border border-purple-500/10">
              <div className="relative">
                <img
                  src={game.icon}
                  alt={game.game_category}
                  className="w-full h-28 object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {game.game_name}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-white font-semibold">{game.game_name}</h3>
                                <button
                  onClick={handlePlayNow}
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

export default HotGames;