import React, { useState } from 'react';
import { Gift, Clock, CheckCircle, XCircle, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CouponHistory {
  id: string;
  code: string;
  amount: number;
  status: 'success' | 'failed';
  date: string;
}

function Coupon() {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data for coupon history
  const couponHistory: CouponHistory[] = [
    {
      id: '1',
      code: 'WELCOME100',
      amount: 100,
      status: 'success',
      date: '2024-03-15 14:30'
    },
    {
      id: '2',
      code: 'BONUS50',
      amount: 50,
      status: 'failed',
      date: '2024-03-14 10:15'
    },
    // Add more mock data as needed
  ];

  const handleRedeem = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    setLoading(true);
    try {
      // Add your API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
      toast.success('Coupon redeemed successfully!');
      setCouponCode('');
    } catch (error) {
      toast.error('Failed to redeem coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] py-8 px-4 md:px-6 mt-20">
      {/* Coupon Redemption Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#252547] rounded-xl border border-purple-500/10 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Gift className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Redeem Coupon</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="w-full px-4 py-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              onClick={handleRedeem}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90'
              } text-white`}
            >
              {loading ? 'Processing...' : 'Redeem'}
            </button>
          </div>
        </div>

        {/* Coupon History Section */}
        <div className="bg-[#252547] rounded-xl border border-purple-500/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Coupon History</h2>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {couponHistory.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-[#1A1A2E] rounded-lg p-4 border border-purple-500/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-white font-medium">{coupon.code}</p>
                    <p className="text-gray-400 text-sm">{coupon.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {coupon.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-purple-400 font-medium">₹{coupon.amount}</p>
                  <span className={`text-sm ${
                    coupon.status === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {coupon.status === 'success' ? 'Redeemed' : 'Failed'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-purple-500/10">
                  <th className="pb-4 text-gray-400 font-medium">Code</th>
                  <th className="pb-4 text-gray-400 font-medium">Amount</th>
                  <th className="pb-4 text-gray-400 font-medium">Status</th>
                  <th className="pb-4 text-gray-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {couponHistory.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-purple-500/10">
                    <td className="py-4 text-white font-medium">{coupon.code}</td>
                    <td className="py-4 text-purple-400">₹{coupon.amount}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1 ${
                        coupon.status === 'success' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {coupon.status === 'success' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        {coupon.status === 'success' ? 'Redeemed' : 'Failed'}
                      </span>
                    </td>
                    <td className="py-4 text-gray-400">{coupon.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coupon;
