import React, { useState } from 'react';
import { X, Wallet, Bitcoin, DollarSign, CreditCard, ArrowDown } from 'lucide-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'crypto' | 'bank'>('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState<'btc' | 'eth' | 'usdt'>('btc');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#252547] to-[#1A1A2E] rounded-2xl overflow-hidden animate-fadeIn">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-purple-500/10">
          <h2 className="text-xl font-bold text-white">Withdraw Funds</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A2E] text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-purple-500/10">
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'crypto' 
                ? 'text-white border-b-2 border-purple-500' 
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
              activeTab === 'bank' 
                ? 'text-white border-b-2 border-purple-500' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('bank')}
          >
            <div className="flex items-center justify-center gap-2">
              <CreditCard size={18} />
              <span>Bank Transfer</span>
            </div>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-5">
          {activeTab === 'crypto' ? (
            <div className="space-y-4">
              <div className="flex gap-2">
                <button 
                  className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 ${
                    selectedCrypto === 'btc' 
                      ? 'bg-yellow-500/20 border border-yellow-500/30 text-white' 
                      : 'bg-[#1A1A2E] border border-gray-700 text-gray-400 hover:border-yellow-500/30'
                  }`}
                  onClick={() => setSelectedCrypto('btc')}
                >
                  <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xs">₿</div>
                  <span>Bitcoin</span>
                </button>
                <button 
                  className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 ${
                    selectedCrypto === 'eth' 
                      ? 'bg-blue-500/20 border border-blue-500/30 text-white' 
                      : 'bg-[#1A1A2E] border border-gray-700 text-gray-400 hover:border-blue-500/30'
                  }`}
                  onClick={() => setSelectedCrypto('eth')}
                >
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">Ξ</div>
                  <span>Ethereum</span>
                </button>
                <button 
                  className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 ${
                    selectedCrypto === 'usdt' 
                      ? 'bg-green-500/20 border border-green-500/30 text-white' 
                      : 'bg-[#1A1A2E] border border-gray-700 text-gray-400 hover:border-green-500/30'
                  }`}
                  onClick={() => setSelectedCrypto('usdt')}
                >
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">₮</div>
                  <span>USDT</span>
                </button>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Wallet Address</label>
                <input 
                  type="text" 
                  className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder={`Enter your ${selectedCrypto.toUpperCase()} wallet address`}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Amount</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-400">{selectedCrypto.toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-400">Available: 0.0042 {selectedCrypto.toUpperCase()}</span>
                  <button className="text-purple-400">MAX</button>
                </div>
              </div>
              
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Fee:</span>
                  <span className="text-white">0.0001 {selectedCrypto.toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-400">You will receive:</span>
                  <span className="text-white">0.00 {selectedCrypto.toUpperCase()}</span>
                </div>
              </div>
              
              <button 
                type="button"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              >
                Withdraw Now
              </button>
              
              <div className="text-sm text-gray-400">
                <p className="mb-2">Important:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Minimum withdrawal: 0.001 {selectedCrypto.toUpperCase()}</li>
                  <li>Processing time: 10-30 minutes</li>
                  <li>Double-check your wallet address before confirming</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Bank Name</label>
                <input 
                  type="text" 
                  className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="Enter your bank name"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Account Number</label>
                <input 
                  type="text" 
                  className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="Enter your account number"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Account Holder Name</label>
                <input 
                  type="text" 
                  className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="Enter account holder name"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Amount (USD)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="w-5 h-5 text-purple-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full py-3 pl-10 pr-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="100.00"
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-400">Available: $1,250.00</span>
                  <button className="text-purple-400">MAX</button>
                </div>
              </div>
              
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Fee:</span>
                  <span className="text-white">$5.00</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-400">You will receive:</span>
                  <span className="text-white">$0.00</span>
                </div>
              </div>
              
              <button 
                type="button"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              >
                Withdraw Now
              </button>
              
              <div className="text-sm text-gray-400">
                <p className="mb-2">Important:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Minimum withdrawal: $50.00</li>
                  <li>Processing time: 1-3 business days</li>
                  <li>Bank transfer fees may apply</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;