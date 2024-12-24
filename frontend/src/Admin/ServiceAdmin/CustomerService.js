import axios from 'axios';

const API_URL = 'http://localhost:5024/api/customer/'; // Adjusted to match the CustomerController route

// Fetch all customers (Admin only)
const getAllCustomers = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Fetch role from localStorage
    console.log('Role:', role); // Debugging
    try {
        if (role !== 'Admin') {
            throw new Error('Unauthorized: Only admins can access customer data.');
        }
        const response = await axios.get(`${API_URL}all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch all customers:', error.response?.data || error.message);
        throw error;
    }
};



// Add a new customer (Admin only)
const addCustomer = async (customer) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    try {
        if (role !== 'Admin') {
            throw new Error('Unauthorized: Only admins can add customers.');
        }
        const response = await axios.post(API_URL, customer, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add customer:', error.response?.data || error.message);
        throw error;
    }
};

// Update an existing customer (Admin only)
const updateCustomer = async (id, updatedCustomer) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    try {
        if (role !== 'Admin') {
            throw new Error('Unauthorized: Only admins can update customers.');
        }
        const response = await axios.put(`${API_URL}${id}`, updatedCustomer, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to update customer with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Delete a customer (Admin only)
const deleteCustomer = async (id) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    try {
        if (role !== 'Admin') {
            throw new Error('Unauthorized: Only admins can delete customers.');
        }
        const response = await axios.delete(`${API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to delete customer with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Get a specific customer by ID (Admin and User)
const getCustomerById = async (id) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    try {
        if (!['Admin', 'User'].includes(role)) {
            throw new Error('Unauthorized: Access is restricted to Admins and Users.');
        }
        const response = await axios.get(`${API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch customer with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Search for customers with an optional query (Admin and User)
const searchCustomers = async (searchQuery = '') => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    try {
        if (!['Admin', 'User'].includes(role)) {
            throw new Error('Unauthorized: Access is restricted to Admins and Users.');
        }
        const response = await axios.get(API_URL, {
            params: { searchQuery },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch customers:', error.response?.data || error.message);
        throw error;
    }
};

export {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    searchCustomers,
};
