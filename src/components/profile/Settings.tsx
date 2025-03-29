import React, { useEffect, useState } from 'react';
import { ArrowLeft, Bell, Lock, Moon, Globe, Shield, X, EyeOff, Eye, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { updatePassword } from "../../lib/services/securityService.js";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    promotions: false,
    security: true
  });



  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [PasswordPopup, setPasswordPopup] = useState(false);
  const [TwoFactorPopup, setTwoFactorPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

 
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const response = await updatePassword(userId, { currentPassword, newPassword }
      );
      console.log("Password updated successfully:", response);
      setSuccess('Password updated successfully!');

      setOldPassword('');
      setNewPassword('');
      setTimeout(() => {
        setPasswordPopup(false);
        setSuccess('');
      }, 1500);
    } catch (err) {
      console.error("Error updating password:", err);
      setError(err.message || 'Failed to update password. Please try again.');
    }
  };

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
              <option value="fr">Hindi</option>
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
            <button
              onClick={() => setPasswordPopup(true)}
              className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white hover:bg-purple-500/10 transition-colors flex items-center gap-3"
            >
              <Lock className="w-5 h-5 text-purple-400" />
              <span>Change Password</span>
            </button>
            <button 
              onClick={() => setTwoFactorPopup(true)}
              className="w-full py-3 px-4 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white hover:bg-purple-500/10 transition-colors flex items-center gap-3"
            >
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

      {/* Change Password Modal */}
      {PasswordPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 max-w-[500px] ">
            <div className="p-4 border-b border-purple-500/10 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" />
                Change Password
              </h2>
              <button
                onClick={() => {
                  setPasswordPopup(false);
                  setError('');
                  setSuccess('');
                }}
                className="p-1 rounded-full hover:bg-[#2f2f5a] text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="p-4 space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                  {success}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Old Password</label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={currentPassword}
                    placeholder='Old Password'
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full py-2 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showOldPassword ? (
                      <Eye className="w-5 h-5 text-green-500" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={newPassword}
                    placeholder='New Password'
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full py-2 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showNewPassword ? (
                      <Eye className="w-5 h-5 text-green-500" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-gradient-to-br from-[#c319b2] to-[#1c1cbe] rounded-lg text-white transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Two Factor Authentication Modal */}
      {TwoFactorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 max-w-[500px]">
            <div className="p-4 border-b border-purple-500/10 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Two-Factor Authentication
              </h2>
              <button
                onClick={() => {
                  setTwoFactorPopup(false);
                  setError('');
                  setSuccess('');
                }}
                className="p-1 rounded-full hover:bg-[#2f2f5a] text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form className="p-4 space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                  {success}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full py-2 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500 pl-10"
                    required
                  />
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full py-2 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500 pl-10"
                    required
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
                >
                  Setup 2FA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;