import { Book, Copy, Headphones, Percent, Receipt, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { referralService } from "../../lib/services/referralService.js";
import { useSelector } from "react-redux";
import { RootState } from "../../store.js";
import toast from "react-hot-toast";

interface PromotionalData {
  thisweekData: string;
  directSubordinates: number;
  teamSubordinates: number;
  totalCommission: string;
}

interface Subordinates {
  depositAmount: any;
  firstDeposit: any;
  firstDepositCount: number;
  totalReferrals: number;
}

const PromotionsPage: React.FC = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [promotionalData, setPromotionalData] = useState<PromotionalData>({
    thisweekData: "",
    directSubordinates: 0,
    teamSubordinates: 0,
    totalCommission: "",
  });
  const [directSubordinateData, setDirectSubordinateData] =
    useState<Subordinates>({
      depositAmount: "",
      firstDeposit: "",
      firstDepositCount: 0,
      totalReferrals: 0,
    });
  const [teamSubordinateData, setTeamSubOrdinateData] = useState<Subordinates>({
    depositAmount: "",
    firstDeposit: "",
    firstDepositCount: 0,
    totalReferrals: 0,
  });
  const [commissionAmount, setCommissionAmount] = useState<Number | null>(null);

  const fetchPromotionalData = async () => {
    try {
      const response = await referralService.getReferralSummary(userId);
      setPromotionalData(response);
    } catch (error) {
      console.log(error, "error");
      toast.error("Error fetching summary data");
    }
  };

  const fetchTodaySummary = async () => {
    try {
      const response = await referralService.getTodaySummary(userId);
      setDirectSubordinateData(response.directSubordinateData);
      setTeamSubOrdinateData(response.teamSubordinateData);
    } catch (error) {
      console.log(error, "error");
      toast.error("Error fetching today summary data");
    }
  };

  const fetchCommissionData = async () => {
    try {
      const response = await referralService.getCommissionData(userId);
      console.log(response, "response");
      setCommissionAmount(response?.yesterdayCommissions?.total_amount);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchPromotionalData();
    fetchTodaySummary();
    fetchCommissionData();
  }, []);

  console.log(commissionAmount, "direct");

  return (
    <div className="min-h-screen bg-[#220904] text-white font-sans flex flex-col items-center pb-24">
      <div className="w-full max-w-md">
        {/* Top Section */}
        <div className="relative bg-gradient-to-br from-[#db6903] to-[#f1a903] px-4 pt-6 pb-20 text-center shadow-md">
          {/* Top right icon */}
          <button
            className="absolute top-4 right-4"
            onClick={() => navigate("/promotions/subordinates")}
          >
            <Users className="w-6 h-6 text-[#220904]" />
          </button>

          <h1 className="text-xl font-semibold mb-4">Agency</h1>
          <p className="text-4xl font-bold mb-2">{commissionAmount || 0}</p>
          <p className="bg-white/20 text-sm px-4 py-1 rounded-full inline-block">
            Yesterday’s total commission
          </p>
          <p className="mt-2 text-xs opacity-80">
            Upgrade the level to increase commission income
          </p>
        </div>

        {/* Subordinate Cards - Overlapping */}
        <div className="relative -mt-12 px-4">
          <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-lg border border-[#3d1601]">
            {/* Direct Subordinates */}
            <div className="bg-[#2b1b0f] p-4 text-center border-r border-[#3d1601]">
              <h2 className="text-md font-semibold text-[#f1a903] mb-2">
                Direct Subordinates
              </h2>
              <div className="space-y-1">
                <p>
                  <span className="text-lg font-bold">
                    {directSubordinateData?.totalReferrals}
                  </span>
                  <span className="block text-xs text-gray-400">
                    Number of register
                  </span>
                </p>
                <p>
                  <span className="text-lg font-bold text-[#bc9713]">
                    {directSubordinateData?.firstDeposit}
                  </span>
                  <span className="block text-xs text-gray-400">
                    First Deposit
                  </span>
                </p>
                <p>
                  <span className="text-lg font-bold text-[#e1910a]">
                    {directSubordinateData?.depositAmount}
                  </span>
                  <span className="block text-xs text-gray-400">
                    Deposit amount
                  </span>
                </p>
                <p>
                  <span className="text-lg font-bold">
                    {directSubordinateData?.firstDepositCount}
                  </span>
                  <span className="block text-xs text-gray-400">
                    Number of people making first deposit
                  </span>
                </p>
              </div>
            </div>

            {/* Team Subordinates */}
            <div className="bg-[#2b1b0f] p-4 text-center">
              <h2 className="text-md font-semibold text-[#f1a903] mb-2">
                Team Subordinates
              </h2>
              <div className="space-y-1">
                <p>
                  <span className="text-lg font-bold">
                    {teamSubordinateData.totalReferrals}
                  </span>
                  <span className="block text-xs text-gray-400">
                    Number of register
                  </span>
                </p>
                <p>
                  <span className="text-lg font-bold text-[#bc9713]">
                    {teamSubordinateData.firstDeposit}
                  </span>
                  <span className="block text-xs text-gray-400">
                    First Deposit
                  </span>
                </p>
                <p>
                  <span className="text-lg font-bold text-[#e1910a]">
                    {teamSubordinateData.depositAmount}
                  </span>
                  <span className="block text-xs text-gray-400">
                    Deposit amount
                  </span>
                </p>
                <p>
                  <span className="text-lg font-bold">
                    {teamSubordinateData.firstDepositCount}
                  </span>
                  <span className="block text-xs text-gray-400">
                    Number of people making first deposit
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="mx-4 mt-8 flex justify-center">
          <button className="w-3/4 bg-[#d31c02] py-3 rounded-full font-semibold text-white shadow-md">
            Download QR Code
          </button>
        </div>

        {/* Copy Invitation Code */}
        <div className="mx-4 bg-[#2b1b0f] rounded-xl p-4 flex justify-between items-center mt-6 shadow">
          <div className="flex items-center gap-2">
            <div className="bg-[#cf8904] w-10 h-10 rounded-lg flex items-center justify-center">
              <Copy className="w-5 h-5 text-white" />
            </div>
            <p className="font-medium">Copy Invitation Code</p>
          </div>
          <span className="text-[#f1a903] font-bold">239094</span>
        </div>

        {/* Subordinate Data */}
        <div
          className="mx-4 bg-[#2b1b0f] rounded-xl p-4 flex items-center gap-2 mt-6 shadow"
          onClick={() => navigate("/promotions/team-report-data")}
        >
          <div className="bg-[#cf8904] w-10 h-10 rounded-lg flex items-center justify-center">
            <Book className="w-5 h-5 text-white" />
          </div>
          <p className="font-medium">Subordinate Data</p>
        </div>

        {/* Commission Details */}
        <div
          className="mx-4 bg-[#2b1b0f] rounded-xl p-4 flex items-center gap-2 mt-6 shadow"
          onClick={() => navigate("/promotions/commision-details")}
        >
          <div className="bg-[#cf8904] w-10 h-10 rounded-lg flex items-center justify-center">
            <Receipt className="w-5 h-5 text-white" />
          </div>
          <p className="font-medium">Commission Details</p>
        </div>

        {/* Invitation Rules */}
        <div
          className="mx-4 bg-[#2b1b0f] rounded-xl p-4 flex items-center gap-2 mt-6 shadow"
          onClick={() => navigate("/promotions/invitation-rules")}
        >
          <div className="bg-[#cf8904] w-10 h-10 rounded-lg flex items-center justify-center">
            <Book className="w-5 h-5 text-white" />
          </div>
          <p className="font-medium">Invitation Rules</p>
        </div>

        {/* Agent Line Customer Service */}
        <div className="mx-4 bg-[#2b1b0f] rounded-xl p-4 flex items-center gap-2 mt-6 shadow">
          <div className="bg-[#cf8904] w-10 h-10 rounded-lg flex items-center justify-center">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <p className="font-medium">Agent Line Customer Service</p>
        </div>

        {/* Rebate Ratio */}
        <div className="mx-4 bg-[#2b1b0f] rounded-xl p-4 flex items-center gap-2 mt-6 shadow">
          <div className="bg-[#cf8904] w-10 h-10 rounded-lg flex items-center justify-center">
            <Percent className="w-5 h-5 text-white" />
          </div>
          <p className="font-medium">Rebate Ratio</p>
        </div>

        {/* Promotion Data */}
        <div className="mx-4 bg-[#2b1b0f] rounded-xl p-4 mt-6 shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-[#cf8904] w-10 h-10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <p className="font-medium">Promotion Data</p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-[#3d1601] text-center">
            <div>
              <p className="text-lg font-bold">0</p>
              <p className="text-xs text-gray-400">This Week</p>
            </div>
            <div>
              <p className="text-lg font-bold">
                {promotionalData.totalCommission}
              </p>
              <p className="text-xs text-gray-400">Total Commission</p>
            </div>
            <div>
              <p className="text-lg font-bold">
                {promotionalData.directSubordinates}
              </p>
              <p className="text-xs text-gray-400">Direct Subordinates</p>
            </div>
            <div>
              <p className="text-lg font-bold">
                {promotionalData.teamSubordinates}
              </p>
              <p className="text-xs text-gray-400">Total Team Subordinates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsPage;
