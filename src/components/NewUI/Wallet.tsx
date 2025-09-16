import { ArrowLeft, CreditCard, BookOpen, History } from "lucide-react";

const WalletNew = () => {
  const walletData = {
    totalBalance: 0.0,
    mainWallet: 0.0,
    thirdPartyWallet: 0.0,
    arGame: 0.0,
    lottery: 0.0,
  };

  return (
    <div className="min-h-screen bg-[#220904] text-white font-sans flex flex-col items-center">
      <div className="w-full max-w-md">
        {/* Header + Balance combined */}
        <div className="bg-gradient-to-br from-[#db6903] to-[#f1a903] px-4 py-4 flex flex-col items-center justify-center relative shadow-md">
          {/* <ArrowLeft className="absolute left-4 w-6 h-6 text-white cursor-pointer" /> */}
          <h1 className="text-xl font-semibold text-white mb-3">Wallet</h1>

          {/* Balance */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-white bg-opacity-20 w-14 h-14 rounded-full flex items-center justify-center mb-2">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              ₹{walletData.totalBalance.toFixed(2)}
            </p>
            <p className="text-sm text-white opacity-90">Total balance</p>
          </div>
        </div>

        {/* Wallet Cards */}
        <div className="px-6 mt-6 relative z-10">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Main Wallet */}
            <div className=" p-4 text-center shadow">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg
                  className="w-24 h-24 transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#3d1601"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#e1910a"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-[#e1910a]">0%</span>
                </div>
              </div>

              <p className="text-lg font-bold text-[#e1910a] mb-1">
                ₹{walletData.mainWallet.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400">Main wallet</p>
            </div>

            {/* Bonus Wallet */}
            <div className="p-4 text-center shadow">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg
                  className="w-24 h-24 transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#3d1601"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#e1910a"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-[#e1910a]">0%</span>
                </div>
              </div>

              <p className="text-lg font-bold text-[#e1910a] mb-1">
                ₹{walletData.thirdPartyWallet.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400">Bonus</p>
            </div>
          </div>

          {/* Main Wallet Transfer Button */}
          <button className="w-full bg-[#d31c02] text-white py-3 rounded-full font-semibold mb-6 text-lg shadow-md hover:bg-[#b31702] transition">
            Main wallet transfer
          </button>

          {/* Action Icons */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#cf8904] rounded-lg flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-[#f1a903] rounded"></div>
              </div>
              <p className="text-xs text-gray-400">Deposit</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#4a7c59] rounded-lg flex items-center justify-center mb-2">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-gray-400">Withdraw</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#d31c02] rounded-lg flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-gray-400 text-center">
                Deposit history
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#cf8904] rounded-lg flex items-center justify-center mb-2">
                <History className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-gray-400 text-center">
                Withdrawal history
              </p>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="text-center bg-[#2b1b0f] rounded-xl py-4 shadow">
              <p className="text-2xl font-bold text-[#e1910a] mb-1">
                {walletData.arGame.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400">ARGame</p>
            </div>
            <div className="text-center bg-[#2b1b0f] rounded-xl py-4 shadow">
              <p className="text-2xl font-bold text-[#e1910a] mb-1">
                {walletData.lottery.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400">Lottery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletNew;
