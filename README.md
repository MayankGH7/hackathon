# Money Management App

A modern, feature-rich money management application built with React and Vite. Track your expenses, manage savings goals, and monitor your financial health with an intuitive user interface.

## Project is hosted on vercel:

https://moneywise-nine.vercel.app/ 

## Features

- 💰 Real-time transaction tracking and categorization
- 📊 Financial insights and spending analysis
- 🎯 Customizable savings goals with progress tracking
- 📅 Bill management with due date reminders
- 🔍 Smart search across all transactions
- 📱 Responsive design for all devices
- 🌙 User-friendly interface with modern design

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide Icons
- Context API for state management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Project Structure

```
src/
├── components/           # React components
│   ├── MoneyManagementApp.jsx    # Main app component
│   ├── AddTransactionForm.jsx    # Transaction form
│   ├── AddGoalForm.jsx          # Savings goal form
│   ├── AddBillForm.jsx         # Bill management form
│   ├── NotificationsPanel.jsx  # Notifications component
│   └── Modal.jsx              # Reusable modal component
├── context/
│   └── FinanceContext.jsx    # Global state management
├── assets/                  # Static assets
├── App.jsx                 # Root component
└── main.jsx               # Entry point

```

## Features Breakdown

### Transaction Management
- Add, edit, and categorize transactions
- Real-time balance updates
- Transaction search and filtering

### Savings Goals
- Create custom savings goals
- Track progress with visual indicators
- Make contributions to goals

### Bill Management
- Add and track recurring bills
- Due date notifications
- Autopay settings

### Financial Insights
- Spending analysis by category
- Monthly comparison charts
- Budget tracking

### User Experience
- Responsive bottom navigation
- Quick actions menu
- Real-time search
- Modern UI with smooth transitions


## Contributing

Feel free to submit issues and enhancement requests!
