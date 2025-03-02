import React, { useState } from 'react';
import { X, CreditCard, Wallet, Bitcoin, DollarSign, Copy, Check } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'crypto' | 'card'>('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState<'btc' | 'eth' | 'usdt'>('btc');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cryptoAddresses = {
    btc: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    eth: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    usdt: 'TKrx8cXrpYM1iaVvU3mVMzMUEtXw1Lj8gu'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cryptoAddresses[selectedCrypto]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
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
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg">
                    <div className="w-full h-full bg-[#1A1A2E] flex items-center justify-center text-white">
                      QR Code Placeholder
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
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
              
              <div className="flex items-center justify-center gap-2 mt-2">
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