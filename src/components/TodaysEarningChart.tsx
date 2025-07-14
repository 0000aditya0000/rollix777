import React, { useEffect, useState } from "react";
import { Crown, TrendingUp } from "lucide-react";

interface EarnerInfo {
  id: number;
  name: string;
  amount: string;
  avatar: string;
  position: number;
}

const dummyEarners: EarnerInfo[] = [
  {
    id: 1,
    name: "Jai***ram",
    amount: "₹10,854,811.70",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Max",
    position: 1,
  },
  {
    id: 2,
    name: "Mem***MDG",
    amount: "₹5,225,360.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Anna",
    position: 2,
  },
  {
    id: 3,
    name: "Mem***PX0",
    amount: "₹6,754,080.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Leo",
    position: 3,
  },
  {
    id: 4,
    name: "Muk***a g",
    amount: "₹4,666,480.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Zara",
    position: 4,
  },
  {
    id: 5,
    name: "Mem***MF0",
    amount: "₹4,312,668.70",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Raj",
    position: 5,
  },
  {
    id: 6,
    name: "Mem***B4A",
    amount: "₹4,078,857.15",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Eva",
    position: 6,
  },
  {
    id: 7,
    name: "Mem***FTW",
    amount: "₹3,671,707.23",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Tom",
    position: 7,
  },
  {
    id: 8,
    name: "Mem***MYV",
    amount: "₹3,507,787.65",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Ivy",
    position: 8,
  },
  {
    id: 9,
    name: "Mem***HRM",
    amount: "₹3,267,439.80",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Rocky",
    position: 9,
  },
  {
    id: 10,
    name: "Mem***NG",
    amount: "₹3,096,002.28",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Nina",
    position: 10,
  },
  {
    id: 11,
    name: "Aka***sha",
    amount: "₹2,874,910.45",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Omar",
    position: 11,
  },
  {
    id: 12,
    name: "Roh***hit",
    amount: "₹2,556,208.90",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Gina",
    position: 12,
  },
  {
    id: 13,
    name: "San***jana",
    amount: "₹2,147,604.30",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Sam",
    position: 13,
  },
  {
    id: 14,
    name: "Ady***tan",
    amount: "₹1,965,340.10",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Vik",
    position: 14,
  },
  {
    id: 15,
    name: "Ree***sha",
    amount: "₹1,852,109.85",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Ria",
    position: 15,
  },
];

const TodaysEarningChart: React.FC = () => {
  const [earners, setEarners] = useState<EarnerInfo[]>(dummyEarners);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const getPodiumStyle = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-400/50";
      case 2:
        return "bg-gradient-to-br from-gray-300 to-gray-400 border-gray-300/50";
      case 3:
        return "bg-gradient-to-br from-orange-400 to-amber-500 border-orange-400/50";
      default:
        return "bg-[#252547] border-purple-700/10";
    }
  };

  const getPositionIcon = (position: number) => {
    if (position <= 3) {
      return <Crown className="w-4 h-4 text-white" />;
    }
    return null;
  };

  return (
    <section className="py-4 px-4 sm:py-6 sm:px-6 bg-[#1A1A2E] relative rounded-xl border border-purple-500/10 max-w-screen mx-auto mt-8">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <TrendingUp className="w-5 h-5 text-green-500" />
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Today's Earning Chart
        </h2>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-1 sm:gap-4 mb-6 sm:mb-8 px-2">
        {/* Second Place */}
        <div
          className={`relative flex-1 min-w-0 max-w-[90px] sm:max-w-[140px] bg-gradient-to-br bg-[#252547] text-white p-2 sm:p-4 text-center transform transition-all duration-1000 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Crown */}
          <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2">
            <div className="text-2xl sm:text-4xl">👑</div>
          </div>

          {/* Position Badge */}
          <div className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-bold mb-2 sm:mb-3 inline-block">
            NO2
          </div>

          {/* Avatar */}
          <img
            src={earners[1].avatar}
            alt="avatar"
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 sm:border-3 border-white/30 mx-auto mb-2 sm:mb-3"
          />

          {/* Name */}
          <p className="text-white font-bold text-xs sm:text-sm mb-1 sm:mb-2 truncate">
            {earners[1].name}
          </p>

          {/* Amount */}
          <p className="text-white text-xs sm:text-sm font-bold truncate">
            {earners[1].amount}
          </p>
        </div>

        {/* First Place - Taller */}
        <div
          className={`relative flex-1 min-w-0 max-w-[110px] sm:max-w-[160px] bg-gradient-to-br from-purple-500 to-purple-700 text-white p-3 sm:p-6 text-center transform transition-all duration-1000 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } delay-300`}
        >
          {/* Crown */}
          <div className="absolute -top-6 sm:-top-10 left-1/2 transform -translate-x-1/2">
            <div className="text-4xl sm:text-6xl">👑</div>
          </div>

          {/* Position Badge */}
          <div className="bg-yellow-400 text-yellow-900 px-2 sm:px-3 py-1 rounded-full text-xs font-bold mb-2 sm:mb-3 inline-block">
            NO1
          </div>

          {/* Avatar */}
          <img
            src={earners[0].avatar}
            alt="avatar"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 sm:border-3 border-white/30 mx-auto mb-2 sm:mb-3"
          />

          {/* Name */}
          <p className="text-white font-bold text-sm sm:text-base mb-1 sm:mb-2 truncate">
            {earners[0].name}
          </p>

          {/* Amount */}
          <p className="text-white text-sm sm:text-base font-bold truncate">
            {earners[0].amount}
          </p>
        </div>

        {/* Third Place */}
        <div
          className={`relative flex-1 min-w-0 max-w-[90px] sm:max-w-[140px] bg-gradient-to-br bg-[#252547] text-white p-2 sm:p-4 text-center transform transition-all duration-1000 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } delay-150`}
        >
          {/* Crown */}
          <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2">
            <div className="text-2xl sm:text-4xl">👑</div>
          </div>

          {/* Position Badge */}
          <div className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-bold mb-2 sm:mb-3 inline-block">
            NO3
          </div>

          {/* Avatar */}
          <img
            src={earners[2].avatar}
            alt="avatar"
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 sm:border-3 border-white/30 mx-auto mb-2 sm:mb-3"
          />

          {/* Name */}
          <p className="text-white font-bold text-xs sm:text-sm mb-1 sm:mb-2 truncate">
            {earners[2].name}
          </p>

          {/* Amount */}
          <p className="text-white text-xs sm:text-sm font-bold truncate">
            {earners[2].amount}
          </p>
        </div>
      </div>

      {/* Ranking List */}
      <div className="max-h-[590px] overflow-y-auto scrollbar-hide flex flex-col gap-2 sm:gap-3 pr-1">
        {earners.slice(3).map((earner, index) => (
          <div
            key={earner.id}
            className={`flex justify-between items-center bg-[#252547] p-3 sm:p-4 rounded-xl border border-purple-700/10 transition-all duration-300 hover:bg-[#2A2A5A] hover:border-purple-500/20 transform ${
              animate ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: `${(index + 4) * 100}ms` }}
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm">
                  {earner.position}
                </span>
              </div>
              <img
                src={earner.avatar}
                alt="avatar"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-purple-500/20 flex-shrink-0"
              />
              <span className="text-white font-medium text-xs sm:text-sm truncate">
                {earner.name}
              </span>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 sm:px-3 py-1 rounded-full flex-shrink-0">
              <p className="text-xs sm:text-sm font-bold whitespace-nowrap">
                {earner.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodaysEarningChart;
