import React, { useEffect, useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';
import axios from 'axios';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
 const [users, setUsers] = useState([]); // State to store fetched users
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
   
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://rollix777.com/api/user/allusers');
        setUsers(response.data); // Set the fetched data to the state
        setLoading(false); // Set loading to false

        // Store the total number of users in localStorage
        const AllUsers = response.data.length;
        console.log(AllUsers)
        localStorage.setItem("AllUser", AllUsers.toString()); // Store as string
      } catch (error) {
        setError(error); // Set error if the request fails
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
         
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
 if (loading) {
    return <div className="text-white text-center py-6">Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div className="text-red-500 text-center py-6">Error: {error.message}</div>;
  }
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
                  <td className="py-4 px-6">{user.username}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                      {user.status||"active"}
                    </span>
                  </td>
                  <td className="py-4 px-6">{user.balance || 3400}</td>
                  <td className="py-4 px-6">{user.code ||453}</td>
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