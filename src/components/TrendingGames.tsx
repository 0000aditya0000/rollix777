import React from 'react';
import { Flame } from 'lucide-react';

const games = [
  {
    id: 1,
    title: "Color Match",
    players: "10.5K",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=300&fit=crop",
    prize: "$5000"
  },
  {
    id: 2,
    title: "Lucky Draw",
    players: "8.2K",
    image: "https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=400&h=300&fit=crop",
    prize: "$3000"
  }
];

const TrendingGames = () => {
  return (
    <section className="py-8 px-4 bg-[#1A1A2E]">
      <div className="flex items-center gap-3 mb-6">
        <Flame className="w-6 h-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-white">Trending Now</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {games.map((game) => (
          <div key={game.id} className="bg-[#252547] rounded-xl overflow-hidden border border-purple-500/10">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="text-white font-semibold">{game.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-green-400">{game.players} playing</span>
                <span className="text-sm text-purple-400">{game.prize}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingGames;