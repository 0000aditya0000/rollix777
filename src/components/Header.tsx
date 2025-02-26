import React from 'react';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full max-w-[430px] z-50">
      <div className="px-4 py-3 bg-[#1A1A2E]/95 backdrop-blur-lg border-b border-purple-500/10">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Rollix777
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <button className="py-2 px-4 rounded-lg bg-[#252547] text-purple-400 font-medium hover:bg-[#2f2f5a] transition-colors flex items-center gap-2 border border-purple-500/10">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              <button className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </button>
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="sm:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors border border-purple-500/10"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#1A1A2E]/95 backdrop-blur-lg border-b border-purple-500/10 p-4 flex flex-col gap-3 animate-fadeIn">
          <button className="w-full py-3 px-4 rounded-lg bg-[#252547] text-purple-400 font-medium hover:bg-[#2f2f5a] transition-colors flex items-center justify-center gap-2 border border-purple-500/10">
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </button>
          <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" />
            <span>Register</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;