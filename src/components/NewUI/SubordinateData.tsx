import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { referralService } from "../../lib/services/referralService.js";
import { useSelector } from "react-redux";
import { RootState } from "../../store.js";

interface Stats {
  depositAmount: string;
  depositNumber: number;
  firstDepositAmount: string;
  firstDepositUsers: number;
  numberOfBettors: number;
  totalBet: string;
}

const SubordinateData: React.FC = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const today = new Date();
  const [searchInput, setSearchInput] = useState("");
  const [selectedDate, setSelectedDate] = useState("2025-08-22");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showTierPopup, setShowTierPopup] = useState(false);
  const [tempTier, setTempTier] = useState<string | null>(null);
  const [statsData, setStatsData] = useState<Stats>({
    depositAmount: "",
    depositNumber: 0,
    firstDepositAmount: "",
    firstDepositUsers: 0,
    numberOfBettors: 0,
    totalBet: "",
  });
  const [referralsByLevel, setReferralsByLevel] = useState<any>({
    level1: [],
    level2: [],
    level3: [],
    level4: [],
    level5: [],
  });

  const tiers = ["All", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

  const fetchSubordinateData = async () => {
    try {
      const levelParam =
        selectedLevel === "All" ? "" : selectedLevel.replace("Level ", "");
      const response = await referralService.getSubordinateData(
        userId, // logged in user id
        selectedDate, // from your state
        300, // limit
        searchInput.trim(), // searchUserId
        levelParam // Level
      );
      // console.log(response, "response");
      setStatsData(response.stats);
      if (response?.referralsByLevel) {
        setReferralsByLevel(response.referralsByLevel);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchSubordinateData();
  }, [selectedLevel, selectedDate, searchInput]);

  const allReferrals = [
    ...(referralsByLevel.level1 || []),
    ...(referralsByLevel.level2 || []),
    ...(referralsByLevel.level3 || []),
    ...(referralsByLevel.level4 || []),
    ...(referralsByLevel.level5 || []),
  ];

  const getFilteredReferrals = () => {
    if (selectedLevel === "All") {
      return allReferrals;
    } else if (selectedLevel === "Level 1") {
      return referralsByLevel.level1 || [];
    } else if (selectedLevel === "Level 2") {
      return referralsByLevel.level2 || [];
    } else if (selectedLevel === "Level 3") {
      return referralsByLevel.level3 || [];
    } else if (selectedLevel === "Level 4") {
      return referralsByLevel.level4 || [];
    } else if (selectedLevel === "Level 5") {
      return referralsByLevel.level5 || [];
    }
    return [];
  };

  //   const today = new Date();
  const currentDateString = today.toISOString().split("T")[0];

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month - 1, 1).getDay();

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  const isDateSelectable = (year: number, month: number, day: number) =>
    formatDate(year, month, day) <= currentDateString;

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days: JSX.Element[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(currentYear, currentMonth, day);
      const isSelected = dateString === selectedDate;
      const isSelectable = isDateSelectable(currentYear, currentMonth, day);

      days.push(
        <button
          key={day}
          onClick={() => isSelectable && setSelectedDate(dateString)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            isSelected
              ? "bg-[#f1a903] text-[#220904]"
              : isSelectable
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-600 cursor-not-allowed"
          }`}
          disabled={!isSelectable}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const handleConfirmDate = () => setShowCalendar(false);
  const handleCancelDate = () => setShowCalendar(false);

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleSearch = () => {
    fetchSubordinateData();
  };

  return (
    <div className="min-h-screen bg-[#220904] text-white font-sans">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#db6903] to-[#f1a903] px-4 py-4 flex items-center justify-center relative shadow-md">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        >
          <ChevronLeft className="w-6 h-6" style={{ color: "#220904" }} />
        </button>

        <h1 className="text-lg font-semibold text-[#220904]">
          Subordinate Data
        </h1>
      </div>

      {/* Search */}
      <div className="p-4 flex items-center gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onClick={handleSearch}
          placeholder="Search subordinate UID"
          className="flex-1 px-3 py-2 rounded-lg bg-[#2b1b0f] text-sm focus:outline-none border border-[#3d1601] placeholder-gray-400"
        />
        <button className="bg-[#d31c02] p-2 rounded-lg">
          <Search className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Filters */}
      <div className="px-4 flex gap-2 mb-4">
        {/* Tier Filter Button */}
        <button
          onClick={() => setShowTierPopup(true)}
          className="flex-1 bg-[#2b1b0f] border border-[#3d1601] text-white rounded-lg px-3 py-2 text-sm flex items-center justify-between"
        >
          <span>{selectedLevel ? selectedLevel : "All"}</span>
          <ChevronDown className="w-5 h-5" />
        </button>

        {/* Calendar Button */}
        <button
          onClick={() => setShowCalendar(true)}
          className="flex-1 bg-[#1f0e0e] border border-[#bc9713] text-white rounded-lg px-3 py-2 text-sm flex items-center justify-between"
        >
          <span>{selectedDate}</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Summary Card */}
      <div className="mx-4 bg-gradient-to-br from-[#db6903] to-[#f1a903] rounded-xl grid grid-cols-2 text-center py-4 shadow-lg">
        <div>
          <p className="text-2xl font-bold">{statsData?.depositNumber}</p>
          <p className="text-xs">Deposit number</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{statsData?.depositAmount}</p>
          <p className="text-xs">Deposit amount</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{statsData?.numberOfBettors}</p>
          <p className="text-xs">Number of bettors</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{statsData?.totalBet}</p>
          <p className="text-xs">Total bet</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{statsData?.firstDepositUsers}</p>
          <p className="text-xs">First deposit users</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{statsData?.firstDepositAmount}</p>
          <p className="text-xs">First deposit amount</p>
        </div>
      </div>

      {/* Subordinate List */}
      <div className="mt-6 space-y-4 px-4 pb-8">
        {getFilteredReferrals().map((sub: any, idx: any) => (
          <div
            key={idx}
            className="bg-[#2b1b0f] rounded-xl p-4 text-sm shadow-md"
          >
            <p className="mb-2">
              <span className="font-semibold text-[#f1a903]">UID:</span>{" "}
              {sub.user_id}
            </p>
            <div className="flex justify-between text-gray-300">
              <span>Level</span>
              <span className="text-[#f1a903]">{sub.level}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Deposit amount</span>
              <span className="text-[#e1910a]">{sub.deposit_amount}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Commission</span>
              <span className="text-[#bc9713]">{sub.commission}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Time</span>
              <span>{sub.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- Tier Popup --- */}
      {showTierPopup && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowTierPopup(false)}
          />
          <div className="fixed bottom-0 left-0 w-full z-50 animate-slide-up">
            <div className="bg-[#2a2a2a] rounded-t-2xl shadow-2xl max-w-md mx-auto">
              {/* Handle bar */}
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-gray-500 rounded-full" />
              </div>

              {/* Header: Cancel | Title | Confirm */}
              <div className="flex items-center justify-between px-6 pb-4">
                <button
                  onClick={() => setShowTierPopup(false)}
                  className="text-gray-400 font-medium"
                >
                  Cancel
                </button>
                <h2 className="text-white font-semibold text-lg">
                  Choose Tier
                </h2>
                <button
                  onClick={() => {
                    if (tempTier) {
                      setSelectedLevel(tempTier);
                    }
                    setShowTierPopup(false);
                  }}
                  className="text-[#f1a903] font-medium"
                >
                  Confirm
                </button>
              </div>

              {/* Tier List */}
              <div className="flex flex-col divide-y divide-gray-700 px-6 pb-4">
                {tiers.map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setTempTier(tier)}
                    className={`py-3 rounded-lg transition-colors ${
                      tempTier === tier
                        ? "bg-[#f1a903] text-[#220904] font-semibold"
                        : "text-white hover:bg-[#3d1601]"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Calendar Bottom Sheet */}
      {showCalendar && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleCancelDate}
          />
          <div className="fixed bottom-0 left-0 w-full z-50 animate-slide-up">
            <div className="bg-[#2a2a2a] rounded-t-2xl shadow-2xl max-w-md mx-auto">
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-gray-500 rounded-full" />
              </div>
              <div className="flex items-center justify-between px-6 pb-4">
                <button
                  onClick={handleCancelDate}
                  className="text-gray-400 font-medium"
                >
                  Cancel
                </button>
                <h2 className="text-white font-semibold text-lg">
                  Choose a date
                </h2>
                <button
                  onClick={handleConfirmDate}
                  className="text-[#f1a903] font-medium"
                >
                  Confirm
                </button>
              </div>
              <div className="px-6 pb-2">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => navigateMonth("prev")}
                    className="text-gray-400 hover:text-white transition-colors p-2"
                  >
                    ‹
                  </button>
                  <div className="flex gap-4">
                    <span className="text-white font-semibold text-lg">
                      {currentYear}
                    </span>
                    <span className="text-white font-semibold text-lg">
                      {currentMonth.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <button
                    onClick={() => navigateMonth("next")}
                    className="text-gray-400 hover:text-white transition-colors p-2"
                    disabled={
                      currentYear >= today.getFullYear() &&
                      currentMonth > today.getMonth() + 1
                    }
                  >
                    ›
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm font-medium"
                    >
                      {day}
                    </div>
                  ))}
                  {renderCalendar()}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SubordinateData;
