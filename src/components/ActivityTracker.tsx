import React, { useEffect, useState } from "react";
import { Flame } from "lucide-react";

interface WinnerInfo {
  id: number;
  name: string;
  amount: string;
  avatar: string;
  status: string;
  label: string;
}

[];

const dummyWinners: WinnerInfo[] = [
  {
    id: 1,
    name: "Max***well",
    amount: "₹352.80",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNEbTavcavKe6-1QDv2vhhDdxVa0XkF_UYg&s",
    status: "Winning amount",
    label: "Received",
  },
  {
    id: 2,
    name: "Cha***dler",
    amount: "₹1,960.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Anna",
    status: "Withdrawal amount",
    label: "Withdrawn",
  },
  {
    id: 3,
    name: "Mon***ica",
    amount: "₹588.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Leo",
    status: "Deposit amount",
    label: "Deposited",
  },
  {
    id: 4,
    name: "Sam***uel",
    amount: "₹788.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Zara",
    status: "Winning amount",
    label: "Received",
  },
  {
    id: 5,
    name: "Jos***ephine",
    amount: "₹1,260.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Raj",
    status: "Deposit amount",
    label: "Deposited",
  },
  {
    id: 6,
    name: "Rac***hel",
    amount: "₹2,260.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Eva",
    status: "Winning amount",
    label: "Deposited",
  },
  {
    id: 7,
    name: "Pho***ebe",
    amount: "₹7,960.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Tom",
    status: "Deposit amount",
    label: "Deposited",
  },
  {
    id: 8,
    name: "Ros***coe",
    amount: "₹820.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Rocky",
    status: "Winning amount",
    label: "Received",
  },
  {
    id: 9,
    name: "Emi***ly",
    amount: "₹1,120.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Nina",
    status: "Withdrawal amount",
    label: "Withdrawn",
  },
  {
    id: 10,
    name: "Gun***ther",
    amount: "₹720.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Omar",
    status: "Deposit amount",
    label: "Deposited",
  },
  {
    id: 11,
    name: "Nik***hil",
    amount: "₹540.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Gina",
    status: "Winning amount",
    label: "Received",
  },
  {
    id: 12,
    name: "Ana***anya",
    amount: "₹3,500.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Sam",
    status: "Deposit amount",
    label: "Deposited",
  },
  {
    id: 13,
    name: "Tan***ya",
    amount: "₹2,740.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Vik",
    status: "Withdrawal amount",
    label: "Withdrawn",
  },
  {
    id: 14,
    name: "Har***shit",
    amount: "₹1,230.00",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Ria",
    status: "Winning amount",
    label: "Received",
  },
  {
    id: 15,
    name: "Sid***dharth",
    amount: "₹4,210.00",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNEbTavcavKe6-1QDv2vhhDdxVa0XkF_UYg&s",
    status: "Deposit amount",
    label: "Deposited",
  },
];

const ActivityTracker: React.FC = () => {
  const [winners, setWinners] = useState<WinnerInfo[]>(dummyWinners);

  useEffect(() => {
    const interval = setInterval(() => {
      setWinners((prev) => {
        const updated = [
          prev[prev.length - 1],
          ...prev.slice(0, prev.length - 1),
        ];
        return [...updated];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-6 px-6 bg-[#1A1A2E] relative rounded-xl border border-purple-500/10 max-w-screen mx-auto mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-orange-500" />
        <h2 className="text-xl font-bold text-white">Activity Tracker</h2>
      </div>
      <div className="flex flex-col gap-4">
        {winners.slice(0, 5).map((winner) => (
          <div
            key={winner.id}
            className="flex justify-between items-center bg-[#252547] p-4 rounded-xl border border-purple-700/10"
          >
            <div className="flex items-center gap-3">
              <img
                src={winner.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-white font-medium text-sm">
                {winner.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-white font-semibold text-sm">
                  {winner.label} {winner.amount}
                </p>
                <p className="text-xs text-gray-400">{winner.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivityTracker;
