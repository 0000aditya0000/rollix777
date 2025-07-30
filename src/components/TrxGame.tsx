import React from "react";

const TRXTicket: React.FC = () => {
  const period = "20250730103010482";
  const countdown = { minutes: "00", seconds: "27" };
  const results = ["6", "5", "3", "2", "8"];

  return (
    <div className="mt-20">
      <h1>TRX Game</h1>

      <div className="bg-[#1F1F30] border border-[#2D2D45] rounded-xl px-4 py-5 sm:p-6 shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-white transition-all">
        {/* Header Row */}
        <div className="flex justify-between items-center mb-3 text-xs sm:text-sm">
          <div className="flex gap-2 flex-wrap">
            <button className="bg-[#2A2A3E] border border-[#3D3D5C] px-2 py-1 rounded-full text-gray-300 hover:bg-[#3A3A4E] transition">
              Period
            </button>
            <button className="bg-[#2A2A3E] border border-[#3D3D5C] px-2 py-1 rounded-full text-purple-400 hover:bg-[#3A3A4E] transition">
              How to play
            </button>
          </div>
          <button className="text-gray-400 hover:text-white transition text-xs sm:text-sm whitespace-nowrap">
            Public Chain Query
          </button>
        </div>

        {/* Period & Timer */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2 text-sm sm:text-base font-semibold">
          <span className="truncate text-white">{period}</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-400">Draw time</span>
            <span className="text-purple-400 font-bold">
              {countdown.minutes}
            </span>
            <span className="text-gray-400">:</span>
            <span className="text-purple-400 font-bold">
              {countdown.seconds}
            </span>
          </div>
        </div>

        {/* Dotted Divider */}
        <div className="border-t border-dashed border-[#2D2D45] my-4" />

        {/* Lottery Balls */}
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
          {results.map((val, idx) => (
            <div
              key={idx}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#2A2A3E] border border-[#3D3D5C] flex items-center justify-center shadow-md"
            >
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TRXTicket;
