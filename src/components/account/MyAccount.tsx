import React from 'react';
import { 
  User, 
  Wallet, 
  History, 
  Gift, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Import your logout action if you have one
// import { logout } from '../../store/slices/authSlice';

const MyAccount: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { 
      icon: Wallet, 
      label: 'My Wallet', 
      route: '/wallet',
      description: 'Manage your balance and transactions'
    },
    { 
      icon: History, 
      label: 'Transaction History', 
      route: '/bet-history',
      description: 'View your gaming history'
    },
    { 
      icon: Gift, 
      label: 'My Rewards', 
      route: '/rewards',
      description: 'Check your rewards and bonuses'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      route: '/settings',
      description: 'Account preferences and security'
    },
    { 
      icon: HelpCircle, 
      label: 'Help Center', 
      route: '/help',
      description: '24/7 customer support'
    },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    // dispatch(logout());
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="pt-16 pb-24 bg-[#0F0F19]">
      <div className="px-4 py-6 space-y-6">
        {/* Header - Updated to match Profile */}
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">My Account</h1>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <div className="w-20 h-20 rounded-full bg-purple-600/20 flex items-center justify-center">
            <User className="w-10 h-10 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">John Doe</h2>
            <p className="text-gray-400">ID: 123456789</p>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="px-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4">
              <p className="text-white/80 text-sm">Available Balance</p>
              <h2 className="text-2xl font-bold text-white mt-1">$1,234.56</h2>
            </div>
            <div className="bg-gradient-to-r from-[#252547] to-[#1A1A2E] rounded-xl p-4 border border-purple-500/20">
              <p className="text-white/80 text-sm">Bonus Balance</p>
              <h2 className="text-2xl font-bold text-white mt-1">$50.00</h2>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 mt-6 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.route)}
              className="w-full flex items-center justify-between p-4 bg-[#252547] rounded-lg hover:bg-[#2f2f5a] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <span className="text-white font-medium">{item.label}</span>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors mt-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-left">
                <span className="text-red-400 font-medium">Logout</span>
                <p className="text-red-400/60 text-sm">Sign out from your account</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-red-400" />
          </button>
        </div>

        {/* Version Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;