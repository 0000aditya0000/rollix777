import React, { useState, useEffect } from "react";
import { ArrowLeft, User, ChevronDown, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { referralService } from "../../lib/services/referralService";

interface ReferralMember {
  referral_id?: number;
  user_id?: number;
  id?: number; // Keep for backward compatibility
  name: string | null;
  username: string | null;
  email: string | null;
  level: number;
  first_deposit: number | null;
  overall_first_deposit?: string | number;
  total_deposit: number | null;
  total_bets: string | number | null;
  total_api_bets?: string | number;
  total_huidu_bets?: string | number;
  pending_commission?: string;
  join_date?: string;
}

interface ReferralResponse {
  userId: string;
  totalReferrals: number;
  totalBets?: {
    bets_table: string;
    api_turnover_table: string;
    huidu_txn_table: string;
    grand_total: string;
  } | string | number;
  referralsByLevel: {
    level1: ReferralMember[];
    level2: ReferralMember[];
    level3: ReferralMember[];
    level4: ReferralMember[];
    level5: ReferralMember[];
  };
  totalPages?: number;
  directSubordinates?: number;
  teamSubordinates?: number;
}

interface FilteredReferralResponse {
  date: string;
  userId: string;
  dateType: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  totalReferrals: number;
  note?: string;
  totalFirstDeposit: string;
  totalDeposit: string;
  totalBets: string;
  totalApiBets: string;
  totalHuiduBets: string;
  grandTotalBets: string;
  firstDepositorsCount: number;
  directSubordinates: number;
  teamSubordinates: number;
  referralsByLevel: {
    level1: ReferralMember[];
    level2: ReferralMember[];
    level3: ReferralMember[];
    level4: ReferralMember[];
    level5: ReferralMember[];
  };
}

const TeamReport: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [referralData, setReferralData] = useState<ReferralResponse | FilteredReferralResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [referralView, setReferralView] = useState("direct");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recordsPerPage = 30; // Changed to 30 records per page

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found");

        let data;

        if (activeFilter === "all") {
          if (activeSort) {
            // For sorting, always fetch with pagination
            data = await referralService.getReferralsSorted(
              userId, 
              activeSort, 
              currentPage, 
              recordsPerPage
            );
          } else {
            data = await referralService.getReferrals(
              userId,
              currentPage,
              recordsPerPage
            );
          }
        } else {
          // For filtered responses, get all data first, then apply sorting locally
          data = await referralService.getReferralsByDate(userId, activeFilter);
          
          // Apply local sorting if needed
          if (activeSort && data.referralsByLevel) {
            const allMembers = getAllMembersFromData(data);
            const sortedMembers = sortMembers(allMembers, activeSort);
            
            // Reorganize sorted members back into levels
            data.referralsByLevel = reorganizeMembersByLevel(sortedMembers);
          }
        }

        setReferralData(data);
        
        // Debug: Log the data structure to understand what we're receiving
        console.log("Received data:", {
          filter: activeFilter,
          totalPages: data.totalPages,
          totalReferrals: data.totalReferrals,
          membersCount: getAllMembersFromData(data).length,
          currentPage
        });
        
        // Handle different response structures
        if (activeFilter === "all") {
          // For "All" filter, ensure we have totalPages
          if (data.totalPages && data.totalPages > 0) {
            setTotalPages(data.totalPages);
            console.log("Using API totalPages:", data.totalPages);
          } else if (data.totalReferrals && data.totalReferrals > 0) {
            // Calculate total pages based on total referrals if totalPages is not provided
            const calculatedPages = Math.ceil(data.totalReferrals / recordsPerPage);
            setTotalPages(Math.max(1, calculatedPages)); // Ensure at least 1 page
            console.log("Calculated totalPages from totalReferrals:", calculatedPages);
          } else {
            // Fallback: calculate from actual data received
            const totalMembers = getAllMembersFromData(data).length;
            const calculatedPages = Math.ceil(totalMembers / recordsPerPage);
            setTotalPages(Math.max(1, calculatedPages)); // Ensure at least 1 page
            console.log("Fallback calculated totalPages:", calculatedPages);
          }
        } else {
          // For filtered responses, calculate total pages based on total referrals
          const totalMembers = getAllMembersFromData(data).length;
          const calculatedPages = Math.ceil(totalMembers / recordsPerPage);
          setTotalPages(Math.max(1, calculatedPages)); // Ensure at least 1 page
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching referrals:", error);
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [activeFilter, activeSort, currentPage]);

  // Helper function to sort members locally
  const sortMembers = (members: ReferralMember[], sortBy: string): ReferralMember[] => {
    return [...members].sort((a, b) => {
      if (sortBy === "first_deposit") {
        const aValue = parseNumber(a.first_deposit);
        const bValue = parseNumber(b.first_deposit);
        return bValue - aValue; // Descending order
      } else if (sortBy === "total_bets") {
        const aValue = parseNumber(a.total_bets);
        const bValue = parseNumber(b.total_bets);
        return bValue - aValue; // Descending order
      }
      return 0;
    });
  };

  // Helper function to reorganize sorted members back into levels
  const reorganizeMembersByLevel = (sortedMembers: ReferralMember[]) => {
    const levels = {
      level1: [] as ReferralMember[],
      level2: [] as ReferralMember[],
      level3: [] as ReferralMember[],
      level4: [] as ReferralMember[],
      level5: [] as ReferralMember[],
    };

    sortedMembers.forEach(member => {
      switch (member.level) {
        case 1:
          levels.level1.push(member);
          break;
        case 2:
          levels.level2.push(member);
          break;
        case 3:
          levels.level3.push(member);
          break;
        case 4:
          levels.level4.push(member);
          break;
        case 5:
          levels.level5.push(member);
          break;
      }
    });

    return levels;
  };

  // Helper function to get all members from either data structure
  const getAllMembersFromData = (data: ReferralResponse | FilteredReferralResponse | null): ReferralMember[] => {
    if (!data) return [];

    return [
      ...(data.referralsByLevel.level1 || []),
      ...(data.referralsByLevel.level2 || []),
      ...(data.referralsByLevel.level3 || []),
      ...(data.referralsByLevel.level4 || []),
      ...(data.referralsByLevel.level5 || []),
    ];
  };

  // Helper function to generate mock members
  const generateMockMembers = (
    count: number,
    level: number
  ): ReferralMember[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: level * 100 + i + 1,
      name: `User ${level * 100 + i + 1}`,
      username: `user${level * 100 + i + 1}`,
      email: `user${level * 100 + i + 1}@example.com`,
      level,
      first_deposit: Math.floor(Math.random() * 1000) + 500,
      total_deposit: Math.floor(Math.random() * 10000) + 5000,
      total_bets: Math.floor(Math.random() * 30000) + 5000,
      join_date: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
        .toISOString()
        .split("T")[0],
    }));
  };

  const getAllMembers = (): ReferralMember[] => {
    return getAllMembersFromData(referralData);
  };

  // Get paginated members for current page
  const getPaginatedMembers = (): ReferralMember[] => {
    const allMembers = getAllMembers();
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return allMembers.slice(startIndex, endIndex);
  };

  // Helper function to safely parse number values
  const parseNumber = (value: string | number | null): number => {
    if (value === null) return 0;
    if (typeof value === "string") {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return value;
  };

  const calculateTotalStats = () => {
    // If we have filtered data, use the specific totals from the API
    if (activeFilter !== "all" && referralData && 'totalFirstDeposit' in referralData) {
      const filteredData = referralData as FilteredReferralResponse;
              return {
          depositAmount: parseNumber(filteredData.totalDeposit),
          totalBet: parseNumber(filteredData.grandTotalBets),
          firstDeposit: parseNumber(filteredData.totalFirstDeposit),
          directSubordinates: filteredData.directSubordinates || 0,
          teamSubordinates: filteredData.teamSubordinates || 0,
        };
    }

    // Otherwise calculate from member data
    const members = getAllMembers();
    
    // Handle new totalBets structure from API response
    let totalBetValue = 0;
    if (referralData && 'totalBets' in referralData && referralData.totalBets) {
      if (typeof referralData.totalBets === 'object' && 'grand_total' in referralData.totalBets) {
        totalBetValue = parseNumber(referralData.totalBets.grand_total);
      } else {
        totalBetValue = parseNumber(referralData.totalBets);
      }
    } else {
      // Fallback to calculating from member data
      totalBetValue = members.reduce(
        (sum, member) => sum + parseNumber(member.total_bets),
        0
      );
    }
    
    // Calculate Direct Subordinates (level 1) and Team Subordinates (levels 2-5)
    let directSubordinates = 0;
    let teamSubordinates = 0;
    
    if (referralData && referralData.referralsByLevel) {
      // Direct Subordinates = count of level 1 users
      directSubordinates = (referralData.referralsByLevel.level1 || []).length;
      
      // Team Subordinates = count of all levels excluding level 1
      teamSubordinates = [
        ...(referralData.referralsByLevel.level2 || []),
        ...(referralData.referralsByLevel.level3 || []),
        ...(referralData.referralsByLevel.level4 || []),
        ...(referralData.referralsByLevel.level5 || [])
      ].length;
    }
    
    return {
      depositAmount: members.reduce(
        (sum, member) => sum + parseNumber(member.total_deposit),
        0
      ),
      totalBet: totalBetValue,
      firstDeposit: members.reduce(
        (sum, member) => sum + parseNumber(member.first_deposit),
        0
      ),
      directSubordinates,
      teamSubordinates,
    };
  };

  // Helper function to format currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const members = getPaginatedMembers(); // Use paginated members for display
  const totals = calculateTotalStats();

  // Get the correct values for the stats cards
  const getStatsData = () => {
    if (activeFilter !== "all" && referralData && 'totalFirstDeposit' in referralData) {
      const filteredData = referralData as FilteredReferralResponse;
      return [
        {
          title: "Total Deposit",
          value: `₹${formatCurrency(parseNumber(filteredData.totalDeposit))}`,
        },
        {
          title: "Total Bet Amount",
          value: `₹${formatCurrency(parseNumber(filteredData.grandTotalBets))}`,
        },
        {
          title: "First Deposit",
          value: `₹${formatCurrency(parseNumber(filteredData.totalFirstDeposit))}`,
        },
        {
          title: "Total Referrals",
          value: filteredData.totalReferrals || 0,
        },
        {
          title: "Direct Subordinates",
          value: filteredData.directSubordinates || 0,
        },
        {
          title: "Team Subordinates",
          value: filteredData.teamSubordinates || 0
        },
      ];
    }

    // Default stats for "all" filter
    return [
      {
        title: "Total Deposit",
        value: `₹${formatCurrency(totals.depositAmount)}`,
      },
      {
        title: "Total Bet Amount",
        value: `₹${formatCurrency(totals.totalBet)}`,
      },
      {
        title: "First Deposit",
        value: `₹${formatCurrency(totals.firstDeposit)}`,
      },
      {
        title: "Total Referrals",
        value: referralData?.totalReferrals || 0,
      },
      {
        title: "Direct Subordinates",
        value: totals.directSubordinates || 0,
      },
      {
        title: "Team Subordinates",
        value: totals.teamSubordinates || 0
      },
    ];
  };

  const filterOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "month", label: "This Month" },
  ];

  const sortByOptions = [
    { value: "first_deposit", label: "Sort by Deposit" },
    { value: "total_bets", label: "Sort by Total Bet" },
  ];

  const getActiveFilterLabel = () => {
    return (
      filterOptions.find((option) => option.value === activeFilter)?.label ||
      "Filter"
    );
  };

  const getSortByLabel = () => {
    return (
      sortByOptions.find((option) => option.value === activeSort)?.label ||
      "Sort By"
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0F19] text-white">
      {/* Header */}
      <div className="pt-16 mt-4 pb-8">
        <div className="px-4  space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/promotions"
                className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold text-white">Team Report</h1>
            </div>

            <div className="flex">
              {/* Sort By Button */}
              <div className="relative flex items-center gap-2">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                    activeSort 
                      ? "bg-purple-600 hover:bg-purple-700 text-white" 
                      : "bg-[#252547] hover:bg-[#2f2f5a] text-white"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={showFilterDropdown}
                >
                  <span className="text-sm">{getSortByLabel()}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      showSortDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
                {/* Clear Sort Button */}
                {activeSort && (
                  <button
                    onClick={() => {
                      setActiveSort(null);
                      setCurrentPage(1);
                    }}
                    className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                    title="Clear sorting"
                  >
                    <span className="text-xs">×</span>
                  </button>
                )}

                {showSortDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-[#252547] rounded-lg shadow-lg z-20 border border-purple-500/20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {sortByOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          // Toggle sorting - if same option is clicked, clear it
                          if (activeSort === option.value) {
                            setActiveSort(null);
                          } else {
                            setActiveSort(option.value);
                          }
                          setShowSortDropdown(false);
                          setCurrentPage(1); // Reset to first page when sorting changes
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          activeSort === option.value
                            ? "bg-purple-600 text-white"
                            : "text-gray-300 hover:bg-[#2f2f5a]"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Button */}
              <div className="relative ml-8">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center gap-2 bg-[#252547] hover:bg-[#2f2f5a] text-white py-2 px-4 rounded-lg transition-colors"
                  aria-haspopup="true"
                  aria-expanded={showFilterDropdown}
                >
                  <Calendar size={18} />
                  <span className="text-sm">{getActiveFilterLabel()}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      showFilterDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showFilterDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-[#252547] rounded-lg shadow-lg z-20 border border-purple-500/20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setActiveFilter(option.value);
                          setShowFilterDropdown(false);
                          setCurrentPage(1); // Reset to first page when filter changes
                          setActiveSort(null); // Clear sorting when filter changes
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          activeFilter === option.value
                            ? "bg-purple-600 text-white"
                            : "text-gray-300 hover:bg-[#2f2f5a]"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {getStatsData().map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 p-6 hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                      <p className="text-white font-bold text-2xl">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note for Date Filters */}
            {activeFilter !== "all" && referralData && 'note' in referralData && (referralData as FilteredReferralResponse).note && (
              <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                    <span className="text-blue-400 text-xs">ℹ</span>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Important Note</p>
                    <p className="text-blue-200 text-sm mt-1">
                      {(referralData as FilteredReferralResponse).note}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Team Members Table */}
            <div className="bg-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 bg-[#252547] px-6 py-3 text-gray-400 text-sm font-medium">
                <div className="col-span-3">Member</div>
                <div className="col-span-2">Level</div>
                <div className="col-span-2 text-right">First Deposit</div>
                <div className="col-span-2 text-right">Total Deposit</div>
                <div className="col-span-2 text-right">Total Bet</div>
                <div className="col-span-1 text-right">Joined</div>
              </div>

              {loading ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-2"></div>
                  <p>Loading team data...</p>
                </div>
              ) : members.length > 0 ? (
                <div className="divide-y divide-purple-500/10">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="grid grid-cols-1 md:grid-cols-12 px-4 md:px-6 py-4 hover:bg-[#252547]/50 transition-colors"
                    >
                      {/* Mobile View */}
                      <div className="md:hidden">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-700/20 flex items-center justify-center">
                              <User className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <h3 className="text-white font-medium">
                                {"User ID"}
                              </h3>
                              <p className="text-gray-400 text-xs">
                                {member.user_id || member.referral_id || member.id || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                            Level {member.level}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-[#252547]/50 rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <p className="text-gray-400 text-xs">
                                First Deposit
                              </p>
                              <p className="text-white font-medium">
                                ₹
                                {formatCurrency(
                                  parseNumber(member.first_deposit)
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="bg-[#252547]/50 rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <p className="text-gray-400 text-xs">
                                Total Deposit
                              </p>
                              <p className="text-white font-medium">
                                ₹
                                {formatCurrency(
                                  parseNumber(member.total_deposit)
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="bg-[#252547]/50 rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <p className="text-gray-400 text-xs">Total Bet</p>
                              <p className="text-white font-medium">
                                ₹
                                {formatCurrency(parseNumber(member.total_bets))}
                              </p>
                            </div>
                          </div>
                          <div className="bg-[#252547]/50 rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <p className="text-gray-400 text-xs">Joined</p>
                              <p className="text-white font-medium text-sm">
                                {formatDate(member.join_date)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop View - Member Info */}
                      <div className="hidden md:flex items-center col-span-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-purple-400" />
                        </div>
                                                  <div>
                            <p className="text-white text-xs">
                              {"User ID"}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {member.user_id || member.referral_id || member.id || "N/A"}
                            </p>
                          </div>
                      </div>

                      {/* Level */}
                      <div className="hidden md:flex items-center col-span-2 text-gray-300">
                        Level {member.level}
                      </div>

                      {/* Desktop View - First Deposit */}
                      <div className="hidden md:flex items-center justify-end col-span-2">
                        <div className="text-white">
                          ₹{formatCurrency(parseNumber(member.first_deposit))}
                        </div>
                      </div>

                      {/* Desktop View - Total Deposit */}
                      <div className="hidden md:flex items-center justify-end col-span-2">
                        <div className="text-white">
                          ₹{formatCurrency(parseNumber(member.total_deposit))}
                        </div>
                      </div>

                      {/* Desktop View - Total Bet */}
                      <div className="hidden md:flex items-center justify-end col-span-2">
                        <div className="text-white">
                          ₹{formatCurrency(parseNumber(member.total_bets))}
                        </div>
                      </div>

                      {/* Desktop View - Join Date */}
                      <div className="hidden md:flex items-center justify-end col-span-1 text-gray-300 text-sm ml-4">
                        {formatDate(member.join_date)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <div className="mx-auto w-16 h-16 bg-[#252547] rounded-full flex items-center justify-center mb-3">
                    <User className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">
                    No team members found
                  </h3>
                  <p className="text-sm max-w-md mx-auto">
                    You don't have any referrals yet. Share your referral link
                    to start building your team.
                  </p>
                </div>
              )}
              <div className="p-4 md:p-6 border-t border-purple-500/10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-400 text-sm">
                    Showing{" "}
                    <span className="text-white font-medium">
                      {members.length > 0
                        ? (currentPage - 1) * recordsPerPage + 1
                        : 0}
                    </span>{" "}
                    to{" "}
                    <span className="text-white font-medium">
                      {(currentPage - 1) * recordsPerPage + members.length}
                    </span>{" "}
                    of{" "}
                    <span className="text-white font-medium">
                      {referralData?.totalReferrals || 0}
                    </span>{" "}
                    members
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className={`hidden md:flex items-center px-3 py-2 rounded-lg border ${
                        currentPage === 1
                          ? "border-purple-500/10 text-gray-500 cursor-not-allowed"
                          : "border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
                      } transition-colors`}
                    >
                      First
                    </button>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className={`flex items-center px-3 py-2 rounded-lg border ${
                        currentPage === 1
                          ? "border-purple-500/10 text-gray-500 cursor-not-allowed"
                          : "border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
                      } transition-colors`}
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((num) => {
                          if (totalPages <= 5) return true;
                          if (num === 1 || num === totalPages) return true;
                          return Math.abs(currentPage - num) <= 1;
                        })
                        .map((number, index, array) => {
                          if (index > 0 && array[index - 1] !== number - 1) {
                            return [
                              <span
                                key={`ellipsis-${number}`}
                                className="px-3 py-2 text-gray-400"
                              >
                                ...
                              </span>,
                              <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`px-3 py-2 rounded-lg border ${
                                  currentPage === number
                                    ? "bg-purple-500/20 border-purple-500/40 text-white font-medium"
                                    : "border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40"
                                } transition-colors min-w-[40px]`}
                              >
                                {number}
                              </button>,
                            ];
                          }
                          return (
                            <button
                              key={number}
                              onClick={() => setCurrentPage(number)}
                              className={`px-3 py-2 rounded-lg border ${
                                currentPage === number
                                  ? "bg-purple-500/20 border-purple-500/40 text-white font-medium"
                                  : "border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40"
                              } transition-colors min-w-[40px]`}
                            >
                              {number}
                            </button>
                          );
                        })}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={`flex items-center px-3 py-2 rounded-lg border ${
                        currentPage === totalPages || totalPages === 0
                          ? "border-purple-500/10 text-gray-500 cursor-not-allowed"
                          : "border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
                      } transition-colors`}
                    >
                      Next
                    </button>

                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={`hidden md:flex items-center px-3 py-2 rounded-lg border ${
                        currentPage === totalPages || totalPages === 0
                          ? "border-purple-500/10 text-gray-500 cursor-not-allowed"
                          : "border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
                      } transition-colors`}
                    >
                      Last
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TeamReport;
