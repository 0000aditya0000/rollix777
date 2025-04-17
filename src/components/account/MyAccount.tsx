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
      description: 'Manage your balance and transactions',
      color: 'from-blue-500 to-cyan-400'
    },
    { 
      icon: History, 
      label: 'Transaction History', 
      route: '/bet-history',
      description: 'View your gaming history',
      color: 'from-purple-500 to-indigo-500'
    },
    { 
      icon: Gift, 
      label: 'My Rewards', 
      route: '/rewards',
      description: 'Check your rewards and bonuses',
      color: 'from-pink-500 to-rose-400'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      route: '/settings',
      description: 'Account preferences and security',
      color: 'from-amber-500 to-orange-400'
    },
    { 
      icon: HelpCircle, 
      label: 'Help Center', 
      route: '/help',
      description: '24/7 customer support',
      color: 'from-emerald-500 to-teal-400'
    },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    // dispatch(logout());
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F19] to-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="flex mt-8 justify-between items-center mb-12">
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="p-3 rounded-xl bg-white/5 text-purple-400 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-4xl font-bold text-white tracking-tight">My Account</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all duration-300"
          >
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Logout</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Profile & Balance */}
          <div className="col-span-4 space-y-8">
            {/* Profile Card */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1">
                  <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                    <User className="w-16 h-16 text-purple-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mt-6">John Doe</h2>
                <p className="text-gray-400 mt-2">ID: 123456789</p>
              </div>
            </div>

            {/* Balance Cards */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-lg shadow-purple-500/20">
                <p className="text-white/90 text-lg font-medium">Available Balance</p>
                <h2 className="text-4xl font-bold text-white mt-2">$1,234.56</h2>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm">
                <p className="text-white/90 text-lg font-medium">Bonus Balance</p>
                <h2 className="text-4xl font-bold text-white mt-2">$50.00</h2>
              </div>
            </div>
          </div>

          {/* Right Column - Menu Items */}
          <div className="col-span-8">
            <div className="grid grid-cols-2 gap-6">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.route)}
                  className="group relative overflow-hidden bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="text-xl font-semibold text-white block mb-2">{item.label}</span>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                    <ChevronRight className="absolute top-6 right-6 w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;