import React, { useState } from 'react';
import { Wallet, ArrowDown, Clock, Trophy, Gamepad2, History, ChevronRight } from 'lucide-react';
import ImageSlider from './ImageSlider';
import ColorGame from './ColorGame';
import GameCarousel from './GameCarousel';
import TrendingGames from './TrendingGames';
import HotGames from './HotGames';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import LatestGames from './LatestGames';

const Dashboard = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F0F19] w-full">
      {/* Mobile View */}
      <div className="md:hidden max-w-[430px] mx-auto">
        <div className="pt-16 pb-20">
          {/* User Stats - Mobile */}
          <div className="px-4 py-4 bg-[#151525]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Welcome Back!</h2>
                <p className="text-sm text-gray-400">John Doe</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Balance</p>
                <p className="text-lg font-bold text-white">$0.00</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsDepositModalOpen(true)}
                className="py-2.5 px-4 rounded-lg bg-green-600 text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Deposit</span>
              </button>
              <button 
                onClick={() => setIsWithdrawModalOpen(true)}
                className="py-2.5 px-4 rounded-lg bg-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <ArrowDown className="w-4 h-4" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>

          {/* Quick Stats - Mobile */}
          <div className="grid grid-cols-2 gap-3 px-4 py-4">
            <div className="bg-[#151525] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-purple-500" />
                <p className="text-sm text-gray-400">Games Won</p>
              </div>
              <p className="text-xl font-bold text-white">0</p>
            </div>
            <div className="bg-[#151525] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <History className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-gray-400">Total Played</p>
              </div>
              <p className="text-xl font-bold text-white">0</p>
            </div>
          </div>

          <ImageSlider />
          <ColorGame />
          <LatestGames />
          <GameCarousel title="Popular Games" type="popular" />
          <TrendingGames />
          <HotGames />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block w-full">
        <div className="w-full">
          {/* Top Bar */}
          <div className="w-full bg-[#151525] border-b border-gray-800/50">
            <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Welcome Back, John Doe!</h2>
                    <p className="text-gray-400 text-sm">Let's play and win big today!</p>
                  </div>
                  <div className="h-12 w-px bg-gray-800/50"></div>
                  <div>
                    <p className="text-gray-400 text-sm">Balance</p>
                    <p className="text-2xl font-bold text-white">$0.00</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsDepositModalOpen(true)}
                    className="py-2.5 px-6 rounded-lg bg-green-600 text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>Deposit</span>
                  </button>
                  <button 
                    onClick={() => setIsWithdrawModalOpen(true)}
                    className="py-2.5 px-6 rounded-lg bg-purple-600 text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <ArrowDown className="w-5 h-5" />
                    <span>Withdraw</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-8 py-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Main Content Column */}
              <div className="col-span-9">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-[#151525] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-6 h-6 text-purple-500" />
                      <p className="text-sm text-gray-400">Games Won</p>
                    </div>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                  <div className="bg-[#151525] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <History className="w-6 h-6 text-blue-500" />
                      <p className="text-sm text-gray-400">Total Played</p>
                    </div>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                  <div className="bg-[#151525] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Gamepad2 className="w-6 h-6 text-green-500" />
                      <p className="text-sm text-gray-400">Active Games</p>
                    </div>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                  <div className="bg-[#151525] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-6 h-6 text-pink-500" />
                      <p className="text-sm text-gray-400">Time Played</p>
                    </div>
                    <p className="text-2xl font-bold text-white">0h</p>
                  </div>
                </div>

                {/* Featured Section */}
                <div className="bg-[#151525] rounded-xl overflow-hidden mb-6">
                  <ImageSlider />
                </div>

                {/* Games Sections */}
                <div className="space-y-6">
                  <GameCarousel title="Popular Games" type="popular" />
                  <TrendingGames />
                  <HotGames />
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-span-3 space-y-6">
                {/* Latest Activity */}
                <div className="bg-[#151525] rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-500" />
                        <h3 className="text-lg font-bold text-white">Latest Activity</h3>
                      </div>
                      <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                        View All
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <LatestGames />
                  </div>
                </div>

                {/* Recent Games */}
                <div className="bg-[#151525] rounded-xl p-4">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Games</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                        <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
                        <div>
                          <p className="text-sm font-medium text-white">Game Name</p>
                          <p className="text-xs text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DepositModal 
        isOpen={isDepositModalOpen} 
        onClose={() => setIsDepositModalOpen(false)} 
      />
      <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={() => setIsWithdrawModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
