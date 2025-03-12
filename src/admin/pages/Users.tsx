import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', balance: '$1,245.00', joined: '2025-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', balance: '$3,780.50', joined: '2025-02-20' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'inactive', balance: '$0.00', joined: '2025-03-05' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'active', balance: '$950.25', joined: '2025-03-10' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', status: 'suspended', balance: '$2,100.75', joined: '2025-01-25' },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', status: 'active', balance: '$4,520.00', joined: '2025-02-15' },
    { id: 7, name: 'David Miller', email: 'david@example.com', status: 'active', balance: '$1,875.50', joined: '2025-03-20' },
    { id: 8, name: 'Lisa Taylor', email: 'lisa@example.com', status: 'inactive', balance: '$0.00', joined: '2025-01-10' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'inactive':
        return 'bg-gray-500/20 text-gray-400';
      case 'suspended':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Users</h1>
        <button className="py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={18} />
          <span>Add User</span>
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 bg-[#252547] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button className="py-2 px-4 bg-[#252547] border border-purple-500/20 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-[#2f2f5a] transition-colors">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>
      
      {/* Users Table */}
      <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-purple-500/10">
                <th className="py-4 px-6 font-medium">ID</th>
                <th className="py-4 px-6 font-medium">Name</th>
                <th className="py-4 px-6 font-medium">Email</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Balance</th>
                <th className="py-4 px-6 font-medium">Joined</th>
                <th className="py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-purple-500/10 text-white hover:bg-purple-500/5">
                  <td className="py-4 px-6">#{user.id}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">{user.balance}</td>
                  <td className="py-4 px-6">{user.joined}</td>
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
          <p className="text-gray-400 text-sm">Showing 1-8 of 100 users</p>
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

export default Users;