import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Withdrawals = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Dummy data
  const withdrawals = [
    { id: 'WD-001', user: 'John Doe', amount: '$500.00', method: 'Bitcoin', date: '2025-04-10', status: 'pending' },
    { id: 'WD-002', user: 'Jane Smith', amount: '$1,200.00', method: 'Bank Transfer', date: '2025-04-09', status: 'approved' },
    { id: 'WD-003', user: 'Robert Johnson', amount: '$350.00', method: 'Ethereum', date: '2025-04-08', status: 'pending' },
    { id: 'WD-004', user: 'Emily Davis', amount: '$780.00', method: 'USDT', date: '2025-04-07', status: 'rejected' },
    { id: 'WD-005', user: 'Michael Wilson', amount: '$2,500.00', method: 'Bank Transfer', date: '2025-04-06', status: 'approved' },
    { id: 'WD-006', user: 'Sarah Brown', amount: '$900.00', method: 'Bitcoin', date: '2025-04-05', status: 'pending' },
    { id: 'WD-007', user: 'David Miller', amount: '$1,500.00', method: 'Bank Transfer', date: '2025-04-04', status: 'approved' },
    { id: 'WD-008', user: 'Lisa Taylor', amount: '$450.00', method: 'Ethereum', date: '2025-04-03', status: 'rejected' },
  ];

  const filteredWithdrawals = statusFilter === 'all' 
    ? withdrawals 
    : withdrawals.filter(w => w.status === statusFilter);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Withdrawals</h1>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search withdrawals..."
            className="w-full py-2 pl-10 pr-4 bg-[#252547] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`py-2 px-4 rounded-lg text-white transition-colors ${
                statusFilter === status
                  ? status === 'approved' ? 'bg-green-600' : 
                    status === 'pending' ? 'bg-yellow-600' : 
                    status === 'rejected' ? 'bg-red-600' : 'bg-purple-600'
                  : 'bg-[#252547] border border-purple-500/20 hover:bg-[#2f2f5a]'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Withdrawals;
