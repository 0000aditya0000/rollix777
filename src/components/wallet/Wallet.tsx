import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Wallet as WalletIcon, 
  Plus, 
  ArrowDownCircle, 
  ArrowUpCircle,
  Copy,
  RefreshCw,
  Clock,
  CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Wallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');

  const quickAmounts = ['500', '1000', '2000', '5000', '10000', '20000'];

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('test@paytm');
    // Add toast notification here if you have one
    alert('UPI ID copied to clipboard');
  };

  const handleRefresh = () => {
    // Add balance refresh logic here
  };

  return (
    <div className="min-h-screen bg-[#0F0F19] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex mt-10 items-center gap-4">
            <Link 
              to="/account" 
              className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-bold text-white">My Wallet</h1>
          </div>
          <button
            onClick={handleRefresh}
            className="p-3 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-8 space-y-6">
            {/* Balance Cards Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Main Balance Card */}
              <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-2xl border border-purple-500/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <WalletIcon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Available Balance</h2>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">₹1,234.56</h2>
                <p className="text-gray-400">Last updated: 2 mins ago</p>
              </div>

              {/* Quick Stats Card */}
              <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-2xl border border-purple-500/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-pink-500/10 rounded-lg">
                    <CreditCard className="w-6 h-6 text-pink-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Monthly Activity</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Deposits</span>
                    <span className="text-green-500 font-semibold">+₹5,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Withdrawals</span>
                    <span className="text-red-500 font-semibold">-₹3,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Section */}
            <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-2xl border border-purple-500/20">
              <div className="p-6 border-b border-purple-500/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
                </div>
                <button className="text-purple-400 hover:text-purple-300 text-sm">View All</button>
              </div>
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-[#1A1A2E] rounded-xl hover:bg-[#252547] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        index % 2 === 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                      }`}>
                        {index % 2 === 0 
                          ? <ArrowDownCircle className="w-6 h-6 text-green-500" />
                          : <ArrowUpCircle className="w-6 h-6 text-red-500" />
                        }
                      </div>
                      <div>
                        <p className="text-white font-medium text-lg">
                          {index % 2 === 0 ? 'Deposit' : 'Withdrawal'}
                        </p>
                        <p className="text-gray-400">Mar 25, 2024 • 14:30</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-semibold ${
                        index % 2 === 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {index % 2 === 0 ? '+' : '-'}₹100.00
                      </span>
                      <p className="text-gray-400 text-sm">Processing</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Action Panel */}
          <div className="col-span-4">
            <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-2xl border border-purple-500/20 sticky top-8">
              <div className="p-6 border-b border-purple-500/10">
                <div className="flex gap-2 bg-[#1A1A2E] p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab('deposit')}
                    className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      activeTab === 'deposit'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <ArrowDownCircle size={18} />
                    <span>Deposit</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('withdraw')}
                    className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      activeTab === 'withdraw'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <ArrowUpCircle size={18} />
                    <span>Withdraw</span>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Enter Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-lg">₹</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full py-4 px-10 bg-[#1A1A2E] border border-purple-500/20 rounded-xl text-white text-lg focus:outline-none focus:border-purple-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Quick Amounts */}
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Quick Select</label>
                  <div className="grid grid-cols-2 gap-2">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt)}
                        className="py-3 px-4 bg-[#1A1A2E] rounded-xl text-white hover:bg-[#2f2f5a] transition-colors border border-purple-500/20"
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* UPI Section */}
                {activeTab === 'deposit' && (
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">UPI ID</label>
                    <div className="flex items-center justify-between bg-[#1A1A2E] p-4 rounded-xl border border-purple-500/20">
                      <span className="text-white">test@paytm</span>
                      <button
                        onClick={handleCopyUpi}
                        className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => {/* Add deposit/withdraw logic */}}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity text-lg"
                >
                  {activeTab === 'deposit' ? 'Deposit Now' : 'Withdraw Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet; 