// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
//
// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       if (!response.ok) {
//         const err = await response.text();
//         throw new Error(err);
//       }
//       await response.json();
//       // Store the email in localStorage as the user identifier
//       localStorage.setItem('loggedInEmail', email);
//       setMessage('Login successful!');
//       navigate('/payment');
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };
//
//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
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
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };
//
// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      await response.json();
      localStorage.setItem('loggedInEmail', email);
      setMessage('Login successful!');
      navigate('/payment');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
            Login
          </button>
        </form>
        {message && <p style={{ marginTop: '1rem', color: 'red', textAlign: 'center' }}>{message}</p>}
      </div>
  );
};

export default LoginPage;
