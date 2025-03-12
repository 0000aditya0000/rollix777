import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, Download, Calendar } from 'lucide-react';

const Reports = () => {
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Reports</h1>
      
      {/* Report Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setReportType('daily')}
            className={`py-2 px-4 rounded-lg text-white transition-colors ${
              reportType === 'daily' 
                ? 'bg-purple-600' 
                : 'bg-[#252547] border border-purple-500/20 hover:bg-[#2f2f5a]'
            }`}
          >
            Daily
          </button>
          <button 
            onClick={() => setReportType('weekly')}
            className={`py-2 px-4 rounded-lg text-white transition-colors ${
              reportType === 'weekly' 
                ? 'bg-purple-600' 
                : 'bg-[#252547] border border-purple-500/20 hover:bg-[#2f2f5a]'
            }`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setReportType('monthly')}
            className={`py-2 px-4 rounded-lg text-white transition-colors ${
              reportType === 'monthly' 
                ? 'bg-purple-600' 
                : 'bg-[#252547] border border-purple-500/20 hover:bg-[#2f2f5a]'
            }`}
          >
            Monthly
          </button>
        </div>
        
        <div className="flex gap-2 ml-auto">
          <button 
            onClick={() => setChartType('bar')}
            className={`p-2 rounded-lg text-white transition-colors ${
              chartType === 'bar' 
                ? 'bg-purple-600' 
                : 'bg-[#252547] border border-purple-500/20 hover:bg-[#2f2f5a]'
            }`}
          >
            <BarChart3 size={20} />
          </button>
          <button 
            onClick={() => setChartType('line')}
            className={`p-2 rounded-lg text-white transition-colors ${
              chartType === 'line' 
                ? 'bg-purple-600' 
                : 'bg-[#252547] border border-purple-500/20 hover:bg-[#2f2f5a]'
            }`}
          >
            <LineChart size={20} />
          </button>
          <button 
            onClick={() => setChartType('pie')}
            className={`p-2 rounded-lg text-white transition-colors ${
              chartType === 'pie' 
                ? 'bg-purple-600' 
                : 'bg-[#252547] border border-purple-500/20 hover:bg-[#2f2f5a]'
            }`}
          >
            <PieChart size={20} />
          </button>
        </div>
        
        <button className="py-2 px-4 bg-[#252547] border border-purple-500/20 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-[#2f2f5a] transition-colors">
          <Calendar size={18} />
          <span>Date Range</span>
        </button>
        
        <button className="py-2 px-4 bg-green-600 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
          <Download size={18} />
          <span>Export</span>
        </button>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10">
            <h2 className="text-xl font-bold text-white">Revenue</h2>
          </div>
          <div className="p-6 h-80 flex items-center justify-center">
            <div className="w-full h-full bg-[#1A1A2E] rounded-lg border border-purple-500/10 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 size={48} className="mx-auto text-purple-400 mb-4" />
                <p className="text-gray-400">Revenue chart visualization would appear here</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* User Activity Chart */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10">
            <h2 className="text-xl font-bold text-white">User Activity</h2>
          </div>
          <div className="p-6 h-80 flex items-center justify-center">
            <div className="w-full h-full bg-[#1A1A2E] rounded-lg border border-purple-500/10 flex items-center justify-center">
              <div className="text-center">
                <LineChart size={48} className="mx-auto text-purple-400 mb-4" />
                <p className="text-gray-400">User activity chart visualization would appear here</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Game Performance Chart */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10">
            <h2 className="text-xl font-bold text-white">Game Performance</h2>
          </div>
          <div className="p-6 h-80 flex items-center justify-center">
            <div className="w-full h-full bg-[#1A1A2E] rounded-lg border border-purple-500/10 flex items-center justify-center">
              <div className="text-center">
                <PieChart size={48} className="mx-auto text-purple-400 mb-4" />
                <p className="text-gray-400">Game performance chart visualization would appear here</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Withdrawal/Deposit Chart */}
        <div className="bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/10">
            <h2 className="text-xl font-bold text-white">Withdrawals vs Deposits</h2>
          </div>
          <div className="p-6 h-80 flex items-center justify-center">
            <div className="w-full h-full bg-[#1A1A2E] rounded-lg border border-purple-500/10 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 size={48} className="mx-auto text-purple-400 mb-4" />
                <p className="text-gray-400">Withdrawal/deposit chart visualization would appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;