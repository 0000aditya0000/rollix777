import React, { useState } from "react";
import {
  Dice6,
  Zap,
  Crown,
  Gamepad2,
  Dices,
  Trophy,
  Target,
  Fish,
  ChevronLeft,
  ChevronRight,
  Home,
  Calendar,
  DollarSign,
  Megaphone,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedGameCategory, setSelectedGameCategory] = useState("Lobby");
  const [currentGamePage, setCurrentGamePage] = useState(0);
  const [currentPopularGamePage, setCurrentPopularGamePage] = useState(0);
  const [currentEarningsIndex, setCurrentEarningsIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const navigate = useNavigate();

  const bannerImages = [
    "https://ossimg.tashanedc.com/Tashanwin/banner/Banner_20250411180354lgrb.png",
    "https://ossimg.tashanedc.com/Tashanwin/banner/Banner_20250411141718yy5d.png",
    "https://ossimg.tashanedc.com/Tashanwin/banner/Banner_20250411141814rpqk.png",
    "https://ossimg.tashanedc.com/Tashanwin/banner/Banner_20250413134727kiqw.png",
  ];

  // Today's Earnings Data
  const topEarners = [
    {
      rank: 2,
      username: "Mem***04G",
      amount: "₹2,308,094,920.04",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      bgColor: "from-gray-600 to-gray-800",
      crownColor: "text-gray-400",
    },
    {
      rank: 1,
      username: "Mem***CYC",
      amount: "₹24,442,305,659.52",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
      bgColor: "from-yellow-500 to-yellow-700",
      crownColor: "text-yellow-400",
    },
    {
      rank: 3,
      username: "Mem***WTK",
      amount: "₹254,839,200.00",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
      bgColor: "from-orange-600 to-red-600",
      crownColor: "text-orange-400",
    },
  ];

  const earningsList = [
    {
      rank: 4,
      username: "Mem***PQ8",
      amount: "₹199,198,594.56",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      rank: 5,
      username: "Mem***FTM",
      amount: "₹195,431,600.00",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      rank: 6,
      username: "Mem***IND",
      amount: "₹191,168,827.36",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      rank: 7,
      username: "Mem***F7Q",
      amount: "₹172,038,216.00",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      rank: 8,
      username: "Mem***QZM",
      amount: "₹70,917,700.00",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      rank: 9,
      username: "Mem***YSP",
      amount: "₹56,962,258.92",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      rank: 10,
      username: "N.S***AR",
      amount: "₹30,650,078.20",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      rank: 11,
      username: "Mem***XYZ",
      amount: "₹25,430,120.50",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      rank: 12,
      username: "Mem***ABC",
      amount: "₹18,920,450.75",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      rank: 13,
      username: "Mem***DEF",
      amount: "₹12,560,890.25",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
  ];

  // Auto-slide effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  // Auto-scroll earnings list
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEarningsIndex((prev) => (prev + 1) % earningsList.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [earningsList.length]);

  // Touch handlers for manual sliding
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }
    if (isRightSwipe) {
      setCurrentSlide(
        (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
      );
    }
  };

  const winningPlayers = [
    {
      id: 1,
      avatar: "5D",
      username: "Mem***OEY",
      amount: "₹1,176.00",
      bgColor: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      avatar: "5D",
      username: "Mem***OFM",
      amount: "₹1,500.00",
      bgColor: "from-blue-500 to-purple-500",
    },
    {
      id: 3,
      avatar: "Win Go",
      username: "Mem***MEK",
      amount: "₹489.20",
      bgColor: "from-red-500 to-orange-500",
    },
    {
      id: 4,
      avatar: "K3",
      username: "Mem***XYZ",
      amount: "₹2,340.50",
      bgColor: "from-green-500 to-blue-500",
    },
    {
      id: 5,
      avatar: "Trx",
      username: "Mem***ABC",
      amount: "₹890.75",
      bgColor: "from-orange-500 to-red-500",
    },
    {
      id: 6,
      avatar: "Aviator",
      username: "Mem***DEF",
      amount: "₹3,250.00",
      bgColor: "from-cyan-500 to-blue-500",
    },
    {
      id: 7,
      avatar: "Mines",
      username: "Mem***GHI",
      amount: "₹1,680.25",
      bgColor: "from-pink-500 to-purple-500",
    },
    {
      id: 8,
      avatar: "Crash",
      username: "Mem***JKL",
      amount: "₹4,120.80",
      bgColor: "from-yellow-500 to-orange-500",
    },
  ];

  const gameCategories = [
    { name: "Lobby", icon: Crown, isSelected: true },
    { name: "Popular", icon: Trophy, isSelected: false },
    { name: "Mini Game", icon: Gamepad2, isSelected: false },
    { name: "Lottery", icon: Target, isSelected: false },
    { name: "Slots", icon: Dices, isSelected: false },
    { name: "Fishing", icon: Fish, isSelected: false },
  ];

  const gameCards = [
    [
      {
        id: 1,
        name: "Win Go",
        image:
          "https://ossimg.tashanedc.com/Tashanwin/gamelogo/ARLottery/WinGo_30S_20250902120607530.png",
        bgColor: "from-green-600 to-green-800",
        textColor: "text-white",
      },
      {
        id: 2,
        name: "TB Chess",
        image:
          "https://ossimg.tashanedc.com/Tashanwin/gamelogo/TB_Chess/800.png",
        bgColor: "from-red-600 to-red-800",
        textColor: "text-white",
      },
      {
        id: 3,
        name: "TB Chess 121",
        image:
          "https://ossimg.tashanedc.com/Tashanwin/gamelogo/TB_Chess/121.png",
        bgColor: "from-orange-600 to-red-600",
        textColor: "text-white",
      },
      {
        id: 4,
        name: "JILI 109",
        image: "https://ossimg.tashanedc.com/Tashanwin/gamelogo/JILI/109.png",
        bgColor: "from-purple-600 to-purple-800",
        textColor: "text-white",
      },
      {
        id: 5,
        name: "JILI 302",
        image: "https://ossimg.tashanedc.com/Tashanwin/gamelogo/JILI/302.png",
        bgColor: "from-green-700 to-green-900",
        textColor: "text-white",
      },
      {
        id: 6,
        name: "JILI 224",
        image: "https://ossimg.tashanedc.com/Tashanwin/gamelogo/JILI/224.png",
        bgColor: "from-blue-600 to-blue-800",
        textColor: "text-white",
      },
    ],
    [
      {
        id: 7,
        name: "LUCKY WHEEL",
        image:
          "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400",
        bgColor: "from-yellow-600 to-orange-600",
        textColor: "text-white",
      },
      {
        id: 8,
        name: "DRAGON TIGER",
        image:
          "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
        bgColor: "from-red-700 to-red-900",
        textColor: "text-white",
      },
      {
        id: 9,
        name: "BACCARAT",
        image:
          "https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400",
        bgColor: "from-indigo-600 to-indigo-800",
        textColor: "text-white",
      },
      {
        id: 10,
        name: "BLACKJACK",
        image:
          "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=400",
        bgColor: "from-gray-700 to-gray-900",
        textColor: "text-white",
      },
      {
        id: 11,
        name: "POKER",
        image:
          "https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400",
        bgColor: "from-green-600 to-green-800",
        textColor: "text-white",
      },
      {
        id: 12,
        name: "ROULETTE",
        image:
          "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400",
        bgColor: "from-red-600 to-black",
        textColor: "text-white",
      },
    ],
  ];

  const nextGamePage = () => {
    setCurrentGamePage((prev) => (prev + 1) % gameCards.length);
  };

  const prevGamePage = () => {
    setCurrentGamePage(
      (prev) => (prev - 1 + gameCards.length) % gameCards.length
    );
  };

  const nextPopularGamePage = () => {
    setCurrentPopularGamePage((prev) => (prev + 1) % gameCards.length);
  };

  const prevPopularGamePage = () => {
    setCurrentPopularGamePage(
      (prev) => (prev - 1 + gameCards.length) % gameCards.length
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-[#220904]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[#db6903] to-[#f1a903] rounded flex items-center justify-center">
            <Dice6 className="w-5 h-5 text-black" />
          </div>
          <span className="text-white font-bold text-xl">ROLLIX777</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-full text-sm font-medium text-black transition-colors"
            style={{
              background:
                "linear-gradient(120deg, #db6903 0%, #e1910a 40%, #f1a903 70%, #bc9713 100%)",
              boxShadow:
                "0 0 20px rgba(241,169,3,0.4), 0 0 40px rgba(193,145,10,0.2)",
            }}
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded-full text-sm font-medium text-black transition-colors"
            style={{
              background:
                "linear-gradient(120deg, #db6903 0%, #e1910a 40%, #f1a903 70%, #bc9713 100%)",
              boxShadow:
                "0 0 20px rgba(241,169,3,0.4), 0 0 40px rgba(193,145,10,0.2)",
            }}
          >
            Register
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden shadow-2xl border border-[#3d1601] bg-[#160406]">
        {/* Image Slider Container */}
        <div
          className="relative w-full h-40 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images */}
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {bannerImages.map((image, index) => (
              <div key={index} className="w-full h-full flex-shrink-0">
                <img
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide
                  ? "bg-[#f1a903] shadow-[0_0_10px_rgba(193,145,10,0.6)]"
                  : "bg-[#3d1601]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mx-4 mt-4 bg-[#1f0e0e] rounded-2xl p-4 flex items-center justify-between border border-[#f1a903]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#f1a903] rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <div>
            <p className="text-white text-sm">Welcome to ROLLIX777</p>
          </div>
        </div>
        <button
          className="px-4 py-2 rounded-full text-sm font-medium text-black transition-colors"
          style={{
            background:
              "linear-gradient(120deg, #db6903 0%, #e1910a 40%, #f1a903 70%, #bc9713 100%)",
            boxShadow:
              "0 0 20px rgba(241,169,3,0.4), 0 0 40px rgba(193,145,10,0.2)",
          }}
        >
          Detail
        </button>
      </div>

      {/* Winning Information Section */}
      <div className="mx-4 mt-4">
        <h3 className="text-[#f1a903] font-bold text-lg flex items-center mb-4">
          <Trophy className="w-5 h-5 mr-2 text-[#f1a903]" />
          Winning information
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {winningPlayers.slice(0, 3).map((player) => (
            <div
              key={player.id}
              className="bg-[#2b1b0f] rounded-xl p-4 border border-[#3d1601] h-40"
            >
              <div className="flex flex-col items-center space-y-3 h-full justify-between">
                {/* Avatar */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${player.bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-[#f1a903]`}
                >
                  {player.avatar}
                </div>

                {/* Stars decoration */}
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-[#e1910a] rounded-full"
                    ></div>
                  ))}
                </div>

                {/* Username */}
                <p className="text-white text-sm font-medium text-center">
                  {player.username}
                </p>

                {/* Amount */}
                <p className="text-[#f1a903] text-base font-bold">
                  {player.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Categories Section */}
      <div
        className="mx-4 mt-6 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex items-start space-x-4 px-2 py-4 min-w-max">
          {gameCategories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = category.name === selectedGameCategory;

            return (
              <button
                key={category.name}
                onClick={() => setSelectedGameCategory(category.name)}
                className={`flex flex-col items-center space-y-2 transition-all duration-300 flex-shrink-0 min-w-[60px] ${
                  isSelected ? "filter drop-shadow-lg" : ""
                }`}
                style={
                  isSelected
                    ? {
                        filter:
                          "drop-shadow(0 0 10px rgb(241 169 3 / 0.4)) drop-shadow(0 0 20px rgb(209 105 3 / 0.3))",
                      }
                    : {}
                }
              >
                <IconComponent
                  className={`w-6 h-6 ${
                    isSelected ? "text-[#f1a903]" : "text-[#543b1a]"
                  } transition-colors duration-300`}
                />
                <span
                  className={`text-xs font-medium text-center leading-tight ${
                    isSelected ? "text-[#f1a903]" : "text-[#543b1a]"
                  } transition-colors duration-300`}
                >
                  {category.name}
                </span>
                {isSelected && (
                  <div className="w-6 h-0.5 bg-[#f1a903] rounded-full transition-all duration-300"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended Games Section */}
      <div
        className="mt-4 rounded-2xl p-4 border border-[#3d1601]"
        style={{
          background:
            "linear-gradient(45deg, #160406 0%, #220904 40%, rgba(241, 169, 3, 0.12) 100%)",
        }}
      >
        {/* Recommended Games */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-[#f1a903]" />
            <h3 className="text-white font-bold text-lg">Recommended Games</h3>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-[#f1a903] text-sm font-medium hover:text-[#db6903] transition-colors">
              Detail
            </button>
            <div className="flex space-x-2">
              <button
                onClick={prevGamePage}
                className="w-8 h-8 bg-[#2b1b0f] border border-[#4f350e] rounded-full flex items-center justify-center hover:bg-[#3d1601] transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={nextGamePage}
                className="w-8 h-8 bg-[#2b1b0f] border border-[#4f350e] rounded-full flex items-center justify-center hover:bg-[#3d1601] transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-3 gap-3">
          {gameCards[currentGamePage].map((game) => (
            <div
              key={game.id}
              className={`relative bg-gradient-to-br ${game.bgColor} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer aspect-[3/4]`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{ backgroundImage: `url(${game.image})` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-[#f1a903]/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Popular Games Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-[#f1a903]" />
              <h3 className="text-white font-bold text-lg">Popular Games</h3>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-[#f1a903] text-sm font-medium hover:text-[#db6903] transition-colors">
                Detail
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={prevPopularGamePage}
                  className="w-8 h-8 bg-[#2b1b0f] border border-[#4f350e] rounded-full flex items-center justify-center hover:bg-[#3d1601] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={nextPopularGamePage}
                  className="w-8 h-8 bg-[#2b1b0f] border border-[#4f350e] rounded-full flex items-center justify-center hover:bg-[#3d1601] transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Popular Game Cards Grid */}
          <div className="grid grid-cols-3 gap-3">
            {gameCards[currentPopularGamePage].map((game) => (
              <div
                key={`popular-${game.id}`}
                className={`relative bg-gradient-to-br ${game.bgColor} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer aspect-[3/4]`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-90"
                  style={{ backgroundImage: `url(${game.image})` }}
                ></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-[#f1a903]/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Earnings Chart Section */}
      <div className="mx-4 mt-4">
        <div className="flex items-center space-x-2 mb-6">
          <Trophy className="w-6 h-6 text-[#f1a903]" />
          <h3 className="text-white font-bold text-lg">
            Today's earnings chart
          </h3>
        </div>

        {/* Top 3 Earners Cards */}
        <div className="flex justify-center items-end space-x-3 mb-6">
          {/* 2nd Place */}
          <div className="relative">
            <div
              className="w-24 h-32 relative z-0 bg-gradient-to-b from-[#bc9713] to-[#543b1a]"
              style={{
                clipPath:
                  "polygon(15% 0%, 85% 0%, 100% 20%, 100% 80%, 85% 100%, 15% 100%, 0% 80%, 0% 20%)",
              }}
            >
              {/* Crown */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div
                  className="w-8 h-6 bg-gradient-to-b from-[#f1a903] to-[#cf8904] relative"
                  style={{
                    clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#f1a903] rounded-full"></div>
                </div>
              </div>

              {/* Avatar */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden border-2 border-[#f1a903]">
                <img
                  src={topEarners[0].avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Username */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
                <p className="text-white text-xs font-medium">
                  {topEarners[0].username}
                </p>
                <p className="text-[#e1910a] text-[10px] font-bold px-1">
                  {topEarners[0].amount}
                </p>
              </div>
            </div>

            {/* Rank Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-[#4f350e] to-[#2b1b0f] rounded-full flex items-center justify-center border-2 border-[#f1a903]">
              <span className="text-white font-bold text-sm">
                {topEarners[0].rank}
              </span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="relative">
            <div
              className="w-28 h-36 relative z-0 bg-gradient-to-b from-[#f1a903] to-[#db6903]"
              style={{
                clipPath:
                  "polygon(15% 0%, 85% 0%, 100% 20%, 100% 80%, 85% 100%, 15% 100%, 0% 80%, 0% 20%)",
              }}
            >
              {/* Crown */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div
                  className="w-10 h-8 bg-gradient-to-b from-[#f1a903] to-[#bc9713] relative"
                  style={{
                    clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#f1a903] rounded-full"></div>
                </div>
              </div>

              {/* VIP Badge */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#d31c02] text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                VIP***ER
              </div>

              {/* Avatar */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full overflow-hidden border-3 border-[#f1a903]">
                <img
                  src={topEarners[1].avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Username */}
              <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center">
                <p className="text-white text-xs font-medium">
                  {topEarners[1].username}
                </p>
                <p className="text-[#f1a903] text-[10px] font-bold px-1">
                  {topEarners[1].amount}
                </p>
              </div>
            </div>

            {/* Rank Badge */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-b from-[#f1a903] to-[#bc9713] rounded-full flex items-center justify-center border-3 border-[#543b1a]">
              <span className="text-black font-bold text-lg">
                {topEarners[1].rank}
              </span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="relative">
            <div
              className="w-24 h-32 relative z-0 bg-gradient-to-b from-[#e1910a] to-[#4f350e]"
              style={{
                clipPath:
                  "polygon(15% 0%, 85% 0%, 100% 20%, 100% 80%, 85% 100%, 15% 100%, 0% 80%, 0% 20%)",
              }}
            >
              {/* Crown */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <div
                  className="w-8 h-6 bg-gradient-to-b from-[#db6903] to-[#bc9713] relative"
                  style={{
                    clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#f1a903] rounded-full"></div>
                </div>
              </div>

              {/* Avatar */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden border-2 border-[#e1910a]">
                <img
                  src={topEarners[2].avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Username */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
                <p className="text-white text-xs font-medium">
                  {topEarners[2].username}
                </p>
                <p className="text-[#db6903] text-[10px] font-bold px-1">
                  {topEarners[2].amount}
                </p>
              </div>
            </div>

            {/* Rank Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-[#db6903] to-[#543b1a] rounded-full flex items-center justify-center border-2 border-[#f1a903]">
              <span className="text-white font-bold text-sm">
                {topEarners[2].rank}
              </span>
            </div>
          </div>
        </div>

        {/* Scrolling Earnings List */}
        <div
          className="rounded-xl p-3 h-[500px] overflow-hidden border border-[#4f350e]"
          style={{
            background: "linear-gradient(180deg, #220904 0%, #1f0e0e 100%)",
          }}
        >
          <div
            className="transition-transform duration-500 ease-in-out space-y-3"
            style={{ transform: `translateY(-${currentEarningsIndex * 60}px)` }}
          >
            {[...earningsList, ...earningsList].map((earner, index) => (
              <div
                key={`${earner.rank}-${index}`}
                className="flex items-center justify-between py-2 px-3 rounded-lg"
                style={{
                  background:
                    "linear-gradient(90deg, #2b1b0f 0%, #3d1601 100%)",
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#f1a903] rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {earner.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#f1a903]/60">
                    <img
                      src={earner.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white text-sm font-medium">
                    {earner.username}
                  </span>
                </div>
                <span className="text-[#f1a903] text-sm font-bold">
                  {earner.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="mx-4 mt-6 bg-[#220904] rounded-2xl p-6 border border-[#fdbb02]/40 shadow-lg relative overflow-hidden">
        {/* Decorative Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#fdbb02]/10 via-transparent to-[#fdbb02]/5 rounded-2xl pointer-events-none"></div>

        {/* Header Icons */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          {/* Age Restriction */}
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center border-2 border-red-400 shadow-md">
            <span className="text-white font-bold text-sm">+18</span>
          </div>

          {/* Telegram Style Icon */}
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M9.999 15.002l-.348 4.895c.498 0 .713-.214.974-.469l2.332-2.232 4.835 3.517c.887.489 1.515.232 1.739-.822l3.152-14.801c.28-1.278-.462-1.775-1.325-1.464L2.268 10.398c-1.267.49-1.248 1.196-.215 1.517l4.774 1.489 11.076-6.962c.522-.317.998-.141.606.176L9.999 15.002z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-gray-300 text-sm leading-relaxed relative z-10">
          {[
            "The platform advocates fairness, justice, and openness. We mainly operate fair lottery, blockchain games, live casinos, and slot machine games.",
            "Rollix777 works with more than 10,000 online live game dealers and slot games, all of which are verified fair games.",
            "Rollix777 supports fast deposit and withdrawal, and looks forward to your visit.",
          ].map((text, i) => (
            <div key={i} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-[#fdbb02] rounded-full mt-2 flex-shrink-0"></div>
              <p>{text}</p>
            </div>
          ))}

          {/* Warning Box */}
          <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg text-center shadow-inner">
            <p className="text-yellow-400 font-semibold">
              🎲{" "}
              <span className="text-[#fdbb02]">
                Gambling can be addictive, please play rationally.
              </span>
            </p>
            <p className="text-yellow-400 font-semibold mt-2">
              🔞{" "}
              <span className="text-[#fdbb02]">
                The platform only accepts customers above the age of 18.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div
        className="fixed bottom-2 left-2 right-2 rounded-full border border-[#f1a903] px-6 py-3 shadow-lg z-50"
        style={{
          background: "linear-gradient(180deg, #220904 0%, #1f0e0e 100%)",
        }}
      >
        <div className="flex justify-around items-end max-w-md mx-auto relative">
          {/* Home */}
          <button className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 bg-[#4f350e]/50 rounded-xl flex items-center justify-center shadow-inner">
              <Home className="w-4 h-4 text-[#f1a903]" />
            </div>
            <span className="text-[#f1a903] text-xs font-semibold">Home</span>
          </button>

          {/* Activity */}
          <button className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 bg-[#160406]/50 rounded-xl flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#bc9713]/50" />
            </div>
            <span className="text-[#bc9713]/50 text-xs font-medium">
              Activity
            </span>
          </button>

          {/* Get ₹500 (Center Button - Elevated Gold Glow) */}
          <button className="flex flex-col items-center space-y-1 relative -mt-16">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d31c02] via-[#db6903] to-[#f1a903] rounded-full flex items-center justify-center border-4 border-[#220904] shadow-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-[#f1a903] to-[#e1910a] rounded-full flex items-center justify-center relative">
                {/* Glow Ring Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f1a903] to-[#cf8904] rounded-full animate-spin-slow opacity-30"></div>
                <DollarSign className="w-6 h-6 text-[#220904] relative z-10" />
              </div>
            </div>
            <span className="text-[#f1a903] text-xs font-bold drop-shadow-md">
              Get ₹500
            </span>
          </button>

          {/* Promotion */}
          <button
            className="flex flex-col items-center space-y-1"
            onClick={() => navigate("/promotions")}
          >
            <div className="w-8 h-8 bg-[#160406]/50 rounded-xl flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-[#e1910a]/50" />
            </div>
            <span className="text-[#e1910a]/50 text-xs font-medium">
              Promotion
            </span>
          </button>

          {/* Account */}
          <button
            className="flex flex-col items-center space-y-1"
            onClick={() => navigate("/account")}
          >
            <div className="w-8 h-8 bg-[#160406]/50 rounded-xl flex items-center justify-center">
              <User className="w-4 h-4 text-[#cf8904]/50" />
            </div>
            <span className="text-[#cf8904]/50 text-xs font-medium">
              Account
            </span>
          </button>
        </div>
      </div>

      {/* Add bottom padding to prevent content from being hidden behind footer */}
      <div className="h-16"></div>
    </div>
  );
}

export default HomePage;
