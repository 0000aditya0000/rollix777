import React, { useState, useEffect } from "react";
import { ChevronLeft, Users } from "lucide-react";
import { referralService } from "../../lib/services/referralService.js";
import { useSelector } from "react-redux";
import { RootState } from "../../store.js";

// Define subordinate type
interface Subordinate {
  id: string;
  phone: string;
  type: string;
  timestamp: string;
}

const Subordinates: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [activeFilter, setActiveFilter] = useState<string>("This month");
  const [subordinates, setSubordinates] = useState<Subordinate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [referralsByLevel, setReferralsByLevel] = useState<any>({
    level1: [],
    level2: [],
    level3: [],
    level4: [],
    level5: [],
  });

  // Mock API call function - replace with your actual API endpoint
  const fetchSubordinates = async (filter: string) => {
    setLoading(true);
    try {
      const response = await referralService.getReferralsByDate(
        userId,
        activeFilter
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      setSubordinates(response);
      if (response?.referralsByLevel) {
        setReferralsByLevel(response.referralsByLevel);
      }
    } catch (error) {
      console.error("Error fetching subordinates:", error);
      // Mock data for demonstration
      //   setSubordinates([
      //     {
      //       id: "18478988",
      //       phone: "919****46805",
      //       type: "Direct subordinates",
      //       timestamp: "2025-09-05 23:02:48",
      //     },
      //     {
      //       id: "18478959",
      //       phone: "919****56709",
      //       type: "Direct subordinates",
      //       timestamp: "2025-09-05 22:59:31",
      //     },
      //   ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubordinates(activeFilter);
  }, [activeFilter]);

  const maskPhone = (phone: string | null) => {
    if (!phone) return "-";
    return phone.slice(0, 3) + "****" + phone.slice(-4);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#220904" }}>
      {/* Header */}
      <div
        className="flex items-center p-4 border-b"
        style={{ borderColor: "#4f350e" }}
      >
        <button className="mr-4 p-2 rounded-lg hover:opacity-80 transition-opacity">
          <ChevronLeft size={24} style={{ color: "#f1a903" }} />
        </button>
        <h1 className="text-xl font-semibold" style={{ color: "#f1a903" }}>
          New subordinates
        </h1>
      </div>

      {/* Filter Buttons */}
      <div className="p-4">
        <div className="flex justify-center space-x-4">
          {["Today", "Yesterday", "This month"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "shadow-lg transform scale-105"
                  : "hover:opacity-80"
              }`}
              style={{
                backgroundColor:
                  activeFilter === filter ? "#d31c02" : "#4f350e",
                color: activeFilter === filter ? "#f1a903" : "#bc9713",
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div
              className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent"
              style={{ borderColor: "#f1a903" }}
            ></div>
          </div>
        ) : subordinates.length > 0 ? (
          <div className="space-y-4">
            {subordinates.map((subordinate) => (
              <div
                key={subordinate.id}
                className="p-4 rounded-lg border transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundColor: "#3d1601",
                  borderColor: "#4f350e",
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={16} style={{ color: "#bc9713" }} />
                      <span
                        className="font-medium"
                        style={{ color: "#f1a903" }}
                      >
                        {subordinate.phone}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm" style={{ color: "#bc9713" }}>
                        {subordinate.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs mb-1" style={{ color: "#bc9713" }}>
                      UID: {subordinate.id}
                    </div>
                    <div className="text-xs" style={{ color: "#bc9713" }}>
                      {formatTimestamp(subordinate.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users
              size={48}
              style={{ color: "#4f350e" }}
              className="mx-auto mb-4"
            />
            <p
              className="text-lg font-medium mb-2"
              style={{ color: "#bc9713" }}
            >
              No more
            </p>
            <p className="text-sm" style={{ color: "#543b1a" }}>
              No subordinates found for the selected time period
            </p>
          </div>
        )}
      </div>

      {/* Loading overlay */}
      {loading && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
          style={{ backgroundColor: "#220904" }}
        >
          <div className="text-center">
            <div
              className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent mx-auto mb-4"
              style={{ borderColor: "#f1a903" }}
            ></div>
            <p style={{ color: "#bc9713" }}>Loading subordinates...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subordinates;
