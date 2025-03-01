import React, { useState } from 'react';

function PaymentForm({ companies }) {
    const [paymentDate, setPaymentDate] = useState('');
    const [amount, setAmount] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Normalize user input
        const inputName = companyName.trim().toLowerCase();

        // Find a match in the CSV data
        const found = companies.find(
            (company) => company.name?.trim().toLowerCase() === inputName
        );

        if (found) {
            setCategory(found.category);
        } else {
            setCategory('No match found. Please enter manually.');
        }
    };

    return (
        <div className="w-full max-w-md bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Submit Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="paymentDate">Payment Date</label>
                    <input
                        type="date"
                        id="paymentDate"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="companyName">Company Name</label>
                    <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
            {category && (
                <div className="mt-4">
                    <h3 className="text-xl">Category: {category}</h3>
                </div>
            )}
        </div>
    );
}

export default PaymentForm;
