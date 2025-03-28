import React, { useState } from 'react';
import { ArrowLeft, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeamMember {
  id: string;
  name: string;
  uid: string;
  depositAmount: number;
  totalBet: number;
  firstDeposit: number;
  profilePic?: string;
  joinDate: string;
}

const TeamReport: React.FC = () => {
  const [searchId, setSearchId] = useState('');

  // Dummy data for team members
  const dummyTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      uid: 'UID78945',
      depositAmount: 5000,
      totalBet: 15000,
      firstDeposit: 1000,
      joinDate: '2024-03-25'
    },
    {
      id: '2',
      name: 'Alice Smith',
      uid: 'UID78946',
      depositAmount: 7500,
      totalBet: 25000,
      firstDeposit: 2000,
      joinDate: '2024-03-24'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      uid: 'UID78947',
      depositAmount: 3000,
      totalBet: 10000,
      firstDeposit: 500,
      joinDate: '2024-03-23'
    },
    {
      id: '4',
      name: 'Emma Wilson',
      uid: 'UID78948',
      depositAmount: 8500,
      totalBet: 30000,
      firstDeposit: 2500,
      joinDate: '2024-03-22'
    },
    {
      id: '5',
      name: 'Michael Brown',
      uid: 'UID78949',
      depositAmount: 12000,
      totalBet: 45000,
      firstDeposit: 3000,
      joinDate: '2024-03-21'
    },
    {
      id: '6',
      name: 'Sarah Davis',
      uid: 'UID78950',
      depositAmount: 6000,
      totalBet: 20000,
      firstDeposit: 1500,
      joinDate: '2024-03-20'
    },
    {
      id: '7',
      name: 'David Lee',
      uid: 'UID78951',
      depositAmount: 9500,
      totalBet: 35000,
      firstDeposit: 2000,
      joinDate: '2024-03-19'
    },
    {
      id: '8',
      name: 'Lisa Anderson',
      uid: 'UID78952',
      depositAmount: 4000,
      totalBet: 12000,
      firstDeposit: 800,
      joinDate: '2024-03-18'
    },
    {
      id: '9',
      name: 'James Wilson',
      uid: 'UID78953',
      depositAmount: 11000,
      totalBet: 40000,
      firstDeposit: 2800,
      joinDate: '2024-03-17'
    },
    {
      id: '10',
      name: 'Maria Garcia',
      uid: 'UID78954',
      depositAmount: 7000,
      totalBet: 25000,
      firstDeposit: 1800,
      joinDate: '2024-03-16'
    }
  ];

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
            { title: 'Deposit Amount', value: '₹15,500' },
            { title: 'Total Bet', value: '₹50,000' },
            { title: 'First Deposit', value: '₹3,500' }
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
          {dummyTeamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 p-4"
            >
              <div className="flex items-center gap-4">
                {/* Profile Picture */}
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  {member.profilePic ? (
                    <img 
                      src={member.profilePic} 
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-purple-400" />
                  )}
                </div>

                {/* Member Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-medium">{member.name}</h3>
                      <p className="text-gray-400 text-sm">UID: {member.uid}</p>
                    </div>
                    <p className="text-gray-400 text-xs">{member.joinDate}</p>
                  </div>
                  
                  {/* Member Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div>
                      <p className="text-gray-400 text-xs">Deposit</p>
                      <p className="text-white">₹{member.depositAmount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Total Bet</p>
                      <p className="text-white">₹{member.totalBet}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">First Deposit</p>
                      <p className="text-white">₹{member.firstDeposit}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamReport; 