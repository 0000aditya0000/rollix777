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

const dummyWinners: WinnerInfo[] = [
  {
    id: 1,
    name: "Max",
    amount: "₹352.80",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MMIrBlBJttU3237QobKx5By7QgIfFgI2OQ&s",
    status: "Wining amount",
    label: "Received",
  },
  {
    id: 2,
    name: "Chandler",
    amount: "₹1,960.00",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8sy7JvYpoKIwKis7zk8Huz1bDxtGpTncW8w&s",
    status: "Withdrawal amount",
    label: "Withdrawn",
  },
  {
    id: 3,
    name: "Monica",
    amount: "₹588.00",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQSxRDvb_G515i5hCZaaoSViRoOuLiWIk1qQ&s",
    status: "Deposit amount",
    label: "Deposited",
  },
  {
    id: 4,
    name: "Sam",
    amount: "₹588.00",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-neIT6-7zedVUulMbP40efpaGFTPMMvBJkA&s",
    status: "Wining amount",
    label: "Received",
  },
  {
    id: 5,
    name: "Joe",
    amount: "₹1,960.00",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MMIrBlBJttU3237QobKx5By7QgIfFgI2OQ&s",
    status: "Deposit amount",
    label: "Deposited",
  },
  {
    id: 6,
    name: "Rachel",
    amount: "₹2,260.00",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHAN3CZJT_FlacY3P9aGZzotykJM5Le1obvQ&s",
    status: "Winning amount",
    label: "Deposited",
  },
  {
    id: 7,
    name: "phebe",
    amount: "₹7,960.00",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN4Pj-AOK8UK5ohl0ioLzF9E_3Ws0INieRVA&s",
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
    <section className="py-6 px-6 bg-[#1A1A2E] relative rounded-xl border border-purple-500/10 max-w-screen mx-auto">
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
