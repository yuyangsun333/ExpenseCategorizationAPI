import React, { useState } from 'react';

function PaymentForm() {
    const [amount, setAmount]           = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage]         = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();
        setMessage('');

        // Retrieve JWT token from localStorage
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setMessage('You must be logged in to submit payments.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // attach JWT
                },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    description: description,
                    // Add any other fields you need
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Payment submission failed');
            }

            const data = await response.json();
            setMessage(`Payment submitted! ID: ${data.id}`);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Submit Payment</h2>
            <form onSubmit={handlePayment}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Payment</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default PaymentForm;
