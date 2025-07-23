import { useEffect, useState } from "react";
import WithdrawModal from "./WithdrawModal";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWallets } from "../slices/walletSlice";
import { fetchUserWallets } from "../lib/services/WalletServices.js";
import { Flame, Sparkles, Volume2 } from "lucide-react";

function Wingo5dGame() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = Number(localStorage.getItem("userId")) || 0;
  const { wallets } = useSelector((state: RootState) => state.wallet);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState("A");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [activeTimer, setActiveTimer] = useState(1);
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 1,
    seconds: 0,
  });
  const [lotteryResults, setLotteryResults] = useState([
    { number: 4, letter: "A" },
    { number: 6, letter: "B" },
    { number: 0, letter: "C" },
    { number: 8, letter: "D" },
    { number: 6, letter: "E" },
  ]);

  const durationsVal = [1, 3, 5, 10];

  const mainBalance =
    wallets.find((w) => w.cryptoname === "INR")?.balance || "0";

  const totalSum = lotteryResults.reduce(
    (sum, result) => sum + result.number,
    0
  );
  const currentPeriod = "20250721102030138";

  const generateNewLotteryResult = () => {
    setIsAnimating(true);

    // Animate the generation process
    setTimeout(() => {
      const letters = ["A", "B", "C", "D", "E"];
      const results = letters.map((letter) => ({
        letter,
        number: Math.floor(Math.random() * 10),
      }));
      setLotteryResults(results);
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    // Generate initial numbers
    generateNewLotteryResult();

    // Set up timer to generate new numbers every 1 minute (60000ms)
    const timer = setInterval(() => {
      generateNewLotteryResult();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const { minutes, seconds } = prev;

        if (minutes === 0 && seconds === 0) {
          generateNewLotteryResult();

          const resetTo = selectedTimer ?? 1;
          setActiveTimer(resetTo); // make sure activeTimer updates
          return { minutes: resetTo, seconds: 0 };
        }

        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { minutes: minutes - 1, seconds: 59 };
        }

        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTimer]);

  useEffect(() => {
    if (selectedTimer !== null) {
      setActiveTimer(selectedTimer);
      setTimeRemaining({ minutes: selectedTimer, seconds: 0 });
    }
  }, [selectedTimer]);

  async function fetchData() {
    if (userId) {
      try {
        const data = await fetchUserWallets(userId);
        if (data) {
          dispatch(setWallets(data));
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [userId, dispatch]);

  const handleClose = () => setShowHowToPlay(false);

  return (
    <>
      {/* Deposit and withdrawal buttons */}
      <div className="flex justify-center gap-4 mb-10 mt-20">
        <button
          onClick={() => navigate("/deposit")}
          className="w-36 sm:w-44 py-3 px-6 bg-green-600 text-white text-sm sm:text-base font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 rounded-md"
        >
          <span>Deposit</span>
        </button>

        <button
          onClick={() => setIsWithdrawModalOpen(true)}
          className="w-36 sm:w-44 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-base font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 rounded-md"
        >
          <span>Withdraw</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start px-2 sm:px-4 py-6">
        {/* LEFT SIDE: Main Wingo Content */}
        <div className="lg:w-[58%]">
          {/* Timer Buttons Section */}
          <div className="flex justify-center items-center gap-4 mb-10">
            {[
              { label: "1 Min", value: 1 },
              { label: "3 Min", value: 3 },
              { label: "5 Min", value: 5 },
              { label: "10 Min", value: 10 },
            ].map((timer) => (
              <button
                key={timer.value}
                onClick={() => setSelectedTimer(timer.value)}
                className={`w-36 px-4 py-1.5 rounded-md text-sm font-medium border transition-all
            ${
              selectedTimer === timer.value
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-transparent text-gray-300 border-purple-500/30 hover:border-purple-500"
            }`}
              >
                {timer.label}
              </button>
            ))}
          </div>

          {/* Lottery Results Section */}
          <div className="bg-[#1F1F30] rounded-xl shadow-lg p-6 border border-[#2D2D45] max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Lottery Results</h2>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* Numbers */}
              <div className="flex gap-2">
                {lotteryResults.map((result, index) => (
                  <div key={index} className="text-center">
                    <div className="w-14 h-14 bg-[#2A2A3E] border border-[#3D3D5C] rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {result.number}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 mt-1 block">
                      {result.letter}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Sum */}
              <div className="text-center">
                <div className="w-20 h-14 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-white">
                    {totalSum}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Period Section */}
          <div className="bg-[#1F1F30] rounded-xl shadow-lg p-6 border border-[#2D2D45] max-w-3xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Period</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-2xl font-bold text-white">
                    {currentPeriod}
                  </span>
                  <button className="flex items-center gap-1 bg-[#2A2A3E] text-purple-400 border border-gray-700 px-3 py-1 rounded-full text-sm font-semibold hover:bg-[#3A3A4E] transition">
                    <button onClick={() => setShowHowToPlay(true)}>
                      How to play
                    </button>
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Time remaining</p>
                <div className="flex items-center gap-1 text-3xl font-bold">
                  <span className="text-purple-800">
                    {timeRemaining.minutes}
                  </span>
                  <span className="text-gray-400">:</span>
                  <span className="text-purple-800">
                    {timeRemaining.seconds.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* Animated Lottery Display */}
            <div
              className={`relative bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl p-4 shadow-xl transform transition-all duration-500 mt-6 w-full max-w-md mx-auto ${
                isAnimating ? "scale-105" : "scale-100"
              }`}
            >
              <div className="flex justify-center space-x-2">
                {lotteryResults.map((result, index) => (
                  <div
                    key={result.letter}
                    className={`relative transform transition-all duration-300 ${
                      isAnimating ? "animate-pulse" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-16 h-20 rounded-lg flex items-center justify-center shadow-md ${
                        index === 0 ? "bg-purple-700" : "bg-[#2D2D54]"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          index === 0 ? "bg-purple-400" : "bg-white"
                        } shadow-inner`}
                      >
                        <span
                          className={`text-2xl font-bold ${
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
          <div className="bg-[#1F1F30] rounded-xl shadow-lg p-4 border border-[#2D2D45] max-w-3xl mx-auto mt-8">
            <div className="flex justify-between border-b border-[#33334a] mb-4">
              {["A", "B", "C", "D", "E", "SUM"].map((label, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTab(label)}
                  className={`text-sm font-bold px-4 py-2 transition ${
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
              <div className="grid grid-cols-4 gap-4">
                {["Big2", "Small2", "Odd2", "Even2"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedBet(type)}
                    className={`py-2 rounded-md text-center transition-all duration-200 ${
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
                    className={`py-2 rounded-md text-center transition-all duration-200 ${
                      selectedBet === i.toString()
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-[#2A2A3E] text-white hover:bg-purple-600"
                    }`}
                  >
                    {i} <span className="text-sm text-gray-400 ml-1">9X</span>
                  </button>
                ))}
              </div>
            }
            {/* Bet Controls Section */}
            {selectedBet && (
              <div className="mt-6 space-y-4">
                {/* Balance Options */}
                <div className="flex flex-row justify-between">
                  <p className="text-white text-sm mb-2">Balance</p>
                  <div className="flex gap-3">
                    {[1, 10, 100, 1000].map((val) => (
                      <button
                        key={val}
                        className="bg-[#2A2A3E] text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
                      >
                        {val === 1000 ? "1K" : val}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-white text-sm mb-2">Quantity</p>

                  <div className="flex justify-between items-center flex-wrap gap-4">
                    {/* Quantity Selector - Left side */}
                    <div className="flex items-center gap-2">
                      <button className="bg-[#2A2A3E] text-white px-3 py-1 rounded-md text-lg hover:bg-purple-600">
                        -
                      </button>
                      <input
                        type="text"
                        value={1}
                        readOnly
                        className="bg-[#2A2A3E] w-14 text-center text-white px-3 py-1 rounded-md border border-[#3D3D5C]"
                      />
                      <button className="bg-[#2A2A3E] text-white px-3 py-1 rounded-md text-lg hover:bg-purple-600">
                        +
                      </button>
                    </div>

                    {/* Multiplier Options - Right side */}
                    <div className="flex gap-2 flex-wrap">
                      {["X1", "X5", "X10", "X20", "X50", "X100"].map(
                        (label, index) => (
                          <button
                            key={index}
                            className={`px-3 py-1 rounded-md border ${
                              label === "X1"
                                ? "text-white"
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
                  <button className="text-white border border-gray-500 rounded-md px-4 py-1 hover:bg-[#3A3A4E]">
                    Cancel
                  </button>
                  <span className="text-white font-semibold">
                    Total amount
                    <span className="text-gray-400 ml-2">₹1.00</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Table */}
        <div className="w-full lg:w-[42%] h-[500px] bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10">
            <h2 className="text-xl font-bold text-white">History</h2>
          </div>

          <div className="overflow-y-auto h-[calc(100%-56px)]">
            <table className="w-full table-fixed text-sm sm:text-base">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-purple-500/10">
                  <th className="py-4 px-6">Period</th>
                  <th className="py-4 px-6">Result</th>
                  <th className="py-4 px-6">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    period: "20250722103030138",
                    result: [4, 6, 0, 8, 6],
                    total: 24,
                  },
                  {
                    period: "20250722102930138",
                    result: [3, 2, 7, 1, 5],
                    total: 18,
                  },
                  {
                    period: "20250722102830138",
                    result: [9, 1, 3, 0, 4],
                    total: 17,
                  },
                  {
                    period: "20250722102730138",
                    result: [5, 5, 5, 5, 5],
                    total: 25,
                  },
                  {
                    period: "20250722102630138",
                    result: [1, 2, 3, 4, 0],
                    total: 10,
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-purple-500/10 text-white hover:bg-purple-500/5"
                  >
                    <td className="py-4 px-6">{row.period}</td>
                    <td className="py-4 px-6 flex gap-2">
                      {row.result.map((num, index) => (
                        <div
                          key={index}
                          className="w-8 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm font-medium"
                        >
                          {num}
                        </div>
                      ))}
                    </td>

                    <td className="py-4 px-6">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showHowToPlay && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-[#1F1F30] w-full max-w-3xl rounded-xl p-6 shadow-lg border border-[#2D2D45] overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                5D Lottery Game Rules
              </h2>
              <button onClick={handleClose} className="text-white text-2xl">
                &times;
              </button>
            </div>

            {/* Game Explanation */}
            <div className="text-gray-300 text-sm space-y-2 mb-6">
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

      {userId > 0 && (
        <>
          {/* <DepositModal /> */}
          <WithdrawModal
            isOpen={isWithdrawModalOpen}
            onClose={() => setIsWithdrawModalOpen(false)}
            mainBalance={Number(mainBalance)}
            fetchData={fetchData}
          />
        </>
      )}
    </>
  );
}

export default Wingo5dGame;
