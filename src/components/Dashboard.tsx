import React, { useState } from 'react';
import { Wallet, ArrowDown, CreditCard } from 'lucide-react';
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
    <div className="pt-16 pb-20">
      {/* Deposit/Withdraw Buttons */}
      <div className="px-4 py-6 flex gap-4">
        <button 
          onClick={() => setIsDepositModalOpen(true)}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Wallet className="w-5 h-5" />
          <span>Deposit</span>
        </button>
        <button 
          onClick={() => setIsWithdrawModalOpen(true)}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <ArrowDown className="w-5 h-5" />
          <span>Withdraw</span>
        </button>
      </div>

      {/* Image Slider */}
      <ImageSlider />

      {/* Game Sections */}
      <ColorGame />
      <LatestGames/>
      <GameCarousel title="Popular Games" type="popular" />
      <TrendingGames />
      <HotGames />

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