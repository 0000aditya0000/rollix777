import React from 'react';

interface GameCarouselProps {
  title: string;
  type: 'featured' | 'popular';
}

const featuredGames = [
  {
    id: 1,
    title: "Space Warriors",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=300&fit=crop",
    category: "Action"
  },
  {
    id: 2,
    title: "Racing Legends",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    category: "Racing"
  },
  {
    id: 3,
    title: "Mystic Quest",
    image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?w=400&h=300&fit=crop",
    category: "Adventure"
  }
];

const popularGames = [
  {
    id: 1,
    title: "Crypto Slots",
    image: "https://images.unsplash.com/photo-1596451190630-186aff535bf2?w=400&h=300&fit=crop",
    category: "Casino"
  },
  {
    id: 2,
    title: "Blackjack Pro",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=400&h=300&fit=crop",
    category: "Cards"
  },
  {
    id: 3,
    title: "Lucky Roulette",
    image: "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=400&h=300&fit=crop",
    category: "Casino"
  },
  {
    id: 4,
    title: "Poker Master",
    image: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&h=300&fit=crop",
    category: "Cards"
  }
];

const GameCarousel: React.FC<GameCarouselProps> = ({ title, type }) => {
  const games = type === 'featured' ? featuredGames : popularGames;
  
  return (
    <section className="py-8 px-4 bg-[#1A1A2E]">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x hide-scrollbar">
        {games.map((game) => (
          <div
            key={game.id}
            className="flex-none w-[280px] snap-start"
          >
            <div className="bg-[#252547] rounded-xl overflow-hidden border border-purple-500/10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-40 object-cover"
                />
                <span className="absolute bottom-2 left-2 text-sm text-white z-20 bg-purple-500/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  {game.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg">{game.title}</h3>
                <button className="mt-3 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameCarousel;