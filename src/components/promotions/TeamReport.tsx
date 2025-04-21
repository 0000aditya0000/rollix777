import React, { useState, useEffect } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import referralService from '../../lib/services/referralService';

interface ReferralMember {
  id: number;
  name: string;
  username: string;
  email: string;
  level: number;
  // Additional fields with dummy values
  depositAmount?: number;
  totalBet?: number;
  firstDeposit?: number;
  joinDate?: string;
}

interface ReferralResponse {
  userId: string;
  totalReferrals: number;
  referralsByLevel: {
    level1: ReferralMember[];
    level2: ReferralMember[];
    level3: ReferralMember[];
    level4: ReferralMember[];
    level5: ReferralMember[];
  };
}

const TeamReport: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('today');
  const [referralData, setReferralData] = useState<ReferralResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }
        
        const data = await referralService.getReferrals(userId);
        console.log('Referral data:', data);
        setReferralData(data);
      } catch (error) {
        console.error('Error fetching referrals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  const getAllMembers = () => {
    if (!referralData) {
      console.log('No referral data available');
      return [];
    }

    const allLevels = [
      ...(referralData.referralsByLevel.level1 || []),
      ...(referralData.referralsByLevel.level2 || []),
      ...(referralData.referralsByLevel.level3 || []),
      ...(referralData.referralsByLevel.level4 || []),
      ...(referralData.referralsByLevel.level5 || []),
    ];

    const membersWithDummyData = allLevels.map(member => ({
      ...member,
      depositAmount: Math.floor(Math.random() * 10000) + 1000,
      totalBet: Math.floor(Math.random() * 30000) + 5000,
      firstDeposit: Math.floor(Math.random() * 3000) + 500,
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
    }));

    return membersWithDummyData;
  };

  const calculateTotalStats = () => {
    const members = getAllMembers();
    return {
      depositAmount: members.reduce((sum, member) => sum + (member.depositAmount || 0), 0),
      totalBet: members.reduce((sum, member) => sum + (member.totalBet || 0), 0),
      firstDeposit: members.reduce((sum, member) => sum + (member.firstDeposit || 0), 0),
    };
  };

  const members = getAllMembers();
  const totals = calculateTotalStats();

  return (
    <div className="min-h-screen bg-[#0F0F19]">
      {/* Header */}
      <div className="absolute   top-0 left-0 right-0 z-10 bg-[#0F0F19] max-w-[430px] mx-auto">
        <div className="px-4 py-6 flex items-center gap-4">
          <Link 
            to="/agent-program" 
            className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Team Report</h1>
        </div>

        {/* Time Filter Buttons */}
        <div className="px-4 pb-4 flex gap-2">
          <button
            onClick={() => setActiveFilter('yesterday')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'yesterday' 
                ? 'bg-purple-600 text-white' 
                : 'bg-[#252547] text-gray-400 hover:bg-[#2f2f5a]'
            }`}
          >
            Yesterday
          </button>
          <button
            onClick={() => setActiveFilter('today')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'today' 
                ? 'bg-purple-600 text-white' 
                : 'bg-[#252547] text-gray-400 hover:bg-[#2f2f5a]'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveFilter('month')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'month' 
                ? 'bg-purple-600 text-white' 
                : 'bg-[#252547] text-gray-400 hover:bg-[#2f2f5a]'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-40 px-4 h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { title: 'Deposit Amount', value: `₹${totals.depositAmount.toLocaleString()}` },
            { title: 'Total Bet', value: `₹${totals.totalBet.toLocaleString()}` },
            { title: 'First Deposit', value: `₹${totals.firstDeposit.toLocaleString()}` }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 p-3"
            >
              <p className="text-gray-400 text-xs mb-1">{stat.title}</p>
              <p className="text-white font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Team Members List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : members.length > 0 ? (
            members.map((member) => (
              <div
                key={member.id}
                className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-400" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{member.name}</h3>
                        <p className="text-gray-400 text-sm">Username: {member.username}</p>
                        <p className="text-gray-400 text-sm">Level: {member.level}</p>
                      </div>
                      <p className="text-gray-400 text-xs">{member.joinDate}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div>
                        <p className="text-gray-400 text-xs">Deposit</p>
                        <p className="text-white">₹{member.depositAmount?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Total Bet</p>
                        <p className="text-white">₹{member.totalBet?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">First Deposit</p>
                        <p className="text-white">₹{member.firstDeposit?.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No team members found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamReport;