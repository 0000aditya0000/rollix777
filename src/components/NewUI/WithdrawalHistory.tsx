import { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Copy,
  CreditCard,
  Smartphone,
  Banknote,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const WithdrawalHistory = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Choose a date");
  const today = new Date();
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [tempFilter, setTempFilter] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const withdrawals = [
    {
      id: 1,
      balance: "₹5,000.00",
      type: "USDT",
      time: "2025-09-16 00:34:12",
      orderNumber: "WD2025091600341208252456c",
      status: "Completed",
    },
    {
      id: 2,
      balance: "₹5,000.00",
      type: "USDT",
      time: "2025-09-15 11:13:38",
      orderNumber: "WD20250915111338488421Z0c",
      status: "Completed",
    },
    {
      id: 3,
      balance: "₹3,500.00",
      type: "USDT",
      time: "2025-09-14 21:31:11",
      orderNumber: "WD20250914213111264789A1x",
      status: "Completed",
    },
  ];

  const filters = ["All", "Pending", "Completed", "Rejected", "Processing"];

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
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
    <div className="bg-[#220904] min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#160406] border-b border-[#3d1601]">
        <div className="flex items-center gap-3">
          <ChevronLeft
            className="w-6 h-6 text-[#f1a903]"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-lg font-medium text-white">Withdrawal history</h1>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-[#1f0e0e] border-b border-[#3d1601]">
        <button
          className={`flex-1 py-3 px-4 text-sm font-medium rounded-t-lg mx-2 mt-2 ${
            selectedFilter === "All"
              ? "bg-[#db6903] text-white"
              : "bg-[#2b1b0f] text-[#bc9713] border border-[#4f350e]"
          }`}
          onClick={() => setSelectedFilter("All")}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
              <div className="bg-white rounded-sm"></div>
            </div>
            All
          </div>
        </button>

        <button
          className={`flex-1 py-3 px-4 text-sm font-medium rounded-t-lg mx-2 mt-2 ${
            selectedFilter === "ARPay"
              ? "bg-[#db6903] text-white"
              : "bg-[#2b1b0f] text-[#bc9713] border border-[#4f350e]"
          }`}
          onClick={() => setSelectedFilter("ARPay")}
        >
          <div className="flex items-center justify-center gap-2">
            <Smartphone className="w-4 h-4" />
            ARPay
          </div>
        </button>

        <button
          className={`flex-1 py-3 px-4 text-sm font-medium rounded-t-lg mx-2 mt-2 ${
            selectedFilter === "BANK CARD"
              ? "bg-[#db6903] text-white"
              : "bg-[#2b1b0f] text-[#bc9713] border border-[#4f350e]"
          }`}
          onClick={() => setSelectedFilter("BANK CARD")}
        >
          <div className="flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" />
            BANK CARD
          </div>
        </button>

        <button
          className={`flex-1 py-3 px-4 text-sm font-medium rounded-t-lg mx-2 mt-2 ${
            selectedFilter === "Cash"
              ? "bg-[#db6903] text-white"
              : "bg-[#2b1b0f] text-[#bc9713] border border-[#4f350e]"
          }`}
          onClick={() => setSelectedFilter("Cash")}
        >
          <div className="flex items-center justify-center gap-2">
            <Banknote className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex gap-4 p-4 bg-[#1f0e0e]">
        <button
          className="flex items-center justify-between bg-[#2b1b0f] border border-[#4f350e] rounded-lg px-4 py-3 flex-1"
          onClick={() => setShowFilterPopup(true)}
        >
          <span className="text-[#bc9713] text-sm">All</span>
          <ChevronDown className="w-4 h-4 text-[#bc9713]" />
        </button>

        <button
          className="flex items-center justify-between bg-[#2b1b0f] border border-[#4f350e] rounded-lg px-4 py-3 flex-1"
          onClick={() => setShowCalendar(true)}
        >
          <span className="text-[#bc9713] text-sm">Choose a date</span>
          <ChevronDown className="w-4 h-4 text-[#bc9713]" />
        </button>
      </div>

      {/* Withdrawal List */}
      <div className="p-4 space-y-4">
        {withdrawals.map((withdrawal) => (
          <div
            key={withdrawal.id}
            className="bg-[#2b1b0f] rounded-lg p-4 border border-[#4f350e]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#d31c02] text-white px-3 py-1 rounded-full text-sm font-medium">
                Withdraw
              </div>
              <div className="bg-[#1a5d1a] text-[#4ade80] px-3 py-1 rounded-full text-sm font-medium">
                {withdrawal.status}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#bc9713] text-sm">Balance</span>
                <span className="text-[#f1a903] font-semibold text-lg">
                  {withdrawal.balance}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#bc9713] text-sm">Type</span>
                <span className="text-white font-medium">
                  {withdrawal.type}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#bc9713] text-sm">Time</span>
                <span className="text-[#bc9713] text-sm">
                  {withdrawal.time}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-[#bc9713] text-sm">Order number</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#bc9713] text-sm font-mono break-all max-w-[200px]">
                    {withdrawal.orderNumber}
                  </span>
                  <button
                    onClick={() => copyToClipboard(withdrawal.orderNumber)}
                    className="text-[#f1a903] hover:text-[#e1910a] transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#bc9713] text-sm">Remarks</span>
                <span className="text-[#bc9713] text-sm">-</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacing for mobile navigation */}
      <div className="h-20"></div>

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

export default WithdrawalHistory;
