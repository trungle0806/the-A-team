// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrganizations: 0,
        totalUsers: 0,
        totalDonations: 0,
        recentTransactions: [],
    });

    const [error, setError] = useState(null);

    return (
        <div className="admin-dashboard">
            <h1>Dashboard</h1>

            {error && <div className="error">Error: {error}</div>}

            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Organizations</h3>
                    <p>{stats.totalOrganizations}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Donations</h3>
                    <p>${stats.totalDonations.toLocaleString()}</p>
                </div>
            </div>

            <div className="recent-transactions">
                <h2>Recent Transactions</h2>
                {stats.recentTransactions.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentTransactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.user}</td>
                                    <td>${transaction.amount.toLocaleString()}</td>
                                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No recent transactions</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
