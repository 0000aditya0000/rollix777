import React from 'react';
import { Home, Gamepad2, Gift, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full max-w-[430px] bg-[#0F0F19]/90 backdrop-blur-lg border-t border-gray-800">
      <nav className="flex justify-around py-3 px-4">
        <button className="flex flex-col items-center gap-1">
          <Home className="w-6 h-6 text-purple-500" />
          <span className="text-xs text-gray-400">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Gamepad2 className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">Games</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Gift className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">Rewards</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <User className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">Profile</span>
        </button>
      </nav>
    </footer>
  );
};

export default Footer;