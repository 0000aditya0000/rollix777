import React, { useState, useEffect } from 'react';
import { ArrowLeft, DollarSign, Clock, AlertCircle, RefreshCw, ChevronDown, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { referralService } from '../../lib/services/referralService';
import { baseUrl } from '../../lib/config/server';
const VALID_CRYPTOS = ['BTC', 'ETH', 'LTC', 'USDT', 'SOL', 'DOGE', 'BCH', 'XRP', 'TRX', 'EOS', 'INR', 'CP'] as const;
type CryptoName = typeof VALID_CRYPTOS[number];

interface Commission {
  cryptoname: string;
  total_commissions: number;
  updated_at: string;
}

interface PendingCommission {
  cryptoname: string;
  pending_amount: number;
  commission_count: number;
}

interface Referral {
  level: number;
  userId: string;
  status: 'active' | 'pending' | 'inactive';
  earnings: number;
}

const CommissionDetails: React.FC = () => {
  // Commission states
  const [totalCommissions, setTotalCommissions] = useState<Commission[]>([]);
  const [pendingCommissions, setPendingCommissions] = useState<PendingCommission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoName | 'ALL'>('ALL');
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [pendingRefreshing, setPendingRefreshing] = useState(false);
  const [pendingNote, setPendingNote] = useState<string | null>(null);

  // Referral states
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralsLoading, setReferralsLoading] = useState(true);
  const [referralsError, setReferralsError] = useState<string | null>(null);

  const userId = localStorage.getItem('userId') || '';

  const fetchCommissionData = async () => {
    try {
      setRefreshing(true);
      setApiMessage(null);
      setError(null);
      
      const response = await fetch(`${baseUrl}/api/user/commissions/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch commissions');
      }

      const data = await response.json();

      if (data.message) {
        setApiMessage(data.message);
        setTotalCommissions([]);
      } else {
        setTotalCommissions(data.commissions || []);
      }

      if (!data.commissions || data.commissions.length === 0) {
        const defaultCommissions = VALID_CRYPTOS.map(crypto => ({
          cryptoname: crypto,
          total_commissions: 0,
          updated_at: new Date().toISOString()
        }));
        setTotalCommissions(defaultCommissions);
      }

    } catch (err) {
      console.error('Error fetching commission data:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setTotalCommissions([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchPendingCommissions = async () => {
    try {
      setPendingRefreshing(true);
      setPendingMessage(null);
      setPendingNote(null);
      
      const response = await fetch(`${baseUrl}/api/user/pending-commissions/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pending commissions');
      }

      const data = await response.json();
      setPendingMessage(data.message);
      setPendingCommissions(data.pendingCommissions || []);
      setPendingNote(data.note);

    } catch (err) {
      console.error('Error fetching pending commissions:', err);
      setPendingMessage(err instanceof Error ? err.message : 'An unexpected error occurred');
      setPendingCommissions([]);
    } finally {
      setPendingRefreshing(false);
    }
  };

  const fetchReferrals = async () => {
    try {
      setReferralsLoading(true);
      setReferralsError(null);
      
      const data = await referralService.getReferrals(userId);
      
      if (data.message) {
        setReferrals([]);
      } else {
        setReferrals(data.referrals || []);
      }

    } catch (err) {
      console.error('Error fetching referrals:', err);
      setReferralsError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setReferrals([]);
    } finally {
      setReferralsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommissionData();
    fetchPendingCommissions();
    fetchReferrals();
  }, [userId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCryptoAmount = (amount: number) => {
    return amount.toFixed(8);
  };

  const filteredCommissions = selectedCrypto === 'ALL' 
    ? totalCommissions 
    : totalCommissions.filter(commission => commission.cryptoname === selectedCrypto);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
          <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-[#0B1120] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
            <div className="w-10 h-10 rounded-full border-2 border-transparent border-t-violet-500 border-r-fuchsia-500 animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(115,45,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,65,225,0.12),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-20"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#0B1120]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/promotions" className="group flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
                <div className="relative p-2 rounded-xl bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl 
                group-hover:bg-white/10 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-violet-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                Commission Details
              </h1>
            </Link>

            <button
              onClick={() => {
                fetchCommissionData();
                fetchPendingCommissions();
                fetchReferrals();
              }}
              disabled={refreshing || pendingRefreshing}
              className="relative group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
              <div className="relative px-6 py-2.5 rounded-xl bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl 
              border border-white/10 group-hover:bg-white/10 transition-colors flex items-center space-x-2">
                <RefreshCw className={`w-4 h-4 text-violet-400 ${refreshing || pendingRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-violet-200">Refresh</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="relative mb-8 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl blur-lg"></div>
            <div className="relative p-4 rounded-xl bg-red-500/5 border border-red-500/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Section */}
        <div className="relative max-w-xs mb-8 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
          <div className="relative space-y-2">
            <label className="block text-sm font-medium text-violet-200">
              Filter by Cryptocurrency
            </label>
            <div className="relative">
              <select
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value as CryptoName | 'ALL')}
                className="w-full appearance-none bg-white/5 text-white rounded-xl border border-white/10 
                py-3 pl-4 pr-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl 
                focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
              >
                <option value="ALL" className="bg-[#0B1120]">All Cryptocurrencies</option>
                {VALID_CRYPTOS.map((crypto) => (
                  <option key={crypto} value={crypto} className="bg-[#0B1120]">{crypto}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Total Commissions */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
            <div className="relative rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] 
            backdrop-blur-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Total Commissions</h2>
                  <div className="p-2.5 rounded-xl bg-violet-500/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <DollarSign className="w-5 h-5 text-violet-400" />
                  </div>
                </div>

                {apiMessage ? (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-violet-200">{apiMessage}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCommissions.map((commission) => (
                      <div 
                        key={commission.cryptoname}
                        className="group/card relative"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl opacity-0 
                        group-hover/card:opacity-20 blur transition-opacity"></div>
                        <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 
                        shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] group-hover/card:bg-white/10 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-lg font-medium text-white group-hover/card:text-violet-200 transition-colors">
                                {commission.cryptoname}
                              </p>
                              <p className="text-sm text-violet-300/70">
                                Last updated: {formatDate(commission.updated_at)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 
                              bg-clip-text text-transparent">
                                {formatCryptoAmount(commission.total_commissions)}
                              </p>
                              <p className="text-sm text-violet-400">{commission.cryptoname}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pending Commissions */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
            <div className="relative rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] 
            backdrop-blur-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Pending Commissions</h2>
                  <div className="p-2.5 rounded-xl bg-fuchsia-500/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <Clock className="w-5 h-5 text-fuchsia-400" />
                  </div>
                </div>

                {pendingMessage ? (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-fuchsia-200">{pendingMessage}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingCommissions
                      .filter(commission => selectedCrypto === 'ALL' || commission.cryptoname === selectedCrypto)
                      .map((commission) => (
                        <div 
                          key={commission.cryptoname}
                          className="group/card relative"
                        >
                          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl opacity-0 
                          group-hover/card:opacity-20 blur transition-opacity"></div>
                          <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 
                          shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] group-hover/card:bg-white/10 transition-colors">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-lg font-medium text-white group-hover/card:text-fuchsia-200 transition-colors">
                                  {commission.cryptoname}
                                </p>
                                <p className="text-sm text-fuchsia-300/70">
                                  Pending Transactions: {commission.commission_count}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 
                                bg-clip-text text-transparent">
                                  {formatCryptoAmount(commission.pending_amount)}
                                </p>
                                <p className="text-sm text-fuchsia-400">{commission.cryptoname}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {pendingNote && (
                  <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-sm text-fuchsia-200/80">{pendingNote}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
          <div className="relative rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] 
          backdrop-blur-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Referrals</h2>
                <div className="p-2.5 rounded-xl bg-violet-500/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <Users className="w-5 h-5 text-violet-400" />
                </div>
              </div>

              {referralsLoading ? (
                <div className="flex justify-center py-12">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-violet-500 border-r-fuchsia-500 animate-spin"></div>
                    </div>
                  </div>
                </div>
              ) : referralsError ? (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl blur-lg"></div>
                  <div className="relative p-4 rounded-xl bg-red-500/5 border border-red-500/10 
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <p className="text-red-200">{referralsError}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="px-6 py-3 text-left text-xs font-medium text-violet-300 uppercase tracking-wider">Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-violet-300 uppercase tracking-wider">User ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-violet-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-violet-300 uppercase tracking-wider">Earnings</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {referrals.length > 0 ? (
                        referrals.map((referral, index) => (
                          <tr 
                            key={index}
                            className="group/row hover:bg-white/5 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-white group-hover/row:text-violet-200 transition-colors">
                                Level {referral.level}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-violet-300/70">{referral.userId}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ring-1 
                                ${referral.status === 'active' 
                                  ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/30' 
                                  : referral.status === 'pending'
                                    ? 'bg-amber-500/10 text-amber-400 ring-amber-500/30'
                                    : 'bg-red-500/10 text-red-400 ring-red-500/30'
                                }`}
                              >
                                {referral.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 
                              bg-clip-text text-transparent">
                                ${referral.earnings.toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center">
                            <p className="text-violet-300/70">No referrals found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommissionDetails;