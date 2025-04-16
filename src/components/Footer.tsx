import React from "react";
import { 
  Home, 
  Gamepad2, 
  Gift, 
  User, 
  ExternalLink,
  Linkedin,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  Crown
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Footer: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();

  // Define footer menu items by category
  const footerCategories = [
    {
      title: "Casino",
      links: [
        { label: "Casino Games", url: "/games" },
        { label: "Slots", url: "/games/slots" },
        { label: "Live Casino", url: "/games/live" },
        { label: "Roulette", url: "/games/roulette" },
        { label: "Blackjack", url: "/games/blackjack" },
        { label: "Poker", url: "/games/poker" },
        { label: "Providers", url: "/providers" },
        { label: "Promos & Competitions", url: "/promotions" }
      ]
    },
    {
      title: "Sports",
      links: [
        { label: "Sportsbook", url: "/sports" },
        { label: "Live Sports", url: "/sports/live" },
        { label: "Soccer", url: "/sports/soccer" },
        { label: "Basketball", url: "/sports/basketball" },
        { label: "Tennis", url: "/sports/tennis" },
        { label: "eSports", url: "/sports/esports" },
        { label: "Bet Bonuses", url: "/sports/bonuses" },
        { label: "Sports Rules", url: "/sports/rules" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", url: "/help", external: true },
        { label: "Fairness", url: "/fairness" },
        { label: "Gambling Helpline", url: "/help/gambling", external: true },
        { label: "Live Support", url: "/support" },
        { label: "Self Exclusion", url: "/self-exclusion" }
      ]
    },
    {
      title: "About Us",
      links: [
        { label: "VIP Club", url: "/vip" },
        { label: "Affiliate", url: "/affiliate" },
        { label: "Privacy Policy", url: "/privacy" },
        { label: "AML Policy", url: "/aml" },
        { label: "Terms of Service", url: "/terms" }
      ]
    },
    {
      title: "Payment Info",
      links: [
        { label: "Deposit & Withdrawals", url: "/payments" },
        { label: "Currency Guide", url: "/currency" },
        { label: "Crypto Guide", url: "/crypto" },
        { label: "Supported Crypto", url: "/crypto/supported" },
        { label: "How to Use the Vault", url: "/vault" },
        { label: "How Much to Bet With", url: "/betting-guide" }
      ]
    },
    {
      title: "How-to Guides",
      links: [
        { label: "How-to Guides", url: "/guides" },
        { label: "Online Casino Guide", url: "/guides/casino" },
        { label: "Sports Betting Guide", url: "/guides/sports" },
        { label: "How to Live Stream Sports", url: "/guides/streaming" },
        { label: "VIP Guide", url: "/guides/vip" },
        { label: "House Edge Guide", url: "/guides/house-edge" }
      ]
    }
  ];

  // Social media icons using Lucide
  const socialLinks = [
    { icon: <Linkedin size={18} />, url: "https://linkedin.com" },
    { icon: <MessageSquare size={18} />, url: "https://discord.com" },
    { icon: <Facebook size={18} />, url: "https://facebook.com" },
    { icon: <Twitter size={18} />, url: "https://twitter.com" },
    { icon: <Instagram size={18} />, url: "https://instagram.com" },
    { icon: <Youtube size={18} />, url: "https://youtube.com" },
    { icon: <Twitch size={18} />, url: "https://twitch.tv" },
    { icon: <Crown size={18} />, url: "/vip" }
  ];

  return (
    <>
      {/* Mobile Footer */}
      <footer className="md:hidden fixed bottom-0 w-full max-w-[430px] bg-[#0F0F19]/90 backdrop-blur-lg border-t border-gray-800 z-30">
        <nav className="flex justify-around py-3 px-4">
          <Link to="/" className="flex flex-col items-center gap-1">
            <Home
              className={`w-6 h-6 ${
                location.pathname === "/" ? "text-purple-500" : "text-gray-400"
              }`}
            />
            <span
              className={`text-xs ${
                location.pathname === "/" ? "text-purple-500" : "text-gray-400"
              }`}
            >
              Home
            </span>
          </Link>

          <Link to="/games" className="flex flex-col items-center gap-1">
            <Gamepad2
              className={`w-6 h-6 ${
                location.pathname === "/games" ? "text-purple-500" : "text-gray-400"
              }`}
            />
            <span
              className={`text-xs ${
                location.pathname === "/games" ? "text-purple-500" : "text-gray-400"
              }`}
            >
              Games
            </span>
          </Link>

          <Link to="/promotions" className="flex flex-col items-center gap-1">
            <Gift
              className={`w-6 h-6 ${
                location.pathname === "/promotions" ? "text-purple-500" : "text-gray-400"
              }`}
            />
            <span
              className={`text-xs ${
                location.pathname === "/promotions" ? "text-purple-500" : "text-gray-400"
              }`}
            >
              Promotions
            </span>
          </Link>

          <Link to="/account" className="flex flex-col items-center gap-1">
            <User
              className={`w-6 h-6 ${
                location.pathname === "/account" ? "text-purple-500" : "text-gray-400"
              }`}
            />
            <span
              className={`text-xs ${
                location.pathname === "/account" ? "text-purple-500" : "text-gray-400"
              }`}
            >
              {isLoggedIn ? "Account" : "Login"}
            </span>
          </Link>
        </nav>
      </footer>

      {/* Desktop Footer - Simplified version */}
      <footer className="hidden md:block bg-[#0c1520] text-gray-300 border-t border-gray-800/30 pb-10">
        <div className="container mx-auto px-6">
          {/* Top section with logo, copyright, and social icons */}
          <div className="py-6 flex justify-between items-center border-b border-gray-800/30">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Rollix777
              </div>
              <span className="ml-4 text-sm text-gray-400">© 2025 Rollix777 | All Rights Reserved.</span>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Main footer links section */}
          <div className="grid grid-cols-6 gap-8 py-10">
            {footerCategories.map((category, index) => (
              <div key={index}>
                <h3 className="text-white font-medium mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.external ? (
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white text-sm flex items-center"
                        >
                          {link.label}
                          <ExternalLink className="ml-1 w-3 h-3" />
                        </a>
                      ) : (
                        <Link 
                          to={link.url} 
                          className="text-gray-400 hover:text-white text-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Selectors section - This is the last section now */}
          <div className="flex justify-end gap-4 mb-10">
            <div className="w-40">
              <select className="w-full bg-[#1c2a3a] text-white rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="w-40">
              <select className="w-full bg-[#1c2a3a] text-white rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>Decimal</option>
                <option>Fractional</option>
                <option>American</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
