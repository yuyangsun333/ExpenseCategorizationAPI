// src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import PaymentEntryPage from './PaymentEntryPage';
import PaymentHistoryPage from './PaymentHistoryPage';

function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <Link to="/register" style={{ marginRight: '1rem' }}>Register</Link>
        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/payment" style={{ marginRight: '1rem' }}>Enter Payment</Link>
        <Link to="/history">Payment History</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment" element={<PaymentEntryPage />} />
        <Route path="/history" element={<PaymentHistoryPage />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
