import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

const AddTransactionForm = ({ onClose }) => {
  const { addTransaction, categories } = useFinance();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: 'Food',
    type: 'expense'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = formData.type === 'expense' 
      ? -Math.abs(parseFloat(formData.amount))
      : Math.abs(parseFloat(formData.amount));

    const icon = {
      Food: '🛒',
      Transport: '⛽',
      Entertainment: '🎮',
      Shopping: '🛍',
      Income: '💰'
    }[formData.category] || '💵';

    addTransaction({
      name: formData.name,
      amount,
      category: formData.category,
      icon
    });

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter amount"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {formData.type === 'expense' ? (
            categories.map(cat => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))
          ) : (
            <option value="Income">Income</option>
          )}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm; 