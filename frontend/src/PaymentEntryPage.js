// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
//
// const PaymentEntryPage = () => {
//   const navigate = useNavigate();
//   const [merchantName, setMerchantName] = useState('');
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
//   const [description, setDescription] = useState('');
//   const [message, setMessage] = useState('');
//   const [result, setResult] = useState(null);
//
//   useEffect(() => {
//     const loggedInEmail = localStorage.getItem('loggedInEmail');
//     if (!loggedInEmail) {
//       navigate('/login');
//     }
//   }, [navigate]);
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setResult(null);
//     const email = localStorage.getItem('loggedInEmail');
//
//     if (!email) {
//       setMessage('No user is logged in. Please log in first.');
//       return;
//     }
//
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/transactions`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email,
//           merchantName,
//           amount,
//           date,
//           description
//         }),
//       });
//
//       if (!response.ok) {
//         const err = await response.text();
//         throw new Error(err);
//       }
//
//       const data = await response.json();
//       setResult(data);
//       setMessage('Payment recorded successfully.');
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };
//
//   return (
//       <div style={{ padding: '1rem' }}>
//         <h2>Enter Payment Information</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//               type="text"
//               placeholder="Company/Merchant Name"
//               value={merchantName}
//               onChange={e => setMerchantName(e.target.value)}
//               required
//           /><br/><br/>
//           <input
//               type="number"
//               placeholder="Amount"
//               value={amount}
//               onChange={e => setAmount(e.target.value)}
//               required
//               step="0.01"
//           /><br/><br/>
//           <input
//               type="datetime-local"
//               value={date}
//               onChange={e => setDate(e.target.value)}
//               required
//           /><br/><br/>
//           <textarea
//               placeholder="Description"
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//           ></textarea><br/><br/>
//           <button type="submit">Submit Payment</button>
//         </form>
//         {message && <p>{message}</p>}
//         {result && (
//             <div>
//               <h3>Recorded Payment</h3>
//               <p><strong>User Email (ID):</strong> {result.email}</p>
//               <p><strong>Merchant:</strong> {result.merchantName}</p>
//               <p><strong>Amount:</strong> {result.amount}</p>
//               <p><strong>Date:</strong> {result.date}</p>
//               <p><strong>Description:</strong> {result.description}</p>
//               <p><strong>Auto-Determined Category:</strong> {result.category}</p>
//             </div>
//         )}
//       </div>
//   );
// };
//
// export default PaymentEntryPage;

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
    const email = localStorage.getItem('loggedInEmail');

    if (!email) {
      setMessage('No user is logged in. Please log in first.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          merchantName,
          amount,
          date,
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
      <div>
        <h2 style={{ textAlign: 'center' }}>Enter Payment Information</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
              type="text"
              placeholder="Company/Merchant Name"
              value={merchantName}
              onChange={e => setMerchantName(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
              step="0.01"
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
              type="datetime-local"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <textarea
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }}
          ></textarea>
          <button style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Submit Payment
          </button>
        </form>
        {message && <p style={{ marginTop: '1rem', color: 'red', textAlign: 'center' }}>{message}</p>}
        {result && (
            <div style={{ marginTop: '2rem', backgroundColor: '#e8f5e9', padding: '1rem', borderRadius: '8px' }}>
              <h3>Recorded Payment</h3>
              <p><strong>User Email:</strong> {result.email}</p>
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
