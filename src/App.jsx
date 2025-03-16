import MoneyManagementApp from './components/MoneyManagementApp'
import { FinanceProvider } from './context/FinanceContext'

function App() {
  return (
    <FinanceProvider>
      <MoneyManagementApp />
    </FinanceProvider>
  )
}

export default App
