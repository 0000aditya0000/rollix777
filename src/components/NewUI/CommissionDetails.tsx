import React, { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCommissionData } from "../../lib/services/commissionService.js";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Commission {
  date: string;
  bettorsCount: number;
  totalBetAmount: number;
  commissionPayout: number;
}

const CommissionDetails: React.FC = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(formattedToday);
  const [showCalendar, setShowCalendar] = useState(false);
  const [commisionData, setCommissionData] = useState<Commission>({
    date: "",
    bettorsCount: 0,
    totalBetAmount: 0,
    commissionPayout: 0,
  });
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const fetechCommissionData = async () => {
    try {
      console.log(userId, selectedDate);
      const response = await getCommissionData(userId, selectedDate);
      console.log(response, "response");
      setCommissionData(response);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetechCommissionData();
  }, [selectedDate]);

  console.log(commisionData, "commission data");

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

  return (
    <>
      <div className="min-h-screen bg-[#220904] text-white flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#db6903] to-[#f1a903] flex items-center px-4 py-3 relative">
          <ArrowLeft
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#220904] w-6 h-6"
            onClick={() => navigate(-1)}
          />
          <h1 className="w-full text-center font-semibold text-lg text-[#220904]">
            Commission Details
          </h1>
        </div>

        {/* Date Dropdown */}
        <div className="px-4 py-3">
          <button
            onClick={() => setShowCalendar(true)}
            className="w-full bg-[#1f0e0e] border border-[#bc9713] text-white rounded-lg px-3 py-2 text-lg flex items-center justify-between"
          >
            <span>{selectedDate}</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Card */}
        <div className="bg-[#1f0e0e] mx-4 rounded-xl shadow-lg p-4 border border-[#4f350e]">
          <p className="text-[#f1a903] font-semibold mb-2">
            Settlement successful
          </p>
          <p className="text-sm text-gray-300 mb-4">2025-08-23 02:11:37</p>
          <p className="text-sm text-gray-400 mb-6">
            The commission has been automatically credited to your balance
          </p>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-[#382a2a] pb-2">
              <span className="text-gray-300">Number of bettors</span>
              <span className="text-white font-semibold">
                {commisionData?.bettorsCount}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#382a2a] pb-2">
              <span className="text-gray-300">Bet amount</span>
              <span className="text-white font-semibold">
                {commisionData?.totalBetAmount}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#382a2a] pb-2">
              <span className="text-gray-300">Commission payout</span>
              <span className="text-[#f1a903] font-bold text-lg">
                {commisionData?.commissionPayout}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">date</span>
              <span className="text-white font-semibold">
                {commisionData?.date}
              </span>
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default CommissionDetails;
