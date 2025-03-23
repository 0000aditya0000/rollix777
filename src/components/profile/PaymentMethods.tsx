import React, { useState } from 'react';
import { ArrowLeft, Plus, CreditCard, Trash2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentMethods = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [cards, setCards] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '09/24', isDefault: false }
  ]);

  return (
    <div className="pt-16 pb-24">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Payment Methods</h1>
        </div>

        {/* Add Card Button */}
        <button
          onClick={() => setShowAddCard(true)}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          <span>Add New Card</span>
        </button>

        {/* Cards List */}
        <div className="space-y-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#1A1A2E] border border-purple-500/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {card.type.charAt(0).toUpperCase() + card.type.slice(1)} •••• {card.last4}
                    </h3>
                    <p className="text-gray-400 text-sm">Expires {card.expiry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {card.isDefault && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                      Default
                    </span>
                  )}
                  <button className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {!card.isDefault && (
                <button
                  className="mt-4 w-full py-2 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/10 transition-colors text-sm"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Card Modal */}
        {showAddCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddCard(false)}></div>
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#252547] to-[#1A1A2E] rounded-2xl overflow-hidden animate-fadeIn">
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Add New Card</h2>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm text-gray-400">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm text-gray-400">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="setDefault" className="rounded bg-[#1A1A2E] border-purple-500/20 text-purple-600" />
                    <label htmlFor="setDefault" className="text-sm text-gray-400">Set as default payment method</label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowAddCard(false)}
                    className="flex-1 py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white hover:bg-purple-500/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
                    Add Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;