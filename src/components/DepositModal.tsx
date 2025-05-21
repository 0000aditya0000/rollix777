import React, { useState } from 'react';
import { X, CreditCard, Wallet, Bitcoin, DollarSign, Copy, Check } from 'lucide-react';
import { depositService } from '../services/api';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setWallets } from '../slices/walletSlice';
import { fetchUserWallets } from '../lib/services/WalletServices';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DepositRequest {
  userId: number;
  amount: number;
  cryptoname: string;
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<'crypto' | 'card'>('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState<'btc' | 'eth' | 'usdt' | 'inr'>('btc');
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const cryptoOptions = [
    { value: 'btc', label: 'Bitcoin (BTC)', symbol: '₿', color: 'yellow' },
    { value: 'eth', label: 'Ethereum (ETH)', symbol: 'Ξ', color: 'blue' },
    { value: 'usdt', label: 'USDT', symbol: '₮', color: 'green' },
    { value: 'inr', label: 'INR', symbol: '₹', color: 'orange' }
  ];

  const cryptoAddresses = {
    btc: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    eth: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    usdt: 'TKrx8cXrpYM1iaVvU3mVMzMUEtXw1Lj8gu',
    inr: 'INR34C0532925U3mVMzMUEtXw1Lj8gu'
  };

  const currencySymbols = {
    btc: '₿',
    eth: 'Ξ',
    usdt: '₮',
    inr: '₹'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cryptoAddresses[selectedCrypto]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      
      // Convert amount to number and ensure it's a valid number
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) {
        toast.error('Invalid amount');
        return;
      }

      // Get the correct cryptoname mapping
      const cryptoMapping: { [key: string]: string } = {
        'btc': 'BTC',
        'eth': 'ETH',
        'usdt': 'USDT',
        'inr': 'INR'
      };
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('User ID not found');
        return;
      }

      const requestData: DepositRequest = {
        userId: parseInt(userId),
        amount: numericAmount,
        cryptoname: cryptoMapping[selectedCrypto] || selectedCrypto.toUpperCase()
      };

      console.log('Sending deposit request:', requestData);
      const response = await depositService.deposit(requestData);

      // Refresh wallet data after successful deposit
      const updatedWallets = await fetchUserWallets(parseInt(userId));
      dispatch(setWallets(updatedWallets));

      console.log('Deposit response:', response);
      toast.success(response.message || 'Deposit processed successfully');
      onClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process deposit. Please try again.';
      toast.error(errorMessage);
      console.error('Deposit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 mt-12">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#252547] to-[#1A1A2E] rounded-2xl overflow-hidden animate-fadeIn">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-green-500/10">
          <h2 className="text-xl font-bold text-white">Deposit Funds</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A2E] text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-green-500/10">
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'crypto' 
                ? 'text-white border-b-2 border-green-500' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('crypto')}
          >
            <div className="flex items-center justify-center gap-2">
              <Bitcoin size={18} />
              <span>Cryptocurrency</span>
            </div>
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'card' 
                ? 'text-white border-b-2 border-green-500' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('card')}
          >
            <div className="flex items-center justify-center gap-2">
              <CreditCard size={18} />
              <span>Credit Card</span>
            </div>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-5">
          {activeTab === 'crypto' ? (
            <div className="space-y-4">
              <div className="relative">
                <select
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value as 'btc' | 'eth' | 'usdt' | 'inr')}
                  className="w-full py-3 px-4 bg-[#1A1A2E] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500 appearance-none cursor-pointer"
                >
                  {cryptoOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#1A1A2E]">
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className={`w-6 h-6 rounded-full bg-${cryptoOptions.find(opt => opt.value === selectedCrypto)?.color}-500 flex items-center justify-center text-white font-bold text-xs`}>
                    {currencySymbols[selectedCrypto]}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[#1A1A2E] rounded-lg border border-green-500/20">
                <p className="text-sm text-gray-400 mb-2">Send {selectedCrypto.toUpperCase()} to this address:</p>
                <div className="flex items-center gap-2 bg-[#252547] p-2 rounded-lg border border-green-500/10">
                  <div className="flex-1 text-white text-sm font-mono overflow-hidden overflow-ellipsis">
                    {cryptoAddresses[selectedCrypto]}
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="p-1.5 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="mt-4">
                  <label className="text-sm text-gray-400 mb-2 block">Amount ({selectedCrypto.toUpperCase()})</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full py-3 px-4 bg-[#252547] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500"
                      placeholder={`Enter ${selectedCrypto.toUpperCase()} amount`}
                    />
                  </div>
                </div>

                <button
                  onClick={handleDeposit}
                  disabled={loading}
                  className={`w-full mt-4 py-3 px-4 rounded-lg text-white font-medium transition-all ${
                    loading
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90'
                  }`}
                >
                  {loading ? 'Processing...' : 'Confirm Deposit'}
                </button>
              </div>
              
              <div className="p-4 bg-[#1A1A2E] rounded-lg border border-green-500/20 text-sm text-gray-400">
                <p className="mb-2">Important:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Send only {selectedCrypto.toUpperCase()} to this address</li>
                  <li>Minimum deposit: 0.001 {selectedCrypto.toUpperCase()}</li>
                  <li>Deposits are credited after 2 network confirmations</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Card Number</label>
                <input 
                  type="text" 
                  className="w-full py-3 px-4 bg-[#1A1A2E] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1 space-y-1">
                  <label className="text-sm text-gray-300">Expiry Date</label>
                  <input 
                    type="text" 
                    className="w-full py-3 px-4 bg-[#1A1A2E] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-sm text-gray-300">CVV</label>
                  <input 
                    type="text" 
                    className="w-full py-3 px-4 bg-[#1A1A2E] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500"
                    placeholder="123"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Cardholder Name</label>
                <input 
                  type="text" 
                  className="w-full py-3 px-4 bg-[#1A1A2E] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Amount (USD)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full py-3 pl-10 pr-4 bg-[#1A1A2E] border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500"
                    placeholder="100.00"
                  />
                </div>
              </div>
              
              <button 
                type="button"
                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              >
                Deposit Now
              </button>
              
              <div className="flex items-center justify-center gap-6 mt-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/200px-American_Express_logo_%282018%29.svg.png" alt="American Express" className="h-6" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositModal;