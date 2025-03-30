import React, { useEffect, useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { betHistory, Bet } from '../lib/services/betService';

const BetHistory = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBetHistory = async () => {
      try {
        // Get user ID from localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error("User not logged in");
        }

        const response = await betHistory({ 
          userId: parseInt(userId),
          page: 1,
          limit: 10
        });

        if (!response || !Array.isArray(response.betHistory)) {
          throw new Error("Invalid response format");
        }

        setBets(response.betHistory);
      } catch (err: any) {
        console.error("Error fetching bet history:", err);
        setError(err.message || "Failed to fetch bet history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBetHistory();
  }, []);

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
    // Ensure color is a string and convert it to lowercase
    const colorLower = typeof color === 'string' ? color.toLowerCase() : '';

    switch (colorLower) {
      case 'red':
        return 'bg-red-500 w-4 h-4 rounded-full';
      case 'green':
        return 'bg-green-500 w-4 h-4 rounded-full';
      default:
        return 'bg-gray-500 w-4 h-4 rounded-full';
    }
  };

  // Calculate total won and total lost
  const totalWon = bets
    .filter(bet => bet.status === "won")
    .reduce((sum, bet) => sum + parseFloat(bet.amountReceived || 0), 0);

  const totalLost = bets
    .filter(bet => bet.status === "lost")
    .reduce((sum, bet) => sum + parseFloat(bet.amount || 0), 0);

  if (loading) {
    return <div className="pt-16 pb-24 text-center text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="pt-16 pb-24 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="pt-16 pb-24 max-w-[470px] mx-auto  bg-[#1A1A2E]/95">
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
            <p className="text-2xl font-bold text-green-400">₹{totalWon.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-red-500/20 p-4">
            <p className="text-gray-400 text-sm">Total Lost</p>
            <p className="text-2xl font-bold text-red-400">₹{totalLost.toFixed(2)}</p>
          </div>
        </div>

        {/* Bets Table */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full max-w-[470px]">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-purple-500/10">
                  <th className="py-4 px-6 font-medium">ID</th>
                  <th className="py-4 px-6 font-medium">Game</th>
                  <th className="py-4 px-6 font-medium">Amount</th>
                  <th className="py-4 px-6 font-medium">BetType</th>
                  <th className="py-4 px-6 font-medium">Result</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium">Payout</th>
                  <th className="py-4 px-6 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {bets.map((bet) => (
                  <tr key={bet.betId} className="border-b border-purple-500/10 text-white hover:bg-purple-500/5">
                    <td className="py-4 px-6">BET-{bet.betId}</td>
                    <td className="py-4 px-6">{"WinGo"}</td>
                    <td className="py-4 px-6">₹{bet.amount}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={getColorBadge(bet.betValue || '')}></div>
                        <span>{bet.betValue}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={getColorBadge(bet.periodNumber || '')}></div>
                        <span>{bet.periodNumber}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(bet.status)}`}>
                        {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">₹{bet.amountReceived}</td>
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