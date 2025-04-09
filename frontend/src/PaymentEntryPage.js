import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentEntryPage = () => {
  const navigate = useNavigate();
  const [merchantName, setMerchantName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  // Ensure the user is logged in by checking localStorage
  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (!loggedInEmail) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setResult(null);
    const loggedInEmail = localStorage.getItem('loggedInEmail');

    if (!loggedInEmail) {
      setMessage('No user is logged in. Please log in first.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Using the loggedIn email as the user identifier.
          userId: loggedInEmail,
          merchantName,
          amount,
          date,  // Should be in ISO-8601 format, e.g. "2025-03-28T14:00:00"
          description
        }),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      const data = await response.json();
      setResult(data);
      setMessage('Payment recorded successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Enter Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company/Merchant Name"
          value={merchantName}
          onChange={e => setMerchantName(e.target.value)}
          required
        /><br/><br/>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          step="0.01"
        /><br/><br/>
        <input
          type="datetime-local"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        /><br/><br/>
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea><br/><br/>
        <button type="submit">Submit Payment</button>
      </form>
      {message && <p>{message}</p>}
      {result && (
        <div>
          <h3>Recorded Payment</h3>
          <p><strong>User Email (ID):</strong> {result.userId}</p>
          <p><strong>Merchant:</strong> {result.merchantName}</p>
          <p><strong>Amount:</strong> {result.amount}</p>
          <p><strong>Date:</strong> {result.date}</p>
          <p><strong>Description:</strong> {result.description}</p>
          <p><strong>Auto-Determined Category:</strong> {result.category}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentEntryPage;
