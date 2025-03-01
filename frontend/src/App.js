import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Papa from 'papaparse';

import ExpenseForm from './ExpenseForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import PaymentForm from './PaymentForm';

function App() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch('/final_cleaned_data.csv')
            .then((response) => response.text())
            .then((csvText) => {
                const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
                setCompanies(parsed.data);
            })
            .catch((error) => console.error('Error loading CSV:', error));
    }, []);

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
                <nav className="bg-blue-500 text-white p-4 w-full flex justify-between">
                    <div>
                        <Link className="px-4" to="/">Home</Link>
                        <Link className="px-4" to="/register">Register</Link>
                        <Link className="px-4" to="/login">Login</Link>
                        <Link className="px-4" to="/payment">Payment</Link>
                    </div>
                </nav>

                <div className="flex-grow flex items-center justify-center p-4">
                    <Routes>
                        <Route path="/" element={<ExpenseForm companies={companies} />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/payment" element={<PaymentForm companies={companies} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
