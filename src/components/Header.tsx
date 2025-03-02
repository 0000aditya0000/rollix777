import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  Wallet,
  ChevronDown,
  Bell,
  LogOut,
} from "lucide-react";
import AuthModal from "./AuthModal";
import SideNav from "./SideNav.tsx";

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout, onLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const walletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        walletRef.current &&
        !walletRef.current.contains(event.target as Node)
      ) {
        setIsWalletOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openLoginModal = () => {
    setAuthMode("login");
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  const openRegisterModal = () => {
    setAuthMode("register");
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };
  // console.log("authmode", authMode);
  const toggleWallet = () => {
    setIsWalletOpen(!isWalletOpen);
  };

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    onLogout();
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    onLogin(); // Call the onLogin prop to update the App state
  };

  return (
    <>
      <header className="fixed top-0 w-full max-w-[430px] z-40">
        <div className="px-4 py-3 bg-[#1A1A2E]/95 backdrop-blur-lg border-b border-purple-500/10">
          <div className="flex items-center justify-between">
            {isLoggedIn ? (
              // Logged in header
              <>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Rollix777
                </div>

                {/* Wallet in center */}
                <div className="relative" ref={walletRef}>
                  <button
                    onClick={toggleWallet}
                    className="py-2 px-4 rounded-lg bg-[#252547] text-white font-medium hover:bg-[#2f2f5a] transition-colors flex items-center gap-2 border border-purple-500/20"
                  >
                    <Wallet className="w-4 h-4 text-purple-400" />
                    <span>$1,250.00</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isWalletOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isWalletOpen && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-[#252547] rounded-xl border border-purple-500/20 shadow-lg animate-fadeIn z-50">
                      <div className="p-3 border-b border-purple-500/10">
                        <h3 className="text-white font-semibold">My Wallet</h3>
                      </div>
                      <div className="p-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                              ₿
                            </div>
                            <span className="text-white">Bitcoin</span>
                          </div>
                          <span className="text-white">0.0042 BTC</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              E
                            </div>
                            <span className="text-white">Ethereum</span>
                          </div>
                          <span className="text-white">0.15 ETH</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                              $
                            </div>
                            <span className="text-white">USD</span>
                          </div>
                          <span className="text-white">$1,250.00</span>
                        </div>
                      </div>
                      <div className="p-3 border-t border-purple-500/10">
                        <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity">
                          Manage Wallet
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-3">
                  <button className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors border border-purple-500/10">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <button
                    onClick={toggleSideNav}
                    className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors border border-purple-500/10"
                  >
                    {isSideNavOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              </>
            ) : (
              // Non-logged in header
              <>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Rollix777
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      onClick={openLoginModal}
                      className="py-2 px-4 rounded-lg bg-[#252547] text-purple-400 font-medium hover:bg-[#2f2f5a] transition-colors flex items-center gap-2 border border-purple-500/10"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </button>
                    <button
                      onClick={openRegisterModal}
                      className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
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
              </>
            )}
          </div>
        </div>

        {isMenuOpen && !isLoggedIn && (
          <div className="absolute top-full left-0 right-0 bg-[#1A1A2E]/95 backdrop-blur-lg border-b border-purple-500/10 p-4 flex flex-col gap-3 animate-fadeIn">
            <button
              onClick={openLoginModal}
              className="w-full py-3 px-4 rounded-lg bg-[#252547] text-purple-400 font-medium hover:bg-[#2f2f5a] transition-colors flex items-center justify-center gap-2 border border-purple-500/10"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button
              onClick={openRegisterModal}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register</span>
            </button>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />

      <SideNav
        isOpen={isSideNavOpen}
        onClose={() => setIsSideNavOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
