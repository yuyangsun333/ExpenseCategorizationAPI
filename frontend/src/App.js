import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import PaymentForm from './PaymentForm';
import TransactionForm from './TransactionForm';
import ExpenseForm from './ExpenseForm';
import CompanySearch from './CompanySearch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h2>Home Page</h2>} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/payment" element={<PaymentForm />} />
      <Route path="/transaction" element={<TransactionForm />} />
      <Route path="/expense" element={<ExpenseForm />} />
      <Route path="/company" element={<CompanySearch />} />
      <Route path="*" element={<h2>404 - Not Found</h2>} />
    </Routes>
  );
}

export default App;
