import React from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';

const BankAccounts = () => {
  // Dummy data
  const accounts = [
    { id: 1, user: 'John Doe', bank: 'Chase Bank', accountNumber: '****5678', type: 'Checking', status: 'verified' },
    { id: 2, user: 'Jane Smith', bank: 'Bank of America', accountNumber: '****1234', type: 'Savings', status: 'verified' },
    { id: 3, user: 'Robert Johnson', bank: 'Wells Fargo', accountNumber: '****9876', type: 'Checking', status: 'pending' },
    { id: 4, user: 'Emily Davis', bank: 'Citibank', accountNumber: '****4321', type: 'Savings', status: 'verified' },
    { id: 5, user: 'Michael Wilson', bank: 'TD Bank', accountNumber: '****7890', type: 'Checking', status: 'rejected' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Bank Accounts</h1>
        <button className="py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={18} />
          <span>Add Account</span>
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search accounts..."
            className="w-full py-2 pl-10 pr-4 bg-[#252547] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button className="py-2 px-4 bg-[#252547] border border-purple-500/20 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-[#2f2f5a] transition-colors">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>
      
      {/* Accounts Table */}
      <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-purple-500/10">
                <th className="py-4 px-6 font-medium">ID</th>
                <th className="py-4 px-6 font-medium">User</th>
                <th className="py-4 px-6 font-medium">Bank</th>
                <th className="py-4 px-6 font-medium">Account Number</th>
                <th className="py-4 px-6 font-medium">Type</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className="border-b border-purple-500/10 text-white hover:bg-purple-500/5">
                  <td className="py-4 px-6">#{account.id}</td>
                  <td className="py-4 px-6">{account.user}</td>
                  <td className="py-4 px-6">{account.bank}</td>
                  <td className="py-4 px-6">{account.accountNumber}</td>
                  <td className="py-4 px-6">{account.type}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(account.status)}`}>
                      {account.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-purple-500/10 flex justify-between items-center">
          <p className="text-gray-400 text-sm">Showing 1-5 of 25 accounts</p>
          <div className="flex gap-2">
            <button className="py-1 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-gray-400 hover:text-white transition-colors">
              Previous
            </button>
            <button className="py-1 px-3 bg-purple-500/20 border border-purple-500/20 rounded-lg text-white">
              1
            </button>
            <button className="py-1 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-gray-400 hover:text-white transition-colors">
              2
            </button>
            <button className="py-1 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-gray-400 hover:text-white transition-colors">
              3
            </button>
            <button className="py-1 px-3 bg-[#1A1A2E] border border-purple-500/20 rounded-lg text-gray-400 hover:text-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccounts;