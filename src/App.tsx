import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
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
import AllGames from "./components/games/AllGames";
import MyAccount from "./components/account/MyAccount";
import Wallet from "./components/wallet/Wallet";
import AgentProgram from "./components/promotions/AgentProgram";
import TeamReport from "./components/promotions/TeamReport";
import { HelpCenter } from "./components/HelpCenter";
// import CommissionDetails from "./components/promotions/CommissionDetails";
import LatestGames from "./components/LatestGames";
import Coupon from "./components/coupon/Coupon";
import KYCVerification from "./pages/KYCVerification";
import ErrorPage from "./components/ErrorPage";
import DepositPage from "./components/DepositModal";
import AuthModal from "./components/AuthModal"; // Add this import
import Wingo5dGame from "./components/Wingo5dGame";
import TRXGame from "./components/TrxGame";
import ScrollToTop from "./components/ScrollToTop";
import Account from "./components/NewUI/Account";
import HomePage from "./components/NewUI/HomePage";
import WalletNew from "./components/NewUI/Wallet";
import PromotionsPage from "./components/NewUI/PromotionsPage";
import SubordinateData from "./components/NewUI/SubordinateData";
import InvitationRules from "./components/NewUI/InvitationRules";
import SignIn from "./components/NewUI/auth/SignIn";
import CommissionDetails from "./components/NewUI/CommissionDetails";
import TransactionHistory from "./components/NewUI/TransactionHistory";
import WithdrawalHistory from "./components/NewUI/WithdrawalHistory";
import Subordinates from "./components/NewUI/Subordinate";
import Register from "./components/NewUI/auth/Register";
import DepositHistory from "./components/NewUI/DepositHistory";

// Add new ReferralRedirect component
const ReferralRedirect: React.FC = () => {
  const location = useLocation();
  const referralCode = location.pathname.split("/refer/")[1];

  if (referralCode) {
    localStorage.setItem("pendingReferralCode", referralCode);
  }

  return <Navigate to="/" replace />;
};

// Add this new component for conditional routing
const ConditionalHome: React.FC = () => {
  const userId = localStorage.getItem("userId");
  return userId ? <HomePage /> : <HomePage />;
};

// Create a ProtectedRoute component that opens login modal
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  onLoginRequired: () => void;
}> = ({ children, onLoginRequired }) => {
  const authenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!authenticated) {
    // Trigger login modal instead of showing error page
    onLoginRequired();
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  const authenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Add state for controlling AuthModal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">(
    "login"
  );

  // Function to handle login requirement
  const handleLoginRequired = () => {
    setAuthModalMode("login");
    setIsAuthModalOpen(true);
  };

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        {/* Add the referral route before other routes */}
        <Route path="/refer/:referralCode" element={<ReferralRedirect />} />

        {/* Admin Routes - Full width */}

        {/* Main App Routes - Modified for responsive width */}
        <Route
          path="/*"
          element={
            <div className="fixed inset-0 bg-[#0F0F19] overflow-y-auto hide-scrollbar">
              {/* Container with responsive padding and width */}
              <div className="mx-auto w-full relative bg-gradient-to-b from-[#0F0F19] to-[#1A1A2E] min-h-screen">
                <div className="w-full md:px-6 lg:px-0 ">
                  {/* <Header /> */}
                  <main className="min-h-screen">
                    <Routes>
                      {/* Public Routes - Always accessible */}
                      <Route path="/" element={<ConditionalHome />} />
                      <Route path="/games" element={<AllGames />} />
                      <Route path="/hero" element={<Hero />} />
                      <Route path="/features" element={<Features />} />

                      {/* Protected Routes - Wrapped with ProtectedRoute */}
                      <Route
                        path="/deposit"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <DepositPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/featured-games"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <GameCarousel
                              title="Featured Games"
                              type="featured"
                            />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/trending-games"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <TrendingGames
                              title="Trending Games"
                              type="trending"
                            />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/hot-games"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <HotGames title="Hot Games" type="hot" />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/color-game"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <ColorGame />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/wingo5d"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Wingo5dGame />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/trx"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <TRXGame />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/bigsmall"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <BigSmall />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/support"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <HelpCenter />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/rewards"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Promotions />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/coupon"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Coupon />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/kyc-verification"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <KYCVerification />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/transaction-history"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <TransactionHistory />
                          </ProtectedRoute>
                        }
                      />
                      {/* <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Dashboard />
                          </ProtectedRoute>
                        }
                      /> */}
                      {/* <Route
                        path="/account"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <MyAccount />
                          </ProtectedRoute>
                        }
                      /> */}
                      <Route
                        path="/account"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Account />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/wallet"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Wallet />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/wallet-new"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <WalletNew />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/bet-history"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <BetHistory />
                          </ProtectedRoute>
                        }
                      />

                      {/* Profile Related Routes */}
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/payment-methods"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <PaymentMethods />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/settings"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Settings />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/security"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Security />
                          </ProtectedRoute>
                        }
                      />

                      {/* Promotion & Referral Routes */}
                      <Route
                        path="/referrals"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Referrals />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/agent-program"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <AgentProgram />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/team-report"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <TeamReport />
                          </ProtectedRoute>
                        }
                      />
                      {/* <Route
                        path="/promotions"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <AgentProgram />
                          </ProtectedRoute>
                        }
                      /> */}
                      <Route
                        path="/promotions"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <PromotionsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/promotions/subordinates"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Subordinates />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/promotions/team-report-data"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <SubordinateData />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/promotions/invitation-rules"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <InvitationRules />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/promotions/team-report"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <TeamReport />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/withdrawal-history"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <WithdrawalHistory />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/deposit-history"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <DepositHistory />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/login"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <SignIn />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/register"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <Register />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/promotions/commision-details"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <CommissionDetails />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/withdrawal-history"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <WithdrawalHistory />
                          </ProtectedRoute>
                        }
                      />
                      {/* <Route
                        path="/promotions/commission-details"
                        element={
                          <ProtectedRoute onLoginRequired={handleLoginRequired}>
                            <CommissionDetails />
                          </ProtectedRoute>
                        }
                      /> */}

                      {/* Catch all route for undefined routes */}
                      <Route
                        path="*"
                        element={
                          <ErrorPage
                            title="Page Not Found"
                            message="The page you're looking for doesn't exist."
                          />
                        }
                      />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </div>

              {/* Auth Modal */}
              <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialMode={authModalMode}
                onLoginSuccess={handleLoginSuccess}
              />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
