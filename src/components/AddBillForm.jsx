import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

const AddBillForm = ({ onClose }) => {
  const { addBill } = useFinance();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    dueDate: '',
    autopay: false,
    icon: '📄'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.dueDate) return;

    addBill({
      name: formData.name,
      amount: parseFloat(formData.amount),
      dueDate: formData.dueDate,
      autopay: formData.autopay,
      icon: formData.icon
    });
    onClose();
  };

  const icons = ['📄', '🏠', '📡', '📱', '💡', '💧', '🚗', '📺', '🎵', '🏥', '🎮', '📚'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bill Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., Internet Bill"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
          Due Date
        </label>
        <input
          type="text"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., Mar 28"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="autopay"
          checked={formData.autopay}
          onChange={(e) => setFormData({ ...formData, autopay: e.target.checked })}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="autopay" className="ml-2 block text-sm text-gray-700">
          Enable Autopay
        </label>
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
          Add Bill
        </button>
      </div>
    </form>
  );
};

export default AddBillForm; 