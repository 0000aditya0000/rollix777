import React , {useEffect} from 'react';
import { Copy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgentProgram: React.FC = () => {
  // const [invitationCode] = React.useState('646726816732');
  const [referralCode, setReferralCode] = React.useState('');
  

  useEffect(() => {
    const referralCode = localStorage.getItem('referralCode');
    console.log(referralCode);
    setReferralCode(referralCode || '');
  }, []);
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    // Add toast notification here if you have one
    alert('Invitation code copied to clipboard');
  };

  const handleCopyLink = () => {
    const invitationLink = `https://www.rollix777.com/refer/${referralCode}`;
    navigator.clipboard.writeText(invitationLink);
    alert('Invitation link copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-[#0F0F19]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-[#0F0F19] max-w-[430px] mx-auto">
        <div className="px-4 py-6 flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Agent Program</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-24">
        {/* Commission Card */}
        <div className="mx-4 bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-6 text-center border-b border-purple-500/10">
            <h2 className="text-3xl font-bold text-white mb-2">₹0</h2>
            <div className="inline-block bg-purple-500/20 rounded-full px-4 py-1 mb-2">
              <span className="text-sm text-white">Yesterday's total commission</span>
            </div>
            <p className="text-sm text-gray-400">
              Upgrade the level to increase commission income
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 divide-x divide-purple-500/10">
            {/* Direct Subordinates */}
            <div className="p-4">
              <h3 className="text-center text-white font-medium mb-4">Direct subordinates</h3>
              <div className="space-y-6">
                {[
                  { label: 'Number of register', value: '0' },
                  { label: 'Deposit number', value: '0' },
                  { label: 'Deposit amount', value: '0' },
                  { label: 'First deposit users', value: '0' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xl font-bold text-white">{item.value}</p>
                    <p className="text-sm text-gray-400 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Subordinates */}
            <div className="p-4">
              <h3 className="text-center text-white font-medium mb-4">Team subordinates</h3>
              <div className="space-y-6">
                {[
                  { label: 'Number of register', value: '0' },
                  { label: 'Deposit number', value: '0' },
                  { label: 'Deposit amount', value: '0' },
                  { label: 'First deposit users', value: '0' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xl font-bold text-white">{item.value}</p>
                    <p className="text-sm text-gray-400 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Invitation Section */}
        <div className="px-4 mt-6 space-y-4">
          {/* Invitation Link Button */}
          <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
            INVITATION LINK
          </button>

          {/* Invitation Link Card */}
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-3">
                <p className="text-sm text-gray-400 mb-1">Copy invitation link</p>
                <p className="text-white font-medium break-all">
                  https://www.rollix777.com/refer/{referralCode}
                </p>
              </div>
              <button 
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors flex-shrink-0"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* Copy Code Card */}
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Copy className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Copy invitation code</p>
                  <p className="text-white font-medium">{referralCode}</p>
                </div>
              </div>
              <button 
                onClick={handleCopyCode}
                className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {[
              { title: 'Subordinate data', icon: '👥', route: '/promotions/team-report' },
              { title: 'Commission detail', icon: '💰', route: '#' },
              { title: 'Invitation rules', icon: '📜', route: '#' },
              { title: 'Agent line customer service', icon: '🎮', route: '#' }
            ].map((item, index) => (
              <Link
                key={index}
                to={item.route}
                className="block bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden hover:bg-purple-500/10 transition-colors"
              >
                <div className="w-full p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <span className="text-white font-medium">{item.title}</span>
                  </div>
                  <span className="text-gray-400 text-xl">›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProgram; 