import React, { useState } from 'react';
import { ArrowLeft, Bell, Lock, Moon, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    promotions: false,
    security: true
  });

  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <div className="pt-16 pb-24">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-lg bg-[#252547] text-purple-400 hover:bg-[#2f2f5a] transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>

        {/* Notifications */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10 flex items-center gap-3">
            <Bell className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#1A1A2E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Push Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#1A1A2E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Promotional Emails</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.promotions}
                  onChange={(e) => setNotifications({ ...notifications, promotions: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#1A1A2E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Security Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.security}
                  onChange={(e) => setNotifications({ ...notifications, security: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#1A1A2E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10 flex items-center gap-3">
            <Moon className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Appearance</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Dark Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#1A1A2E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10 flex items-center gap-3">
            <Globe className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Language</h2>
          </div>
          <div className="p-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full py-2 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        {/* Security */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10 flex items-center gap-3">
            <Shield className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Security</h2>
          </div>
          <div className="p-4 space-y-4">
            <button className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white hover:bg-purple-500/10 transition-colors flex items-center gap-3">
              <Lock className="w-5 h-5 text-purple-400" />
              <span>Change Password</span>
            </button>
            <button className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white hover:bg-purple-500/10 transition-colors flex items-center gap-3">
              <Shield className="w-5 h-5 text-purple-400" />
              <span>Two-Factor Authentication</span>
            </button>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center text-gray-400 text-sm">
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;