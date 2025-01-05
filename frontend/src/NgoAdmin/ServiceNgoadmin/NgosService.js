import axios from 'axios';

const API_URL = 'http://localhost:5024/api/NGO/';

// Utility function to get token and role
const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');

    if (!token) {
        console.error('Authorization token is missing.');
        throw new Error('Unauthorized: Missing authorization token.');
    }

    if (!role) {
        console.error('User role is missing.');
        throw new Error('Unauthorized: Missing user role.');
    }

    return { token, role, headers: { Authorization: `Bearer ${token}` } };
};

// Fetch all NGOs (Admin only)
const getAllNGOs = async () => {
    const { token, role, headers } = getAuthHeaders();
    console.log('Role and Token:', { role, token });

    if (role !== 'Admin') {
        console.error('Unauthorized: Only admins can fetch NGOs.');
        throw new Error('Unauthorized: Only admins can fetch NGOs.');
    }

    try {
        const response = await axios.get(`${API_URL}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching NGOs:', error.response?.data || error.message);
        throw error;
    }
};

// Add a new NGO (Admin only)
const addNGO = async (ngo) => {
    const { role, headers } = getAuthHeaders();
    if (role !== 'Admin') {
        throw new Error('Unauthorized: Only admins can add NGOs.');
    }

    try {
        const response = await axios.post(API_URL, ngo, { headers });
        return response.data;
    } catch (error) {
        console.error('Error adding NGO:', error.response?.data || error.message);
        throw error;
    }
};

// Update an existing NGO (Admin and NGO roles)
const updateNGO = async (id, updatedNGO) => {
    const { role, headers } = getAuthHeaders();
    if (!['Admin', 'NGO'].includes(role)) {
        throw new Error('Unauthorized: Only admins and NGOs can update NGOs.');
    }

    try {
        const response = await axios.put(`${API_URL}${id}`, updatedNGO, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error updating NGO with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Delete a NGO (Admin only)
const deleteNGO = async (id) => {
    const { role, headers } = getAuthHeaders();
    if (role !== 'Admin') {
        throw new Error('Unauthorized: Only admins can delete NGOs.');
    }

    try {
        const response = await axios.delete(`${API_URL}${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error deleting NGO with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Get a specific NGO by ID (Admin and User roles)
const getNGOById = async (id) => {
    const { role, headers } = getAuthHeaders();
    if (!['Admin', 'User'].includes(role)) {
        throw new Error('Unauthorized: Access is restricted to Admins and Users.');
    }

    try {
        const response = await axios.get(`${API_URL}${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error fetching NGO with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Search for NGOs with an optional query (Admin and User roles)
const searchNGOs = async (searchQuery = '') => {
    const { role, headers } = getAuthHeaders();
    if (!['Admin', 'User'].includes(role)) {
        throw new Error('Unauthorized: Access is restricted to Admins and Users.');
    }

    try {
        const response = await axios.get(API_URL, {
            params: { searchQuery },
            headers,
        });
        return response.data;
    } catch (error) {
        console.error('Error searching NGOs:', error.response?.data || error.message);
        throw error;
    }
};

export {
    getAllNGOs,
    addNGO,
    updateNGO,
    deleteNGO,
    getNGOById,
    searchNGOs,
};
