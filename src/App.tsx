import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./components/Home";
import BigSmall from "./components/BigSmall";
import Header from "./components/Header";
import Hero from "./components/Hero";
import GameCarousel from "./components/GameCarousel";
import Features from "./components/Features";
import TrendingGames from "./components/TrendingGames";
import HotGames from "./components/HotGames";
import ColorGame from "./components/ColorGame";
import Promotions from "./components/Promotions";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import AdminRoutes from "./admin";
import BetHistory from "./components/BetHistory";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Profile from "./components/profile/Profile";
import PaymentMethods from "./components/profile/PaymentMethods";
import Referrals from "./components/profile/Referrals";
import Settings from "./components/profile/Settings";
import Security from "./components/profile/Security";
import AllGames from './components/games/AllGames';
import MyAccount from './components/account/MyAccount';
import Wallet from './components/wallet/Wallet';
import AgentProgram from './components/promotions/AgentProgram';
import TeamReport from './components/promotions/TeamReport';

// Add new ReferralRedirect component
const ReferralRedirect: React.FC = () => {
  const location = useLocation();
  const referralCode = location.pathname.split('/refer/')[1];
  
  if (referralCode) {
    localStorage.setItem('pendingReferralCode', referralCode);
  }
  
  return <Navigate to="/" replace />;
};

function App() {
  const authenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <BrowserRouter>
      <Routes>
        {/* Add the referral route before other routes */}
        <Route path="/refer/:referralCode" element={<ReferralRedirect />} />

        {/* Admin Routes - Full width */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Main App Routes - Modified for responsive width */}
        <Route
          path="/*"
          element={
            <div className="fixed inset-0 bg-[#0F0F19] overflow-y-auto hide-scrollbar">
              {/* Container with responsive padding and width */}
              <div className="mx-auto w-full relative bg-gradient-to-b from-[#0F0F19] to-[#1A1A2E] min-h-screen">
                <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
                  <Header />
                  <main className="min-h-screen">
                    <Routes>
                      <Route path="/" element={<Home />} />
                    
                      <Route path="/bigsmall" element={<BigSmall />} />
                      <Route path="/promotions" element={<AgentProgram />} />
                      <Route path="/promotions/team-report" element={<TeamReport />} />
                      <Route path="/bet-history" element={<BetHistory />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/payment-methods" element={<PaymentMethods />} />
                      <Route path="/referrals" element={<Referrals />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/security" element={<Security />} />
                      {authenticated ? (
                        <Route path="/dashboard" element={<Dashboard />} />
                      ) : (
                        <>
                          <Route path="/hero" element={<Hero />} />
                          <Route
                            path="/featured-games"
                            element={
                              <GameCarousel
                                title="Featured Games"
                                type="featured"
                              />
                            }
                          />
                          <Route
                            path="/trending-games"
                            element={<TrendingGames />}
                          />
                          <Route path="/color-game" element={<ColorGame />} />
                          <Route path="/hot-games" element={<HotGames />} />
                          <Route path="/promotions" element={<Promotions />} />
                          <Route path="/features" element={<Features />} />
                        </>
                      )}
                      <Route path="/games" element={<AllGames />} />
                      <Route path="/account" element={<MyAccount />} />
                      <Route path="/wallet" element={<Wallet />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
