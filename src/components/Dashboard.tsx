import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  ArrowDown,
  Clock,
  Trophy,
  Gamepad2,
  History,
  ChevronRight,
} from "lucide-react";
import ImageSlider from "./ImageSlider";
import ColorGame from "./ColorGame";
import GameCarousel from "./GameCarousel";
import TrendingGames from "./TrendingGames";
import HotGames from "./HotGames";
import WithdrawModal from "./WithdrawModal";
import LatestGames from "./LatestGames";
import ExclusiveGames from "./ExclusiveGames";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setWallets } from "../slices/walletSlice";
import { fetchUserWallets } from "../lib/services/WalletServices.js";
import ActivityTracker from "./ActivityTracker.js";
import TodaysEarningChart from "./TodaysEarningChart.js";
import Disclaimer from "./Disclaimer.js";
import FirstDepositModal from "./modals/FirstDepositModal.js";
import ReferralModal from "./modals/ReferralModal.js";
import BonusModal from "./modals/BonusModal.js";
import Wingo5d from "./Wingo5d.js";
import TrxGame from "./TRX.js";
import ChickenRoad from "./ChickenRoad.js";
import ChickenRoad2 from "./ChickenRoad2.js";
import Aviator from "./Aviator.js";

const Dashboard = () => {
  // const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "";
  const userId = Number(localStorage.getItem("userId")) || 0;
  const dispatch = useDispatch();
  const { wallets } = useSelector((state: RootState) => state.wallet);
  const navigate = useNavigate();
  const [modalStep, setModalStep] = useState(0);

  async function fetchData() {
    if (userId) {
      try {
        const data = await fetchUserWallets(userId);
        if (data) {
          dispatch(setWallets(data));
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      setModalStep(1);
    }
  }, [userId]);

  // function launchGame() {
  //   window.location.href = "https://fusion.imitator-host.site/post?gameId=229&mobile=52&agentId=Imitatorbhai_Seamless&agentKey=118e35769483ef7508b4616c308d84458b26a5e7&referrerUrl=https://jili.rollix777.com";
  // }

  const mainBalance =
    wallets?.find((w) => w?.cryptoname === "INR")?.balance || "0.00";

  return (
    <div className="min-h-screen bg-[#0F0F19] w-full">
      {/* Mobile View */}
      <div className="md:hidden w-full mx-auto px-0">
        <div className="pt-16 pb-20">
          {/* User Stats - Mobile */}
          {/* <div className="px-4 py-4 bg-[#151525]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Welcome Back!</h2>
                <p className="text-sm text-gray-400">{userName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Balance</p>
                <p className="text-lg font-bold text-white">₹{mainBalance}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate("/deposit")}
                className="py-2.5 px-4 bg-green-600 text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Deposit</span>
              </button>
              <button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="py-2.5 px-4 bg-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <ArrowDown className="w-4 h-4" />
                <span>Withdraw</span>
              </button>
            </div>
          </div> */}
          <ImageSlider />

          <div className="px-4 py-4">
            {/* Rollix Originals Heading - Mobile */}
            <div className="mb-4 flex items-center gap-2 mt-8">
              <Trophy className="w-5 h-5 text-purple-500" />
              <h4 className="text-white text-xl font-bold">
                Rollix777 Recommended
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2  ">
              <div className="w-full">
                <ChickenRoad />
              </div>
              <div className="w-full">
                <ChickenRoad2 />
              </div>
              <div className="w-full">
                <ColorGame />
              </div>
              <div className="w-full">
                <Wingo5d />
              </div>
              <div className="w-full">
                <TrxGame />
              </div>
              <div className="w-full">
                <Aviator />
              </div>
            </div>
          </div>
          <div className="space-y-8 md:space-y-12">
            <ExclusiveGames title="Exclusive Games" />
            <LatestGames title="Latest Games" type="latest" />
            <GameCarousel title="Popular Games" type="popular" />
            <TrendingGames title="Trending Games" type="trending" />
            <HotGames title="Hot Games" type="hot" />
          </div>
          <ActivityTracker />
          <TodaysEarningChart />
          <Disclaimer />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block w-full mt-12">
        <div className="w-full lg:px-2">
          {/* Top Bar */}

          {/* <div className="w-full bg-[#151525] border-b border-gray-800/50 ">
            <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between py-6">
                <div className="flex items-center gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Welcome Back!
                    </h2>
                    <p className="text-gray-400 text-sm">{userName}</p>
                  </div>
                  <div className="h-12 w-px bg-gray-800/50"></div>
                  <div>
                    <p className="text-gray-400 text-sm">Balance</p>
                    <p className="text-2xl font-bold text-white">
                      ₹{mainBalance}
                    </p>
                  </div>
                  {/* <button onClick={launchGame}>JILI GAME Launch</button> */}
          {/* </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/deposit")}
                    className="py-2.5 px-4 bg-green-600 text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Deposit</span>
                  </button>

                  <button
                    onClick={() => setIsWithdrawModalOpen(true)}
                    className="py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <ArrowDown className="w-5 h-5" />
                    <span>Withdraw</span>
                  </button>
                </div>
              </div>
            </div> */}
          {/* // </div> */}

          {/* Main Content */}
          <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-8 py-6">
            {/* Telegram Button */}
            <button
              onClick={() =>
                window.open("https://t.me/rollix777_support", "_blank")
              }
              className="fixed bottom-10 right-6 z-50 w-16 h-16 rounded-full 
             bg-gradient-to-br from-[#0088cc] to-[#005f8a] 
             flex items-center justify-center shadow-lg 
             transition-all duration-300 hover:scale-110 
             hover:shadow-xl active:scale-95"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-.962 6.502-.613 1.938-1.425 2.278-2.313 1.467l-1.86-1.373-1.017.979c-.112.112-.207.207-.422.207-.272 0-.221-.126-.31-.437l-.697-2.292L6.85 11.88c-.57-.159-.578-.57.126-.854l9.386-3.62c.46-.188.882.11.752.818z" />
              </svg>
            </button>

            <div className="grid grid-cols-9 gap-6">
              {/* Main Content Column */}
              <div className="col-span-9">
                {/* Featured Section */}
                <div className="bg-[#151525] rounded-xl overflow-hidden mb-6">
                  <ImageSlider />
                </div>

                {/* Latest Games and Recent Games Section */}
                <div className="grid grid-cols-2 gap-8 mb-6">
                  {/* Latest Games */}
                  <div className="bg-[#151525] rounded-xl overflow-hidden">
                    <div className="p-3 border-b border-gray-800/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-purple-500" />
                          <h3 className="text-sm font-bold text-white">
                            Latest Games
                          </h3>
                        </div>
                        <button
                          onClick={() => navigate("/games")}
                          className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        >
                          View All
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <LatestGames title="" type="latest" compact />
                    </div>
                  </div>

                  {/* Recent Games */}
                  <div className="bg-[#151525] rounded-xl overflow-hidden flex flex-row">
                    <div className="bg-[#151525] rounded-xl overflow-hidden p-6 mb-6">
                      {/* Rollix Originals Heading */}
                      <div className="mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-purple-500" />
                        <h3 className="text-lg font-bold text-white">
                          Rollix777 Recommended
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className=" w-full">
                          <ChickenRoad />
                        </div>
                        <div className=" w-full">
                          <ChickenRoad2 />
                        </div>
                        <div className=" w-full">
                          <ColorGame />
                        </div>
                        <div className=" w-full">
                          <Wingo5d />
                        </div>
                        <div className=" w-full">
                          <TrxGame />
                        </div>
                        <div className=" w-full">
                          <Aviator />
                        </div>
                      </div>
                    </div>

                    {/* <div className="p-3 border-b border-gray-800/50">
                      <h3 className="text-sm font-bold text-white">Recent Games</h3>
                    </div>
                    <div className="p-3">
                      <div className="space-y-2">
                        {[1, 2, 3].map((_, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg">
                            <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
                            <div>
                              <p className="text-xs font-medium text-white">Game Name</p>
                              <p className="text-[10px] text-gray-400">2 hours ago</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Games Sections */}
                <div className="space-y-6 w-full">
                  <ExclusiveGames title="Exclusive Games" />
                  <GameCarousel title="Popular Games" type="popular" />
                  <TrendingGames title="Trending Games" type="trending" />

                  <HotGames title="Hot Games" type="hot" />
                  <ActivityTracker />
                  <TodaysEarningChart />
                  <Disclaimer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {userId > 0 && (
        <>
          {/* <DepositModal /> */}
          <WithdrawModal
            isOpen={isWithdrawModalOpen}
            onClose={() => setIsWithdrawModalOpen(false)}
            mainBalance={Number(mainBalance)}
            fetchData={fetchData}
          />
        </>
      )}

      {/* {modalStep === 1 && (
        <FirstDepositModal
          onClose={() => {
            setModalStep(0);
            setTimeout(() => setModalStep(2), 500);
          }}
        />
      )}

      {modalStep === 2 && (
        <ReferralModal
          onClose={() => {
            setModalStep(0);
            setTimeout(() => setModalStep(3), 500);
          }}
        />
      )}

      {modalStep === 3 && (
        <BonusModal
          onClose={() => {
            setModalStep(0);
          }}
        />
      )} */}
    </div>
  );
};

export default Dashboard;
