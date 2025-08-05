import React, { useState } from "react";

const TRXGame: React.FC = () => {
  const period = "20250730103010482";
  const countdown = { minutes: "00", seconds: "27" };
  const results = ["6", "5", "3", "2", "8"];

  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-start px-2 sm:px-4 py-2 sm:py-6 mt-20">
      {/* Left: Game Section */}
      <div className="w-full lg:w-[58%] ml-20">
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
            <span className="text-white font-mono text-lg">{period}</span>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">Draw time</span>
              <span className="text-purple-400 font-bold text-xl">
                {countdown.minutes}
              </span>
              <span className="text-gray-400">:</span>
              <span className="text-purple-400 font-bold text-xl">
                {countdown.seconds}
              </span>
            </div>
          </div>

          {/* Dotted Divider */}
          <div className="border-t border-dashed border-[#2D2D45] my-6" />

          {/* Lottery Balls */}
          <div className="flex justify-center gap-4 mb-6">
            {results.map((val, idx) => (
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
        <div className="bg-[#1F1F30] border border-[#2D2D45] rounded-xl p-6 shadow-lg text-white mb-4">
          <div className="grid grid-cols-3 gap-4">
            <button className="py-3 px-6 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 transition-all duration-200 shadow-md">
              Green
            </button>
            <button className="py-3 px-6 rounded-lg font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 shadow-md">
              Violet
            </button>
            <button className="py-3 px-6 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-all duration-200 shadow-md">
              Red
            </button>
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
            {["x1", "x5", "x10", "x20", "x50", "x100"].map((multiplier) => (
              <button
                key={multiplier}
                onClick={() => setSelectedNumber(multiplier)}
                className={`px-4 py-2 rounded-lg font-medium border transition-all duration-200 shadow-md ${
                  selectedNumber === multiplier
                    ? "bg-purple-600 text-white border-purple-600 transform scale-105"
                    : "bg-[#2A2A3E] text-gray-300 border border-[#3D3D5C] hover:bg-purple-500/20"
                }`}
              >
                {multiplier}
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
        <div className="bg-[#1F1F30] border border-[#2D2D45] rounded-xl p-6 shadow-lg text-white mt-4">
          {/* Header */}
          <div className="bg-[#2A2A3E] text-white py-3 font-bold text-lg">
            TrxWinGo 1 Min
          </div>

          {/* Balance Row */}
          <div className="px-4 py-3">
            <label className="block font-medium text-sm text-white mb-2">
              Balance
            </label>
            <div className="flex gap-2">
              {["1", "10", "100", "1K"].map((val) => (
                <button
                  key={val}
                  className={`flex-1 py-1.5 rounded-md text-sm font-medium border ${
                    val === "1"
                      ? "bg-purple-600 text-white-700 border-purple-300"
                      : "bg-[#2A2A3E] text-white-700 border-gray-300"
                  }`}
                >
                  {val}
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
              <button className="w-8 h-8 rounded-md border border-gray-300 bg-[#2A2A3E] hover:bg-gray-200 text-lg font-bold">
                -
              </button>
              <input
                type="text"
                value="1"
                readOnly
                className="w-14 text-center border border-purple-200 rounded-md py-1 bg-[#2A2A3E] text-white"
              />
              <button className="w-8 h-8 rounded-md border border-gray-300 bg-[#2A2A3E] hover:bg-gray-200 text-lg font-bold">
                +
              </button>
            </div>
          </div>

          {/* Multipliers */}
          <div className="px-4 py-3">
            <div className="flex gap-2 flex-wrap">
              {["X1", "X5", "X10", "X20", "X50", "X100"].map((val) => (
                <button
                  key={val}
                  className={`flex-1 min-w-[50px] py-1.5 rounded-md text-sm font-medium border ${
                    val === "X1"
                      ? "bg-purple-700 text-white border-purple-300"
                      : "bg-[#2A2A3E] text-white border-gray-300"
                  }`}
                >
                  {val}
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
              className={
                "border rounded-md px-3 sm:px-4 py-1 text-xs sm:text-sm text-gray-400 border-gray-700 bg-gray-600 cursor-not-allowed"
              }
            >
              Place Bet
            </button>
            <div className="text-white font-bold">Total amount ₹1.00</div>
          </div>
        </div>
      </div>

      {/* Right: Blockchain Table */}
      <div className="hidden lg:block w-full lg:w-[48%] h-[500px] bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden mr-10">
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
                  <th className="py-3 px-4">Block Height</th>
                  <th className="py-3 px-4">Block Time</th>
                  <th className="py-3 px-4">Hash Value</th>
                  <th className="py-3 px-4">Result</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    period: "202**0631",
                    height: "74461836",
                    time: "16:05:54",
                    hash: "**2956",
                    result: { num: 6, color: "bg-red-600" },
                  },
                  {
                    period: "202**0630",
                    height: "74461816",
                    time: "15:59:54",
                    hash: "**449d",
                    result: { num: 9, color: "bg-green-600" },
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-purple-500/10 text-white hover:bg-purple-500/5"
                  >
                    <td className="py-3 px-4">{row.period}</td>
                    <td className="py-3 px-4">{row.height}</td>
                    <td className="py-3 px-4">{row.time}</td>
                    <td className="py-3 px-4 text-purple-400">{row.hash}</td>
                    <td className="py-3 px-4">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white ${row.result.color}`}
                      >
                        {row.result.num}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TRXGame;
