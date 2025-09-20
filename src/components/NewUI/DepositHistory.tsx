import { useEffect, useState } from "react";
import { ChevronDown, Copy, ArrowLeft } from "lucide-react";
import { getDepositHistory } from "../../lib/services/transactionService.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store.js";

interface Deposit {
  id: number;
  balance: string;
  type: string;
  time: string;
  orderNumber: string;
  status: string;
}

const DepositHistory = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "success" | "failed"
  >("all");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const today = new Date();
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [tempFilter, setTempFilter] = useState<any | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filters = [
    { label: "All", value: "all" },
    { label: "Success", value: "success" },
    { label: "Failed", value: "failed" },
  ];

  const fetchDepositHistory = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getDepositHistory(
        userId,
        selectedDate,
        selectedFilter
      );
      setDeposits(data.transactions || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch deposit history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepositHistory();
  }, [selectedDate, selectedFilter, userId]);

  // const deposits = [
  //   {
  //     id: 1,
  //     balance: "₹500.00",
  //     type: "LuckyPay - Paytm × QR",
  //     time: "2025-09-10 01:16:25",
  //     orderNumber: "RC2025091001162530671700g",
  //     status: "To Be Paid",
  //   },
  //   {
  //     id: 2,
  //     balance: "₹1,200.00",
  //     type: "PhonePe - UPI",
  //     time: "2025-09-08 18:42:10",
  //     orderNumber: "RC20250908184210555212yZ",
  //     status: "Completed",
  //   },
  //   {
  //     id: 3,
  //     balance: "₹750.00",
  //     type: "GooglePay - UPI",
  //     time: "2025-09-05 09:30:45",
  //     orderNumber: "RC20250905093045222211xA",
  //     status: "Failed",
  //   },
  // ];

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
          Deposit history
        </h1>
        <div className="w-6"></div>
      </div>

      {/* Filter Tabs */}
      {/* <div className="flex bg-[#1f0e0e] border-b border-[#3d1601]">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-t-lg mx-2 mt-2 ${
              selectedFilter === filter
                ? "bg-[#db6903] text-white"
                : "bg-[#2b1b0f] text-[#bc9713] border border-[#4f350e]"
            }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div> */}

      {/* Filter Dropdowns */}
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

      {/* Deposit List */}
      {loading ? (
        <div className="p-4 text-center text-gray-400">Loading...</div>
      ) : deposits.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No transactions available.
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {deposits.map((deposit) => (
            <div
              key={deposit.id}
              className="bg-[#2b1b0f] rounded-lg p-4 border border-[#4f350e]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#f97316] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Deposit
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    deposit.status === "success"
                      ? "bg-[#1a5d1a] text-[#4ade80]"
                      : deposit.status === "failed"
                      ? "bg-[#7f1d1d] text-red-400"
                      : "bg-[#b45309] text-yellow-300"
                  }`}
                >
                  {deposit.status}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#bc9713] text-sm">Balance</span>
                  <span className="text-[#f1a903] font-semibold text-lg">
                    {deposit.balance}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#bc9713] text-sm">Type</span>
                  <span className="text-white font-medium">{deposit.type}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#bc9713] text-sm">Time</span>
                  <span className="text-[#bc9713] text-sm">{deposit.time}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-[#bc9713] text-sm">Order number</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#bc9713] text-sm font-mono break-all max-w-[200px]">
                      {deposit.orderNumber}
                    </span>
                    <button
                      onClick={() => copyToClipboard(deposit.orderNumber)}
                      className="text-[#f1a903] hover:text-[#e1910a] transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom spacing */}
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
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-gray-500 rounded-full" />
              </div>
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
              <div className="relative h-60 overflow-y-auto snap-y snap-mandatory">
                <div className="flex flex-col items-center">
                  {filters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setTempFilter(filter.value)}
                      className={`snap-center py-3 w-full text-center transition-colors ${
                        tempFilter === filter.value
                          ? "text-[#f1a903] font-bold text-lg"
                          : "text-gray-400"
                      }`}
                    >
                      {filter.label}
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

export default DepositHistory;
