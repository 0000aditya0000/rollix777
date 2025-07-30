import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  latestResult5D,
  getPeriod5D,
  placeBet5D,
  resultHistory5D,
} from "../lib/services/wingo5dGameService";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { toast } from "react-hot-toast";
import { getTimerData } from "../lib/services/BigSmallServices";

function Wingo5dGame() {
  const navigate = useNavigate();
  const { wallets } = useSelector((state: RootState) => state.wallet);
  const userId = Number(localStorage.getItem("userId")) || 0;
  const [betHistory, setBetHistory] = useState([]);
  const [selectedTimer, setSelectedTimer] = useState<number | null>(1);
  const [selectedTab, setSelectedTab] = useState("A");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [activeTimer, setActiveTimer] = useState(1);
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const [periodNumber, setPeriodNumber] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [selectedBalance, setSelectedBalance] = useState(10);
  const [timers, setTimers] = useState<Record<1 | 3 | 5 | 10, number>>({
    1: 0,
    3: 0,
    5: 0,
    10: 0,
  });

  const timerOptions: { label: string; value: TimerKey }[] = [
    { label: "1 Min", value: 1 },
    { label: "3 Min", value: 3 },
    { label: "5 Min", value: 5 },
    { label: "10 Min", value: 10 },
  ];

  const intervalRefs = useRef<{ [key: number]: NodeJS.Timeout | null }>({});
  const isFetchingRef = useRef<{ [key: number]: boolean }>({});
  const [triggeredTimers, setTriggeredTimers] = useState<Set<number>>(
    new Set()
  );

  // Add period numbers for each timer
  const [periodNumbers, setPeriodNumbers] = useState({
    1: 0,
    3: 0,
    5: 0,
    10: 0,
  });

  // Also add these helper functions before your return statement
  const calculateTotalAmount = () => {
    return selectedBalance * currentQuantity * currentMultiplier;
  };

  const getINRWallet = () => {
    return wallets.find((wallet) => wallet.cryptoname === "INR");
  };

  const getINRBalance = () => {
    const inrWallet = getINRWallet();
    return inrWallet ? parseFloat(inrWallet.balance) : 0;
  };

  const canPlaceBet = () => {
    const totalAmount = calculateTotalAmount();
    const currentBalance = getINRBalance();
    return currentBalance >= totalAmount;
  };

  const getTimerString = (timer: number) => `${timer}min`;

  const [lotteryResults, setLotteryResults] = useState([
    { number: 4, letter: "A" },
    { number: 6, letter: "B" },
    { number: 0, letter: "C" },
    { number: 8, letter: "D" },
    { number: 6, letter: "E" },
  ]);

  const getBetType = (value: any) => {
    if (!value) return "";

    const lower = value.toLowerCase();

    // Handle the specific button values
    if (lower === "big2") return "high";
    if (lower === "small2") return "low";
    if (lower === "odd2") return "odd";
    if (lower === "even2") return "even";

    // Handle number values
    if (!isNaN(value)) return "number";

    return "";
  };

  const totalSum = lotteryResults.reduce(
    (sum, result) => sum + result.number,
    0
  );

  const fetchPeriodNumber = async (timer: number) => {
    try {
      const timerStr = getTimerString(timer);
      const data = await getPeriod5D({ mins: timerStr });

      if (data && typeof data.period_number === "number") {
        setPeriodNumbers((prev) => ({
          ...prev,
          [timer]: data.period_number,
        }));

        if (timer === activeTimer) {
          setPeriodNumber(data.period_number);
        }
        return data.period_number;
      } else {
        console.error("Invalid period number received from API:", data);
        throw new Error("Invalid period number received from API");
      }
    } catch (error) {
      console.error(`Failed to fetch period number for ${timer}min:`, error);
      throw error;
    }
  };

  const formatTime = (seconds: any) => {
    if (typeof seconds !== "number" || isNaN(seconds)) {
      return "00:00";
    }

    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Add fetchTimerData function
  const fetchTimerData = async (timer: any) => {
    if (isFetchingRef.current[timer]) {
      return;
    }

    try {
      isFetchingRef.current[timer] = true;

      await fetchPeriodNumber(timer);

      const timerStr = getTimerString(timer);
      const data = await getTimerData(timerStr);

      let remainingSeconds;
      if (timer === 1) {
        remainingSeconds = data.remainingTimeSeconds;
      } else {
        remainingSeconds =
          data.remainingTimeMinutes * 60 + data.remainingTimeSeconds;
      }

      if (typeof remainingSeconds === "number" && !isNaN(remainingSeconds)) {
        startLocalCountdown(timer, remainingSeconds);
      } else {
        console.error(`Invalid timer data received for ${timer}min:`, data);
        throw new Error("Invalid timer data received");
      }
    } catch (err) {
      console.error(`Failed to fetch ${timer}min timer:`, err);
      startLocalCountdown(
        timer,
        timer === 1 ? 60 : timer === 3 ? 180 : timer === 5 ? 300 : 600
      );
    } finally {
      isFetchingRef.current[timer] = false;
    }
  };

  // Add startLocalCountdown function
  const startLocalCountdown = (timer: any, initialTime: any) => {
    if (typeof initialTime !== "number" || isNaN(initialTime)) {
      console.error(`Invalid initial time for ${timer}min:`, initialTime);
      return;
    }

    // Clear existing interval for this timer
    if (intervalRefs.current[timer]) {
      clearInterval(intervalRefs.current[timer]);
    }

    // Reset the triggered state for this timer
    setTriggeredTimers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(timer);
      return newSet;
    });

    // Set initial time
    setTimers((prev) => ({
      ...prev,
      [timer]: Math.floor(initialTime),
    }));

    let isProcessing = false;

    // Start local countdown
    intervalRefs.current[timer] = setInterval(async () => {
      setTimers((current) => {
        const currentTime = current[timer];
        if (currentTime <= 1) {
          if (!isProcessing && !triggeredTimers.has(timer)) {
            isProcessing = true;
            console.log(`Timer ended for ${timer}min, making API calls`);

            setTriggeredTimers((prev) => new Set(prev).add(timer));

            fetchPeriodNumber(timer)
              .then((newPeriodNumber) => {
                if (newPeriodNumber && !isNaN(newPeriodNumber)) {
                  return generateNewLotteryResult(
                    getTimerString(timer),
                    newPeriodNumber
                  );
                } else {
                  throw new Error("Invalid period number received");
                }
              })
              .then(() => {
                console.log(
                  `API calls completed for ${timer}min, fetching new timer data`
                );
                return fetchTimerData(timer);
              })
              .catch((error) => {
                console.error(
                  `Error in timer end process for ${timer}min:`,
                  error
                );
                setTriggeredTimers((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(timer);
                  return newSet;
                });
              })
              .finally(() => {
                isProcessing = false;
              });
          }
          return { ...current, [timer]: 0 };
        }
        return { ...current, [timer]: currentTime - 1 };
      });
    }, 1000);
  };

  const generateNewLotteryResult = async (
    timerStr: string,
    currentPeriodNumber: number
  ) => {
    setIsAnimating(true);

    const periodNumber = currentPeriodNumber - 1;
    try {
      const res = await latestResult5D({
        timer: timerStr,
        periodNumber,
      });

      if (res?.success && res.result) {
        const result = res.result;

        const formatted = [
          { letter: "A", number: result.digit_a },
          { letter: "B", number: result.digit_b },
          { letter: "C", number: result.digit_c },
          { letter: "D", number: result.digit_d },
          { letter: "E", number: result.digit_e },
        ];

        setLotteryResults(formatted);
      }
    } catch (err) {
      console.error("Error fetching latest result:", err);
    } finally {
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const timerStr = getTimerString(activeTimer);

      try {
        const periodRes = await getPeriod5D({ mins: timerStr });
        console.log(periodRes, "period number");
        const periodNumber = periodRes?.period_number;
        setPeriodNumber(periodNumber);

        if (periodNumber) {
          generateNewLotteryResult(timerStr, periodNumber);
        }

        // Fetch bet history on component load
        const historyRes = await resultHistory5D({
          timer: timerStr,
          userId,
        });

        if (historyRes?.success) {
          // Based on your Postman response, use 'bets' instead of 'data'
          setBetHistory(historyRes.results || historyRes.results || []);
        }
      } catch (err) {
        console.error("Failed to fetch period or history:", err);
      }
    };

    init();

    const interval = setInterval(init, activeTimer * 60000);
    return () => clearInterval(interval);
  }, [activeTimer, userId]);

  // Timer countdown effect
  useEffect(() => {
    // Initial fetch for all timers
    [1, 3, 5, 10].forEach((timer) => {
      fetchTimerData(timer);
      fetchPeriodNumber(timer);
    });

    // Cleanup intervals when component unmounts
    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, []);

  const handlePlaceBet = async () => {
    const totalAmount = calculateTotalAmount();

    if (!canPlaceBet()) {
      toast.error("Insufficient INR wallet balance!");
      return;
    }

    const inrWallet = getINRWallet();
    if (!inrWallet) {
      toast.error("INR wallet not found!");
      return;
    }

    const betType = getBetType(selectedBet);

    const payload = {
      userId,
      position: selectedTab,
      betType: betType,
      betValue: betType === "number" ? selectedBet : "", // Only send betValue for numbers
      amount: totalAmount,
      periodNumber,
      timer: getTimerString(activeTimer),
    };

    console.log("Sending bet payload:", payload); // Debug log

    try {
      const res = await placeBet5D(payload);

      if (res?.success) {
        toast.success("Bet placed successfully!");
        // Reset selections
        setSelectedBet(null);
        setCurrentQuantity(1);
        setCurrentMultiplier(1);
        setSelectedBalance(10);

        // Refresh bet history
        const historyRes = await resultHistory5D({
          timer: getTimerString(activeTimer),
          userId,
        });

        if (historyRes?.success) {
          setBetHistory(historyRes.bets || historyRes.data || []);
        }
      } else {
        toast.error(res.message || "Failed to place bet.");
      }
    } catch (error) {
      console.error("Error placing bet:", error);
      toast.error("An error occurred while placing the bet.");
    }
  };

  const handleClose = () => setShowHowToPlay(false);
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-start px-2 sm:px-4 py-2 sm:py-6">
        {/* LEFT SIDE: Main Wingo Content */}

        <div className="w-full lg:w-[58%]">
          {/* Timer Buttons Section */}
          <div className="w-full max-w-3xl mx-auto mb-6 mt-20 px-2 sm:px-4">
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5">
              {timerOptions.map((timer) => (
                <button
                  key={timer.value}
                  onClick={() => {
                    setSelectedTimer(timer.value);
                    setActiveTimer(timer.value);
                  }}
                  className={`min-w-[90px] px-5 py-3 rounded-xl text-base font-semibold border transition-all ${
                    selectedTimer === timer.value
                      ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                      : "bg-transparent text-gray-300 border-purple-400 hover:border-purple-500 hover:bg-purple-600/20"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <span>{timer.label}</span>
                    <span className="text-sm mt-1">
                      {formatTime(timers[timer.value])}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Lottery Results Section */}
          <div className="bg-[#1F1F30] rounded-xl shadow-lg p-3 sm:p-6 border border-[#2D2D45] mx-2 sm:max-w-3xl sm:mx-auto mb-4 sm:mb-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Lottery Results
              </h2>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              {/* Numbers */}
              <div className="flex gap-1 sm:gap-2">
                {lotteryResults.map((result, index) => (
                  <div key={index} className="text-center">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#2A2A3E] border border-[#3D3D5C] rounded-lg flex items-center justify-center">
                      <span className="text-lg sm:text-xl font-bold text-white">
                        {result.number}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400 mt-1 block">
                      {result.letter}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Sum */}
              <div className="text-center">
                <div className="w-16 h-10 sm:w-20 sm:h-14 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center mb-2 sm:mb-6">
                  <span className="text-lg sm:text-2xl font-bold text-white">
                    {totalSum}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Period Section */}
          <div className="bg-[#1F1F30] rounded-xl shadow-lg p-3 sm:p-6 border border-[#2D2D45] mx-2 sm:max-w-3xl sm:mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-400 mb-1">Period</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg sm:text-2xl font-bold text-white truncate">
                    {periodNumber}
                  </span>
                  <button className="flex items-center gap-1 bg-[#2A2A3E] text-purple-400 border border-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#3A3A4E] transition whitespace-nowrap">
                    <button onClick={() => setShowHowToPlay(true)}>
                      How to play
                    </button>
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm text-gray-400 mb-1">
                  Time remaining
                </p>
                <div className="flex items-center gap-1 text-2xl sm:text-3xl font-bold">
                  <span className="text-purple-800">
                    {formatTime(timers[activeTimer])}
                  </span>
                  {/* <span className="text-gray-400">:</span> */}
                  {/* <span className="text-purple-800">
                    {timeRemaining.seconds.toString().padStart(2, "0")}
                  </span> */}
                </div>
              </div>
            </div>

            {/* Animated Lottery Display */}
            <div
              className={`relative bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl p-3 sm:p-4 shadow-xl transform transition-all duration-500 mt-4 sm:mt-6 w-full max-w-xs sm:max-w-md mx-auto ${
                isAnimating ? "scale-105" : "scale-100"
              }`}
            >
              <div className="flex justify-center space-x-1 sm:space-x-2">
                {lotteryResults.map((result, index) => (
                  <div
                    key={result.letter}
                    className={`relative transform transition-all duration-300 ${
                      isAnimating ? "animate-pulse" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-12 h-16 sm:w-16 sm:h-20 rounded-lg flex items-center justify-center shadow-md ${
                        index === 0 ? "bg-purple-700" : "bg-[#2D2D54]"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                          index === 0 ? "bg-purple-400" : "bg-white"
                        } shadow-inner`}
                      >
                        <span
                          className={`text-lg sm:text-2xl font-bold ${
                            index === 0 ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {isAnimating ? "?" : result.number}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isAnimating && (
                <div className="absolute inset-0 bg-purple-500/10 rounded-xl animate-pulse pointer-events-none"></div>
              )}
            </div>
          </div>

          {/* Betting Tabs */}
          <div className="bg-[#1F1F30] rounded-xl shadow-lg p-3 sm:p-4 border border-[#2D2D45] mx-2 sm:max-w-3xl sm:mx-auto mt-4 sm:mt-8">
            <div className="flex justify-between border-b border-[#33334a] mb-4 overflow-x-auto">
              {["A", "B", "C", "D", "E", "SUM"].map((label, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTab(label)}
                  className={`text-xs sm:text-sm font-bold px-2 sm:px-4 py-2 transition whitespace-nowrap ${
                    selectedTab === label
                      ? "text-white border-b-2 border-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Selector Grid */}
            {
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {["Big2", "Small2", "Odd2", "Even2"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedBet(type)}
                    className={`py-2 rounded-md text-center transition-all duration-200 text-xs sm:text-sm ${
                      selectedBet === type
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-[#2A2A3E] text-white hover:bg-purple-600"
                    }`}
                  >
                    {type}
                  </button>
                ))}

                {/* Number Buttons */}
                {Array.from({ length: 10 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedBet(i.toString())}
                    className={`py-2 rounded-md text-center transition-all duration-200 text-xs sm:text-sm ${
                      selectedBet === i.toString()
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-[#2A2A3E] text-white hover:bg-purple-600"
                    }`}
                  >
                    {i} <span className="text-xs text-gray-400 ml-1">9X</span>
                  </button>
                ))}
              </div>
            }
            {/* Bet Controls Section */}
            {selectedBet && (
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                {/* Balance Options */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <p className="text-white text-sm mb-1 sm:mb-2">Balance</p>
                  <div className="flex gap-2 sm:gap-3">
                    {[1, 10, 100, 1000].map((val) => (
                      <button
                        key={val}
                        onClick={() => setSelectedBalance(val)}
                        className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md transition text-xs sm:text-sm ${
                          selectedBalance === val
                            ? "bg-purple-600 text-white"
                            : "bg-[#2A2A3E] text-white hover:bg-purple-600"
                        }`}
                      >
                        {val === 1000 ? "1K" : val}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-white text-sm mb-2">Quantity</p>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentQuantity(Math.max(1, currentQuantity - 1))
                        }
                        className="bg-[#2A2A3E] text-white px-3 py-1 rounded-md text-lg hover:bg-purple-600"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={currentQuantity}
                        readOnly
                        className="bg-[#2A2A3E] w-14 text-center text-white px-3 py-1 rounded-md border border-[#3D3D5C]"
                      />
                      <button
                        onClick={() => setCurrentQuantity(currentQuantity + 1)}
                        className="bg-[#2A2A3E] text-white px-3 py-1 rounded-md text-lg hover:bg-purple-600"
                      >
                        +
                      </button>
                    </div>

                    {/* Multiplier Options */}
                    <div className="grid grid-cols-3 sm:flex gap-1 sm:gap-2 w-full sm:w-auto">
                      {["X1", "X5", "X10", "X20", "X50", "X100"].map(
                        (label, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              setCurrentMultiplier(
                                parseInt(label.replace("X", ""))
                              )
                            }
                            className={`px-2 sm:px-3 py-1 rounded-md border text-xs sm:text-sm ${
                              currentMultiplier ===
                              parseInt(label.replace("X", ""))
                                ? "bg-purple-600 text-white border-purple-600"
                                : "bg-[#2A2A3E] text-white hover:bg-purple-600"
                            }`}
                          >
                            {label}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between items-center mt-4 bg-[#2A2A3E] p-3 rounded-md">
                  <button
                    onClick={handlePlaceBet}
                    disabled={!canPlaceBet()}
                    className={`border rounded-md px-3 sm:px-4 py-1 text-xs sm:text-sm ${
                      canPlaceBet()
                        ? "text-white border-gray-500 hover:bg-purple-700"
                        : "text-gray-400 border-gray-700 bg-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Place Bet
                  </button>

                  {/* Add this before the Total Amount section */}
                  <div className="bg-[#2A2A3E] p-3 rounded-md mb-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">INR Wallet Balance:</span>
                      <span className="text-white font-semibold">
                        ₹{getINRBalance().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <span className="text-white font-semibold text-xs sm:text-sm">
                    Total amount
                    <span className="text-gray-400 ml-2">
                      ₹{calculateTotalAmount().toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Table - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block w-full lg:w-[42%] h-[500px] bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden mt-20 mr-10">
          <div className="p-4 border-b border-purple-500/10">
            <h2 className="text-xl font-bold text-white">History</h2>
          </div>

          <div className="overflow-y-auto h-[calc(100%-56px)]">
            {betHistory && betHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full table-fixed text-sm sm:text-base">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm border-b border-purple-500/10">
                      <th className="py-4 px-6">Period</th>
                      <th className="py-4 px-6">Result</th>
                      <th className="py-4 px-6">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {betHistory?.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-purple-500/10 text-white hover:bg-purple-500/5"
                      >
                        <td className="py-4 px-6">{row.period_number}</td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            {[
                              row?.digit_a,
                              row?.digit_b,
                              row?.digit_c,
                              row?.digit_d,
                              row?.digit_e,
                            ].map((num, index) => (
                              <div
                                key={index}
                                className="w-8 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm font-medium text-white bg-[#2A2A3E]"
                              >
                                {num}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold">
                          {row.sum_total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-gray-400 text-lg mb-2">📊</div>
                  <p className="text-gray-400 text-sm">No history available</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Play some games to see your history here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile History Section - Only visible on mobile */}
        <div className="block lg:hidden w-full bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden mx-2 mt-4">
          <div className="p-3 border-b border-purple-500/10">
            <h2 className="text-lg font-bold text-white">History</h2>
          </div>

          <div className="max-h-96 overflow-y-auto mb-20">
            {betHistory && betHistory.length > 0 ? (
              <div className="p-3 space-y-2">
                {betHistory.map((row, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1F1F30] border border-purple-500/10 rounded-lg p-3"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400">Period</span>
                      <span className="text-xs text-white font-mono">
                        {row.period_number}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {[
                          row.digit_a,
                          row.digit_b,
                          row.digit_c,
                          row.digit_d,
                          row.digit_e,
                        ].map((num, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-xs font-medium text-white bg-[#2A2A3E]"
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-purple-400">
                        Total: {row.sum_total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <div className="text-center p-4">
                  <div className="text-gray-400 text-lg mb-2">📊</div>
                  <p className="text-gray-400 text-sm">No history available</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Play some games to see your history here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showHowToPlay && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#1F1F30] w-full max-w-3xl rounded-xl p-4 sm:p-6 shadow-lg border border-[#2D2D45] overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                5D Lottery Game Rules
              </h2>
              <button onClick={handleClose} className="text-white text-2xl">
                &times;
              </button>
            </div>

            {/* Game Explanation */}
            <div className="text-gray-300 text-xs sm:text-sm space-y-2 mb-6">
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Draw instructions:</strong>
                </li>
                <li>
                  5-digit number (00000-99999) will be drawn randomly in each
                  period
                </li>
                <li>Example: The draw number for this period is 12345</li>
                <li>A = 1, B = 2, C = 3, D = 4, E = 5</li>
                <li>SUM = A + B + C + D + E = 15</li>
              </ul>

              <ul className="list-disc list-inside space-y-1 mt-4">
                <li>
                  <strong>How to play:</strong>
                </li>
                <li>
                  Players can specify six outcomes of betting: A, B, C, D, E,
                  and the SUM
                </li>
                <li>
                  A, B, C, D, E can be purchased as:
                  <ul className="list-disc list-inside ml-4">
                    <li>Number: 0 1 2 3 4 5 6 7 8 9</li>
                    <li>Low: 0 1 2 3 4</li>
                    <li>High: 5 6 7 8 9</li>
                    <li>Odd: 1 3 5 7 9</li>
                    <li>Even: 0 2 4 6 8</li>
                  </ul>
                </li>
                <li>
                  SUM (A+B+C+D+E) can be purchased as:
                  <ul className="list-disc list-inside ml-4">
                    <li>Low: 0–22</li>
                    <li>High: 23–45</li>
                    <li>Odd: 1, 3, ..., 43, 45</li>
                    <li>Even: 0, 2, ..., 42, 44</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Wingo5dGame;
