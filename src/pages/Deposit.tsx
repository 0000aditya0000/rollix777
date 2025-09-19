import React, { useState, useEffect } from "react";

interface Channel {
  id: number;
  name: string;
  bonus: string;
  balanceRange: string;
}

interface PaymentTab {
  id: string;
  label: string;
  channels: Channel[];
}

interface RechargeHistory {
  id: number;
  amount: number;
  method: string;
  time: string;
  orderId: string;
  status: "success" | "failed";
}

const paymentTabs: PaymentTab[] = [
  {
    id: "upi",
    label: "UPI-QR",
    channels: [
      { id: 1, name: "PhonePe_QR", bonus: "10% bonus", balanceRange: "100 - 50K" },
      { id: 2, name: "Paytm_QR", bonus: "10% bonus", balanceRange: "200 - 30K" },
    ],
  },
  {
    id: "innate",
    label: "Innate UPI-QR",
    channels: [
      { id: 3, name: "GooglePay_QR", bonus: "5% bonus", balanceRange: "500 - 40K" },
    ],
  },
  {
    id: "usdt",
    label: "USDT",
    channels: [
      { id: 4, name: "TRC20 Wallet", bonus: "2% bonus", balanceRange: "50 - 5000 USDT" },
    ],
  },
  {
    id: "arpay",
    label: "ARPay",
    channels: [
      { id: 5, name: "ARPay Direct", bonus: "10% bonus", balanceRange: "1000 - 100K" },
    ],
  },
];

const rechargeHistory: RechargeHistory[] = [
  {
    id: 1,
    amount: 8000,
    method: "PhonePe_QR",
    time: "2025-09-18 18:29:33",
    orderId: "RC2025091818293337570788",
    status: "success",
  },
  {
    id: 2,
    amount: 500,
    method: "Paytm_QR",
    time: "2025-09-15 15:40:10",
    orderId: "RC2025091515401098876543",
    status: "failed", // won't show
  },
  {
    id: 3,
    amount: 1200,
    method: "GooglePay_QR",
    time: "2025-09-14 12:10:05",
    orderId: "RC2025091412100591234567",
    status: "success",
  },
];

export default function DepositPage() {
  const [activeTab, setActiveTab] = useState("upi");
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [inputAmount, setInputAmount] = useState<string>("");

  const activePayment = paymentTabs.find((tab) => tab.id === activeTab);

  // Auto-select first channel on tab change
  useEffect(() => {
    if (activePayment?.channels.length) {
      setSelectedChannel(activePayment.channels[0]);
    } else {
      setSelectedChannel(null);
    }
    setSelectedAmount(null);
    setInputAmount("");
  }, [activeTab]);

  const handleInputChange = (val: string) => {
    const cleaned = val.replace(/[^\d.]/g, "");
    setInputAmount(cleaned);
    setSelectedAmount(null);
  };

  const handlePresetClick = (amt: string) => {
    setSelectedAmount(amt);
    setInputAmount(amt);
  };

  return (
    <div className="min-h-screen bg-[#f5f3e6] flex justify-center items-center font-[Poppins]">
      {/* Mobile Container */}
      <div className="w-full max-w-md h-screen bg-[#000000] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#222] sticky top-0 bg-black z-10">
          <h1 className="text-lg font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#f7b733] to-[#fc4a1a]">
            Deposit
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#222]">
          {paymentTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? "text-[#f7b733] border-b-2 border-[#f7b733]"
                  : "text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 hide-scrollbar">
          {/* Select Channel */}
          <div>
            <h2 className="text-[#f7b733] font-semibold text-sm mb-2">Select Channel</h2>
            <div className="space-y-3">
              {activePayment?.channels.map((channel) => (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => setSelectedChannel(channel)}
                  className={`w-full text-left p-4 rounded-lg cursor-pointer transition ${
                    selectedChannel?.id === channel.id
                      ? "bg-gradient-to-r from-[#f7b733] to-[#fc4a1a] text-black"
                      : "bg-[#1a1a1a] text-white"
                  }`}
                >
                  <p className="font-semibold">{channel.name}</p>
                  <p className="text-xs opacity-80">Balance: {channel.balanceRange}</p>
                  <p className="text-xs">{channel.bonus}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Deposit Amount */}
          {selectedChannel && (
            <div>
              <h2 className="text-[#f7b733] font-semibold text-sm mb-2">Deposit Amount</h2>

              <div className="grid grid-cols-3 gap-3">
                {["200", "300", "400", "900", "1500", "3000"].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handlePresetClick(amt)}
                    className={`py-2 rounded-lg text-sm transition ${
                      selectedAmount === amt
                        ? "bg-gradient-to-r from-[#f7b733] to-[#fc4a1a] text-black font-semibold"
                        : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
                    }`}
                  >
                    ₹ {amt}
                  </button>
                ))}
              </div>

              {/* Input box */}
              <input
                type="number"
                placeholder="Enter custom amount"
                value={inputAmount}
                onChange={(e) => handleInputChange(e.target.value)}
                className="mt-4 w-full bg-[#1a1a1a] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#f7b733]"
              />

              <button
                type="button"
                className="mt-4 w-full bg-gradient-to-r from-[#f7b733] to-[#fc4a1a] text-black py-3 rounded-lg font-semibold"
              >
                Deposit
              </button>
            </div>
          )}

          {/* Recharge Instructions */}
          <div>
            <h2 className="text-[#f7b733] font-semibold text-sm mb-2">Recharge Instructions</h2>
            <ul className="space-y-2 text-sm text-gray-300 bg-[#1a1a1a] p-4 rounded-lg">
              <li>• If the transfer time is up, please fill out the deposit form again.</li>
              <li>• The transfer amount must match the order you created.</li>
              <li>• If you transfer the wrong amount, we will not be responsible for the loss.</li>
              <li>• Do not cancel the deposit order after money has been transferred.</li>
            </ul>
          </div>

          {/* Recharge History */}
          <div>
            <h2 className="text-[#f7b733] font-semibold text-sm mb-2">Deposit History</h2>
            <div className="space-y-3">
              {rechargeHistory
                .filter((h) => h.status === "success")
                .map((h) => (
                  <div
                    key={h.id}
                    className="bg-[#1a1a1a] rounded-lg p-4 text-sm text-gray-200"
                  >
                    <div className="flex justify-between">
                      <span className="text-green-400 font-semibold">Success</span>
                      <span className="text-[#f7b733] font-semibold">₹ {h.amount}</span>
                    </div>
                    <p>Method: {h.method}</p>
                    <p>Time: {h.time}</p>
                    <p className="text-xs text-gray-400">Order ID: {h.orderId}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
