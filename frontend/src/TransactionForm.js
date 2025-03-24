import React, { useState } from 'react';

function TransactionForm() {
  const [userId, setUserId]       = useState('');
  const [category, setCategory]   = useState('');
  const [amount, setAmount]       = useState('');
  const [date, setDate]           = useState('');
  const [description, setDesc]    = useState('');
  const [message, setMessage]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, category, amount, date, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      const data = await response.json();
      setMessage(`Transaction created with ID: ${data.id}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID: </label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category: </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount: </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            step="0.01"
            required
          />
        </div>
        <div>
          <label>Date: </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="datetime-local"
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button type="submit">Create Transaction</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TransactionForm;
