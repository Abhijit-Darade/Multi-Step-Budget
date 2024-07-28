import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewSave = () => {
    const [user, setUser] = useState({});
    const [incomeExpenses, setIncomeExpenses] = useState({ income: 0, expenses: [] });
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const savedIncomeExpenses = JSON.parse(localStorage.getItem('incomeExpenses'));

        if (savedUser) {
            setUser(savedUser);
        }

        if (savedIncomeExpenses) {
            setIncomeExpenses(savedIncomeExpenses);
        }
    }, []);

    const handleSave = () => {
        const budgetData = {
            user,
            incomeExpenses
        };
        localStorage.setItem('budgetData', JSON.stringify(budgetData));
        alert('Budget data saved!');
        navigate('/');
    }

    return (
        <div className="bg-black p-6 rounded shadow-md w-full max-w-md">
            <h1 className="text-xl font-bold mb-4">Review and Save</h1>
            <div className="mb-4">
                <h2 className="text-lg font-semibold">User Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Preferred Currency:</strong> {user.currency}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Income and Expenses</h2>
                <p><strong>Monthly Income:</strong> {incomeExpenses.income}</p>
                <h3 className="text-md font-semibold mt-2">Expenses:</h3>
                <ul>
                    {incomeExpenses.expenses && incomeExpenses.expenses.length > 0 ? (
                        incomeExpenses.expenses.map((expense, index) => (
                            <li key={index}>
                                <strong>{expense.name}:</strong> {expense.amount}
                            </li>
                        ))
                    ) : (
                        <p>No expenses added.</p>
                    )}
                </ul>
            </div>
            <div className="flex justify-between">
                <button onClick={() => navigate('/budget-summary')} className="bg-gray-500 text-white p-2 rounded">
                    Back
                </button>
                <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
                    Save
                </button>
            </div>
        </div>
    );
};

export default ReviewSave;
