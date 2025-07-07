import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Copy,
  Gift,
  Users,
  DollarSign,
  Share2,
  IndianRupee,
} from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../lib/utils/axiosInstance";

interface PendingCommission {
  cryptoname: string;
  pending_amount: number;
  commission_count: number;
}

interface Referral {
  id: number;
  name: string | null;
  username: string | null;
  email: string | null;
  level: number;
  first_deposit: string;
  total_deposit: string;
  total_bets: string | null;
  pending_commission: string;
}

interface ReferralData {
  userId: string;
  totalReferrals: number;
  referralsByLevel: {
    level1: Referral[];
    level2: Referral[];
    level3: Referral[];
    level4: Referral[];
    level5: Referral[];
  };
}

const Referrals = () => {
  const [copied, setCopied] = React.useState(false);
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [pendingCommissions, setPendingCommissions] = useState<
    PendingCommission[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [pendingMessage, setPendingMessage] = useState<string>("");

  const referralCode = localStorage.getItem("referralCode") || "";

  const referralLink = `https://rollix777.com/refer/${referralCode}`;

  // Combine all referrals from different levels for the table
  const getAllReferrals = () => {
    if (!referralData) return [];

    const allReferrals: Referral[] = [];
    Object.entries(referralData.referralsByLevel).forEach(
      ([level, referrals]) => {
        referrals.forEach((referral: Referral) => {
          allReferrals.push(referral);
        });
      }
    );
    return allReferrals;
  };

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId"));
    const fetchData = async () => {
      try {
        // Fetch referral data
        const referralResponse = await axiosInstance.get(
          `/api/user/referrals/${userId}`
        );
        setReferralData(referralResponse.data);

        // Fetch pending commissions
        const pendingResponse = await axiosInstance.get(
          `/api/user/pending-commissions/${userId}`
        );
        setPendingCommissions(pendingResponse.data.pendingCommissions || []);
        setPendingMessage(pendingResponse.data.message || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate total referrals across all levels
  const totalReferrals = referralData?.totalReferrals ?? 0;

  // Calculate total earnings - including pending commissions
  const perReferralAmount = 75;
  const totalReferralEarnings =
    (referralData?.totalReferrals ?? 0) * perReferralAmount;
  const totalPendingAmount = getAllReferrals().reduce(
    (sum, referral) => sum + parseFloat(referral.pending_commission || "0"),
    0
  );
  const totalEarnings = totalReferralEarnings + totalPendingAmount;

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
          <h1 className="text-2xl font-bold text-white">Rewards</h1>
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
            <p className="text-2xl font-bold text-white">{totalReferrals}</p>
          </div>
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <IndianRupee className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-gray-400">Total Earnings</span>
            </div>
            <p className="text-2xl font-bold text-white"></p>
            {totalPendingAmount > 0 ? (
              <p className="text-sm text-yellow-400 mt-1">
                ₹{totalPendingAmount?.toFixed(2)}
              </p>
            ) : (
              pendingMessage && (
                <p className="text-sm text-gray-400 mt-1">{pendingMessage}</p>
              )
            )}
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10">
            <h2 className="text-lg font-semibold text-white">
              Your Referral Code
            </h2>
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
            <h2 className="text-lg font-semibold text-white">
              Recent Referrals
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-purple-500/10">
                  <th className="py-4 px-6 font-medium">Level</th>
                  <th className="py-4 px-6 font-medium">User ID</th>
                  <th className="py-4 px-6 font-medium">User Name</th>
                  <th className="py-4 px-6 font-medium">Email</th>
                  <th className="py-4 px-6 font-medium">Commission</th>
                </tr>
              </thead>
              <tbody>
                {getAllReferrals().length > 0 ? (
                  getAllReferrals().map((referral, index) => (
                    <tr
                      key={index}
                      className="border-b border-purple-500/10 text-white"
                    >
                      <td className="py-4 px-6">Level {referral.level}</td>
                      <td className="py-4 px-6">{referral.id || "N/A"}</td>
                      <td className="py-4 px-6">
                        {referral.username || "N/A"}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/200">
                          {referral.email || "N/A"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-xs text-yellow-400">
                            ₹
                            {parseFloat(referral.pending_commission).toFixed(2)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-purple-500/10 text-white">
                    <td
                      colSpan={5}
                      className="py-4 px-6 text-center text-gray-400"
                    >
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
