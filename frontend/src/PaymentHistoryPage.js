// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
//
// const PaymentHistoryPage = () => {
//   const [grouped, setGrouped] = useState({});
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//
//   const fetchTransactions = useCallback(async (email) => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/transactions/${email}`);
//       if (!response.ok) {
//         const err = await response.text();
//         throw new Error(err);
//       }
//       const data = await response.json();
//       groupByMonth(data);
//     } catch (error) {
//       setMessage(error.message);
//     }
//   }, []);
//
//   const groupByMonth = (data) => {
//     const groups = data.reduce((acc, txn) => {
//       const month = txn.date.substring(0, 7); // e.g., "2025-03"
//       if (!acc[month]) acc[month] = [];
//       acc[month].push(txn);
//       return acc;
//     }, {});
//     setGrouped(groups);
//   };
//
//   useEffect(() => {
//     const loggedInEmail = localStorage.getItem('loggedInEmail');
//     if (!loggedInEmail) {
//       navigate('/login');
//     } else {
//       fetchTransactions(loggedInEmail);
//     }
//   }, [navigate, fetchTransactions]);
//
//   return (
//       <div style={{ padding: '1rem' }}>
//         <h2>Payment History</h2>
//         {message && <p>{message}</p>}
//         {Object.keys(grouped).length > 0 ? (
//             Object.entries(grouped).map(([month, txns]) => (
//                 <div key={month}>
//                   <h3>{month}</h3>
//                   <ul>
//                     {txns.map((txn, idx) => (
//                         <li key={idx}>
//                           <strong>Date:</strong> {txn.date} | <strong>Merchant:</strong> {txn.merchantName} |{' '}
//                           <strong>Amount:</strong> {txn.amount} | <strong>Category:</strong> {txn.category} |{' '}
//                           <em>{txn.description}</em>
//                         </li>
//                     ))}
//                   </ul>
//                 </div>
//             ))
//         ) : (
//             <p>No transactions found.</p>
//         )}
//       </div>
//   );
// };
//
// export default PaymentHistoryPage;

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
      const month = txn.date.substring(0, 7); // "2025-03"
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
      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Payment History</h2>

        {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}

        {Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([month, txns]) => (
                <div key={month} style={{ marginBottom: '2rem' }}>
                  <h3 style={{ backgroundColor: '#4CAF50', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                    {month}
                  </h3>
                  <div style={{
                    marginTop: '1rem',
                    backgroundColor: '#f9f9f9',
                    padding: '1rem',
                    borderRadius: '8px',
                    boxShadow: '0 0 8px rgba(0,0,0,0.1)'
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                      <tr style={{ backgroundColor: '#e0f7e9' }}>
                        <th style={headerCell}>Date</th>
                        <th style={headerCell}>Merchant</th>
                        <th style={headerCell}>Amount</th>
                        <th style={headerCell}>Category</th>
                        <th style={headerCell}>Description</th>
                      </tr>
                      </thead>
                      <tbody>
                      {txns.map((txn, idx) => (
                          <tr key={idx} style={{ textAlign: 'center' }}>
                            <td style={bodyCell}>{txn.date}</td>
                            <td style={bodyCell}>{txn.merchantName}</td>
                            <td style={bodyCell}>${txn.amount.toFixed(2)}</td>
                            <td style={bodyCell}>{txn.category}</td>
                            <td style={bodyCell}>{txn.description || '-'}</td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            ))
        ) : (
            <p style={{ textAlign: 'center', fontSize: '18px', marginTop: '2rem' }}>No transactions found.</p>
        )}
      </div>
  );
};

const headerCell = {
  padding: '10px',
  borderBottom: '2px solid #ccc',
  fontWeight: 'bold'
};

const bodyCell = {
  padding: '10px',
  borderBottom: '1px solid #eee'
};

export default PaymentHistoryPage;
