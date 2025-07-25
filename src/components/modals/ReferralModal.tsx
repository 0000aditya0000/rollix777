import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const bonusOptions = [
  { amount: 1000000, bonus: 5888 },
  { amount: 500000, bonus: 3888 },
  { amount: 100000, bonus: 800 },
  { amount: 50000, bonus: 500 },
];

export default function ReferralModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [noReminder, setNoReminder] = useState(false);

  const handleDeposite = () => {
    navigate("/wallet");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-[#1A1A2E] border border-purple-500/10 rounded-2xl shadow-xl text-white relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:opacity-80"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-center py-3 font-semibold text-lg rounded-t-2xl">
          Referral Modal
        </div>
        <div className="text-sm text-center text-gray-400 px-4 pt-2 pb-3">
          You can claim this only once
        </div>

        {/* Bonus Options */}
        <div className="max-h-[400px] overflow-y-auto px-4 pb-4 space-y-4">
          {bonusOptions.map((option, idx) => (
            <div
              key={idx}
              className="bg-[#252547] p-4 rounded-xl border border-purple-700/10 transition-all hover:bg-[#2A2A5A] hover:border-purple-500/20"
            >
              <div className="flex justify-between items-center font-semibold text-sm">
                <span>
                  Deposit{" "}
                  <span className="text-yellow-400">
                    ₹{option.amount.toLocaleString()}
                  </span>
                </span>
                <span className="text-orange-400">
                  + ₹{option.bonus.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Get ₹{option.bonus.toLocaleString()} bonus on ₹
                {option.amount.toLocaleString()} first deposit
              </p>

              {/* Progress bar placeholder */}
              <div className="relative bg-[#3C3C56] h-2 rounded-full mt-3">
                <div className="bg-orange-400 h-2 w-0 rounded-full" />
              </div>
              <div className="text-xs text-gray-400 mt-1 flex justify-between">
                <span>0</span>
                <span>₹{option.amount.toLocaleString()}</span>
              </div>

              <button
                onClick={handleDeposite}
                className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white text-sm font-medium hover:opacity-90"
              >
                Deposit Now
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-purple-500/10 bg-[#1A1A2E]">
          <label className="text-sm text-gray-300 flex items-center gap-2">
            <input
              type="checkbox"
              checked={noReminder}
              onChange={() => setNoReminder(!noReminder)}
              className="accent-purple-500"
            />
            No more reminders today
          </label>
          <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-1.5 rounded-lg text-sm hover:opacity-90">
            Activity
          </button>
        </div>
      </div>
    </div>
  );
}
