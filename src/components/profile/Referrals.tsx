import React from 'react';
import { ArrowLeft, Copy, Gift, Users, DollarSign, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Referrals = () => {
  const [copied, setCopied] = React.useState(false);
  const referralCode = 'JOHN777';
  const referralLink = `https://rollix777.com/ref/${referralCode}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referrals = [
    { id: 1, username: 'alice123', date: '2025-04-10', status: 'active', earnings: '$50.00' },
    { id: 2, username: 'bob456', date: '2025-04-09', status: 'pending', earnings: '$0.00' },
    { id: 3, username: 'charlie789', date: '2025-04-08', status: 'active', earnings: '$75.00' },
  ];

  return (
    <div className="pt-16 pb-24">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Referrals & Rewards</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-gray-400">Total Referrals</span>
            </div>
            <p className="text-2xl font-bold text-white">24</p>
          </div>
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-gray-400">Total Earnings</span>
            </div>
            <p className="text-2xl font-bold text-white">$125.00</p>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10">
            <h2 className="text-lg font-semibold text-white">Your Referral Code</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 bg-[#1A1A2E] border border-purple-500/20 rounded-lg p-3 text-white font-mono">
                {referralCode}
              </div>
              <button
                onClick={() => handleCopy(referralCode)}
                className="p-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/10 transition-colors"
              >
                {copied ? <Gift size={20} /> : <Copy size={20} />}
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Referral Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-[#1A1A2E] border border-purple-500/20 rounded-lg p-3 text-white text-sm"
                />
                <button
                  onClick={() => handleCopy(referralLink)}
                  className="p-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/10 transition-colors"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10">
            <h2 className="text-lg font-semibold text-white">Recent Referrals</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-purple-500/10">
                  <th className="py-4 px-6 font-medium">Username</th>
                  <th className="py-4 px-6 font-medium">Date</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-purple-500/10 text-white">
                    <td className="py-4 px-6">{referral.username}</td>
                    <td className="py-4 px-6">{referral.date}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        referral.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">{referral.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;