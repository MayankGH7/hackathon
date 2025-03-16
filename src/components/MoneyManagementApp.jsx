import React, { useState, useEffect } from 'react';
import { PieChart, LineChart, DollarSign, Calendar, User, Settings, ArrowRight, Plus, CreditCard, Wallet, ChevronDown, BellRing, TrendingUp, TrendingDown, Target, Clock, Search, ArrowUpRight, BarChart, FileText, Home } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import Modal from './Modal';
import AddTransactionForm from './AddTransactionForm';
import NotificationsPanel from './NotificationsPanel';
import AddGoalForm from './AddGoalForm';
import AddBillForm from './AddBillForm';

const MoneyManagementApp = () => {
  const {
    balance,
    income,
    expenses,
    savings,
    transactions: recentTransactions,
    bills: upcomingBills,
    categories,
    savingGoals,
    unreadNotifications,
    user,
    searchTransactions,
    updateSavingGoal
  } = useFinance();

  const [activeTab, setActiveTab] = useState('overview');
  const [activeBottomTab, setActiveBottomTab] = useState('home');
  const [selectedCard, setSelectedCard] = useState('primary');
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [isAddBillModalOpen, setIsAddBillModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(recentTransactions);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchTransactions(searchQuery);
      setFilteredTransactions(results);
    } else {
      setFilteredTransactions(recentTransactions);
    }
  }, [searchQuery, recentTransactions, searchTransactions]);

  const cards = [
    { id: 'primary', type: 'Visa', number: '**** 4582', color: 'bg-gradient-to-r from-indigo-500 to-purple-600', balance: balance },
    { id: 'secondary', type: 'Mastercard', number: '**** 3214', color: 'bg-gradient-to-r from-blue-500 to-teal-400', balance: 1876.50 }
  ];
  
  const handleAddTransaction = () => {
    setIsAddTransactionModalOpen(true);
  };

  const handleNotificationsClick = () => {
    setIsNotificationsPanelOpen(true);
  };

  // Handle tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Financial Overview */}
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
            
            {/* Quick Actions */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-6">
              <button 
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-3 hover:bg-gray-50"
                onClick={handleAddTransaction}
              >
                <div className="bg-blue-100 p-2 rounded-full mb-1">
                  <Plus size={16} className="text-blue-600" />
                </div>
                <span className="text-xs text-gray-700">Add</span>
              </button>
              
              <button className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-3 hover:bg-gray-50">
                <div className="bg-green-100 p-2 rounded-full mb-1">
                  <CreditCard size={16} className="text-green-600" />
                </div>
                <span className="text-xs text-gray-700">Transfer</span>
              </button>
              
              <button className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-3 hover:bg-gray-50">
                <div className="bg-purple-100 p-2 rounded-full mb-1">
                  <Target size={16} className="text-purple-600" />
                </div>
                <span className="text-xs text-gray-700">Goals</span>
              </button>
              
              <button className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-3 hover:bg-gray-50">
                <div className="bg-orange-100 p-2 rounded-full mb-1">
                  <PieChart size={16} className="text-orange-600" />
                </div>
                <span className="text-xs text-gray-700">Budget</span>
              </button>
              
              <button className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-3 hover:bg-gray-50 sm:block hidden">
                <div className="bg-teal-100 p-2 rounded-full mb-1">
                  <FileText size={16} className="text-teal-600" />
                </div>
                <span className="text-xs text-gray-700">Bills</span>
              </button>
              
              <button className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-3 hover:bg-gray-50 sm:block hidden">
                <div className="bg-pink-100 p-2 rounded-full mb-1">
                  <BarChart size={16} className="text-pink-600" />
                </div>
                <span className="text-xs text-gray-700">Reports</span>
              </button>
              
              <button className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-3 hover:bg-gray-50 sm:block hidden">
                <div className="bg-indigo-100 p-2 rounded-full mb-1">
                  <Clock size={16} className="text-indigo-600" />
                </div>
                <span className="text-xs text-gray-700">History</span>
              </button>
              
              <button className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-3 hover:bg-gray-50 sm:block hidden">
                <div className="bg-gray-100 p-2 rounded-full mb-1">
                  <Settings size={16} className="text-gray-600" />
                </div>
                <span className="text-xs text-gray-700">More</span>
              </button>
            </div>
            
            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base md:text-lg font-semibold text-gray-800">
                  {searchQuery ? 'Search Results' : 'Recent Transactions'}
                </h2>
                <button className="text-indigo-600 text-xs md:text-sm flex items-center">
                  View All <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {filteredTransactions.map(transaction => (
                  <div key={transaction.id} className="flex justify-between items-center p-2 sm:p-3 hover:bg-gray-50 rounded-lg border border-gray-50">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center mr-2 sm:mr-3 text-lg sm:text-xl">
                        {transaction.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm md:text-base text-gray-800">{transaction.name}</div>
                        <div className="text-xs text-gray-500">{transaction.date} • {transaction.category}</div>
                      </div>
                    </div>
                    <div className={`font-semibold text-sm md:text-base flex items-center ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? 
                        <>+{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} <ArrowUpRight size={14} className="ml-1" /></> : 
                        transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                      }
                    </div>
                  </div>
                ))}
                {filteredTransactions.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    No transactions found
                  </div>
                )}
              </div>
            </div>
            
            {/* Upcoming Bills */}
            <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base md:text-lg font-semibold text-gray-800">Upcoming Bills</h2>
                <button 
                  className="text-indigo-600 text-xs md:text-sm flex items-center"
                  onClick={handleAddBillClick}
                >
                  Add Bill <Plus size={14} className="ml-1" />
                </button>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {upcomingBills.map(bill => (
                  <div key={bill.id} className="flex justify-between items-center p-2 sm:p-3 hover:bg-gray-50 rounded-lg border border-gray-50">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center mr-2 sm:mr-3 text-lg sm:text-xl">
                        {bill.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm md:text-base text-gray-800">{bill.name}</div>
                        <div className="text-xs text-gray-500">Due {bill.dueDate} {bill.autopay && <span className="text-green-600">• Autopay On</span>}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-sm md:text-base text-gray-800">
                      ${bill.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'insights':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Spending Analysis</h2>
              <div className="space-y-4">
                {categories.map(category => {
                  const percentage = Math.round((category.spent / category.budget) * 100);
                  return (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{category.name}</span>
                        <span className={percentage > 80 ? 'text-red-500' : 'text-green-500'}>
                          {percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Monthly Comparison</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">This Month</p>
                    <p className="text-lg font-semibold">${expenses.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Last Month</p>
                    <p className="text-lg font-semibold">${(expenses * 0.95).toLocaleString()}</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 rounded-full bg-indigo-500 w-[105%]" />
                </div>
                <p className="text-sm text-red-500">5% increase from last month</p>
              </div>
            </div>
          </div>
        );
      case 'budgets':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Budget Overview</h2>
                <button className="text-indigo-600 text-sm flex items-center">
                  Set Budgets <Plus size={14} className="ml-1" />
                </button>
              </div>
              {categories.map(category => (
                <div key={category.name} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-gray-500">
                        ${category.spent} of ${category.budget}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ${(category.budget - category.spent).toLocaleString()} left
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.round((category.spent / category.budget) * 100)}% used
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${(category.spent / category.budget) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'goals':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Saving Goals</h2>
                <button 
                  className="text-indigo-600 text-sm flex items-center"
                  onClick={handleAddGoalClick}
                >
                  Add Goal <Plus size={14} className="ml-1" />
                </button>
              </div>
              <div className="space-y-6">
                {savingGoals.map(goal => (
                  <div key={goal.id} className="p-4 border border-gray-100 rounded-lg hover:border-indigo-100 transition-colors duration-200">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{goal.icon}</span>
                        <div>
                          <div className="font-medium">{goal.name}</div>
                          <div className="text-sm text-gray-500">
                            Target: ${goal.target.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleContributeToGoal(goal.id)}
                        className="px-3 py-1 text-sm text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50"
                      >
                        Contribute
                      </button>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 rounded-full bg-indigo-500"
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-gray-500">
                        ${goal.current.toLocaleString()} saved
                      </div>
                      <div className="text-sm text-gray-500">
                        ${(goal.target - goal.current).toLocaleString()} to go
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Handle goal contribution
  const handleContributeToGoal = (goalId) => {
    const amount = prompt('Enter contribution amount:');
    if (amount && !isNaN(amount)) {
      updateSavingGoal(goalId, parseFloat(amount));
    }
  };

  // Replace handleAddGoal and handleAddBill with proper modal handling
  const handleAddGoalClick = () => {
    setIsAddGoalModalOpen(true);
  };

  const handleAddBillClick = () => {
    setIsAddBillModalOpen(true);
  };

  // Handle bottom tab navigation
  const handleBottomTabClick = (tab) => {
    setActiveBottomTab(tab);
    switch (tab) {
      case 'home':
        setActiveTab('overview');
        break;
      case 'stats':
        setActiveTab('insights');
        break;
      case 'add':
        setIsAddTransactionModalOpen(true);
        break;
      case 'goals':
        setActiveTab('goals');
        break;
      case 'profile':
        setActiveTab('overview');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with search and notifications */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <DollarSign size={18} />
            </div>
            <h1 className="text-xl font-bold">MoneyWise</h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 relative"
              onClick={handleNotificationsClick}
            >
              <BellRing size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs">
                  {unreadNotifications}
                </span>
              )}
            </button>
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-60 rounded-full py-1 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 w-40 sm:w-auto"
              />
              <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-60" />
            </div>
            <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30">
              {user.avatar}
            </button>
          </div>
        </div>
        <div className="mt-4 sm:hidden relative">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-60 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-60" />
        </div>
      </header>
      
      {/* Financial summary tabs */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 pb-4">
          <div className="flex space-x-6 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              className={`pb-2 px-1 ${activeTab === 'overview' ? 'border-b-2 border-white font-medium' : 'text-white text-opacity-70'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`pb-2 px-1 ${activeTab === 'insights' ? 'border-b-2 border-white font-medium' : 'text-white text-opacity-70'}`}
              onClick={() => setActiveTab('insights')}
            >
              Insights
            </button>
            <button 
              className={`pb-2 px-1 ${activeTab === 'budgets' ? 'border-b-2 border-white font-medium' : 'text-white text-opacity-70'}`}
              onClick={() => setActiveTab('budgets')}
            >
              Budgets
            </button>
            <button 
              className={`pb-2 px-1 ${activeTab === 'goals' ? 'border-b-2 border-white font-medium' : 'text-white text-opacity-70'}`}
              onClick={() => setActiveTab('goals')}
            >
              Goals
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated Card Slider */}
      <div className="px-4 -mt-6 mb-6 z-10 max-w-6xl mx-auto w-full">
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
          {cards.map(card => (
            <div 
              key={card.id}
              className={`${card.color} rounded-xl shadow-lg p-4 min-w-[280px] sm:min-w-[16rem] transform transition duration-300 ${selectedCard === card.id ? 'scale-100' : 'scale-95 opacity-80'}`}
              onClick={() => setSelectedCard(card.id)}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-xs text-white text-opacity-80">Available Balance</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div className="bg-white bg-opacity-20 p-1 rounded">
                  {card.type === 'Visa' ? 
                    <div className="text-white font-bold italic">VISA</div> : 
                    <div className="text-white font-bold">MC</div>
                  }
                </div>
              </div>
              <div className="text-white text-opacity-90 text-sm">{card.number}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow px-4 pb-20 max-w-6xl mx-auto w-full">
        {renderTabContent()}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => handleBottomTabClick('home')}
              className={`flex flex-col items-center space-y-1 ${
                activeBottomTab === 'home' ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </button>
            
            <button
              onClick={() => handleBottomTabClick('stats')}
              className={`flex flex-col items-center space-y-1 ${
                activeBottomTab === 'stats' ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <BarChart size={24} />
              <span className="text-xs">Stats</span>
            </button>
            
            <button
              onClick={() => handleBottomTabClick('add')}
              className="flex flex-col items-center space-y-1 relative -top-4"
            >
              <div className="bg-indigo-600 text-white p-4 rounded-full shadow-lg">
                <Plus size={24} />
              </div>
            </button>
            
            <button
              onClick={() => handleBottomTabClick('goals')}
              className={`flex flex-col items-center space-y-1 ${
                activeBottomTab === 'goals' ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <Target size={24} />
              <span className="text-xs">Goals</span>
            </button>
            
            <button
              onClick={() => handleBottomTabClick('profile')}
              className={`flex flex-col items-center space-y-1 ${
                activeBottomTab === 'profile' ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <User size={24} />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Add Transaction Modal */}
      <Modal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
        title="Add Transaction"
      >
        <AddTransactionForm onClose={() => setIsAddTransactionModalOpen(false)} />
      </Modal>

      {/* Notifications Panel Modal */}
      <Modal
        isOpen={isNotificationsPanelOpen}
        onClose={() => setIsNotificationsPanelOpen(false)}
        title="Notifications"
      >
        <NotificationsPanel onClose={() => setIsNotificationsPanelOpen(false)} />
      </Modal>

      {/* Add Goal Modal */}
      <Modal
        isOpen={isAddGoalModalOpen}
        onClose={() => setIsAddGoalModalOpen(false)}
        title="Add New Saving Goal"
      >
        <AddGoalForm onClose={() => setIsAddGoalModalOpen(false)} />
      </Modal>

      {/* Add Bill Modal */}
      <Modal
        isOpen={isAddBillModalOpen}
        onClose={() => setIsAddBillModalOpen(false)}
        title="Add New Bill"
      >
        <AddBillForm onClose={() => setIsAddBillModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default MoneyManagementApp; 