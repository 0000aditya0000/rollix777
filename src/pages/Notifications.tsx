import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { style } from "framer-motion/client";

interface Notification {
  id: number;
  title: string;
  time: string;
  message: string;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "LOGIN NOTIFICATION",
    time: "2025-09-18 21:11:49",
    message:
      "Your account has just been logged in. If you have any questions, please contact customer service!",
  },
  {
    id: 2,
    title: "ACCOUNT RECHARGE",
    time: "2025-09-18 18:56:00",
    message:
      "Congratulations on your successful recharge! Your account has received ₹500. Wishing you happy gaming!",
  },
  {
    id: 3,
    title: "ACCOUNT RECHARGE",
    time: "2025-09-18 18:20:40",
    message:
      "Your account has received ₹800. Thank you for your trust and support!",
  },
  {
    id: 3,
    title: "ACCOUNT RECHARGE",
    time: "2025-09-18 18:20:40",
    message:
      "Your account has received ₹800. Thank you for your trust and support!",
  },
  {
    id: 3,
    title: "ACCOUNT RECHARGE",
    time: "2025-09-18 18:20:40",
    message:
      "Your account has received ₹800. Thank you for your trust and support!",
  },
  {
    id: 1,
    title: "LOGIN NOTIFICATION",
    time: "2025-09-18 21:11:49",
    message:
      "Your account has just been logged in. If you have any questions, please contact customer service!",
  },
  {
    id: 3,
    title: "ACCOUNT RECHARGE",
    time: "2025-09-18 18:20:40",
    message:
      "Your account has received ₹800. Thank you for your trust and support!",
  },
  {
    id: 3,
    title: "ACCOUNT RECHARGE",
    time: "2025-09-18 18:20:40",
    message:
      "Your account has received ₹800. Thank you for your trust and support!",
  },
  {
    id: 1,
    title: "LOGIN NOTIFICATION",
    time: "2025-09-18 21:11:49",
    message:
      "Your account has just been logged in. If you have any questions, please contact customer service!",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f5f3e6] flex justify-center items-center font-[Poppins]">
      {/* Mobile Container */}
      <div className="w-full max-w-md h-screen bg-[#000000] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#222] sticky top-0 bg-black z-10">
          <h1 className="text-lg font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#f7b733] to-[#fc4a1a]">
            Notifications
          </h1>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scrollbar">
          {notifications.map((note) => (
            <div
              key={note.id}
              className="bg-[#1a1a1a] rounded-lg p-4 flex justify-between items-start shadow"
            >
              <div>
                <h2 className="text-[#f7b733] font-semibold text-sm uppercase">
                  {note.title}
                </h2>
                <p className="text-xs text-gray-400 mb-1">{note.time}</p>
                <p className="text-sm text-gray-200">{note.message}</p>
              </div>
              <button
                onClick={() => deleteNotification(note.id)}
                className="ml-3 text-red-400 hover:text-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {notifications.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              No notifications yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
