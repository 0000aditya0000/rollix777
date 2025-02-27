import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Gift, Eye, EyeOff, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  if (!isOpen) return null;

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#252547] to-[#1A1A2E] rounded-2xl overflow-hidden animate-fadeIn">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-purple-500/10">
          <h2 className="text-xl font-bold text-white">
            {mode === 'login' ? 'Login to Rollix777' : 'Create Account'}
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A2E] text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-5">
          {mode === 'login' ? (
            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-purple-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full py-3 pl-10 pr-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-purple-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="w-full py-3 pl-10 pr-10 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Enter your password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? 
                      <EyeOff className="w-5 h-5 text-gray-400" /> : 
                      <Eye className="w-5 h-5 text-gray-400" />
                    }
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button type="button" className="text-sm text-purple-400 hover:text-purple-300">
                  Forgot Password?
                </button>
              </div>
              
              <button 
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              >
                Login
              </button>
            </form>
          ) : (
            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-purple-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full py-3 pl-10 pr-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Choose a username"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-purple-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full py-3 pl-10 pr-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-purple-400" />
                  </div>
                  <input 
                    type="email" 
                    className="w-full py-3 pl-10 pr-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <input 
                    type="tel" 
                    className="w-full py-3 pl-10 pr-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Referral Code (Optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Gift className="w-5 h-5 text-purple-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full py-3 pl-10 pr-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Enter referral code if you have one"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-gray-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-purple-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="w-full py-3 pl-10 pr-10 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Create a password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? 
                      <EyeOff className="w-5 h-5 text-gray-400" /> : 
                      <Eye className="w-5 h-5 text-gray-400" />
                    }
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <div 
                  className={`w-5 h-5 rounded flex items-center justify-center mr-3 cursor-pointer ${
                    acceptTerms 
                      ? 'bg-purple-600' 
                      : 'bg-[#1A1A2E] border border-purple-500/20'
                  }`}
                  onClick={() => setAcceptTerms(!acceptTerms)}
                >
                  {acceptTerms && <Check className="w-4 h-4 text-white" />}
                </div>
                <label className="text-sm text-gray-300 cursor-pointer" onClick={() => setAcceptTerms(!acceptTerms)}>
                  I accept the <span className="text-purple-400">Terms of Service</span> and <span className="text-purple-400">Privacy Policy</span>
                </label>
              </div>
              
              <button 
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={!acceptTerms}
              >
                Register
              </button>
            </form>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-5 border-t border-purple-500/10 text-center">
          <p className="text-gray-400">
            {mode === 'login' 
              ? "Don't have an account?" 
              : "Already have an account?"}
            <button 
              onClick={toggleMode}
              className="ml-2 text-purple-400 hover:text-purple-300 font-medium"
            >
              {mode === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;