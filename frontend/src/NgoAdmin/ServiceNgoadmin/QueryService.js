import axios from 'axios';

const API_URL = 'http://localhost:5024/api/Query/';

// Utility function to get token and role
const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
    const userId = parseInt(localStorage.getItem('userId'), 10); // Get user ID

    if (!token) {
        console.error('Authorization token is missing.');
        throw new Error('Unauthorized: Missing authorization token.');
    }

    if (!role) {
        console.error('User role is missing.');
        throw new Error('Unauthorized: Missing user role.');
    }

    return { token, role, userId, headers: { Authorization: `Bearer ${token}` } };
};

// Fetch all Queries with optional search query
const getQueries = async (searchQuery = '') => {
    const { role, headers } = getAuthHeaders();
    if (!['Admin', 'NGO'].includes(role)) {
        throw new Error('Unauthorized: Access is restricted to Admins and NGOs.');
    }

    try {
        const response = await axios.get(API_URL, {
            params: { searchQuery },
            headers,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch queries:', error.response?.data || error.message);
        throw error;
    }
};

// Get Query by ID
const getQueryById = async (id) => {
    const { role, userId, headers } = getAuthHeaders();

    if (!['Admin', 'NGO', 'User'].includes(role)) {
        throw new Error('Unauthorized: Access is restricted to Admins, NGOs, and Users.');
    }

    try {
        const response = await axios.get(`${API_URL}${id}`, { headers });
        const query = response.data;

        // Restrict "User" role to their own queries
        if (role === 'User' && query.customerId !== userId) {
            throw new Error('Unauthorized: You can only access your own queries.');
        }

        return query;
    } catch (error) {
        console.error(`Failed to fetch query with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Get Queries for a specific Customer
const getQueriesByCustomerId = async (customerId) => {
    const { role, userId, headers } = getAuthHeaders();

    if (!['Admin', 'NGO', 'User'].includes(role)) {
        throw new Error('Unauthorized: Access is restricted to Admins, NGOs, and Users.');
    }

    if (role === 'User' && customerId !== userId) {
        throw new Error('Unauthorized: You can only access your own queries.');
    }

    try {
        const response = await axios.get(`${API_URL}customer/${customerId}`, { headers });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch queries for customer ID ${customerId}:`, error.response?.data || error.message);
        throw error;
    }
};

// Add a Query
const addQuery = async (query) => {
    const { role, headers } = getAuthHeaders();

    if (!['Admin', 'NGO'].includes(role)) {
        throw new Error('Unauthorized: Only Admins and NGOs can add queries.');
    }

    try {
        const response = await axios.post(API_URL, query, { headers });
        return response.data;
    } catch (error) {
        console.error('Failed to add query:', error.response?.data || error.message);
        throw error;
    }
};

// Update a Query
const updateQuery = async (id, updatedQuery) => {
    const { role, headers } = getAuthHeaders();

    if (!['Admin', 'NGO'].includes(role)) {
        throw new Error('Unauthorized: Only Admins and NGOs can update queries.');
    }

    try {
        const response = await axios.put(`${API_URL}${id}`, updatedQuery, { headers });
        return response.data;
    } catch (error) {
        console.error(`Failed to update query with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Delete a Query
const deleteQuery = async (id) => {
    const { role, headers } = getAuthHeaders();

    if (role !== 'Admin') {
        throw new Error('Unauthorized: Only Admins can delete queries.');
    }

    try {
        const response = await axios.delete(`${API_URL}${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error(`Failed to delete query with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export {
    getQueries,
    getQueryById,
    getQueriesByCustomerId,
    addQuery,
    updateQuery,
    deleteQuery,
};
