import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BudgetSummary = () => {
    const [user, setUser] = useState({});
    const [incomeExpenses, setIncomeExpenses] = useState({ income: 0, expenses: [] });
    const [exchangeRate, setExchangeRate] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            const savedIncomeExpenses = JSON.parse(localStorage.getItem('incomeExpenses'));

            if (savedUser) {
                setUser(savedUser);
            }

            if (savedIncomeExpenses) {
                setIncomeExpenses(savedIncomeExpenses);
            }
            if (savedUser && savedUser.currency) {
                try {
                    const apiKey = import.meta.env.VITE_OPEN_EXCHANGE_API_KEY;
                    console.log(apiKey)
                    if (!apiKey) {
                        throw new Error('API key is not set');
                    }
                    const { data } = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`);
                    if (data.rates[savedUser.currency]) {
                        setExchangeRate(data.rates[savedUser.currency]);
                    } else {
                        throw new Error(`Exchange rate for ${savedUser.currency} not found`);
                    }
                } catch (error) {
                    console.error('Error fetching exchange rate:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    const totalExpenses = incomeExpenses.expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
    console.log(totalExpenses)
    const remainingBudget = parseFloat(incomeExpenses.income) - totalExpenses;
    console.log(remainingBudget)

    return (
        <div className="bg-black p-6 rounded shadow-md w-full max-w-md">
            <h1 className="text-xl font-bold mb-4">Budget Summary</h1>
            <p className="mb-2"><strong>Total Income:</strong> {(incomeExpenses.income * exchangeRate).toFixed(2)} {user.currency}</p>
            <p className="mb-2"><strong>Total Expenses:</strong> {(totalExpenses * exchangeRate).toFixed(2)} {user.currency}</p>
            <p className="mb-4"><strong>Remaining Budget:</strong> {(remainingBudget * exchangeRate).toFixed(2)} {user.currency}</p>
            <div className="flex justify-between">
                <button onClick={() => navigate('/incomeExp')} className="bg-gray-500 text-white p-2 rounded">
                    Back
                </button>
                <button onClick={() => navigate('/review-save')} className="bg-blue-500 text-white p-2 rounded">
                    Next
                </button>
            </div>
        </div>
    );
};

export default BudgetSummary;
