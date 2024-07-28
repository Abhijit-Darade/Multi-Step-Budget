import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfo from './pages/userInfo';
import IncomeExpenses from './pages/incomeExp';
import BudgetSummary from './pages/budgetSummary';
import ReviewSave from './pages/reviewSave';

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-100 flex flex-col items-center p-4'>
        <Routes>
          <Route path='/' element={<UserInfo/>}/>
          <Route path='/incomeExp' element={<IncomeExpenses/>}/>
          <Route path='/budget-summary' element={<BudgetSummary/>}/>
          <Route path='/review-save' element={<ReviewSave/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App