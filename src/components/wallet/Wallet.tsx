import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Wallet as WalletIcon, 
  Plus, 
  ArrowDownCircle, 
  ArrowUpCircle,
  Copy,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getWalletBalance } from '../../lib/services/WalletService';
import toast from 'react-hot-toast';

const Wallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('0');
  const { user } = useSelector((state: RootState) => state.auth);
  const { wallets } = useSelector((state: RootState) => state.wallet);

  const quickAmounts = ['500', '1000', '2000', '5000', '10000', '20000'];

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (user?.id) {
          const walletData = await getWalletBalance(user.id);
          const inrWallet = walletData.find(w => w.cryptoname === 'INR');
          if (inrWallet) {
            setBalance(inrWallet.balance);
          }
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
        toast.error('Failed to fetch balance');
      }
    };

    fetchBalance();
  }, [user?.id]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('test@paytm');
    toast.success('UPI ID copied to clipboard');
  };

  const handleRefresh = async () => {
    try {
      if (user?.id) {
        const walletData = await getWalletBalance(user.id);
        const inrWallet = walletData.find(w => w.cryptoname === 'INR');
        if (inrWallet) {
          setBalance(inrWallet.balance);
          toast.success('Balance refreshed');
        }
      }
    } catch (error) {
      console.error('Error refreshing balance:', error);
      toast.error('Failed to refresh balance');
    }
  };

  return (
    <div className="pt-16 pb-24 bg-[#0F0F19]">
      <div className="px-4 py-6 space-y-6">
        {/* Header - Updated to match Profile */}
        <div className="flex items-center gap-4">
          <Link 
            to="/account" 
            className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">My Wallet</h1>
        </div>

        {/* Balance Card - Updated styling */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WalletIcon className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Available Balance</h2>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
            >
              <RefreshCw size={18} />
            </button>
          </div>
          <div className="p-6">
            <h2 className="text-3xl font-bold text-white">₹{parseFloat(balance).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          </div>
        </div>

        {/* Tabs - Updated styling */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10">
            <div className="flex gap-2 bg-[#1A1A2E] p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('deposit')}
                className={`flex-1 py-3 rounded-md flex items-center justify-center gap-2 transition-colors ${
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
                className={`flex-1 py-3 rounded-md flex items-center justify-center gap-2 transition-colors ${
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

          <div className="p-4 space-y-4">
            {/* Amount Input */}
            <div className="space-y-1">
              <label className="text-sm text-gray-400">Enter Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-lg">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full py-3 px-8 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Quick Amounts */}
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className="py-2 px-4 bg-[#1A1A2E] rounded-lg text-white hover:bg-[#2f2f5a] transition-colors border border-purple-500/20"
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* UPI Section */}
        {activeTab === 'deposit' && (
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
            <div className="p-4 border-b border-purple-500/10">
              <h3 className="text-lg font-semibold text-white">UPI ID</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between bg-[#1A1A2E] p-3 rounded-lg border border-purple-500/20">
                <span className="text-gray-400">test@paytm</span>
                <button
                  onClick={handleCopyUpi}
                  className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => {/* Add deposit/withdraw logic */}}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
        >
          {activeTab === 'deposit' ? 'Deposit Now' : 'Withdraw Now'}
        </button>

        {/* Recent Transactions */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden mb-20">
          <div className="p-4 border-b border-purple-500/10">
            <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          </div>
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#252547] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index % 2 === 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}>
                    {index % 2 === 0 
                      ? <ArrowDownCircle className="w-5 h-5 text-green-500" />
                      : <ArrowUpCircle className="w-5 h-5 text-red-500" />
                    }
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {index % 2 === 0 ? 'Deposit' : 'Withdrawal'}
                    </p>
                    <p className="text-gray-400 text-sm">Mar 25, 2024</p>
                  </div>
                </div>
                <span className={`font-medium ${
                  index % 2 === 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {index % 2 === 0 ? '+' : '-'}₹100.00
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet; 