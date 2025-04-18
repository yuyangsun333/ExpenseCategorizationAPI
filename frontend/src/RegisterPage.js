// import React, { useState } from 'react';
//
// const RegisterPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       if (!response.ok) {
//         const err = await response.text();
//         throw new Error(err);
//       }
//       await response.json(); // Assume user info is returned
//       setMessage('Registration successful! Please log in.');
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };
//
//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//         /><br/><br/>
//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//         /><br/><br/>
//         <button type="submit">Register</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };
//
// export default RegisterPage;
import React, { useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      await response.json();
      setMessage('Registration successful! Please log in.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Register
          </button>
        </form>
        {message && <p style={{ marginTop: '1rem', color: 'red', textAlign: 'center' }}>{message}</p>}
      </div>
  );
};

export default RegisterPage;
