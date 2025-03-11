import React, { useEffect, useState } from 'react';
import api from './api';

function Dashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/protected/data')
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError('Failed to fetch protected data.');
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {error && <p>{error}</p>}
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading data...</p>}
        </div>
    );
}

export default Dashboard;
