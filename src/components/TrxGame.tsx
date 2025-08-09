import React, { useEffect, useState } from "react";
import {
  generateResult,
  generatePeriodNumber,
  placeBetTrx,
  resultHistoryTrx,
  betHistoryTrx,
} from "../lib/services/TRXservice";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { X } from "lucide-react";

const TRXGame: React.FC = () => {
  const period = "20250730103010482";
  const [latestResult, setLatestResult] = useState(0);
  const [periodNumber, setPeriodNumber] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [baseAmount, setBaseAmount] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const userId = Number(localStorage.getItem("userId")) || 0;
  const { wallets } = useSelector((state: RootState) => state.wallet);
  const [selectedBalance, setSelectedBalance] = useState(10);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [trxHistory, setTrxHistory] = useState([]);
  const [winner, setWinner] = useState<boolean>(false);
  const [popup, setPopup] = useState<"won" | "lost" | null>(null);
  const [latestBetResult, setLatestBetResult] = useState<any>(null);

  const totalAmount = baseAmount * quantity * multiplier;

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          getlatestResult();
          getResultHistory();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const checkWinLose = async (gameResult: any) => {
    try {
      // Fetch the latest bet result to check if player won or lost
      const historyRes = await betHistoryTrx("1min", userId);

      console.log(historyRes, "historyRes");

      if (historyRes?.success && historyRes.bets?.length > 0) {
        const latestBet = historyRes.bets[0];
        console.log(latestBet, "latestbet");
        setLatestBetResult(latestBet);

        // Check if the latest bet matches the current result period
        if (latestBet.period_number === gameResult.period_number) {
          // Check win/lose status
          if (latestBet.status === "won") {
            setWinner(true);
            setPopup("won");

            setTimeout(() => {
              setWinner(false);
              setPopup(null);
            }, 5000);
          } else if (latestBet.status === "lost") {
            setWinner(true);
            setPopup("lost");

            setTimeout(() => {
              setWinner(false);
              setPopup(null);
            }, 5000);
          }
        }
      }
    } catch (error) {
      console.error("Error checking win/lose:", error);
    }
  };

  const getlatestResult = async () => {
    try {
      const currentPeriod = await generatePeriodNumber({ mins: "1min" });
      const periodNumber = currentPeriod.data.period_number;
      setPeriodNumber(periodNumber);

      const result = await generateResult("1min", periodNumber - 1);
      console.log(result, "result");
      setLatestResult(result);

      // Check if player won or lost after getting the result
      if (result?.result) {
        console.log("Checking win/lose for result:", result.result);
        await checkWinLose(result.result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getResultHistory = async () => {
    try {
      const result = await resultHistoryTrx("1min");
      if (Array.isArray(result?.results)) {
        setTrxHistory(result.results);
      } else {
        console.warn("Unexpected history data format", result);
        setTrxHistory([]);
      }
    } catch (error) {
      console.error("Failed to fetch TRX history:", error);
      setTrxHistory([]);
    }
  };

  useEffect(() => {
    getlatestResult();
    getResultHistory();
  }, []);

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

  const placeBet = async () => {
    if (!canPlaceBet()) {
      toast.error("Insufficient INR wallet balance!");
      return;
    }

    const inrWallet = getINRWallet();
    if (!inrWallet) {
      toast.error("INR wallet not found!");
      return;
    }

    let betType = "";
    let betValue = "";

    if (["Green", "Violet", "Red"].includes(selectedNumber!)) {
      betType = "color";
      betValue = selectedNumber!.toLowerCase();
    } else if (!isNaN(Number(selectedNumber))) {
      betType = "number";
      betValue = selectedNumber!;
    } else if (["Big", "Small"].includes(selectedNumber!)) {
      betType = "size";
      betValue = selectedNumber!.toLowerCase();
    } else {
      console.error("Invalid bet type selected");
      return;
    }

    const payload = {
      userId,
      betType,
      betValue: selectedNumber?.toLowerCase() || "",
      amount: totalAmount,
      periodNumber,
      timer: "1min",
    };

    try {
      const res = await placeBetTrx(payload);
      console.log("Bet placed:", res);
      if (res.success) {
        toast.success("Bet placed successfully!");
        setSelectedNumber(null);
        setCurrentQuantity(1);
        setCurrentMultiplier(1);
        setSelectedBalance(10);

        // Refresh bet history - Fix: Use consistent property name
        const historyRes = await resultHistoryTrx("1min");

        if (historyRes?.success) {
          // Use the same property name as in the initial load (historyRes.results)
          setTrxHistory(historyRes.results || []);
        }
      } else {
        toast.error(res.message || "Failed to place bet.");
      }
    } catch (err) {
      console.error("Error placing bet", err);
    }
  };

  // console.log(latestResult);
  const hashArray = latestResult?.result?.hash_value
    ? latestResult.result.hash_value.slice(-5).split("")
    : [];

  const getTimerString = (timer: string) => {
    return timer === "1min" ? "1 Min" : timer;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 items-start px-2 sm:px-4 py-2 sm:py-6 mt-20">
      {/* Left: Game Section */}
      <div className="w-full lg:w-[58%]">
        {/* Main Game Card */}
        <div className="bg-[#1F1F30] border border-[#2D2D45] rounded-xl p-6 shadow-lg text-white mb-4">
          {/* Header Row */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <button className="bg-[#2A2A3E] border border-[#3D3D5C] px-3 py-1 rounded-full text-gray-300 hover:bg-[#3A3A4E] transition text-sm">
                Period
              </button>
              <button className="bg-[#2A2A3E] border border-[#3D3D5C] px-3 py-1 rounded-full text-purple-400 hover:bg-[#3A3A4E] transition text-sm">
                How to play
              </button>
            </div>
            <button className="text-gray-400 hover:text-white transition text-sm">
              Public Chain Query
            </button>
          </div>

          {/* Period & Timer */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-white font-mono text-lg">{periodNumber}</span>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">Draw time</span>
              <span className="text-purple-400 font-bold text-xl">
                {/* {countdown.minutes} */}
                <span className="text-purple-400 font-bold text-xl">
                  {minutes}
                </span>
                <span className="text-gray-400">:</span>
                <span className="text-purple-400 font-bold text-xl">
                  {seconds}
                </span>
              </span>
            </div>
          </div>

          {/* Dotted Divider */}
          <div className="border-t border-dashed border-[#2D2D45] my-6" />

          {/* Lottery Balls */}
          <div className="flex justify-center gap-4 mb-6">
            {hashArray.map((val, idx) => (
              <div
                key={idx}
                className="w-16 h-16 rounded-full bg-[#2A2A3E] border border-[#3D3D5C] flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
              >
                <span className="text-2xl font-bold text-white">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Buttons */}

        {/* Color Selection */}
        <div className="bg-[#1F1F30] border border-[#2D2D45] rounded-xl p-6 shadow-lg text-white mb-4">
          <div className="grid grid-cols-3 gap-4">
            {["Green", "Violet", "Red"].map((color) => {
              const baseColor =
                color === "Green"
                  ? "bg-green-600 hover:bg-green-700"
                  : color === "Violet"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-red-600 hover:bg-red-700";

              return (
                <button
                  key={color}
                  onClick={() => setSelectedNumber(color)}
                  className={`py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 shadow-md ${baseColor} ${
                    selectedNumber === color
                      ? "border-2 border-white transform scale-110"
                      : ""
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>

        {/* Numbers 0-9 */}
        <div className="bg-[#1F1F30] border border-[#2D2D45] rounded-xl p-6 shadow-lg text-white mb-4">
          <div className="grid grid-cols-5 gap-3 max-w-md mx-auto">
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i}
                onClick={() => setSelectedNumber(i.toString())}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 shadow-md ${
                  selectedNumber === i.toString()
                    ? "bg-purple-600 text-white border-2 border-purple-400 transform scale-110"
                    : "bg-[#2A2A3E] text-white border border-[#3D3D5C] hover:bg-purple-600 hover:scale-105"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Random & Multipliers */}
        <div className="bg-[#1F1F30] border border-[#2D2D45] rounded-xl p-6 shadow-lg text-white mb-4">
          <div className="flex flex-wrap justify-center gap-3">
            {/* Random Button */}
            <button
              onClick={() => setSelectedNumber("Random")}
              className={`px-6 py-2 rounded-lg font-medium border transition-all duration-200 shadow-md ${
                selectedNumber === "Random"
                  ? "bg-purple-600 text-white border-purple-600 transform scale-105"
                  : "bg-[#2A2A3E] text-purple-400 border-purple-500/40 hover:bg-purple-500/20"
              }`}
            >
              Random
            </button>

            {/* Multipliers */}
            {[1, 5, 10, 20, 50, 100].map((val) => (
              <button
                key={val}
                onClick={() => setMultiplier(val)}
                className={`px-4 py-2 rounded-lg font-medium border transition-all duration-200 shadow-md ${
                  multiplier === val
                    ? "bg-purple-600 text-white border-purple-600 transform scale-105"
                    : "bg-[#2A2A3E] text-gray-300 border border-[#3D3D5C] hover:bg-purple-500/20"
                }`}
              >
                x{val}
              </button>
            ))}
          </div>
        </div>

        {/* Big / Small Selection */}
        <div className="bg-[#1F1F30] border border-[#2D2D45] rounded-xl p-6 shadow-lg text-white">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {["Big", "Small"].map((label) => (
              <button
                key={label}
                onClick={() => setSelectedNumber(label)}
                className={`py-4 px-8 rounded-lg font-medium text-lg transition-all duration-200 shadow-md ${
                  selectedNumber === label
                    ? "bg-purple-600 text-white transform scale-105"
                    : "bg-[#2A2A3E] text-gray-300 hover:bg-purple-500/20"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Betting Section */}
        {selectedNumber && (
          <div className="bg-[#1F1F30] border border-[#2D2D45] rounded-xl p-6 shadow-lg text-white mt-4">
            <div className="bg-[#2A2A3E] text-white py-3 font-bold text-lg">
              TrxWinGo 1 Min
            </div>

            {/* Balance Row */}
            <div className="px-4 py-3">
              <label className="block font-medium text-sm text-white mb-2">
                Balance
              </label>
              <div className="flex gap-2">
                {[1, 10, 100, 1000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setBaseAmount(val)}
                    className={`flex-1 py-1.5 rounded-md text-sm font-medium border ${
                      baseAmount === val
                        ? "bg-purple-600 text-white border-purple-300"
                        : "bg-[#2A2A3E] text-white border-gray-300 hover:bg-purple-500/20"
                    }`}
                  >
                    {val === 1000 ? "1K" : val}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Row */}
            <div className="px-4 py-3">
              <label className="block font-medium text-sm text-white mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseQuantity}
                  className="w-8 h-8 rounded-md border border-gray-300 bg-[#2A2A3E] hover:bg-gray-600 text-lg font-bold"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-14 text-center border border-purple-200 rounded-md py-1 bg-[#2A2A3E] text-white"
                />
                <button
                  onClick={increaseQuantity}
                  className="w-8 h-8 rounded-md border border-gray-300 bg-[#2A2A3E] hover:bg-gray-600 text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Multipliers */}
            <div className="px-4 py-3">
              <div className="flex gap-2 flex-wrap">
                {[1, 5, 10, 20, 50, 100].map((val) => (
                  <button
                    key={val}
                    onClick={() => setMultiplier(val)}
                    className={`flex-1 min-w-[50px] py-1.5 rounded-md text-sm font-medium border ${
                      multiplier === val
                        ? "bg-purple-700 text-white border-purple-300"
                        : "bg-[#2A2A3E] text-white border-gray-300 hover:bg-purple-500/20"
                    }`}
                  >
                    X{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Agreement */}
            <div className="px-4 py-3 flex items-center gap-2">
              <input
                type="checkbox"
                checked
                readOnly
                className="text-purple-500"
              />
              <span className="text-sm text-white">
                I agree <span className="text-red-500">《Pre-sale rules》</span>
              </span>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center bg-[#2A2A3E] px-4 py-3">
              <button
                onClick={placeBet}
                className="border rounded-md px-3 sm:px-4 py-1 text-xs sm:text-sm text-white border-purple-500 bg-purple-600 hover:bg-purple-700"
              >
                Place Bet
              </button>
              <div className="bg-[#2A2A3E] p-3 rounded-md mb-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 mr-2 mt-2">
                    Wallet Balance:{" "}
                  </span>
                  <span className="text-white font-semibold mt-2">
                    ₹{getINRBalance().toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="text-white font-bold">
                Total amount ₹{totalAmount}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right: Blockchain Table */}
      <div className="w-full lg:w-[48%] h-[300px] lg:h-[500px] bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden mr-0 lg:mr-10">
        {/* Header */}
        <div className="p-4 border-b border-purple-500/10">
          <h2 className="text-xl font-bold text-white">Blockchain Info</h2>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-y-auto h-[calc(100%-56px)]">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed text-sm sm:text-base">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-purple-500/10">
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4">Result colour</th>
                  <th className="py-3 px-4">Result size</th>
                  <th className="py-3 px-4">Hash Value</th>
                  <th className="py-3 px-4">Result</th>
                </tr>
              </thead>
              <tbody>
                {trxHistory.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-purple-500/10 text-white hover:bg-purple-500/5"
                  >
                    <td className="py-3 px-4">{row?.period}</td>
                    <td className="py-3 px-4">{row?.color}</td>
                    <td className="py-3 px-4">{row?.size}</td>
                    <td className="py-3 px-4 text-purple-400">
                      {row?.hash ? row.hash.replace(/.(?=.{5})/g, "*") : ""}
                    </td>
                    <td className="py-3 px-4">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white ${row.color}`}
                      >
                        {row?.number}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {winner && latestBetResult && popup === "won" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm mx-auto bg-gradient-to-b from-green-800 to-green-500 rounded-3xl overflow-visible shadow-2xl animate-fadeIn border-t-8 border-green-600 pt-16">
            {/* Close button */}
            <button
              onClick={() => {
                setWinner(false);
                setPopup(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-green-600 hover:text-green-800 transition-colors z-10 border border-green-200 shadow"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Trophy emoji */}
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
              <div className="text-xs text-green-200 mb-2">
                Period: TRX {getTimerString(latestBetResult.timer)} ·{" "}
                {latestBetResult.period_number}
              </div>
              <div className="text-sm text-green-100">
                Bet: {latestBetResult.bet_type} - {latestBetResult.bet_value}
              </div>
            </div>

            {/* WIN ticket area */}
            <div
              className="relative flex flex-col items-center bg-gradient-to-b from-white/95 to-green-100/80 mx-6 mt-2 mb-4 shadow-lg rounded-2xl"
              style={{ boxShadow: "0 8px 32px 0 rgba(31, 135, 31, 0.15)" }}
            >
              <div className="w-full flex flex-col items-center py-8 px-2">
                <div className="text-4xl font-extrabold text-green-700 mb-2 tracking-wider uppercase">
                  WIN
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  ₹{latestBetResult.winnings || "0"}
                </div>
                <div className="text-xs text-green-400 mt-1">
                  Bet Amount: ₹{latestBetResult.amount || "0"}
                </div>
              </div>
              <svg
                viewBox="0 0 320 20"
                width="100%"
                height="20"
                className="block"
              >
                <path
                  d="M0 10 Q 20 20 40 10 T 80 10 T 120 10 T 160 10 T 200 10 T 240 10 T 280 10 T 320 10 V20 H0Z"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {winner && latestBetResult && popup === "lost" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm mx-auto bg-gradient-to-b from-red-800 to-red-500 rounded-3xl overflow-visible shadow-2xl animate-fadeIn border-t-8 border-red-600 pt-16">
            {/* Close button */}
            <button
              onClick={() => {
                setWinner(false);
                setPopup(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-red-600 hover:text-red-800 transition-colors z-10 border border-red-200 shadow"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Sad emoji */}
            <div className="flex justify-center absolute left-1/2 -translate-x-1/2 -top-14 z-20">
              <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center shadow-lg border-4 border-red-200 backdrop-blur">
                <span className="text-5xl">😢</span>
              </div>
            </div>

            {/* Header */}
            <div className="flex flex-col items-center pt-14 pb-2">
              <h2 className="text-2xl font-bold text-red-100 mb-2 drop-shadow">
                Sorry, you lost!
              </h2>
              <div className="text-xs text-red-200 mb-2">
                Period: TRX {getTimerString(latestBetResult.timer)} ·{" "}
                {latestBetResult.period_number}
              </div>
              <div className="text-sm text-red-100">
                Bet: {latestBetResult.bet_type} - {latestBetResult.bet_value}
              </div>
            </div>

            {/* LOSS ticket area */}
            <div
              className="relative flex flex-col items-center bg-gradient-to-b from-white/95 to-red-100/80 mx-6 mt-2 mb-4 shadow-lg rounded-2xl"
              style={{ boxShadow: "0 8px 32px 0 rgba(135, 31, 31, 0.15)" }}
            >
              <div className="w-full flex flex-col items-center py-8 px-2">
                <div className="text-4xl font-extrabold text-red-700 mb-2 tracking-wider uppercase">
                  LOSS
                </div>
                <div className="text-2xl font-bold text-red-600 mb-1">
                  ₹{latestBetResult.amount || "0"}
                </div>
              </div>
              <svg
                viewBox="0 0 320 20"
                width="100%"
                height="20"
                className="block"
              >
                <path
                  d="M0 10 Q 20 20 40 10 T 80 10 T 120 10 T 160 10 T 200 10 T 240 10 T 280 10 T 320 10 V20 H0Z"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TRXGame;
