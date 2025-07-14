import React, { useState, useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import GameCarousel from "./GameCarousel";
import TrendingGames from "./TrendingGames";
import ColorGame from "./ColorGame";
import HotGames from "./HotGames";
import Promotions from "./Promotions";
import Features from "./Features";
import Footer from "./Footer";
import AuthModal from "./AuthModal";
import ExclusiveGames from "./ExclusiveGames";
import { Activity } from "lucide-react";
import ActivityTracker from "./ActivityTracker";
import ImageSlider from "./ImageSlider";
import TodaysEarningChart from "./TodaysEarningChart";
import Disclaimer from "./Disclaimer";

const Home = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">(
    "login"
  );

  useEffect(() => {
    // Check for pending referral code
    const pendingReferralCode = localStorage.getItem("pendingReferralCode");
    if (pendingReferralCode) {
      setAuthModalMode("register");
      setAuthModalOpen(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setAuthModalOpen(false);
    localStorage.removeItem("pendingReferralCode");
  };

  const handleLoginClick = () => {
    setAuthModalMode("login");
    setAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalMode("register");
    setAuthModalOpen(true);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-[#0F0F19] overflow-y-auto hide-scrollbar">
        <div>
          <Header />
          <main>
            <div className="mt-12">
              <div className="mt-20 mb-4">
                <div className="flex justify-center gap-4 md:hidden">
                  <button
                    onClick={handleLoginClick}
                    className="w-36 sm:w-44 py-3 px-6 bg-green-600 text-white text-sm sm:text-base font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 rounded-md"
                  >
                    <span>Login</span>
                  </button>

                  <button
                    onClick={handleRegisterClick}
                    className="w-36 sm:w-44 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-base font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 rounded-md"
                  >
                    <span>Register</span>
                  </button>
                </div>
                <ImageSlider />
              </div>
              <Hero />
            </div>
            <div className="md:hidden">
              <ColorGame />
            </div>
            <div className="space-y-8 md:space-y-12">
              <ExclusiveGames title="Exclusive Games" />
              <GameCarousel title="Featured Games" type="featured" />
              <TrendingGames title="Trending Games" type="trending" />

              <HotGames title="Hot Games" type="hot" />
            </div>
            <Promotions />
            <Features />
            <ActivityTracker />
            <TodaysEarningChart />
            <Disclaimer />
          </main>
          <Footer />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => {
              setAuthModalOpen(false);
              localStorage.removeItem("pendingReferralCode");
            }}
            initialMode={authModalMode}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
