import React, { useEffect, useState } from 'react';
import { ArrowLeft, Copy, Gift, Users, DollarSign, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReferralData {
  userId: string;
  totalReferrals: number;
  referralsByLevel: {
    level1: any[];
    level2: any[];
    level3: any[];
    level4: any[];
    level5: any[];
  };
}

const Referrals = () => {
  const [copied, setCopied] = React.useState(false);
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const referralCode = 'JOHN777';
  const referralLink = `https://rollix777.com/ref/${referralCode}`;

  useEffect(() => {
    const userId = Number(localStorage.getItem('userId'));
    const fetchReferralData = async () => {
      try {
        const response = await fetch(`https://rollix777.com/api/user/referrals/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch referral data');
        }
        const data = await response.json();
        setReferralData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch referral data');
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate total referrals across all levels
  const totalReferrals = referralData?.totalReferrals ?? 0;

  // Combine all referrals from different levels for the table
  const getAllReferrals = () => {
    if (!referralData) return [];
    
    const allReferrals: any[] = [];
    Object.entries(referralData.referralsByLevel).forEach(([level, referrals]) => {
      referrals.forEach((referral: any) => {
        allReferrals.push({
          ...referral,
          level: level.replace('level', '')
        });
      });
    });
    return allReferrals;
  };

  if (loading) {
    return (
      <div className="pt-16 pb-24 flex items-center justify-center">
        <div className="text-white">Loading referral data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 pb-24 flex items-center justify-center">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

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
              <span className="text-gray-400">Total Referrals </span>
            </div>
            <p className="text-2xl font-bold text-white">{totalReferrals}</p>
          </div>
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-gray-400">Total Earnings</span>
            </div>
            <p className="text-2xl font-bold text-white">₹125.00</p>
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
                  <th className="py-4 px-6 font-medium">Level</th>
                  <th className="py-4 px-6 font-medium">User ID</th>
                  <th className="py-4 px-6 font-medium">User Name</th>
                  <th className="py-4 px-6 font-medium">Email</th>
                  <th className="py-4 px-6 font-medium">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {getAllReferrals().length > 0 ? (
                  getAllReferrals().map((referral, index) => (
                    <tr key={index} className="border-b border-purple-500/10 text-white">
                      <td className="py-4 px-6">Level {referral.level}</td>
                      <td className="py-4 px-6">{referral.id || 'N/A'}</td>
                      <td className="py-4 px-6">{referral.username || 'N/A'}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/200">
                          {referral.email || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6">$0.00</td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-purple-500/10 text-white">
                    <td colSpan={4} className="py-4 px-6 text-center text-gray-400">
                      No referrals found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;