import { useEffect, useState } from "react";
import { fetchUserDetailsData } from "../../lib/services/userService";
import {
  ArrowDownNarrowWide,
  BarChart,
  Bell,
  Book,
  DollarSign,
  Gamepad,
  Gift,
  Globe,
  Info,
  Phone,
  Settings,
  Speaker,
  Star,
  Upload,
  Wallet,
  Wallet2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Account = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [user, setUser] = useState();

  const fetchUserDetails = async () => {
    try {
      const respone = await fetchUserDetailsData(userId);
      console.log(respone, "response");
      setUser(respone);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // const user = {
  //   name: "Max",
  //   uid: "6816732",
  //   lastLogin: "2025-09-15 13:39:41",
  //   balance: 0.0,
  //   safeInterest: 0.1,
  //   notifications: 3,
  // };

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#220904] text-white p-4 font-sans relative overflow-hidden">
      {/* Circular Design Container */}
      <div className="relative">
        {/* Large Circle Background */}
        <div
          className="absolute -top-20 -left-32 w-96 h-80 rounded-full opacity-90"
          style={{
            background: "linear-gradient(135deg, #db6903 0%, #f1a903 100%)",
          }}
        ></div>

        {/* Header inside the circle */}
        <div className="relative z-10 pt-12 pb-6 flex flex-col items-start text-left ml-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face&auto=format"
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-white"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-white">{user?.name}</h1>
                <span className="bg-gray-200 text-black px-2 py-1 text-xs rounded-full">
                  VIP0
                </span>
              </div>
              <p className="text-sm text-white">UID | {user?.id}</p>
              <p className="text-xs text-white/80">Last login: yesterday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Section */}
      <div className="bg-[#3d1601] rounded-xl p-4 mb-4 relative z-20 -mt-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-300">Total balance</p>
            <p className="text-2xl font-bold text-white">
              {/* ₹{user?.balance.toFixed(2) | 0} */}
              ₹0
            </p>
          </div>
          <button
            className="bg-[#d31c02] px-4 py-2 rounded-lg font-semibold text-white hover:bg-[#bf1402] transition"
            onClick={() => navigate("/wallet-new")}
          >
            Enter wallet
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-[#4f350e] w-12 h-12 flex items-center justify-center rounded-lg mb-1">
              <Wallet2 className="text-[#f1a903]" />
            </div>
            <p className="text-xs text-gray-200">ARWallet</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#543b1a] w-12 h-12 flex items-center justify-center rounded-lg mb-1">
              <DollarSign className="text-[#db6903]" />
            </div>
            <p className="text-xs text-gray-200">Deposit</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#2b1b0f] w-12 h-12 flex items-center justify-center rounded-lg mb-1">
              <Upload className="text-[#e1910a]" />
            </div>
            <p className="text-xs text-gray-200">Withdraw</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#4a1b03] w-12 h-12 flex items-center justify-center rounded-lg mb-1">
              <Star className="text-[#cf8904]" />
            </div>
            <p className="text-xs text-gray-200">VIP</p>
          </div>
        </div>
      </div>

      {/* Safe Section */}
      <div className="bg-[#2b1b0f] rounded-xl p-4 mb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 w-10 h-10 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-600 rounded-full"></div>
          </div>
          <div>
            <p className="font-semibold">Safe</p>
            <p className="text-xs text-gray-300">
              The daily interest rate is 75%, and the income is calculated once
              every 1 minutes.
            </p>
          </div>
        </div>
        <p className="text-[#e1910a] font-bold">
          {/* ₹{user?.balance.toFixed(2) | 0} */}₹ 0
        </p>
      </div>

      {/* History Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-[#361a06] rounded-xl p-4 flex flex-col items-center">
          <div className="mb-2 bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
            <Gamepad className="text-white" />
          </div>
          <p className="text-xs">Game History</p>
          <p className="text-gray-400 text-xs">My game history</p>
        </div>
        <div
          className="bg-[#361a06] rounded-xl p-4 flex flex-col items-center"
          onClick={() => navigate("/transaction-history")}
        >
          <div className="mb-2 bg-green-500 w-10 h-10 rounded-lg flex items-center justify-center">
            <Wallet className="text-white" />
          </div>
          <p className="text-xs">Transaction</p>
          <p className="text-gray-400 text-xs">My transaction history</p>
        </div>
        <div className="bg-[#361a06] rounded-xl p-4 flex flex-col items-center">
          <div className="mb-2 bg-red-400 w-10 h-10 rounded-lg flex items-center justify-center">
            <ArrowDownNarrowWide className="text-white" />
          </div>
          <p className="text-xs">Deposit</p>
          <p className="text-gray-400 text-xs">My deposit history</p>
        </div>
        <div
          className="bg-[#361a06] rounded-xl p-4 flex flex-col items-center"
          onClick={() => navigate("/withdrawal-history")}
        >
          <div className="mb-2 bg-orange-500 w-10 h-10 rounded-lg flex items-center justify-center">
            <ArrowDownNarrowWide className="text-white" />
          </div>
          <p className="text-xs">Withdraw</p>
          <p className="text-gray-400 text-xs">My withdraw history</p>
        </div>
      </div>

      {/* Notification */}
      <div className="bg-[#2b1b0f] rounded-xl p-4 flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-pink-400 w-10 h-10 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <p>Notification</p>
        </div>
        {/* {user?.notifications > 0 && (
          <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {user?.notifications}
            </span>
          </div>
        )} */}
      </div>

      {/* Gifts */}
      <div className="bg-[#2b1b0f] rounded-xl p-4 flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-red-500 w-10 h-10 rounded-lg flex items-center justify-center">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <p>Gifts</p>
        </div>
      </div>

      {/* Game Statistics */}
      <div className="bg-[#2b1b0f] rounded-xl p-4 flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <BarChart className="w-5 h-5 text-yellow-500" />
          <p>Game Statistics</p>
        </div>
      </div>

      {/* Language */}
      <div className="bg-[#2b1b0f] rounded-xl p-4 flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-yellow-500" />
          <p>Language</p>
        </div>
      </div>

      {/* Service Center */}
      <div className="bg-[#2b1b0f] rounded-xl p-4 mb-4 space-y-2">
        <span className="text-yellow-500 font-semibold text-lg">
          Service Center
        </span>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="flex flex-col items-center p-2 bg-[#3d1d0e] rounded cursor-pointer hover:bg-[#4e2a11]">
            <Settings />
            <p className="text-xs mt-1">Settings</p>
          </div>
          <div className="flex flex-col items-center p-2 bg-[#3d1d0e] rounded cursor-pointer hover:bg-[#4e2a11]">
            <Phone />
            <p className="text-xs mt-1">Feedback</p>
          </div>
          <div className="flex flex-col items-center p-2 bg-[#3d1d0e] rounded cursor-pointer hover:bg-[#4e2a11]">
            <Speaker />
            <p className="text-xs mt-1">Announcement</p>
          </div>
          <div className="flex flex-col items-center p-2 bg-[#3d1d0e] rounded cursor-pointer hover:bg-[#4e2a11]">
            <Phone />
            <p className="text-xs mt-1">Customer Service</p>
          </div>
          <div className="flex flex-col items-center p-2 bg-[#3d1d0e] rounded cursor-pointer hover:bg-[#4e2a11]">
            <Book />
            <p className="text-xs mt-1">Beginner's Guide</p>
          </div>
          <div className="flex flex-col items-center p-2 bg-[#3d1d0e] rounded cursor-pointer hover:bg-[#4e2a11]">
            <Info />
            <p className="text-xs mt-1">About us</p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-4 mb-20">
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-transparent border border-[#d31c02] text-[#d31c02] py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#d31c02] hover:text-[#1f0e0e] transition"
        >
          ⏻ Log out
        </button>
      </div>
    </div>
  );
};

export default Account;
