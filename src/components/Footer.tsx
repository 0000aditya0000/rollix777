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
  Crown,
  Shield,
  HelpCircle,
  Phone,
  Mail,
  Wallet,
  Dice5,
  UserCircle,
  UserRound,
  BadgePercent,
  BadgePercentIcon,
  HomeIcon,
  Wallet2Icon,
  Blinds,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Footer: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const location = useLocation();

  // Define footer menu items by category
  const footerCategories = [
    {
      title: "Casino",
      links: [
        { label: "Casino Games", url: "/games" },
        { label: "Slots", url: "/games" },
        { label: "Live Casino", url: "/games" },
        { label: "Roulette", url: "/games" },
        { label: "Blackjack", url: "/games" },
        { label: "Poker", url: "/games" },
        { label: "Promos & Competitions", url: "/promotions" },
      ],
    },
    {
      title: "Sports",
      links: [
        { label: "Sportsbook", url: "/games" },
        { label: "Live Sports", url: "/games" },
        { label: "Soccer", url: "/games" },
        { label: "Basketball", url: "/games" },
        { label: "Tennis", url: "/games" },
        { label: "eSports", url: "/games" },
        { label: "Bet Bonuses", url: "/games" },
        { label: "Sports Rules", url: "/games" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", url: "/support", external: true },
        { label: "Gambling Helpline", url: "/support", external: true },
        { label: "Live Support", url: "/support" },
      ],
    },
    {
      title: "Contact",
      links: [
        {
          label: "Email Support",
          url: "mailto:support@rollix777.com",
          icon: <Mail className="w-4 h-4" />,
        },
        {
          label: "24/7 Support",
          url: "tel:+1234567890",
          icon: <Phone className="w-4 h-4" />,
        },
        {
          label: "FAQ",
          url: "/support",
          icon: <HelpCircle className="w-4 h-4" />,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Footer */}

      <footer className="md:hidden fixed bottom-0 w-full max-w-[4200px] bg-[#0F0F19]/60 backdrop-blur-lg z-30">
        <svg
          className="absolute bottom-0 left-0 w-[calc(100%-1rem)] h-20 mx-2 drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
        >
          <path
            d="
      M5 0
      Q0 0, 0 5
      V30
      H100
      V5
      Q100 0, 95 0
      H60
      Q58 0, 56 4
      Q53 10, 50 12
      Q47 10, 44 4
      Q42 0, 40 0
      H5 Z
    "
            fill="url(#footerGrad)"
          />
          <defs>
            <linearGradient id="footerGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#1e1b2e" />
              <stop offset="25%" stopColor="#2d1b69" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="75%" stopColor="#2d1b69" />
              <stop offset="100%" stopColor="#0f0f19" />
            </linearGradient>
          </defs>
        </svg>

        <nav className="relative flex justify-between items-end py-3 px-4">
          {/* Left Items */}
          <div className="flex w-2/5 justify-evenly">
            <Link to="/" className="flex flex-col items-center gap-1">
              <Blinds
                className={`w-7 h-7 ${
                  location.pathname === "/"
                    ? "text-purple-500"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`text-sm font-bold ${
                  location.pathname === "/"
                    ? "text-purple-500"
                    : "text-gray-500"
                }`}
              >
                Home
              </span>
            </Link>
            <Link to="/games" className="flex flex-col items-center gap-1">
              <Gamepad2
                className={`w-7 h-7 font-bold ${
                  location.pathname === "/games"
                    ? "text-purple-500"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`text-sm font-bold ${
                  location.pathname === "/games"
                    ? "text-purple-500"
                    : "text-gray-500"
                }`}
              >
                Games
              </span>
            </Link>
          </div>

          {/* Floating Wallet */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-9 z-40 flex flex-col items-center border-transparent">
            <Link to="/wallet" className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg border-4 border-[#0F0F19] transition-transform duration-300 hover:scale-105">
                <Wallet2Icon className="w-8 h-8 text-white" />
              </div>
              <span
                className={`text-sm mt-5 font-bold ${
                  location.pathname === "/wallet"
                    ? "text-white mb-2 drop-shadow-[0_0_12px_rgba(124,58,237,0.8)]"
                    : "text-white/80 mb-2"
                }`}
              >
                Wallet
              </span>
            </Link>
          </div>

          {/* Right Items */}
          <div className="flex w-2/5 justify-evenly">
            <Link to="/promotions" className="flex flex-col items-center gap-1">
              <BadgePercentIcon
                className={`w-7 h-7 ${
                  location.pathname === "/promotions"
                    ? "text-purple-500"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`text-sm font-bold ${
                  location.pathname === "/promotions"
                    ? "text-purple-500"
                    : "text-gray-500"
                }`}
              >
                Promotions
              </span>
            </Link>
            <Link to="/account" className="flex flex-col items-center gap-1">
              <UserRound
                className={`w-7 h-7 ${
                  location.pathname === "/account"
                    ? "text-purple-500"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`text-sm font-bold ${
                  location.pathname === "/account"
                    ? "text-purple-500"
                    : "text-gray-500"
                }`}
              >
                {isLoggedIn ? "Account" : "Login"}
              </span>
            </Link>
          </div>
        </nav>
      </footer>

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-gradient-to-b from-[#0F0F19] to-[#0A0A12] text-gray-300 border-t border-gray-800/30">
        {/* Top section with logo and social icons */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Rollix777
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="p-2 rounded-lg bg-[#1A1A2E] hover:bg-purple-500/20 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-gray-400 hover:text-purple-400" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-[#1A1A2E] hover:bg-purple-500/20 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-purple-400" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-[#1A1A2E] hover:bg-purple-500/20 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-purple-400" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-[#1A1A2E] hover:bg-purple-500/20 transition-colors"
                >
                  <Youtube className="w-5 h-5 text-gray-400 hover:text-purple-400" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Secure Gaming</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Crown className="w-4 h-4" />
                <span>Licensed & Regulated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer links section */}
        <div className="container mx-auto px-6 py-8 border-t border-gray-800/30">
          <div className="grid grid-cols-4 gap-8">
            {footerCategories.map((category, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold mb-4 text-lg">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.external ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-purple-400 text-sm flex items-center gap-2 transition-colors"
                        >
                          {link.icon}
                          {link.label}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link
                          to={link.url}
                          className="text-gray-400 hover:text-purple-400 text-sm flex items-center gap-2 transition-colors"
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section with language, currency selectors and copyright */}
        <div className="container mx-auto px-6 py-6 border-t border-gray-800/30">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-40">
                <select className="w-full bg-[#1A1A2E] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-800">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="w-40">
                <select className="w-full bg-[#1A1A2E] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-800">
                  <option>Decimal</option>
                  <option>Fractional</option>
                  <option>American</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Rollix777 | All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
