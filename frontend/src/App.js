// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import RegisterPage from './RegisterPage';
// import LoginPage from './LoginPage';
// import PaymentEntryPage from './PaymentEntryPage';
// import PaymentHistoryPage from './PaymentHistoryPage';
//
// const App = () => {
//     return (
//         <div>
//             <nav>
//                 <a href="/register">Register</a> | <a href="/login">Login</a> |
//                 <a href="/payment">Enter Payment</a> | <a href="/history">Payment History</a>
//             </nav>
//
//             <Routes>
//                 <Route path="/" element={<h2>Welcome! Choose a page above.</h2>} />
//                 <Route path="/register" element={<RegisterPage />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/payment" element={<PaymentEntryPage />} />
//                 <Route path="/history" element={<PaymentHistoryPage />} />
//                 <Route path="*" element={<h2>Page Not Found</h2>} />
//             </Routes>
//         </div>
//     );
// };
//
// export default App;

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import PaymentEntryPage from './PaymentEntryPage';
import PaymentHistoryPage from './PaymentHistoryPage';

const App = () => {
    return (
        <div>
            <nav style={{
                backgroundColor: '#4CAF50',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                fontSize: '18px'
            }}>
                <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                <Link to="/payment" style={{ color: 'white', textDecoration: 'none' }}>Enter Payment</Link>
                <Link to="/history" style={{ color: 'white', textDecoration: 'none' }}>Payment History</Link>
            </nav>

            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', background: '#f9f9f9', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <Routes>
                    <Route path="/" element={<h2>Welcome! Choose a page above.</h2>} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/payment" element={<PaymentEntryPage />} />
                    <Route path="/history" element={<PaymentHistoryPage />} />
                    <Route path="*" element={<h2>Page Not Found</h2>} />
                </Routes>
            </div>
        </div>
    );
};

export default App;

