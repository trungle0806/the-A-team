import React, { useState } from 'react';
import './Order.css';

function Order() {
  const [orders, setOrders] = useState([
    { id: 101, customer: 'John Doe', date: '2024-11-18', total: '$250', status: 'Pending' },
    { id: 102, customer: 'Jane Smith', date: '2024-11-17', total: '$450', status: 'Completed' },
    { id: 103, customer: 'Alice Johnson', date: '2024-11-16', total: '$300', status: 'Canceled' },
  ]);

  return (
    <div className="order-container">
      <header className="order-header">
        <h1>Order Management</h1>
        <p>Track and manage customer orders.</p>
      </header>

      <section className="order-list">
        <h3>Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Order;
