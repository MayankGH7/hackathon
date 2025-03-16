import React from 'react';
import { TrendingUp, TrendingDown, Wallet, BarChart } from 'lucide-react';

const FinancialOverview = ({ income, expenses, savings, balance }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">Income</span>
          <div className="p-1 rounded bg-green-100">
            <TrendingUp size={14} className="text-green-600" />
          </div>
        </div>
        <div className="text-lg font-bold text-gray-800">${income.toLocaleString()}</div>
        <div className="mt-1 text-xs text-green-600">+12% vs last month</div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">Expenses</span>
          <div className="p-1 rounded bg-red-100">
            <TrendingDown size={14} className="text-red-600" />
          </div>
        </div>
        <div className="text-lg font-bold text-gray-800">${expenses.toLocaleString()}</div>
        <div className="mt-1 text-xs text-red-600">+5% vs last month</div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">Savings</span>
          <div className="p-1 rounded bg-blue-100">
            <Wallet size={14} className="text-blue-600" />
          </div>
        </div>
        <div className="text-lg font-bold text-gray-800">${savings.toLocaleString()}</div>
        <div className="mt-1 text-xs text-blue-600">19.5% of income</div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">Net Worth</span>
          <div className="p-1 rounded bg-purple-100">
            <BarChart size={14} className="text-purple-600" />
          </div>
        </div>
        <div className="text-lg font-bold text-gray-800">${(balance + savings).toLocaleString()}</div>
        <div className="mt-1 text-xs text-purple-600">+7.2% this month</div>
      </div>
    </div>
  );
};

export default FinancialOverview; 