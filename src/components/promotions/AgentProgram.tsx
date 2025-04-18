import React, { useEffect } from 'react';
import { Copy, ArrowLeft, Users, Wallet, Scroll, Headphones, ChevronRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgentProgram: React.FC = () => {
  const [referralCode, setReferralCode] = React.useState('');

  useEffect(() => {
    const referralCode = localStorage.getItem('referralCode');
    console.log(referralCode);
    setReferralCode(referralCode || '');
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Invitation code copied to clipboard');
  };

  const handleCopyLink = () => {
    const invitationLink = `https://www.rollix777.com/refer/${referralCode}`;
    navigator.clipboard.writeText(invitationLink);
    alert('Invitation link copied to clipboard');
  };

  const StatCard = ({ title, value, change }: { title: string; value: string; change?: string }) => (
    <div className="bg-[#1A1A2E] rounded-2xl p-6 hover:bg-[#1E1E35] transition-all duration-300 border border-white/5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        {change && (
          <span className="text-emerald-400 text-xs flex items-center bg-emerald-400/10 px-2 py-1 rounded-full">
            <TrendingUp size={12} className="mr-1" />
            {change}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );

  const MenuItem = ({ icon: Icon, title, subtitle, route }: { icon: any; title: string; subtitle: string; route: string }) => (
    <Link
      to={route}
      className="flex items-center gap-4 p-4 rounded-2xl bg-[#1A1A2E] hover:bg-[#1E1E35] transition-all duration-300 border border-white/5"
    >
      <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-purple-400" />
      </div>
      <div className="flex-grow">
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </Link>
  );

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/" 
          className="p-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-semibold text-white">Agent Program</h1>
      </div>

      {/* Hero Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
          <div className="relative">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-sm mb-4">
              Yesterday's Earnings
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">₹0.00</h2>
            <p className="text-white/80">
              Increase your earnings by growing your team
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Direct Members" 
          value="0" 
          change="+0%" 
        />
        <StatCard 
          title="Team Size" 
          value="0" 
          change="+0%" 
        />
        <StatCard 
          title="Total Deposits" 
          value="₹0" 
        />
        <StatCard 
          title="Active Members" 
          value="0" 
        />
      </section>

      {/* Invitation Section */}
      <section className="mb-8">
        <div className="bg-[#1A1A2E] rounded-2xl p-6 space-y-6 border border-white/5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Share & Earn</h2>
            <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
              Level 1
            </span>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0F0F19] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Your Referral Link</span>
                <button 
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
              <p className="text-white text-sm break-all font-mono">
                https://www.rollix777.com/refer/{referralCode}
              </p>
            </div>

            <div className="bg-[#0F0F19] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Referral Code</span>
                <button 
                  onClick={handleCopyCode}
                  className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
              <p className="text-white text-lg font-mono">{referralCode}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <MenuItem 
          icon={Users} 
          title="Team Overview" 
          subtitle="View your team's performance and statistics"
          route="/promotions/team-report" 
        />
        <MenuItem 
          icon={Wallet} 
          title="Commission History" 
          subtitle="Track your earnings and payment history"
          route="#" 
        />
        <MenuItem 
          icon={Scroll} 
          title="Program Rules" 
          subtitle="Learn about commission rates and requirements"
          route="#" 
        />
        <MenuItem 
          icon={Headphones} 
          title="Agent Support" 
          subtitle="Get help from our dedicated support team"
          route="#" 
        />
      </section>
    </div>
  );
};

export default AgentProgram; 