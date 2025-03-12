import React, { useState } from 'react';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BetHistory = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Dummy data for bet history
  const bets = [
    { 
      id: 'BET-001', 
      game: 'Color Game',
      amount: '$50.00',
      selectedColor: 'Red',
      result: 'Green',
      status: 'lost',
      payout: '$0.00',
      date: '2025-04-10 14:30:25'
    },
    { 
      id: 'BET-002', 
      game: 'Color Game',
      amount: '$100.00',
      selectedColor: 'Green',
      result: 'Green',
      status: 'won',
      payout: '$190.00',
      date: '2025-04-10 14:25:18'
    },
    { 
      id: 'BET-003', 
      game: 'Color Game',
      amount: '$75.00',
      selectedColor: 'Red',
      result: 'Red',
      status: 'won',
      payout: '$142.50',
      date: '2025-04-10 14:20:45'
    },
    { 
      id: 'BET-004', 
      game: 'Color Game',
      amount: '$200.00',
      selectedColor: 'Green',
      result: 'Red',
      status: 'lost',
      payout: '$0.00',
      date: '2025-04-10 14:15:30'
    },
    { 
      id: 'BET-005', 
      game: 'Color Game',
      amount: '$150.00',
      selectedColor: 'Red',
      result: 'Green',
      status: 'lost',
      payout: '$0.00',
      date: '2025-04-10 14:10:15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return 'bg-green-500/20 text-green-400';
      case 'lost':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getColorBadge = (color: string) => {
    switch (color.toLowerCase()) {
      case 'red':
        return 'bg-red-500 w-4 h-4 rounded-full';
      case 'green':
        return 'bg-green-500 w-4 h-4 rounded-full';
      default:
        return 'bg-gray-500 w-4 h-4 rounded-full';
    }
  };

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
          <h1 className="text-2xl font-bold text-white">Bet History</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search bets..."
              className="w-full py-2 pl-10 pr-4 bg-[#252547] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="flex gap-2">
            {['all', 'won', 'lost'].map((status) => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`py-2 px-4 rounded-lg text-white transition-colors ${
                  statusFilter === status
                    ? status === 'won' ? 'bg-green-600' : 
                      status === 'lost' ? 'bg-red-600' : 'bg-purple-600'
                    : 'bg-[#252547] border border-purple-500/20 hover:bg-[#2f2f5a]'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-green-500/20 p-4">
            <p className="text-gray-400 text-sm">Total Won</p>
            <p className="text-2xl font-bold text-green-400">$332.50</p>
          </div>
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-red-500/20 p-4">
            <p className="text-gray-400 text-sm">Total Lost</p>
            <p className="text-2xl font-bold text-red-400">$400.00</p>
          </div>
        </div>

        {/* Bets Table */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-purple-500/10">
                  <th className="py-4 px-6 font-medium">ID</th>
                  <th className="py-4 px-6 font-medium">Game</th>
                  <th className="py-4 px-6 font-medium">Amount</th>
                  <th className="py-4 px-6 font-medium">Selected</th>
                  <th className="py-4 px-6 font-medium">Result</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium">Payout</th>
                  <th className="py-4 px-6 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {bets.map((bet) => (
                  <tr key={bet.id} className="border-b border-purple-500/10 text-white hover:bg-purple-500/5">
                    <td className="py-4 px-6">{bet.id}</td>
                    <td className="py-4 px-6">{bet.game}</td>
                    <td className="py-4 px-6">{bet.amount}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={getColorBadge(bet.selectedColor)}></div>
                        <span>{bet.selectedColor}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={getColorBadge(bet.result)}></div>
                        <span>{bet.result}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(bet.status)}`}>
                        {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">{bet.payout}</td>
                    <td className="py-4 px-6">{bet.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-purple-500/10 flex justify-between items-center">
            <p className="text-gray-400 text-sm">Showing 1-5 of 25 bets</p>
            <div className="flex gap-2">
              <button className="py-1 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-gray-400 hover:text-white transition-colors">
                Previous
              </button>
              <button className="py-1 px-3 bg-purple-500/20 border border-purple-500/20 rounded-lg text-white">
                1
              </button>
              <button className="py-1 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-gray-400 hover:text-white transition-colors">
                2
              </button>
              <button className="py-1 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-gray-400 hover:text-white transition-colors">
                3
              </button>
              <button className="py-1 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-gray-400 hover:text-white transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetHistory;