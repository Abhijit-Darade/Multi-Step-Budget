import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const incomeExp = () => {
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState([{ name: '', amount: ''}]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = localStorage.getItem('icomeExpenses');
        if(savedData){
            const {income, expenses} = JSON.parse(savedData);
            setIncome(income);
            setExpenses(expenses);
        }
    }, []);

    const handleAddExp = () => {
        setExpenses([...expenses, { name: '', amount: ''}]);
    }

    const handleRemoveExp = (index) => {
        const newExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(newExpenses);
    }

    const handleExpenseChange = (index, field, value) => {
        const newExpenses = expenses.map((expense, i) => 
            i === index ? {...expense, [field]: value} : expense
        );
        setExpenses(newExpenses);
    }

    const handleNext = () => {
        localStorage.setItem('incomeExpenses', JSON.stringify({income, expenses}));
        navigate('/budget-summary');
    }
  return (
    <div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
        <h1 className='text-xl font-bold mb-4'>Income and Expenses</h1>
        <input type="number" placeholder='Monthly Income' value={income} onChange={(e) => setIncome(e.target.value)} className='mb-4 p-2 border border-gray-300 rounded w-full' />
        {expenses.map((expense, index) => (
            <div key={index} className='mb-4 flex items-center'>
                <input type="text" placeholder='Expense Name' value={expense.name} onChange={(e) => handleExpenseChange(index, 'name', e.target.value)} className='p-2 border border-gray-300 rounded w-full' />
                <input type="number" placeholder='Amount' value={expense.amount} onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)} className='p-2 border border-gray-300 rounded w-full' />
                <button onClick={() => handleRemoveExp(index)} className='bg-red-500  text-white p-2 rounded'>Remove</button>
            </div>
        ))}
          <button onClick={handleAddExp} className="bg-green-500 text-white p-2 rounded w-full mb-4">
              Add Expense
          </button>
          <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded w-full">
              Next
          </button>
    </div>
  )
}

export default incomeExp