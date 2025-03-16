import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

const AddGoalForm = ({ onClose }) => {
  const { addSavingGoal } = useFinance();
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    icon: '🎯'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.target) return;

    addSavingGoal({
      name: formData.name,
      target: parseFloat(formData.target),
      icon: formData.icon
    });
    onClose();
  };

  const icons = ['🎯', '💰', '🏠', '🚗', '✈️', '💻', '📱', '🎮', '👕', '💍', '🏦', '📚'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Goal Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., Vacation Fund"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            value={formData.target}
            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Choose Icon
        </label>
        <div className="grid grid-cols-6 gap-2">
          {icons.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => setFormData({ ...formData, icon })}
              className={`p-2 text-xl rounded-lg ${
                formData.icon === icon
                  ? 'bg-indigo-100 border-2 border-indigo-500'
                  : 'border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Goal
        </button>
      </div>
    </form>
  );
};

export default AddGoalForm; 