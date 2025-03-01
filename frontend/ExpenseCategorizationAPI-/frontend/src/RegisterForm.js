import React, { useState } from 'react';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail]     = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage]   = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear any previous messages

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                // e.g. 400 or 500 error from backend
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            setMessage(`User registered successfully! Welcome, ${data.username}.`);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
                // convert to json
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RegisterForm;
