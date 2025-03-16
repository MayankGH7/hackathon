import React from 'react';
import { Plus, CreditCard, Target, PieChart, FileText, BarChart, Clock, Settings } from 'lucide-react';

const QuickActions = ({ onAddTransaction }) => {
  const actions = [
    { icon: Plus, color: 'blue', label: 'Add', onClick: onAddTransaction },
    { icon: CreditCard, color: 'green', label: 'Transfer' },
    { icon: Target, color: 'purple', label: 'Goals' },
    { icon: PieChart, color: 'orange', label: 'Budget' },
    { icon: FileText, color: 'teal', label: 'Bills', hideOnMobile: true },
    { icon: BarChart, color: 'pink', label: 'Reports', hideOnMobile: true },
    { icon: Clock, color: 'indigo', label: 'History', hideOnMobile: true },
    { icon: Settings, color: 'gray', label: 'More', hideOnMobile: true }
  ];

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-6">
      {/* eslint-disable-next-line no-unused-vars */}
      {actions.map(({ icon: Icon, color, label, onClick, hideOnMobile }) => (
        <button 
          key={label}
          className={`flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-3 hover:bg-gray-50 ${
            hideOnMobile ? 'sm:block hidden' : ''
          }`}
          onClick={onClick}
        >
          <div className={`bg-${color}-100 p-2 rounded-full mb-1`}>
            <Icon size={16} className={`text-${color}-600`} />
          </div>
          <span className="text-xs text-gray-700">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions; 