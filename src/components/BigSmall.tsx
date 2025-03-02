import React, { useEffect, useState } from "react";
import { X } from "lucide-react"; // Importing an icon for close button
import Header from "./Header";

const BigSmall = () => {
    const path = window.location.pathname;
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const [timeLeft, setTimeLeft] = useState(120); // Default 2 min
    const [isRunning, setIsRunning] = useState(false);
    const [activeTime, setActiveTime] = useState<number | null>(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [contractMoney, setContractMoney] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [selected, setselected] = useState(1);

  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;
    
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  // Function to start/reset timer
 const startTimer = (minutes: number) => {
  setTimeLeft(minutes * 60); // Convert to seconds
  setIsRunning(true);
   setActiveTime(minutes); //  This updates the active button
   setselected(minutes) // update recode table heading
};


  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const records = [
    { period: "202502277254", number: 1, result: "🔴", size: "Big" },
    { period: "202502279535", number: 2, result: "🟢", size: "Small" },
    { period: "202502272521", number: 3, result: "🔴", size: "Big" },
    { period: "202502276207", number: 4, result: "🟢", size: "Small" },
    { period: "202502279535", number: 5, result: "🔴", size: "Big" },
    { period: "202502272521", number: 6, result: "🟢", size: "Small" },
    { period: "202502276207", number: 7, result: "🔴", size: "Big" },
    { period: "202502279535", number: 9, result: "🔴", size: "Big" },
    { period: "202502272521", number: 8, result: "🟢", size: "Small" },
    { period: "202502276207", number: 5, result: "🔴", size: "Big" },
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord); 
  const totalPages = Math.ceil(records.length / recordsPerPage);

  return (
    <>
    <div className="px-0 ">
      <div className="w-full mx-auto   bg-[#1A1A2E]/95 text-white p-3 space-y-3  mt-14 ">
      {path === "/bigsmall" && (
  <div className="flex justify-center items-center ">
              <Header /> 
            </div>
)}

        {/* Time Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
  {[1, 3, 5, 10].map((min) => (
    <button
      key={min}
      className={`px-4 py-2 rounded transition-colors duration-200 ${
        activeTime === min ? "bg-blue-700 text-white" : "bg-gray-700 hover:bg-gray-400"
      }`}
      onClick={() => startTimer(min)}
    >
      {min} min
    </button>
  ))}
</div>

        {/* Period Display */}
        <div className="flex items-center bg-green-700 px-3 py-2 rounded">
          <span className="mr-2">🏆</span>
          <span className="font-bold">Period</span>
          <span className="ml-auto">202502277602</span>
        </div>

        {/* Timer */}
        <div className={`bg-gray-700 text-center py-2 rounded ${timeLeft < 10 ? "bg-red-500" : ""}`}>
          Time Left: {formatTime(timeLeft)}
        </div>

        {/* Join Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button className="bg-green-500 px-4 py-2 rounded">Join Green</button>
          <button className="bg-purple-500 px-4 py-2 rounded">Join Violet</button>
          <button className="bg-red-500 px-4 py-2 rounded">Join Red</button>
        </div>

        {/* 0-9 Number Buttons */}
       <div className="p-2">
      {/* Number Buttons */}
    <div className="grid grid-cols-5 gap-2">
  {Array.from({ length: 10 }, (_, i) => (
    <button
      key={i}
      onClick={() => setSelectedNumber(i)}
      disabled={timeLeft < 10} // Disable when time is less than 10 sec
      className={`relative px-6 py-3 text-white font-bold rounded-lg ${
        timeLeft < 10
          ? "bg-gray-500 cursor-not-allowed" // Grey out when disabled
          : i === 0
          ? "bg-purple-500"
          : i % 2 === 0
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    >
      {i}
    </button>
  ))}
</div>

      {/* Popup */}
      {selectedNumber !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-3 flex justify-between items-center rounded-t-lg">
              <span className="text-lg font-bold">Number {selectedNumber} Selected</span>
              <button onClick={() => setSelectedNumber(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
             <label className="block text-gray-900 font-semibold mb-2">Enter Contract Money</label>
                  <input min={10}
                    step={10}
         type="number"
         placeholder="Enter amount Minimun(10₹)"
        value={contractMoney}
        onChange={(e) => {
      const value = Number(e.target.value);
      if (value > 100000) {
        setContractMoney(100000); // Reset to max limit
      } else {
        setContractMoney(value);
      }
    }}
    className="w-full p-2 text-black border rounded"
  />
  
  {/* Error Message or Success Message */}
  {contractMoney >= 100000 ? (
    <p className="text-red-500 text-sm mt-1">
      Contract money cannot exceed ₹100,000
    </p>
  ) : (
    <p className="text-green-600 font-semibold mt-2">
      Total contract money is ₹{contractMoney}
    </p>
  )}


              {/* Checkbox */}
      <div className="flex items-center mt-3">
  <input
    type="checkbox"
    checked={agreed}
    onChange={() => setAgreed(!agreed)}
    className={`w-5 h-5 ${
      contractMoney < 10 || contractMoney > 100000 ? "cursor-not-allowed opacity-50" : "text-blue-600"
    }`}
    // disabled={contractMoney < 10 || contractMoney > 100000} // Disable checkbox when < 10 or > 100000/
  />
  <label
    className={`ml-2 ${
      contractMoney < 10 || contractMoney > 100000 ? "opacity-50 cursor-not-allowed" : "text-blue-600"
    }`}
  >
    I agree
  </label>
</div>


            </div>

            {/*popup Buttons */}
            <div className="flex justify-end space-x-2 bg-gray-100 p-3 rounded-b-lg">
              <button
                className="px-4 py-2 bg-red-700 text-white rounded-lg"
                onClick={() => setSelectedNumber(null)}
              >
                CANCEL
              </button>
              <button
                className={`px-4 py-2 text-white rounded-lg ${
                  agreed ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!agreed}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

        {/* Big & Small Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-red-500 px-4 py-2 rounded">Big</button>
          <button className="bg-green-500 px-4 py-2 rounded">Small</button>
        </div>

        {/* Record Table */}
        <div className="p-4 bg-gray-900 max-w-md mx-auto mb-8">
          <h2 className="text-center text-lg font-bold text-white mb-0">🏆{selected} min Record</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 text-white text-sm sm:text-base mb-0">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 border border-gray-700">Period</th>
                  <th className="p-2 border border-gray-700">Number</th>
                  <th className="p-2 border border-gray-700">Result</th>
                  <th className="p-2 border border-gray-700">Small & Big</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record, index) => (
                  <tr key={index} className="text-center border-b border-gray-700">
                    <td className="p-2 border border-gray-700">{record.period}</td>
                    <td className="p-2 border border-gray-700">{record.number}</td>
                    <td className="p-2 border border-gray-700">{record.result}</td>
                    <td className="p-2 border border-gray-700">{record.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-2 overflow-x-auto w-full max-w-md mx-auto mb-12">
            <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>◀</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>▶</button>
          </div>
        </div>
      </div>
    </div>
      </>
      );
};

export default BigSmall;
