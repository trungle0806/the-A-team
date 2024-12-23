import React, { useState, useEffect } from 'react';
import {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
} from '../ServiceAdmin/CustomerService'; // Adjust the path if necessary
import './Customer.css';

const CustomerManagement = () => {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });
    const [editingCustomer, setEditingCustomer] = useState(null);

    const fetchCustomers = async () => {
        try {
            const data = searchQuery
                ? await searchCustomers(searchQuery)
                : await getAllCustomers();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error.message);
        }
    };

    const handleAddCustomer = async () => {
        try {
            await addCustomer(newCustomer);
            setNewCustomer({ name: '', email: '', phone: '' });
            fetchCustomers();
        } catch (error) {
            console.error('Error adding customer:', error.message);
        }
    };

    const handleUpdateCustomer = async () => {
        try {
            if (!editingCustomer) return;
            await updateCustomer(editingCustomer.customerId, editingCustomer);
            setEditingCustomer(null);
            fetchCustomers();
        } catch (error) {
            console.error('Error updating customer:', error.message);
        }
    };

    const handleDeleteCustomer = async (id) => {
        try {
            await deleteCustomer(id);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error.message);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [searchQuery]);

    return (
        <div className="customer-management">
            <h1>Customer Management</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="customer-list">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.customerId}>
                                <td>{customer.customerId}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>
                                    <button onClick={() => setEditingCustomer(customer)}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteCustomer(customer.customerId)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="customer-form">
                <h2>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={editingCustomer ? editingCustomer.name : newCustomer.name}
                    onChange={(e) =>
                        editingCustomer
                            ? setEditingCustomer({ ...editingCustomer, name: e.target.value })
                            : setNewCustomer({ ...newCustomer, name: e.target.value })
                    }
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={editingCustomer ? editingCustomer.email : newCustomer.email}
                    onChange={(e) =>
                        editingCustomer
                            ? setEditingCustomer({ ...editingCustomer, email: e.target.value })
                            : setNewCustomer({ ...newCustomer, email: e.target.value })
                    }
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    value={editingCustomer ? editingCustomer.phone : newCustomer.phone}
                    onChange={(e) =>
                        editingCustomer
                            ? setEditingCustomer({ ...editingCustomer, phone: e.target.value })
                            : setNewCustomer({ ...newCustomer, phone: e.target.value })
                    }
                />
                <button onClick={editingCustomer ? handleUpdateCustomer : handleAddCustomer}>
                    {editingCustomer ? 'Update' : 'Add'}
                </button>
            </div>
        </div>
    );
};

export default CustomerManagement;
