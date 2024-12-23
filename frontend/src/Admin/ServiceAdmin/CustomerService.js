import axios from 'axios';

const API_URL = 'http://localhost:5024/api/customer/'; // Adjusted to match the CustomerController route

// Fetch all customers (Admin only)
const getAllCustomers = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
        const role = payload.scope;
        console.log('Role:', role);  // Debug: Ensure the role is correct
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
    } else {
        throw new Error('Token not found.');
    }
};


// Add a new customer (Admin only)
const addCustomer = async (customer) => {
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
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
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
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
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
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
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
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
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
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
