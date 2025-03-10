import React, { useEffect, useState } from "react";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletBalance, setWalletBalance] = useState("0");
    const [selectedCurrency, setSelectedCurrency] = useState({
    name: "INR",
    symbol: "₹",
    color: "bg-black",
    balance: "0",
  });

  const handleBalanceUpdate = (newBalance: string) => {
    setWalletBalance(newBalance);
  };
 // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token); // Convert to boolean (true if token exists)
  }, []);

  console.log("📌 isLoggedIn in App:", isLoggedIn); // Debugging line

 

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userToken") 
  };

  return (
    <div className="fixed inset-0 bg-[#0F0F19] overflow-y-auto hide-scrollbar">
      <div className="mx-auto w-[100%] max-w-[430px] relative bg-gradient-to-b from-[#0F0F19] to-[#1A1A2E]">
        <BrowserRouter>
            <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLogin={handleLogin}
            onBalanceUpdate={handleBalanceUpdate}
            selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
          />
       
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bigsmall" element={<BigSmall selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency} />} />
              {isLoggedIn ? (
                <Route path="/dashboard" element={<Dashboard />} />
              ) : (
                <>
                  <Route path="/hero" element={<Hero onLogin={handleLogin} />} />
                  <Route path="/featured-games" element={<GameCarousel isLoggedIn={isLoggedIn}  title="Featured Games" type="featured" />} />
                  <Route path="/color-game" element={<ColorGame />} />
                  <Route path="/hot-games" element={<HotGames isLoggedIn={isLoggedIn} />} />
                  <Route path="/promotions" element={<Promotions />} />
                    <Route path="/features" element={<Features />} />
                <Route path="/trending-games" element={<TrendingGames isLoggedIn={isLoggedIn} />} />


                </>
              )}
            </Routes>
          </main>
          <Footer isLoggedIn={isLoggedIn} />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
