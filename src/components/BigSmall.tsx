import React, { useEffect, useState, useRef } from "react";
import {
  X,
  ArrowLeft,
  Clock,
  Check,
  ArrowDownCircle,
  ArrowUpCircle,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { deposit, withdraw } from "../slices/walletSlice";
import {
  fetchResults,
  generateResult,
  getBetHistory,
  checkValidBet,
  placeBet,
  getPeriodNumber,
  getTimerData,
} from "../lib/services/BigSmallServices";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getAllTransactions } from "../lib/services/transactionService";
import { getBetHistoryByGameType } from "../lib/services/betService";

type Record = {
  id: number;
  period_number: number;
  result_number: string;
  result_color: string;
  result_size: string;
};

type Bet = {
  period: number;
  number?: number | null;
  color?: string;
  big_small?: string;
  amount: number;
};

type BetHistory = {
  periodNumber: number;
  status: string;
  amount: number;
  amountReceived: number;
};

const BigSmall = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<"BIG" | "SMALL" | "">("");
  const [contractMoney, setContractMoney] = useState<number>(0);
  const [agreed, setAgreed] = useState(true);
  const [selected, setSelected] = useState(1);
  const [records, setRecords] = useState<Record[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState<number>();
  const [bets, setBets] = useState<Bet[]>([]);
  const [currentBets, setCurrentBets] = useState<Bet[]>([]);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [winner, setWinner] = useState(false);
  const [popup, setpopup] = useState("");
  const [result, setResult] = useState<Record | null>(null);
  const [betHistory, setbetHistory] = useState<BetHistory | null>(null);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1min");
  const intervalRefs = useRef({});
  const isFetchingRef = useRef({});
  const [error, setError] = useState<string | null>(null);
  const [gameTypeFilter, setGameTypeFilter] = useState("wingo");
  const [timers, setTimers] = useState({
    "1min": 0,
    "3min": 0,
    "5min": 0,
    "10min": 0,
  });
  const [transactionFilter, setTransactionFilter] = useState<
    "all" | "approved" | "pending" | "rejected"
  >("all");
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const [transactions, setTransactions] = useState<any[]>([]);

  // Add a new state to track which timers have already triggered their API calls
  const [triggeredTimers, setTriggeredTimers] = useState<Set<string>>(
    new Set()
  );

  // Add state for period numbers for each timer
  const [periodNumbers, setPeriodNumbers] = useState({
    "1min": 0,
    "3min": 0,
    "5min": 0,
    "10min": 0,
  });

  // Add state for quantity and multiplier at the top of the component
  const [quantity, setQuantity] = useState(1);
  const [multiplier, setMultiplier] = useState(1);

  useEffect(() => {
    // Initial fetch for all timers
    ["1min", "3min", "5min", "10min"].forEach((duration) => {
      fetchTimerData(duration);
      fetchPeriodNumber(duration);
    });

    // Cleanup intervals when component unmounts
    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions(uid);
        setTransactions(data.transactions || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [user?.id]);

  const getFilteredTransactions = () => {
    if (transactionFilter === "all") {
      return transactions;
    }
    return transactions.filter((txn) => {
      switch (transactionFilter) {
        case "approved":
          return txn.status.toLowerCase() === "approved";
        case "pending":
          return txn.status.toLowerCase() === "pending";
        case "rejected":
          return txn.status.toLowerCase() === "rejected";
        default:
          return true;
      }
    });
  };

  // Add function to handle viewing rejection note
  const handleViewRejection = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowRejectionModal(true);
  };

  // Modify fetchPeriodNumber to use mins in payload
  const fetchPeriodNumber = async (duration: string) => {
    try {
      const data = await getPeriodNumber(duration);

      if (data && typeof data.period_number === "number") {
        setPeriodNumbers((prev) => ({
          ...prev,
          [duration]: data.period_number,
        }));

        if (duration === activeTab) {
          setCurrentPeriod(data.period_number);
        }
        return data.period_number;
      } else {
        console.error("Invalid period number received from API:", data);
        throw new Error("Invalid period number received from API");
      }
    } catch (error) {
      console.error(`Failed to fetch period number for ${duration}:`, error);
      throw error;
    }
  };

  // Keep fetchTimerData with duration in payload
  const fetchTimerData = async (duration) => {
    if (isFetchingRef.current[duration]) {
      return;
    }

    try {
      isFetchingRef.current[duration] = true;

      await fetchPeriodNumber(duration);

      const data = await getTimerData(duration);

      let remainingSeconds;
      if (duration === "1min") {
        remainingSeconds = data.remainingTimeSeconds;
      } else {
        remainingSeconds =
          data.remainingTimeMinutes * 60 + data.remainingTimeSeconds;
      }

      if (typeof remainingSeconds === "number" && !isNaN(remainingSeconds)) {
        startLocalCountdown(duration, remainingSeconds);
      } else {
        console.error(`Invalid timer data received for ${duration}:`, data);
        throw new Error("Invalid timer data received");
      }
    } catch (err) {
      console.error(`Failed to fetch ${duration} timer:`, err);
      setError(`Failed to fetch timer data: ${err.message}`);
      startLocalCountdown(
        duration,
        duration === "1min"
          ? 60
          : duration === "3min"
          ? 180
          : duration === "5min"
          ? 300
          : 600
      );
    } finally {
      isFetchingRef.current[duration] = false;
    }
  };

  const startLocalCountdown = (duration, initialTime) => {
    if (typeof initialTime !== "number" || isNaN(initialTime)) {
      console.error(`Invalid initial time for ${duration}:`, initialTime);
      return;
    }

    // Clear existing interval for this duration
    if (intervalRefs.current[duration]) {
      clearInterval(intervalRefs.current[duration]);
    }

    // Reset the triggered state for this timer
    setTriggeredTimers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(duration);
      return newSet;
    });

    // Set initial time
    setTimers((prev) => ({
      ...prev,
      [duration]: Math.floor(initialTime),
    }));

    let isProcessing = false; // Add flag to track if we're processing the timer end

    // Start local countdown
    intervalRefs.current[duration] = setInterval(async () => {
      setTimers((current) => {
        const currentTime = current[duration];
        if (currentTime <= 1) {
          // Only process if not already processing and not triggered
          if (!isProcessing && !triggeredTimers.has(duration)) {
            isProcessing = true; // Set processing flag
            console.log(`Timer ended for ${duration}, making API calls`);

            // Mark this timer as triggered
            setTriggeredTimers((prev) => new Set(prev).add(duration));

            // Fetch new period number and process result
            fetchPeriodNumber(duration)
              .then((newPeriodNumber) => {
                if (newPeriodNumber && !isNaN(newPeriodNumber)) {
                  return getResult(duration, newPeriodNumber);
                } else {
                  throw new Error("Invalid period number received");
                }
              })
              .then(() => {
                console.log(
                  `API calls completed for ${duration}, fetching new timer data`
                );
                return fetchTimerData(duration);
              })
              .catch((error) => {
                console.error(
                  `Error in timer end process for ${duration}:`,
                  error
                );
                setError(`Error processing timer end: ${error.message}`);
                // Remove from triggered timers if there was an error
                setTriggeredTimers((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(duration);
                  return newSet;
                });
              })
              .finally(() => {
                isProcessing = false; // Reset processing flag
              });
          }
          return { ...current, [duration]: 0 };
        }
        return { ...current, [duration]: currentTime - 1 };
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    if (typeof seconds !== "number" || isNaN(seconds)) {
      return "00:00";
    }

    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Modify useEffect to fetch period numbers for all timers on mount
  useEffect(() => {
    // Initial fetch for all timers
    ["1min", "3min", "5min", "10min"].forEach((duration) => {
      fetchTimerData(duration);
      fetchPeriodNumber(duration);
    });

    // Cleanup intervals when component unmounts
    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Modify useEffect for activeTab changes
  useEffect(() => {
    if (activeTab) {
      fetchPeriodNumber(activeTab);
      fetchTableData();
    }
  }, [activeTab]);

  const fetchTableData = async () => {
    try {
      console.log("Fetching results for duration:", activeTab); // Debug log
      const response = await fetchResults(activeTab);

      // Set the current period based on active timer
      setCurrentPeriod(response.results[0].period_number + 1);
      setRecords(response.results);
      setError(null);
    } catch (error) {
      setError("Failed to fetch results. Please try again later.");
      console.error("Error fetching results:", error);
    }
  };

  // Modify getResult to fetch new period number after result generation
  const getResult = async (duration: string, currentPeriodNumber: number) => {
    try {
      const periodNumber = currentPeriodNumber - 1;
      console.log(
        "getResult called with duration:",
        duration,
        "period:",
        periodNumber
      );

      if (!periodNumber || isNaN(periodNumber)) {
        console.error("Invalid period number:", periodNumber);
        setError("Invalid period number");
        return;
      }

      const data = await generateResult(periodNumber, duration);

      if (!data) {
        console.error("No data received from generateResult");
        setError("Failed to generate result. Please try again.");
        return;
      }

      setResult(data);
      setRecords((prev) => [data, ...prev]);

      // Fetch new period number after result generation
      await fetchPeriodNumber(duration);

      if (duration === activeTab) {
        await fetchTableData();
      }

      console.log(data, "win/");
      await checkWinLose(data);
      setBets([]);
      setError(null);
    } catch (error) {
      console.error("Error in getResult:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to generate result. Please try again later.";
      setError(errorMessage);
      throw error;
    }
  };

  useEffect(() => {
    const fetchBetHistory = async () => {
      try {
        const response = await getBetHistoryByGameType(gameTypeFilter, userId);

        // Handle different response structures
        let betData = [];
        if (gameTypeFilter === "wingo") {
          betData = response.betHistory || [];
        } else if (gameTypeFilter === "other") {
          betData = response.transactions || response.data || [];

          // Sort other games data by date (latest first)
          if (Array.isArray(betData)) {
            betData.sort((a, b) => {
              const dateA = new Date(a.bet_date);
              const dateB = new Date(b.bet_date);
              return dateB.getTime() - dateA.getTime(); // Latest first
            });
          }
        }

        if (!Array.isArray(betData)) {
          console.error("Unexpected data format:", betData);
          setCurrentBets([]);
          return;
        }

        setCurrentBets(betData as Bet[]);
      } catch (err: any) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
      }
    };

    fetchBetHistory();
  }, [gameTypeFilter, userId]);

  const checkWinLose = async (result: any) => {
    try {
      const response = await getBetHistory(userId);
      const latestBetHistory = response.betHistory[0] as BetHistory;
      setbetHistory(latestBetHistory);

      // Get the current period for the active timer from periodNumbers state
      const currentPeriodForTimer = periodNumbers[activeTab];

      if (latestBetHistory.periodNumber === result?.periodNumber) {
        if (latestBetHistory.status === "won") {
          dispatch(
            deposit({
              cryptoname: "INR",
              amount: latestBetHistory.amountReceived,
            })
          );
          setWinner(true);
          setpopup("won");
        } else {
          setWinner(true);
          setpopup("lost");
        }
      }
      setError(null);
    } catch (error) {
      setError("Failed to check bet results. Please try again later.");
      console.error("Error checking win/lose:", error);
    }
  };

  const handleBet = async () => {
    try {
      const checkResponse = await checkValidBet(userId, activeTab);

      if (checkResponse.pendingBets > 0) {
        toast.error("You have already placed a bet", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "red",
            color: "white",
          },
        });
        return;
      }

      let betType: string;
      let betValue: string | number;

      if (selectedNumber !== null) {
        betType = "number";
        betValue = selectedNumber;
      } else if (selectedColor) {
        betType = "color";
        betValue = selectedColor;
      } else if (selectedSize) {
        betType = "size";
        betValue = selectedSize;
      } else {
        setError("Please select a valid bet type.");
        return;
      }

      const payload = {
        userId,
        betType,
        betValue,
        amount: contractMoney,
        periodNumber: periodNumbers[activeTab], // Use period number from periodNumbers state
        duration: activeTab,
      };

      console.log("Placing bet with payload:", payload); // Debug log

      const response = await placeBet(payload);
      console.log("Bet placement response:", response); // Debug log

      // Check if response exists and has success message
      if (response) {
        const bet: Bet = {
          period: currentPeriod,
          number: selectedNumber !== null ? selectedNumber : null,
          color: selectedColor || undefined,
          big_small: selectedSize || undefined,
          amount: contractMoney,
        };

        // Update UI and state
        dispatch(withdraw({ cryptoname: "INR", amount: contractMoney }));
        setBets((prev) => [...prev, bet]);
        setSelectedNumber(null);
        setSelectedColor("");
        setSelectedSize("");
        setContractMoney(0);
        setAgreed(true);

        // Show success message in green toast
        toast.success(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "#4CAF50",
            color: "white",
          },
        });

        // Close the bet popup if it exists
        setSelectedNumber(null);
        setSelectedColor("");
        setSelectedSize("");
      } else {
        console.error("Invalid response from placeBet:", response);
        toast.error(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "#4CAF50",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error("Error placing bet:", error);
      setError("Failed to place bet. Please try again later.");
    }
  };

  // Filter and pagination logic
  const filteredBets = currentBets.filter((bet) =>
    statusFilter === "all" ? true : bet.status === statusFilter
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records?.slice(indexOfFirstRecord, indexOfLastRecord);
  const finalRecords = filteredBets.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  console.log(finalRecords, "final");
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const getColorBadge = (color: string) => {
    // Ensure color is a string and convert it to lowercase
    const colorLower = typeof color === "string" ? color.toLowerCase() : "";

    switch (colorLower) {
      case "red":
        return "bg-red-500 w-4 h-4 rounded-full";
      case "green":
        return "bg-green-500 w-4 h-4 rounded-full";
      default:
        return "bg-gray-500 w-4 h-4 rounded-full";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won":
        return "bg-green-500/20 text-green-400";
      case "lost":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const WinGoTable = () => (
    <div className="overflow-x-auto max-w-full touch-pan-x">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400 text-sm border-b border-purple-500/10">
            <th className="py-4 md:py-5 px-6 font-medium">No.</th>
            <th className="py-4 md:py-5 px-6 font-medium">ID</th>
            <th className="py-4 md:py-5 px-6 font-medium">Game</th>
            <th className="py-4 md:py-5 px-6 font-medium">Amount</th>
            <th className="py-4 md:py-5 px-6 font-medium">Bet Type</th>
            <th className="py-4 md:py-5 px-6 font-medium">Result</th>
            <th className="py-4 md:py-5 px-6 font-medium">Status</th>
            <th className="py-4 md:py-5 px-6 font-medium">Payout</th>
            <th className="py-4 md:py-5 px-6 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {finalRecords.map((bet, index) => (
            <tr
              key={bet.betId}
              className="border-b border-purple-500/10 text-white hover:bg-purple-500/5 transition-colors duration-150"
            >
              <td className="py-4 px-6 text-gray-400">
                {indexOfFirstRecord + index + 1}
              </td>
              <td className="py-4 px-6 text-purple-400">BET-{bet.betId}</td>
              <td className="py-4 px-6">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                  WinGo
                </span>
              </td>
              <td className="py-4 px-6">₹{bet.amount}</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`${getColorBadge(
                      bet.betValue
                    )} md:ring-2 md:ring-white/10`}
                  ></div>
                  <span>{bet.betValue}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`${getColorBadge(
                      bet.periodNumber
                    )} md:ring-2 md:ring-white/10`}
                  ></div>
                  <span>{bet.periodNumber}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs ${getStatusColor(
                    bet.status
                  )}`}
                >
                  {bet?.status?.charAt(0).toUpperCase() + bet?.status?.slice(1)}
                </span>
              </td>
              <td className="py-4 px-6">
                <span
                  className={
                    bet.status === "won" ? "text-green-400" : "text-red-400"
                  }
                >
                  ₹{bet.amountReceived}
                </span>
              </td>
              <td className="py-4 px-6 text-gray-400">{bet.date}</td>
            </tr>
          ))}
          {currentRecords.length === 0 && (
            <tr>
              <td colSpan={9} className="py-8 text-center text-gray-400">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className=" px-2 pt-20 pb-24 bg-[#0F0F19]">
      <div className="w-full  bg-gradient-to-b from-[#252547] to-[#1A1A2E] text-white p-4 space-y-4 rounded-lg">
        {/* Header with back button */}
        <div className="flex items-center mb-4">
          <Link
            to="/"
            className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold text-white ml-4">Wingo</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {/* Left Column - Game Controls */}
          <div className="lg:col-span-2 space-y-8 ">
            {/* Time Buttons */}
            <div className="grid grid-cols-4 gap-8">
              {["1min", "3min", "5min", "10min"].map((duration) => (
                <button
                  key={duration}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === duration
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-[#252547] border border-purple-500/20 text-gray-300 hover:bg-[#2f2f5a]"
                  }`}
                  onClick={() => {
                    setActiveTab(duration);
                  }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <span>{duration}</span>
                    <span className="text-sm mt-1">
                      {formatTime(timers[duration])}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Period Display and Timer */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center bg-gradient-to-r from-purple-900/50 to-pink-900/50 px-4 py-3 rounded-lg border border-purple-500/20">
                <span className="mr-2">🏆</span>
                <span className="font-bold">Period</span>
                <span className="ml-auto">{currentPeriod}</span>
              </div>
              <div
                className={`flex items-center justify-center gap-2 bg-[#252547] border border-purple-500/20 text-center py-3 px-4 rounded-lg ${
                  timers[activeTab] < 10
                    ? "bg-red-500/20 border-red-500/30"
                    : ""
                }`}
              >
                <Clock
                  className={`w-5 h-5 ${
                    timers[activeTab] < 10 ? "text-red-400" : "text-purple-400"
                  }`}
                />
                <span
                  className={`font-bold ${
                    timers[activeTab] < 10 ? "text-red-400" : "text-white"
                  }`}
                >
                  Time Left: {formatTime(timers[activeTab])}
                </span>
              </div>
            </div>

            {/* Join Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                className={`px-4 py-3 rounded-lg font-medium ${
                  timers[activeTab] < 10
                    ? "bg-[#252547] border border-green-500/20 text-gray-400 cursor-not-allowed"
                    : "bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30"
                }`}
                disabled={timers[activeTab] < 10}
                onClick={() => {
                  setSelectedColor("green");
                  setAgreed(true);
                }}
              >
                Join Green
              </button>

              <button
                className={`px-4 py-3 rounded-lg font-medium ${
                  timers[activeTab] < 10
                    ? "bg-[#252547] border border-purple-500/20 text-gray-400 cursor-not-allowed"
                    : "bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30"
                }`}
                disabled={timers[activeTab] < 10}
                onClick={() => {
                  setSelectedColor("voilet");
                  setAgreed(true);
                }}
              >
                Join Violet
              </button>

              <button
                className={`px-4 py-3 rounded-lg font-medium ${
                  timers[activeTab] < 10
                    ? "bg-[#252547] border border-red-500/20 text-gray-400 cursor-not-allowed"
                    : "bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
                }`}
                disabled={timers[activeTab] < 10}
                onClick={() => {
                  setSelectedColor("red");
                  setAgreed(true);
                }}
              >
                Join Red
              </button>
            </div>

            {/* 0-9 Number Buttons */}
            <div className="p-2 bg-[#1A1A2E] rounded-lg border border-purple-500/10">
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: 10 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      timers[activeTab] >= 10 && setSelectedNumber(i);
                      setAgreed(true);
                    }}
                    disabled={timers[activeTab] < 10}
                    className={`relative px-0 py-3 text-white font-bold rounded-lg ${
                      timers[activeTab] < 10
                        ? "bg-[#252547] border border-gray-600/20 text-gray-500 cursor-not-allowed"
                        : i === 0 || i === 5
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
                        : [2, 4, 6, 8].includes(i)
                        ? "bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90"
                        : "bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            {/* Big & Small Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`px-4 py-3 rounded-lg font-medium ${
                  timers[activeTab] < 10
                    ? "bg-[#252547] border border-red-500/20 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-red-500 text-white hover:opacity-90"
                }`}
                disabled={timers[activeTab] < 10}
                onClick={() => {
                  setSelectedSize("BIG");
                  setAgreed(true);
                }}
              >
                BIG
              </button>
              <button
                className={`px-4 py-3 rounded-lg font-medium ${
                  timers[activeTab] < 10
                    ? "bg-[#252547] border border-green-500/20 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-green-500 text-white hover:opacity-90"
                }`}
                disabled={timers[activeTab] < 10}
                onClick={() => {
                  setSelectedSize("SMALL");
                  setAgreed(true);
                }}
              >
                SMALL
              </button>
            </div>
          </div>

          {/* Right Column - Record Table */}
          <div className="  bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
            <div className="p-4 border-b border-purple-500/10">
              <h2 className="text-xl font-bold text-white">
                {activeTab} Record
              </h2>
            </div>

            <div className="overflow-x-auto max-w-full">
              <table className="w-full table-fixed text-sm sm:text-base">
                <thead>
                  <tr className="text-left text-gray-400 text-sm border-b border-purple-500/10">
                    <th className="py-4 px-6 sm:py-4 sm:px-6">Period</th>
                    <th className="py-4 px-6 sm:py-4 sm:px-6">Number</th>
                    <th className="py-4 px-6 sm:py-4 sm:px-6">Result</th>
                    <th className="py-4 px-6 sm:py-4 sm:px-6">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length > 0 ? (
                    currentRecords.map((record, index) => (
                      <tr
                        key={index}
                        className="border-b border-purple-500/10 text-white hover:bg-purple-500/5"
                      >
                        <td className="py-4 px-4 sm:py-4 sm:px-4">
                          {record.period_number}
                        </td>
                        <td className="py-4 px-4 sm:py-4 sm:px-4">
                          {record.result_number}
                        </td>
                        <td className="py-4 px-4 sm:py-4 sm:px-4">
                          {record.result_color === "voilet"
                            ? "🟣"
                            : record.result_color === "green"
                            ? "🟢"
                            : "🔴"}
                        </td>
                        <td className="py-4 px-4 sm:py-4 sm:px-4">
                          {record.result_size?.toUpperCase() || ""}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-6 text-gray-400"
                      >
                        No records available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-purple-500/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <p className="text-gray-400 text-sm">
                Showing {indexOfFirstRecord + 1}-
                {Math.min(indexOfLastRecord, records.length)} of{" "}
                {records.length} records
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                <button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 py-1 px-3 border border-purple-500/20 rounded-lg text-gray-200 hover:text-gray-400 transition-colors"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageToShow;
                  if (totalPages <= 5) {
                    pageToShow = i + 1;
                  } else if (currentPage <= 3) {
                    pageToShow = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageToShow = totalPages - 4 + i;
                  } else {
                    pageToShow = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      className={`py-1 px-3 rounded-lg ${
                        currentPage === pageToShow
                          ? "bg-purple-500/20 border border-purple-500/20 text-white"
                          : "bg-[#1A1A2E] border border-purple-500/20 text-gray-400 hover:text-white transition-colors"
                      }`}
                      onClick={() => setCurrentPage(pageToShow)}
                    >
                      {pageToShow}
                    </button>
                  );
                })}

                <button
                  className=" bg-gradient-to-r from-pink-600 to-purple-600  py-1 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-gray-200 hover:text-gray-400 transition-colors"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Section */}
        <div className="mt-6 overflow-y-scroll bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl sm:rounded-2xl border border-purple-500/20">
          <WinGoTable />
        </div>
      </div>

      {/* Popup for bet confirmation */}
      {(selectedNumber !== null || selectedColor || selectedSize) && (
        <>
          {/* Mobile Design - Bottom Sheet */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
            onClick={() => {
              setSelectedNumber(null);
              setSelectedColor("");
              setSelectedSize("");
            }}
          />
          <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center animate-slideUp md:hidden">
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#252547] to-[#1A1A2E] rounded-t-2xl shadow-2xl overflow-hidden border-t-4 border-purple-500/40">
              {/* Drag handle */}
              <div className="flex justify-center py-2">
                <div className="w-12 h-1.5 bg-purple-500/40 rounded-full" />
              </div>
              {/* Header */}
              <div className="flex flex-col items-center px-5 pt-2 pb-3 border-b border-purple-500/10">
                <span className="text-xs text-gray-300 font-semibold mb-1">
                  WinGo {activeTab}
                </span>
                <h2
                  className={`text-base font-bold bg-[#1A1A2E] rounded-lg px-4 py-1 mb-1 
                    ${selectedColor === "green" ? "text-green-400" : ""}
                    ${selectedColor === "red" ? "text-red-400" : ""}
                    ${selectedColor === "voilet" ? "text-purple-400" : ""}
                    ${selectedColor === "" ? "text-white" : ""}
                  `}
                >
                  {selectedNumber !== null
                    ? `Select ${selectedNumber}`
                    : selectedColor
                    ? `Select ${
                        selectedColor.charAt(0).toUpperCase() +
                        selectedColor.slice(1)
                      }`
                    : `Select ${selectedSize}`}
                </h2>
              </div>
              {/* Body */}
              <div className="px-5 py-4 space-y-4">
                {/* Balance & Quick Amounts */}
                <div>
                  <label className="text-sm text-gray-300 font-semibold mb-1 block">
                    Balance
                  </label>
                  <div className="flex gap-2 mb-2">
                    {[10, 50, 100, 1000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={`px-3 py-1 rounded-lg font-bold text-sm border transition-colors ${
                          contractMoney === amt
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-600"
                            : "bg-[#18182a] text-purple-300 border-purple-500/30 hover:bg-purple-500/20"
                        }`}
                        onClick={() => setContractMoney(amt)}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                  <input
                    min={10}
                    step={10}
                    type="number"
                    placeholder="Enter amount (Minimum ₹10)"
                    value={contractMoney || ""}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value > 100000) {
                        setContractMoney(100000);
                      } else {
                        setContractMoney(value);
                      }
                    }}
                    className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500 text-lg font-semibold mt-1"
                  />
                </div>
                {/* Total Amount Paragraph */}
                <p className="text-base font-semibold text-purple-300 mt-2">
                  Total amount: ₹{contractMoney || 0}
                </p>
                {/* I agree and rules */}
                <div className="flex items-center mt-2">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center mr-3 cursor-pointer ${
                      agreed
                        ? "bg-purple-600"
                        : "bg-[#1A1A2E] border border-purple-500/20"
                    }`}
                    onClick={() => setAgreed(!agreed)}
                  >
                    {agreed && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <label
                    className="text-sm text-gray-300 cursor-pointer"
                    onClick={() => setAgreed(!agreed)}
                  >
                    I agree{" "}
                    <span className="text-purple-400">
                      terms and conditions
                    </span>
                  </label>
                </div>
              </div>
              {/* Buttons */}
              <div className="px-5 pb-6 pt-2 border-t border-purple-500/10 flex gap-3 bg-[#18182a]">
                <button
                  onClick={() => {
                    setSelectedNumber(null);
                    setSelectedColor("");
                    setSelectedSize("");
                  }}
                  className="flex-1 py-3 px-4 bg-[#1A1A2E] border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-white font-medium ${
                    agreed && contractMoney >= 10 && contractMoney <= 100000
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
                      : "bg-gray-600/50 cursor-not-allowed"
                  }`}
                  disabled={
                    !agreed || contractMoney < 10 || contractMoney > 100000
                  }
                  onClick={handleBet}
                >
                  Place Bet
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Design - Centered Modal */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity hidden md:flex"
            onClick={() => {
              setSelectedNumber(null);
              setSelectedColor("");
              setSelectedSize("");
            }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 hidden md:flex">
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#252547] to-[#1A1A2E] rounded-2xl shadow-2xl overflow-hidden border border-purple-500/40">
              {/* Close button */}
              <button
                onClick={() => {
                  setSelectedNumber(null);
                  setSelectedColor("");
                  setSelectedSize("");
                }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A2E] text-gray-400 hover:text-white transition-colors z-10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              {/* Header */}
              <div className="flex flex-col items-center px-5 pt-6 pb-4 border-b border-purple-500/10">
                <span className="text-sm text-gray-300 font-semibold mb-2">
                  WinGo {activeTab}
                </span>
                <h2
                  className={`text-lg font-bold bg-[#1A1A2E] rounded-lg px-4 py-2 mb-2 
                    ${selectedColor === "green" ? "text-green-400" : ""}
                    ${selectedColor === "red" ? "text-red-400" : ""}
                    ${selectedColor === "voilet" ? "text-purple-400" : ""}
                    ${selectedColor === "" ? "text-white" : ""}
                  `}
                >
                  {selectedNumber !== null
                    ? `Select ${selectedNumber}`
                    : selectedColor
                    ? `Select ${
                        selectedColor.charAt(0).toUpperCase() +
                        selectedColor.slice(1)
                      }`
                    : `Select ${selectedSize}`}
                </h2>
              </div>
              {/* Body */}
              <div className="px-6 py-6 space-y-4">
                {/* Balance & Quick Amounts */}
                <div>
                  <label className="text-sm text-gray-300 font-semibold mb-2 block">
                    Balance
                  </label>
                  <div className="flex gap-2 mb-3">
                    {[10, 50, 100, 1000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={`px-4 py-2 rounded-lg font-bold text-sm border transition-colors ${
                          contractMoney === amt
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-600"
                            : "bg-[#18182a] text-purple-300 border-purple-500/30 hover:bg-purple-500/20"
                        }`}
                        onClick={() => setContractMoney(amt)}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                  <input
                    min={10}
                    step={10}
                    type="number"
                    placeholder="Enter amount (Minimum ₹10)"
                    value={contractMoney || ""}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value > 100000) {
                        setContractMoney(100000);
                      } else {
                        setContractMoney(value);
                      }
                    }}
                    className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500 text-lg font-semibold"
                  />
                </div>
                {/* Total Amount Paragraph */}
                <p className="text-base font-semibold text-purple-300">
                  Total amount: ₹{contractMoney || 0}
                </p>
                {/* I agree and rules */}
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center mr-3 cursor-pointer ${
                      agreed
                        ? "bg-purple-600"
                        : "bg-[#1A1A2E] border border-purple-500/20"
                    }`}
                    onClick={() => setAgreed(!agreed)}
                  >
                    {agreed && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <label
                    className="text-sm text-gray-300 cursor-pointer"
                    onClick={() => setAgreed(!agreed)}
                  >
                    I agree{" "}
                    <span className="text-purple-400">
                      terms and conditions
                    </span>
                  </label>
                </div>
              </div>
              {/* Buttons */}
              <div className="px-6 pb-6 pt-4 border-t border-purple-500/10 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedNumber(null);
                    setSelectedColor("");
                    setSelectedSize("");
                  }}
                  className="flex-1 py-3 px-4 bg-[#1A1A2E] border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-white font-medium ${
                    agreed && contractMoney >= 10 && contractMoney <= 100000
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
                      : "bg-gray-600/50 cursor-not-allowed"
                  }`}
                  disabled={
                    !agreed || contractMoney < 10 || contractMoney > 100000
                  }
                  onClick={handleBet}
                >
                  Place Bet
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Popup for win/loss */}
      {winner && betHistory && popup === "won" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm mx-auto bg-gradient-to-b from-green-800 to-green-500 rounded-3xl overflow-visible shadow-2xl animate-fadeIn border-t-8 border-green-600 pt-16">
            {/* Close button */}
            <button
              onClick={() => setWinner(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-green-600 hover:text-green-800 transition-colors z-10 border border-green-200 shadow"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            {/* Happy emoji or medal */}
            <div className="flex justify-center absolute left-1/2 -translate-x-1/2 -top-14 z-20">
              <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center shadow-lg border-4 border-green-200 backdrop-blur">
                <span className="text-5xl">🎉</span>
              </div>
            </div>
            {/* Header */}
            <div className="flex flex-col items-center pt-14 pb-2">
              <h2 className="text-2xl font-bold text-green-100 mb-2 drop-shadow">
                Congratulations!
              </h2>
              {/* Lottery results tags */}
              <div className="flex gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-600 text-white shadow">
                  {result?.result?.winning_color
                    ? result.result.winning_color.charAt(0).toUpperCase() +
                      result.result.winning_color.slice(1)
                    : "-"}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-400 text-white shadow">
                  {result?.result?.winning_number ?? "-"}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-300 text-white shadow">
                  {result?.result?.winning_size
                    ? result.result.winning_size.toUpperCase()
                    : "-"}
                </span>
              </div>
              <div className="text-xs text-green-200 mb-2">
                Period: WinGo {result?.duration ?? activeTab} ·{" "}
                {result?.period_number ?? "-"}
              </div>
            </div>
            {/* WIN ticket area */}
            <div
              className="relative flex flex-col items-center bg-gradient-to-b from-white/95 to-green-100/80 mx-6 mt-2 mb-4 shadow-lg rounded-2xl"
              style={{ boxShadow: "0 8px 32px 0 rgba(31, 135, 31, 0.15)" }}
            >
              <div className="w-full flex flex-col items-center py-8 px-2">
                <div
                  className="text-4xl font-extrabold text-green-700 mb-2 tracking-wider uppercase"
                  style={{
                    fontFamily: "monospace, sans-serif",
                    letterSpacing: "0.1em",
                  }}
                >
                  WIN
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  ₹{betHistory.amountReceived}
                </div>
                <div className="text-xs text-green-400 mt-1">
                  Period: WinGo {result?.duration ?? activeTab} ·{" "}
                  {result?.period_number ?? "-"}
                </div>
              </div>
              {/* Printout wavy SVG at the bottom */}
              <svg
                viewBox="0 0 320 20"
                width="100%"
                height="20"
                className="block"
                style={{ display: "block" }}
              >
                <path
                  d="M0 10 Q 20 20 40 10 T 80 10 T 120 10 T 160 10 T 200 10 T 240 10 T 280 10 T 320 10 V20 H0Z"
                  fill="#fff"
                />
              </svg>
            </div>
            {/* Auto close message */}
            <div className="flex items-center justify-center pb-4">
              <span className="text-xs text-green-200">
                3 seconds auto close
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Loss popup */}
      {winner && betHistory && popup === "lost" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm mx-auto bg-gradient-to-b from-red-800 to-red-500 rounded-3xl overflow-visible shadow-2xl animate-fadeIn border-t-8 border-red-600 pt-16">
            {/* Close button */}
            <button
              onClick={() => setWinner(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-red-600 hover:text-red-800 transition-colors z-10 border border-red-200 shadow"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            {/* Sad emoji or medal */}
            <div className="flex justify-center absolute left-1/2 -translate-x-1/2 -top-14 z-20">
              <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center shadow-lg border-4 border-red-200 backdrop-blur">
                <span className="text-5xl">🥲</span>
              </div>
            </div>
            {/* Header */}
            <div className="flex flex-col items-center pt-14 pb-2">
              <h2 className="text-2xl font-bold text-red-100 mb-2 drop-shadow">
                Sorry, you lost!
              </h2>
              {/* Lottery results tags */}
              <div className="flex gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-600 text-white shadow">
                  {result?.result?.winning_color
                    ? result.result.winning_color.charAt(0).toUpperCase() +
                      result.result.winning_color.slice(1)
                    : "-"}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-400 text-white shadow">
                  {result?.result?.winning_number ?? "-"}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-300 text-white shadow">
                  {result?.result?.winning_size
                    ? result.result.winning_size.toUpperCase()
                    : "-"}
                </span>
              </div>
              <div className="text-xs text-red-200 mb-2">
                Period: WinGo {result?.duration ?? activeTab} ·{" "}
                {result?.period_number ?? "-"}
              </div>
            </div>
            {/* LOSS ticket area */}
            <div
              className="relative flex flex-col items-center bg-gradient-to-b from-white/95 to-red-100/80 mx-6 mt-2 mb-4 shadow-lg rounded-2xl"
              style={{ boxShadow: "0 8px 32px 0 rgba(135, 31, 31, 0.15)" }}
            >
              <div className="w-full flex flex-col items-center py-8 px-2">
                <div
                  className="text-4xl font-extrabold text-red-700 mb-2 tracking-wider uppercase"
                  style={{
                    fontFamily: "monospace, sans-serif",
                    letterSpacing: "0.1em",
                  }}
                >
                  LOSS
                </div>
                <div className="text-xs text-red-400 mt-1">
                  Period: WinGo {result?.duration ?? activeTab} ·{" "}
                  {result?.period_number ?? "-"}
                </div>
              </div>
              {/* Printout wavy SVG at the bottom */}
              <svg
                viewBox="0 0 320 20"
                width="100%"
                height="20"
                className="block"
                style={{ display: "block" }}
              >
                <path
                  d="M0 10 Q 20 20 40 10 T 80 10 T 120 10 T 160 10 T 200 10 T 240 10 T 280 10 T 320 10 V20 H0Z"
                  fill="#fff"
                />
              </svg>
            </div>
            {/* Auto close message */}
            <div className="flex items-center justify-center pb-4">
              <span className="text-xs text-red-200">3 seconds auto close</span>
            </div>
          </div>
        </div>
      )}

      {/* Add error message display */}
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-200 animate-fadeIn">
            <div className="flex items-center">
              <X className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default BigSmall;
