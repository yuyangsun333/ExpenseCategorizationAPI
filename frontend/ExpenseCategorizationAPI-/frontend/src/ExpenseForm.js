// ExpenseForm.jsx
import React, { useState } from 'react';

const ExpenseForm = ({ companies }) => {
    const [date, setDate] = useState('');
    const [payment, setPayment] = useState('');
    const [company, setCompany] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Ensure all fields are filled
        if (!date || !payment || !company) {
            alert('Please fill out Date, Payment, and Company before submitting.');
            return;
        }

        // 2. Attempt to find a match in "companies" by name
        //    Assuming in final_cleaned_data.csv, the column is "name" for the company name
        //    and "category" for its category
        const trimmedCompany = company.trim().toLowerCase();
        const matched = companies.find(
            (row) =>
                row.name &&
                row.name.toLowerCase() === trimmedCompany
        );

        // 3. If found, set the category in state; otherwise notify user
        if (matched) {
            setCategory(matched.category);
        } else {
            setCategory('No match found');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <form onSubmit={handleSubmit}>
                {/* Date input */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Payment input */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Payment Amount</label>
                    <input
                        type="number"
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter payment amount"
                    />
                </div>

                {/* Company input */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Company Name</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter company name"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            {/* Display the looked-up category */}
            {category && (
                <div className="mt-4 p-2 border rounded bg-gray-50">
                    <strong>Category:</strong> {category}
                </div>
            )}
        </div>
    );
};

export default ExpenseForm;
