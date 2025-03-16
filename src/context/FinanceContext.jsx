import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider = ({ children }) => {
  // User Profile
  const [user, setUser] = useState({
    name: 'Lakshita',
    email: 'john@example.com',
    avatar: '👤',
    preferences: {
      currency: 'USD',
      theme: 'light',
      notifications: true
    }
  });

  // Financial Data
  const [balance, setBalance] = useState(5234.89);
  const [income, setIncome] = useState(8500);
  const [expenses, setExpenses] = useState(3265.11);
  const [savings, setSavings] = useState(12750);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'bill', message: 'Rent payment due in 3 days', read: false },
    { id: 2, type: 'budget', message: 'Food budget at 80% limit', read: false },
    { id: 3, type: 'transaction', message: 'Large transaction detected: $500', read: false }
  ]);

  // Transactions
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: 'Grocery Shopping',
      amount: -156.32,
      date: 'Today',
      category: 'Food & Groceries',
      icon: '🛒'
    },
    {
      id: 2,
      name: 'Salary Deposit',
      amount: 4250.00,
      date: 'Yesterday',
      category: 'Income',
      icon: '💰'
    },
    {
      id: 3,
      name: 'Netflix Subscription',
      amount: -15.99,
      date: 'Mar 15',
      category: 'Entertainment',
      icon: '🎬'
    }
  ]);

  // Bills
  const [bills, setBills] = useState([
    {
      id: 1,
      name: 'Rent',
      amount: 1200,
      dueDate: 'Mar 28',
      autopay: true,
      icon: '🏠'
    },
    {
      id: 2,
      name: 'Internet',
      amount: 79.99,
      dueDate: 'Mar 30',
      autopay: true,
      icon: '📡'
    },
    {
      id: 3,
      name: 'Phone Bill',
      amount: 45.00,
      dueDate: 'Apr 2',
      autopay: false,
      icon: '📱'
    }
  ]);

  // Budget Categories
  const [categories, setCategories] = useState([
    {
      name: 'Food & Groceries',
      spent: 450,
      budget: 600,
      color: 'bg-blue-500'
    },
    {
      name: 'Entertainment',
      spent: 180,
      budget: 200,
      color: 'bg-purple-500'
    },
    {
      name: 'Transportation',
      spent: 240,
      budget: 300,
      color: 'bg-green-500'
    },
    {
      name: 'Shopping',
      spent: 380,
      budget: 400,
      color: 'bg-yellow-500'
    }
  ]);

  // Saving Goals
  const [savingGoals, setSavingGoals] = useState([
    {
      id: 1,
      name: 'Vacation Fund',
      target: 5000,
      current: 2500,
      icon: '✈️'
    },
    {
      id: 2,
      name: 'Emergency Fund',
      target: 10000,
      current: 7500,
      icon: '🏦'
    },
    {
      id: 3,
      name: 'New Car',
      target: 25000,
      current: 15000,
      icon: '🚗'
    }
  ]);

  // Add Transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      id: transactions.length + 1,
      date: 'Today',
      ...transaction
    };
    setTransactions([newTransaction, ...transactions]);
    
    // Update balance
    setBalance(prev => prev + transaction.amount);
    
    // Update income or expenses
    if (transaction.amount > 0) {
      setIncome(prev => prev + transaction.amount);
    } else {
      setExpenses(prev => prev - transaction.amount);
    }

    // Update category spending
    if (transaction.amount < 0) {
      setCategories(prev => prev.map(cat => 
        cat.name === transaction.category
          ? { ...cat, spent: cat.spent - transaction.amount }
          : cat
      ));
    }
  };

  // Add Saving Goal
  const addSavingGoal = (goal) => {
    const newGoal = {
      id: savingGoals.length + 1,
      current: 0,
      ...goal
    };
    setSavingGoals([...savingGoals, newGoal]);
  };

  // Update Saving Goal
  const updateSavingGoal = (goalId, amount) => {
    setSavingGoals(goals => goals.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.min(goal.current + amount, goal.target);
        return { ...goal, current: newCurrent };
      }
      return goal;
    }));
    
    // Update savings balance
    setSavings(prev => prev + amount);
    setBalance(prev => prev - amount);
  };

  // Add Bill
  const addBill = (bill) => {
    const newBill = {
      id: bills.length + 1,
      ...bill
    };
    setBills([...bills, newBill]);
  };

  // Mark Notification as Read
  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Update User Preferences
  const updateUserPreferences = (preferences) => {
    setUser(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...preferences }
    }));
  };

  // Calculate total unread notifications
  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Search Transactions
  const searchTransactions = (query) => {
    if (!query) return transactions;
    query = query.toLowerCase();
    return transactions.filter(transaction => 
      transaction.name.toLowerCase().includes(query) ||
      transaction.category.toLowerCase().includes(query) ||
      transaction.amount.toString().includes(query)
    );
  };

  useEffect(() => {
    // Here you would typically fetch initial data from an API
    // For now, we're using the static data initialized above
  }, []);

  const value = {
    user,
    setUser,
    balance,
    income,
    expenses,
    savings,
    notifications,
    unreadNotifications,
    transactions,
    bills,
    categories,
    savingGoals,
    addTransaction,
    addSavingGoal,
    updateSavingGoal,
    addBill,
    markNotificationAsRead,
    updateUserPreferences,
    searchTransactions
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}; 