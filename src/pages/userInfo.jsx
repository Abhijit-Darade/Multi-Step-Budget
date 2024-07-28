
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const userInfo = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currency, setCurrency] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrencies = async () => {
            const apiKey = import.meta.env.REACT_APP_OPEN_EXCHANGE_API_KEY;
            console.log(apiKey);
            try {
                const response = await axios.get(`https://openexchangerates.org/api/currencies.json`);
                setCurrencies(response.data);
            } catch (error) {
                console.log('Error fetching currencies : ', error)
            }
        };
        fetchCurrencies();
    }, []);

    const handleNext = () => {
        localStorage.setItem('user', JSON.stringify({ name, email, currency }));
        navigate('/incomeExp');
    };

    return (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h1 className="text-xl font-bold mb-4">
                User Information
            </h1>
            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className='mb-4 p-2 border border-gray-300 rounded w-full' />

            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='mb-4 p-2 border border-gray-300 rounded w-full' />

            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className='mb-4 p-2 border border-gray-300 rounded w-full'>
                <option value="" disabled>Select Currency</option>
                {Object.entries(currencies).map(([code, name]) => (
                    <option key={code} value={code}>
                        {name} ({code})
                    </option>
                ))}
            </select>
            <button onClick={handleNext} className='bg-blue-500 text-white p-2 rounded w-full'>
                Next
            </button>

        </div>
    )
}

export default userInfo