import React from 'react'
import Header from './Header'
import Hero from './Hero'
import GameCarousel from './GameCarousel'
import TrendingGames from './TrendingGames'
import ColorGame from './ColorGame'
import HotGames from './HotGames'
import Promotions from './Promotions'
import Features from './Features'
import Footer from './Footer'

const Home = () => {
  return (
      <div>
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
    </div>
  )
}

export default Home