import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentHistoryPage = () => {
  const [grouped, setGrouped] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchTransactions = useCallback(async (email) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/transactions/${email}`);
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      const data = await response.json();
      groupByMonth(data);
    } catch (error) {
      setMessage(error.message);
    }
  }, []);

  const groupByMonth = (data) => {
    const groups = data.reduce((acc, txn) => {
      const month = txn.date.substring(0, 7); // e.g., "2025-03"
      if (!acc[month]) acc[month] = [];
      acc[month].push(txn);
      return acc;
    }, {});
    setGrouped(groups);
  };

  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (!loggedInEmail) {
      navigate('/login');
    } else {
      fetchTransactions(loggedInEmail);
    }
  }, [navigate, fetchTransactions]);

  return (
      <div style={{ padding: '1rem' }}>
        <h2>Payment History</h2>
        {message && <p>{message}</p>}
        {Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([month, txns]) => (
                <div key={month}>
                  <h3>{month}</h3>
                  <ul>
                    {txns.map((txn, idx) => (
                        <li key={idx}>
                          <strong>Date:</strong> {txn.date} | <strong>Merchant:</strong> {txn.merchantName} |{' '}
                          <strong>Amount:</strong> {txn.amount} | <strong>Category:</strong> {txn.category} |{' '}
                          <em>{txn.description}</em>
                        </li>
                    ))}
                  </ul>
                </div>
            ))
        ) : (
            <p>No transactions found.</p>
        )}
      </div>
  );
};

export default PaymentHistoryPage;
