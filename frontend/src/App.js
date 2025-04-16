import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import PaymentEntryPage from './PaymentEntryPage';
import PaymentHistoryPage from './PaymentHistoryPage';

const App = () => {
    return (
        <div>
            <nav>
                <a href="/register">Register</a> | <a href="/login">Login</a> |
                <a href="/payment">Enter Payment</a> | <a href="/history">Payment History</a>
            </nav>

            <Routes>
                <Route path="/" element={<h2>Welcome! Choose a page above.</h2>} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/payment" element={<PaymentEntryPage />} />
                <Route path="/history" element={<PaymentHistoryPage />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </div>
    );
};

export default App;
