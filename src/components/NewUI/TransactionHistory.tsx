import { useState } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Choose a date");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [tempFilter, setTempFilter] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const filters = [
    "All",
    "Bet",
    "Agent Commission",
    "Win",
    "Red Envelop",
    "Deposit",
    "Withdrawal",
    "Cancel Withdrawal",
    "Attendence Bonus",
    "Agents red envelop",
    "Withdrawal rejected",
    "Deposit Gifts",
    "Mannual Deposit",
    "Sign up Bonus",
    "Bonus",
  ];

  const transactions = [
    {
      id: 1,
      type: "Agent commission",
      detail: "Agent commission",
      time: "2025-09-19 02:22:03",
      balance: "₹484.08",
      isPositive: true,
    },
    {
      id: 2,
      type: "One-Click rebate",
      detail: "One-Click rebate",
      time: "2025-09-19 01:00:23",
      balance: "₹2.18",
      isPositive: true,
    },
    {
      id: 3,
      type: "Game moved in",
      detail: "Game moved in",
      time: "2025-09-15 12:32:27",
      balance: "₹5,199.73",
      isNegative: true,
    },
    {
      id: 4,
      type: "Withdraw",
      detail: "Withdraw",
      time: "2025-09-15 11:13:38",
      balance: "₹5,000.00",
      isNegative: true,
    },
    {
      id: 5,
      type: "Game moved in",
      detail: "Game moved in",
      time: "2025-09-15 10:08:10",
      balance: "₹411.23",
      isNegative: true,
    },
    {
      id: 6,
      type: "Agent commission",
      detail: "Agent commission",
      time: "2025-09-15 02:47:12",
      balance: "₹409.57",
      isPositive: true,
    },
  ];

  const getTransactionColor = (type: any) => {
    switch (type) {
      case "Agent commission":
        return "#e1910a";
      case "One-Click rebate":
        return "#e1910a";
      case "Game moved in":
        return "#d31c02";
      case "Withdraw":
        return "#d31c02";
      default:
        return "#e1910a";
    }
  };

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
    <div className="min-h-screen" style={{ backgroundColor: "#160406" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between p-4"
        style={{ backgroundColor: "#220904" }}
      >
        <ArrowLeft
          className="w-6 h-6"
          style={{ color: "#db6903" }}
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-semibold" style={{ color: "#f1a903" }}>
          Transaction history
        </h1>
        <div className="w-6"></div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <div
            className="flex items-center justify-between p-3 rounded-lg border"
            style={{
              backgroundColor: "#1f0e0e",
              borderColor: "#4f350e",
              color: "#bc9713",
            }}
            onClick={() => setShowFilterPopup(true)}
          >
            <span>{selectedFilter}</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1">
          <div
            className="flex items-center justify-between p-3 rounded-lg border"
            style={{
              backgroundColor: "#1f0e0e",
              borderColor: "#4f350e",
              color: "#bc9713",
            }}
            onClick={() => setShowCalendar(true)}
          >
            <span>{selectedDate}</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="px-4 space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="overflow-hidden rounded-lg shadow-lg"
          >
            {/* Transaction Header */}
            <div
              className="px-4 py-3"
              style={{ backgroundColor: getTransactionColor(transaction.type) }}
            >
              <h3 className="text-white font-medium text-lg">
                {transaction.type}
              </h3>
            </div>

            {/* Transaction Details */}
            <div
              className="p-4 space-y-3"
              style={{ backgroundColor: "#2b1b0f" }}
            >
              <div className="flex justify-between items-center">
                <span style={{ color: "#bc9713" }} className="text-sm">
                  Detail
                </span>
                <span
                  style={{ color: "#f1a903" }}
                  className="text-sm font-medium"
                >
                  {transaction.detail}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span style={{ color: "#bc9713" }} className="text-sm">
                  Time
                </span>
                <span style={{ color: "#cf8904" }} className="text-sm">
                  {transaction.time}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span style={{ color: "#bc9713" }} className="text-sm">
                  Balance
                </span>
                <span
                  className="text-lg font-semibold"
                  style={{
                    color: transaction.isPositive
                      ? "#4ade80"
                      : transaction.isNegative
                      ? "#ef4444"
                      : "#f1a903",
                  }}
                >
                  {transaction.isNegative ? "-" : ""}
                  {transaction.balance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Popup */}
      {showFilterPopup && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowFilterPopup(false)}
          />
          <div className="fixed bottom-0 left-0 w-full z-50 animate-slide-up">
            <div className="bg-[#2a2a2a] rounded-t-2xl shadow-2xl max-w-md mx-auto">
              {/* Handle bar */}
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-gray-500 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pb-4">
                <button
                  onClick={() => setShowFilterPopup(false)}
                  className="text-gray-400 font-medium"
                >
                  Cancel
                </button>
                <h2 className="text-white font-semibold text-lg">
                  Choose Filter
                </h2>
                <button
                  onClick={() => {
                    if (tempFilter) setSelectedFilter(tempFilter);
                    setShowFilterPopup(false);
                  }}
                  className="text-[#f1a903] font-medium"
                >
                  Confirm
                </button>
              </div>

              {/* Wheel Picker */}
              <div className="relative h-60 overflow-y-auto snap-y snap-mandatory">
                <div className="flex flex-col items-center">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTempFilter(filter)}
                      className={`snap-center py-3 w-full text-center transition-colors ${
                        tempFilter === filter
                          ? "text-[#f1a903] font-bold text-lg"
                          : "text-gray-400"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
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

export default TransactionHistory;
