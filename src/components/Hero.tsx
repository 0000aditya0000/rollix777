import React, { useState } from 'react';
import { Gamepad2, Star, Users, Trophy } from 'lucide-react';
import AuthModal from './AuthModal';

interface HeroProps {
  onLogin?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLogin }) => {
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    // Function to check if user is logged in
    const isUserLoggedIn = () => localStorage.getItem("userToken");
  
    const handlePlayNow = (gameId: string) => {
      if (!isUserLoggedIn()) {
        setAuthModalOpen(true); // Show login popup if user is not logged in
        return;
      }
  
      // Launch game if user is logged in
      console.log(`Launching game with ID: ${gameId}`);
      // Redirect to game page or open game logic here
    };
  return (
    <section className="pt-20 px-4 pb-12 bg-[#1A1A2E] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-pink-600/10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50" />
            <div className="relative p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/20">
              <Gamepad2 size={32} className="text-purple-400" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-3">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Play & Win
          </span>
        </h1>
        <p className="text-gray-400 text-center mb-8 text-lg">
          Join millions of players worldwide
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#252547] p-3 rounded-xl text-center border border-purple-500/10">
            <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-white font-semibold">50K+</p>
            <p className="text-xs text-gray-400">Players</p>
          </div>
          <div className="bg-[#252547] p-3 rounded-xl text-center border border-purple-500/10">
            <Trophy className="w-6 h-6 text-pink-400 mx-auto mb-2" />
            <p className="text-white font-semibold">$100K</p>
            <p className="text-xs text-gray-400">Prize Pool</p>
          </div>
          <div className="bg-[#252547] p-3 rounded-xl text-center border border-purple-500/10">
            <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-white font-semibold">4.9/5</p>
            <p className="text-xs text-gray-400">Rating</p>
          </div>
        </div>

        <button
          onClick={onLogin}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-lg hover:opacity-90 transition-opacity relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse" />
          <span className="relative">Start Playing Now</span>
        </button>
      </div>
      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
        onLoginSuccess={() => setAuthModalOpen(false)}
      />
    </section>
  );
};

export default Hero;