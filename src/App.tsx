import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GameCarousel from './components/GameCarousel';
import Features from './components/Features';
import TrendingGames from './components/TrendingGames';
import HotGames from './components/HotGames';
import ColorGame from './components/ColorGame';
import Promotions from './components/Promotions';
import Footer from './components/Footer';

function App() {
  return (
    <div className="fixed inset-0 bg-[#0F0F19] overflow-y-auto hide-scrollbar">
      <div className="mx-auto w-[100%] max-w-[430px] relative bg-gradient-to-b from-[#0F0F19] to-[#1A1A2E]">
        <Header />
        <main>
          <Hero />
          <GameCarousel title="Featured Games" type="featured" />
          <TrendingGames />
          <ColorGame />
          <HotGames />
          <Promotions />
          <Features />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App