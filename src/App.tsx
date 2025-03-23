import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const authenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes - Full width */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Main App Routes - Mobile width */}
        <Route
          path="/*"
          element={
            <div className="fixed inset-0 bg-[#0F0F19] overflow-y-auto hide-scrollbar">
              <div className="mx-auto w-[100%] max-w-[430px] relative bg-gradient-to-b from-[#0F0F19] to-[#1A1A2E]">
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                  
                    <Route path="/bigsmall" element={<BigSmall />} />
                    <Route path="/bet-history" element={<BetHistory />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/payment-methods" element={<PaymentMethods />} />
                    <Route path="/referrals" element={<Referrals />} />
                    <Route path="/settings" element={<Settings />} />
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
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
