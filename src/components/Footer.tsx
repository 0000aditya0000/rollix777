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

      <footer className="md:hidden fixed bottom-0 w-full bg-[#0F0F19]/95 backdrop-blur-xl z-30 rounded-t-3xl bg-gradient-to-r from-[#1e1b2e] via-[#2d1b69] to-[#0f0f19] border-t border-purple-500/20 shadow-2xl shadow-purple-500/10">
        <nav className="relative flex justify-between items-center h-20 px-6">
          {/* Left Items */}
          <div className="flex w-2/5 justify-evenly">
            <Link to="/" className="flex flex-col items-center gap-1 group">
              <div
                className={`relative p-2 rounded-xl transition-all duration-300 ${
                  location.pathname === "/"
                    ? "bg-purple-500/20 shadow-lg shadow-purple-500/30"
                    : "group-hover:bg-purple-500/10"
                }`}
              >
                <Blinds
                  className={`w-6 h-6 transition-all duration-300 ${
                    location.pathname === "/"
                      ? "text-purple-400 drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]"
                      : "text-gray-400 group-hover:text-purple-300"
                  }`}
                />
                {location.pathname === "/" && (
                  <div className="absolute -inset-1 bg-purple-500/30 rounded-xl blur-sm -z-10 animate-pulse"></div>
                )}
              </div>
              <span
                className={`text-xs font-bold transition-all duration-300 ${
                  location.pathname === "/"
                    ? "text-purple-400 drop-shadow-[0_0_6px_rgba(147,51,234,0.8)]"
                    : "text-gray-400 group-hover:text-purple-300"
                }`}
              >
                Home
              </span>
            </Link>

            <Link
              to="/games"
              className="flex flex-col items-center gap-1 group"
            >
              <div
                className={`relative p-2 rounded-xl transition-all duration-300 ${
                  location.pathname === "/games"
                    ? "bg-purple-500/20 shadow-lg shadow-purple-500/30"
                    : "group-hover:bg-purple-500/10"
                }`}
              >
                <Gamepad2
                  className={`w-6 h-6 transition-all duration-300 ${
                    location.pathname === "/games"
                      ? "text-purple-400 drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]"
                      : "text-gray-400 group-hover:text-purple-300"
                  }`}
                />
                {location.pathname === "/games" && (
                  <div className="absolute -inset-1 bg-purple-500/30 rounded-xl blur-sm -z-10 animate-pulse"></div>
                )}
              </div>
              <span
                className={`text-xs font-bold transition-all duration-300 ${
                  location.pathname === "/games"
                    ? "text-purple-400 drop-shadow-[0_0_6px_rgba(147,51,234,0.8)]"
                    : "text-gray-400 group-hover:text-purple-300"
                }`}
              >
                Games
              </span>
            </Link>
          </div>

          {/* Floating Center Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-10">
            <Link to="/wallet" className="flex flex-col items-center group">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl border-4 border-[#0F0F19] transition-all duration-300 group-hover:scale-110 group-hover:shadow-purple-500/50 group-hover:shadow-2xl">
                  <Wallet2Icon className="w-9 h-9 text-white drop-shadow-lg" />
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                {/* Floating glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600/30 to-pink-500/30 rounded-full blur-xl opacity-75 animate-pulse"></div>
                {/* Ring animation on active */}
                {location.pathname === "/wallet" && (
                  <div className="absolute -inset-1 border-2 border-purple-400/60 rounded-full animate-ping"></div>
                )}
              </div>
              <span
                className={`text-sm mt-3 font-bold transition-all duration-300 ${
                  location.pathname === "/wallet"
                    ? "text-purple-300 drop-shadow-[0_0_10px_rgba(124,58,237,0.9)] animate-pulse"
                    : "text-gray-300 group-hover:text-purple-200 group-hover:drop-shadow-[0_0_6px_rgba(124,58,237,0.6)]"
                }`}
              >
                Wallet
              </span>
            </Link>
          </div>

          {/* Right Items */}
          <div className="flex w-2/5 justify-evenly">
            <Link
              to="/promotions"
              className="flex flex-col items-center gap-1 group"
            >
              <div
                className={`relative p-2 rounded-xl transition-all duration-300 ${
                  location.pathname === "/promotions"
                    ? "bg-purple-500/20 shadow-lg shadow-purple-500/30"
                    : "group-hover:bg-purple-500/10"
                }`}
              >
                <BadgePercentIcon
                  className={`w-6 h-6 transition-all duration-300 ${
                    location.pathname === "/promotions"
                      ? "text-purple-400 drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]"
                      : "text-gray-400 group-hover:text-purple-300"
                  }`}
                />
                {location.pathname === "/promotions" && (
                  <div className="absolute -inset-1 bg-purple-500/30 rounded-xl blur-sm -z-10 animate-pulse"></div>
                )}
              </div>
              <span
                className={`text-xs font-bold transition-all duration-300 ${
                  location.pathname === "/promotions"
                    ? "text-purple-400 drop-shadow-[0_0_6px_rgba(147,51,234,0.8)]"
                    : "text-gray-400 group-hover:text-purple-300"
                }`}
              >
                Promo
              </span>
            </Link>

            <Link
              to="/account"
              className="flex flex-col items-center gap-1 group"
            >
              <div
                className={`relative p-2 rounded-xl transition-all duration-300 ${
                  location.pathname === "/account"
                    ? "bg-purple-500/20 shadow-lg shadow-purple-500/30"
                    : "group-hover:bg-purple-500/10"
                }`}
              >
                <UserRound
                  className={`w-6 h-6 transition-all duration-300 ${
                    location.pathname === "/account"
                      ? "text-purple-400 drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]"
                      : "text-gray-400 group-hover:text-purple-300"
                  }`}
                />
                {location.pathname === "/account" && (
                  <div className="absolute -inset-1 bg-purple-500/30 rounded-xl blur-sm -z-10 animate-pulse"></div>
                )}
              </div>
              <span
                className={`text-xs font-bold transition-all duration-300 ${
                  location.pathname === "/account"
                    ? "text-purple-400 drop-shadow-[0_0_6px_rgba(147,51,234,0.8)]"
                    : "text-gray-400 group-hover:text-purple-300"
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
