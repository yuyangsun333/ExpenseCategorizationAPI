// CompanySearch.jsx
import React, { useState } from 'react';

const CompanySearch = ({ companies, value, onChange, onSelect }) => {
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        onChange(inputValue);

        if (inputValue.length > 0) {
            const filtered = companies.filter(
                (item) =>
                    item &&
                    item.company &&
                    item.company.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const checkExactMatch = () => {
        const trimmedValue = value.trim().toLowerCase();
        const exactMatch = companies.find(
            (item) =>
                item.company &&
                item.company.trim().toLowerCase() === trimmedValue
        );
        if (exactMatch) {
            onSelect(exactMatch);
            setSuggestions([]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            checkExactMatch();
        }
    };

    const handleSuggestionClick = (item) => {
        onSelect(item);
        setSuggestions([]);
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                onBlur={checkExactMatch}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border rounded"
                placeholder="Enter company name"
                autoComplete="off"
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-40 overflow-auto">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(item)}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {item.company}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CompanySearch;
