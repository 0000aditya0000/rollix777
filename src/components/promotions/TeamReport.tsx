import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, User } from 'lucide-react';
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
  const [searchId, setSearchId] = useState('');
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
        console.log('Referral data:', data); // For debugging
        setReferralData(data);
      } catch (error) {
        console.error('Error fetching referrals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  // Modified getAllMembers function with debug logs
  const getAllMembers = () => {
    if (!referralData) {
      console.log('No referral data available');
      return [];
    }

    console.log('Processing referral data:', referralData); // Debug log

    const allLevels = [
      ...(referralData.referralsByLevel.level1 || []),
      ...(referralData.referralsByLevel.level2 || []),
      ...(referralData.referralsByLevel.level3 || []),
      ...(referralData.referralsByLevel.level4 || []),
      ...(referralData.referralsByLevel.level5 || []),
    ];

    console.log('Combined levels:', allLevels); // Debug log

    const membersWithDummyData = allLevels.map(member => ({
      ...member,
      depositAmount: Math.floor(Math.random() * 10000) + 1000,
      totalBet: Math.floor(Math.random() * 30000) + 5000,
      firstDeposit: Math.floor(Math.random() * 3000) + 500,
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
    }));

    console.log('Members with dummy data:', membersWithDummyData); // Debug log
    return membersWithDummyData;
  };

  // Calculate total stats
  const calculateTotalStats = () => {
    const members = getAllMembers();
    return {
      depositAmount: members.reduce((sum, member) => sum + (member.depositAmount || 0), 0),
      totalBet: members.reduce((sum, member) => sum + (member.totalBet || 0), 0),
      firstDeposit: members.reduce((sum, member) => sum + (member.firstDeposit || 0), 0),
    };
  };

  // Modified render section
  const members = getAllMembers();
  const totals = calculateTotalStats();

  return (
    <div className="min-h-screen bg-[#0F0F19]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-[#0F0F19] max-w-[430px] mx-auto">
        <div className="px-4 py-6 flex items-center gap-4">
          <Link 
            to="/agent-program" 
            className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Team Report</h1>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by UID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full py-3 pl-10 pr-4 bg-[#252547] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
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