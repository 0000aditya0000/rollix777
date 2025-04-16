import React from 'react';
import { Gift } from 'lucide-react';

const Promotions = () => {
  return (
    <>
      {/* Mobile View */}
      <section className="md:hidden py-8 px-4 bg-[#1A1A2E]">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-bold text-white">Special Offers</h2>
        </div>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-4 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-2">Welcome Bonus</h3>
            <p className="text-gray-300 text-sm mb-3">Get 100% bonus on your first deposit up to $1000</p>
            <button className="w-full py-2 px-4 bg-white text-purple-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Claim Now
            </button>
          </div>
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-4 border border-blue-500/20">
            <h3 className="text-xl font-bold text-white mb-2">Daily Cashback</h3>
            <p className="text-gray-300 text-sm mb-3">Get 10% cashback on all your losses, every day!</p>
            <button className="w-full py-2 px-4 bg-white text-purple-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Desktop View */}
      <section className="hidden md:block py-12 px-6 bg-[#1A1A2E]">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Gift className="w-8 h-8 text-pink-500" />
            <h2 className="text-3xl font-bold text-white">Special Offers</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {/* Welcome Bonus Card */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all group">
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-bold text-white mb-3">Welcome Bonus</h3>
                <p className="text-gray-300 text-base mb-6 flex-grow">Get 100% bonus on your first deposit up to $1000</p>
                <div className="relative overflow-hidden rounded-xl">
                  <button className="w-full py-3 px-6 bg-white text-purple-900 rounded-xl font-medium group-hover:bg-gray-100 transition-colors">
                    Claim Now
                  </button>
                </div>
              </div>
            </div>

            {/* Daily Cashback Card */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all group">
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-bold text-white mb-3">Daily Cashback</h3>
                <p className="text-gray-300 text-base mb-6 flex-grow">Get 10% cashback on all your losses, every day!</p>
                <div className="relative overflow-hidden rounded-xl">
                  <button className="w-full py-3 px-6 bg-white text-purple-900 rounded-xl font-medium group-hover:bg-gray-100 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Weekly Reload Card */}
            <div className="bg-gradient-to-r from-pink-900/50 to-orange-900/50 rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all group">
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-bold text-white mb-3">Weekly Reload</h3>
                <p className="text-gray-300 text-base mb-6 flex-grow">Get 50% bonus up to $500 every week on your deposits!</p>
                <div className="relative overflow-hidden rounded-xl">
                  <button className="w-full py-3 px-6 bg-white text-purple-900 rounded-xl font-medium group-hover:bg-gray-100 transition-colors">
                    Get Bonus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Promotions;