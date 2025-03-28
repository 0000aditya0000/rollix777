import React, { useState, useEffect } from 'react'
import Header from './Header'
import Hero from './Hero'
import GameCarousel from './GameCarousel'
import TrendingGames from './TrendingGames'
import ColorGame from './ColorGame'
import HotGames from './HotGames'
import Promotions from './Promotions'
import Features from './Features'
import Footer from './Footer'
import AuthModal from './AuthModal'

const Home = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login')
  
  useEffect(() => {
    // Check for pending referral code
    const pendingReferralCode = localStorage.getItem('pendingReferralCode')
    if (pendingReferralCode) {
      setAuthModalMode('register')
      setAuthModalOpen(true)
    }
  }, [])

  const handleLoginSuccess = () => {
    setAuthModalOpen(false)
    localStorage.removeItem('pendingReferralCode')
  }

  return (
    <div>
      <div className="fixed inset-0 bg-[#0F0F19] overflow-y-auto hide-scrollbar">
        <div className="mx-auto w-[100%] max-w-[430px] relative bg-gradient-to-b from-[#0F0F19] to-[#1A1A2E]">
          <Header onLogout={"hiii"}/>
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
          
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => {
              setAuthModalOpen(false)
              localStorage.removeItem('pendingReferralCode')
            }}
            initialMode={authModalMode}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      </div>
    </div>
  )
}

export default Home