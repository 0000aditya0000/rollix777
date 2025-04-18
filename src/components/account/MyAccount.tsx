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
      bgColor: 'from-purple-600/10 to-pink-500/10',
      hoverBg: 'from-purple-600/20 to-pink-500/20'
    },
    { 
      icon: History, 
      label: 'Transaction History', 
      route: '/bet-history',
      description: 'View your gaming history',
      bgColor: 'from-blue-600/10 to-cyan-500/10',
      hoverBg: 'from-blue-600/20 to-cyan-500/20'
    },
    { 
      icon: Gift, 
      label: 'My Rewards', 
      route: '/rewards',
      description: 'Check your rewards and bonuses',
      bgColor: 'from-amber-600/10 to-yellow-500/10',
      hoverBg: 'from-amber-600/20 to-yellow-500/20'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      route: '/settings',
      description: 'Account preferences and security',
      bgColor: 'from-emerald-600/10 to-teal-500/10',
      hoverBg: 'from-emerald-600/20 to-teal-500/20'
    },
    { 
      icon: HelpCircle, 
      label: 'Help Center', 
      route: '/help',
      description: '24/7 customer support',
      bgColor: 'from-rose-600/10 to-red-500/10',
      hoverBg: 'from-rose-600/20 to-red-500/20'
    },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    // dispatch(logout());
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0F0F19]">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#1A1A2E]/95 backdrop-blur-lg border-b border-purple-500/10 z-50">
        <div className="max-w-[1400px] mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="p-2 rounded-lg bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 transition-all"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl md:text-2xl font-bold text-white">My Account</h1>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
            <span className="text-sm md:text-base text-red-400 font-medium hidden md:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 pt-24 md:pt-28 pb-8">
        {/* Profile & Balance Card */}
        <div className="bg-[#1A1A2E] rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            {/* Profile Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-[2px]">
                <div className="w-full h-full rounded-2xl bg-[#1A1A2E] flex items-center justify-center">
                  <User className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">John Doe</h2>
                <p className="text-sm text-gray-400">ID: 123456789</p>
              </div>
            </div>

            {/* Balance Info */}
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto md:flex-1">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Available Balance</p>
                <h3 className="text-xl md:text-2xl font-bold text-white">$1,234.56</h3>
              </div>
              <div className="bg-[#252547] rounded-xl p-4 border border-purple-500/20">
                <p className="text-gray-400 text-sm mb-1">Bonus Balance</p>
                <h3 className="text-xl md:text-2xl font-bold text-white">$50.00</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white px-1">Services</h2>
            <div className="hidden md:block text-sm text-gray-400">5 services available</div>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.route)}
                className="w-full flex items-center gap-4 p-4 bg-[#252547] rounded-xl hover:bg-[#2f2f5a] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center group-hover:bg-purple-600/20 transition-all">
                  <item.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.label}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </button>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.route)}
                className={`group relative overflow-hidden bg-gradient-to-br ${item.bgColor} hover:${item.hoverBg} rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:translate-x-20 transition-transform"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white transition-colors transform group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.label}</h3>
                  <p className="text-white/60 group-hover:text-white/80 transition-colors">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Version 1.0.0</p>
        </div>
      </main>
    </div>
  );
};

export default MyAccount;