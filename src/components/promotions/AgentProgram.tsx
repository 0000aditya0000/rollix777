import React, { useEffect } from "react";
import { Copy, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import InvitationRulesModal from "./InvitationRulesModal";
import { referralService } from "../../lib/services/referralService";
import axiosInstance from "../../lib/utils/axiosInstance";

interface Referral {
  id: number;
  name: string | null;
  username: string | null;
  email: string | null;
  level: number;
  first_deposit: number | null;
  total_deposit: number | null;
  total_bets: number | null;
}

interface PendingCommission {
  cryptoname: string;
  pending_amount: number;
  commission_count: number;
}

interface ReferralsResponse {
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

const AgentProgram: React.FC = () => {
  const [referralCode, setReferralCode] = React.useState("");
  const [isHovered, setIsHovered] = React.useState("");
  const [isRulesModalOpen, setIsRulesModalOpen] = React.useState(false);
  const [referralsData, setReferralsData] =
    React.useState<ReferralsResponse | null>(null);
  const [pendingCommissions, setPendingCommissions] = React.useState<
    PendingCommission[]
  >([]);
  const navigate = useNavigate();

  const userId = useSelector((state: RootState) => state.auth.user?.id);
  console.log("userId", userId);
  useEffect(() => {
    const referralCode = localStorage.getItem("referralCode");
    console.log(referralCode);
    setReferralCode(referralCode || "");
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          throw new Error("User ID not found");
        }

        // Fetch referrals data
        const data = await referralService.getTodaySummary(userId);
        setReferralsData(data);

        // Fetch pending commissions
        const response = await axiosInstance.get(
          `/api/user/pending-commissions/${userId}`
        );
        const pendingData = response.data;
        setPendingCommissions(pendingData.pendingCommissions || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  // Calculate direct subordinates stats (level 1)
  const directSubordinatesStats = React.useMemo(() => {
    if (!referralsData)
      return {
        registered: 0,
        depositAmount: 0,
        firstDepositUsers: 0,
        totalFirstDepositAmount: 0,
      };

    const level1Referrals = referralsData.referralsByLevel.level1;
    return {
      registered: level1Referrals.length,
      depositAmount: level1Referrals.reduce(
        (sum, ref) => sum + parseFloat(ref.total_deposit?.toString() || "0"),
        0
      ),
      firstDepositUsers: level1Referrals.filter(
        (ref) => ref.first_deposit !== null
      ).length,
      totalFirstDepositAmount: level1Referrals.reduce(
        (sum, ref) => sum + parseFloat(ref.first_deposit?.toString() || "0"),
        0
      ),
    };
  }, [referralsData]);

  // Calculate team subordinates stats (all levels)
  const teamSubordinatesStats = React.useMemo(() => {
    if (!referralsData)
      return {
        registered: 0,
        depositAmount: 0,
        firstDepositUsers: 0,
        totalFirstDepositAmount: 0,
      };

    const allReferrals = [
      ...referralsData.referralsByLevel.level1,
      ...referralsData.referralsByLevel.level2,
      ...referralsData.referralsByLevel.level3,
      ...referralsData.referralsByLevel.level4,
      ...referralsData.referralsByLevel.level5,
    ];

    return {
      registered: allReferrals.length,
      depositAmount: allReferrals.reduce(
        (sum, ref) => sum + parseFloat(ref.total_deposit?.toString() || "0"),
        0
      ),
      firstDepositUsers: allReferrals.filter(
        (ref) => ref.first_deposit !== null
      ).length,
      totalFirstDepositAmount: allReferrals.reduce(
        (sum, ref) => sum + parseFloat(ref.first_deposit?.toString() || "0"),
        0
      ),
    };
  }, [referralsData]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Invitation code copied to clipboard");
  };

  const handleCopyLink = () => {
    const invitationLink = `https://www.rollix777.com/refer/${referralCode}`;
    navigator.clipboard.writeText(invitationLink);
    alert("Invitation link copied to clipboard");
  };

  const handleNavigateToCommissionDetails = () => {
    navigate("/promotions/commission-details", { state: { userId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F19] via-[#1A1A2E] to-[#252547]">
      {/* Header
      <div className="fixed top-10 left-0 right-0 z-10 bg-[#0F0F19]/90 backdrop-blur-lg border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 md:px-6 py-4 md:py-6 flex items-center gap-4">
            <Link 
              to="/" 
              className="p-2.5 md:p-3 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 
                       transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={20} className="md:w-6 md:h-6" />
            </Link>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Agent Program</h1>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="pt-20 md:pt-24 pb-24 max-w-7xl mx-auto px-4 md:px-6">
        {/* Commission Card */}
        <div className="max-w-[430px] md:max-w-none mx-auto">
          <div
            className="bg-gradient-to-br from-purple-500/10 via-[#252547] to-[#1A1A2E] rounded-2xl 
                         border border-purple-500/20 overflow-hidden shadow-xl shadow-purple-500/5
                         transition-all duration-300 hover:border-purple-500/30 hover:shadow-purple-500/10"
          >
            <div
              className="p-6 md:p-8 lg:p-10 text-center border-b border-purple-500/10
                          bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5"
            >
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text 
                           bg-gradient-to-r from-purple-400 to-pink-400 mb-3"
              >
                ₹
                {pendingCommissions
                  .find((p) => p.cryptoname === "INR")
                  ?.pending_amount?.toLocaleString() || "0"}
              </h2>
              <div
                className="inline-block bg-purple-500/10 rounded-full px-4 md:px-6 py-1.5 md:py-2 mb-2
                            backdrop-blur-sm"
              >
                <span className="text-sm md:text-base text-white/90">
                  Yesterday's Total Commission
                </span>
              </div>
              <p className="text-sm md:text-base text-white/60">
                Upgrade the level to increase commission income
              </p>
            </div>

            {/* Stats Grid */}
            <div className="hidden md:grid md:grid-cols-4 md:gap-0 ">
              {/* Direct Subordinates */}
              <div className="flex-1 md:col-span-2 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl">
                <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-center text-white font-medium text-lg">
                    Direct subordinates
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-6">
                  {[
                    {
                      label: "Number of register",
                      value: directSubordinatesStats.registered,
                      valueColor: "text-blue-400",
                    },
                    {
                      label: "Deposit amount",
                      value: `₹${directSubordinatesStats.depositAmount.toLocaleString()}`,
                      valueColor: "text-purple-400",
                    },
                    {
                      label: "First deposit",
                      value: `₹${directSubordinatesStats.totalFirstDepositAmount.toLocaleString()}`,
                      valueColor: "text-green-400",
                    },
                    {
                      label: "Number of people making first deposit",
                      value: directSubordinatesStats.firstDepositUsers,
                      valueColor: "text-pink-400",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center text-center group transition-all duration-300 hover:scale-105"
                    >
                      <p
                        className={`text-base md:text-2xl lg:text-3xl font-bold ${item.valueColor} group-hover:opacity-90 mb-1 transition-colors duration-300`}
                      >
                        {item.value}
                      </p>
                      <p className="text-xs md:text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Subordinates */}
              <div className="flex-1 md:col-span-2 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl">
                <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-center text-white font-medium text-lg">
                    Team subordinates
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-6">
                  {[
                    {
                      label: "Number of register",
                      value: teamSubordinatesStats.registered,
                      valueColor: "text-blue-400",
                    },
                    {
                      label: "Deposit amount",
                      value: `₹${teamSubordinatesStats.depositAmount.toLocaleString()}`,
                      valueColor: "text-purple-400",
                    },
                    {
                      label: "First deposit",
                      value: `₹${teamSubordinatesStats.totalFirstDepositAmount.toLocaleString()}`,
                      valueColor: "text-green-400",
                    },
                    {
                      label: "Number of people making first deposit",
                      value: teamSubordinatesStats.firstDepositUsers,
                      valueColor: "text-pink-400",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center text-center group transition-all duration-300 hover:scale-105"
                    >
                      <p
                        className={`text-base md:text-2xl lg:text-3xl font-bold ${item.valueColor} group-hover:opacity-90 mb-1 transition-colors duration-300`}
                      >
                        {item.value}
                      </p>
                      <p className="text-xs md:text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile-only layout: value above, label below, like the image */}
            <div className="flex  gap-0 md:hidden">
              {/* Direct Subordinates */}
              <div className="p-4 bg-gradient-to-br from-blue-500/5 to-blue-500/10 ">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium text-sm">
                    Direct subordinates
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    {
                      label: "Number of register",
                      value: directSubordinatesStats.registered,
                      valueColor: "text-blue-400",
                    },
                    {
                      label: "First Deposit",
                      value: `₹${directSubordinatesStats.totalFirstDepositAmount.toLocaleString()}`,
                      valueColor: "text-green-400",
                    },
                    {
                      label: "Deposit amount",
                      value: `₹${directSubordinatesStats.depositAmount.toLocaleString()}`,
                      valueColor: "text-purple-400",
                    },
                    {
                      label: "Number of people making first deposit",
                      value: directSubordinatesStats.firstDepositUsers,
                      valueColor: "text-pink-400",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center py-2"
                    >
                      <span className={`text-2xl font-bold ${item.valueColor}`}>
                        {item.value}
                      </span>
                      <span className="text-xs text-white/70 mt-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Team Subordinates */}
              <div className="p-4 bg-gradient-to-br from-green-500/5 to-green-500/10 ">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium text-sm">
                    Team subordinates
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    {
                      label: "Number of register",
                      value: teamSubordinatesStats.registered,
                      valueColor: "text-blue-400",
                    },
                    {
                      label: "First Deposit",
                      value: `₹${teamSubordinatesStats.totalFirstDepositAmount.toLocaleString()}`,
                      valueColor: "text-green-400",
                    },
                    {
                      label: "Deposit amount",
                      value: `₹${teamSubordinatesStats.depositAmount.toLocaleString()}`,
                      valueColor: "text-purple-400",
                    },
                    {
                      label: "Number of people making first deposit",
                      value: teamSubordinatesStats.firstDepositUsers,
                      valueColor: "text-pink-400",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center py-2"
                    >
                      <span className={`text-2xl font-bold ${item.valueColor}`}>
                        {item.value}
                      </span>
                      <span className="text-xs text-white/70 mt-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invitation Section */}
        <div className="mt-6 md:mt-8 lg:mt-10 max-w-[430px] md:max-w-none mx-auto">
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            {/* Invitation Link Button */}
            <button
              className="w-full py-4 md:py-5 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl 
                       text-white font-medium shadow-lg shadow-purple-500/20
                       transition-all duration-300 hover:shadow-purple-500/30 hover:scale-[1.02] 
                       active:scale-[0.98]"
              onMouseEnter={() => setIsHovered("button")}
              onMouseLeave={() => setIsHovered("")}
            >
              INVITATION LINK
            </button>

            {/* Invitation Link Card */}
            <div
              className="bg-gradient-to-br from-purple-500/10 via-[#252547] to-[#1A1A2E] rounded-xl 
                       border border-purple-500/20 p-4 md:p-5 lg:p-6
                       transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg 
                       hover:shadow-purple-500/10"
              onMouseEnter={() => setIsHovered("link")}
              onMouseLeave={() => setIsHovered("")}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-3">
                  <p className="text-sm md:text-base text-white/60 mb-1 md:mb-2">
                    Copy invitation link
                  </p>
                  <p className="text-white font-medium break-all">
                    https://www.rollix777.com/refer/{referralCode}
                  </p>
                </div>
                <button
                  onClick={handleCopyLink}
                  className={`p-2.5 md:p-3 rounded-xl bg-purple-500/10 text-purple-400 
                           transition-all duration-300 flex-shrink-0
                           ${
                             isHovered === "link"
                               ? "bg-purple-500/20 scale-110"
                               : "hover:bg-purple-500/15"
                           }`}
                >
                  <Copy size={18} className="md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            {/* Copy Code Card */}
            <div
              className="bg-gradient-to-br from-purple-500/10 via-[#252547] to-[#1A1A2E] rounded-xl 
                       border border-purple-500/20 p-4 md:p-5 lg:p-6
                       transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg 
                       hover:shadow-purple-500/10"
              onMouseEnter={() => setIsHovered("code")}
              onMouseLeave={() => setIsHovered("")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/10 
                                flex items-center justify-center"
                  >
                    <Copy className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-white/60">
                      Copy invitation code
                    </p>
                    <p className="text-white font-medium">{referralCode}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyCode}
                  className={`p-2.5 md:p-3 rounded-xl bg-purple-500/10 text-purple-400 
                           transition-all duration-300
                           ${
                             isHovered === "code"
                               ? "bg-purple-500/20 scale-110"
                               : "hover:bg-purple-500/15"
                           }`}
                >
                  <Copy size={18} className="md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            {/* Menu Items */}
            {[
              {
                title: "Subordinate data",
                icon: "👥",
                route: "/promotions/team-report",
              },
              {
                title: "Commission detail",
                icon: "💰",
                onClick: handleNavigateToCommissionDetails,
              },
              {
                title: "Invitation rules",
                icon: "📜",
                onClick: () => setIsRulesModalOpen(true),
              },
            ].map((item, index) => (
              <div
                key={index}
                onClick={
                  item.onClick || (() => item.route && navigate(item.route))
                }
                className="block bg-gradient-to-br from-purple-500/10 via-[#252547] to-[#1A1A2E] 
                         rounded-xl border border-purple-500/20 overflow-hidden cursor-pointer
                         transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg 
                         hover:shadow-purple-500/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="w-full p-4 md:p-5 lg:p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/10 
                                  flex items-center justify-center"
                    >
                      <span className="text-xl md:text-2xl">{item.icon}</span>
                    </div>
                    <span className="text-white font-medium">{item.title}</span>
                  </div>
                  <span className="text-white/40 text-xl md:text-2xl">›</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InvitationRulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />
    </div>
  );
};

export default AgentProgram;
