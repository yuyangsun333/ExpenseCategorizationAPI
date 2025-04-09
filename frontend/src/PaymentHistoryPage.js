import React, { useEffect, useState } from 'react';

const PaymentHistoryPage = () => {
  const [userId, setUserId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [message, setMessage] = useState('');

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/transactions/${userId}`);
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      const data = await response.json();
      setTransactions(data);
      groupByMonth(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const groupByMonth = (data) => {
    // Group by month, assuming date is in ISO format "YYYY-MM-DDTHH:MM:SS"
    const groups = data.reduce((acc, txn) => {
      const month = txn.date.substring(0, 7); // "YYYY-MM"
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(txn);
      return acc;
    }, {});
    setGrouped(groups);
  };

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Payment History</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={fetchTransactions}>Fetch History</button>
      </div>
      {message && <p>{message}</p>}
      {Object.keys(grouped).length > 0 ? (
        Object.entries(grouped).map(([month, txns]) => (
          <div key={month}>
            <h3>{month}</h3>
            <ul>
              {txns.map((txn) => (
                <li key={txn.id}>
                  {txn.date} - {txn.merchantName} - {txn.amount} - {txn.category} - {txn.description}
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
