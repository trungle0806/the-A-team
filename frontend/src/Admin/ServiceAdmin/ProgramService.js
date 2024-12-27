import axios from 'axios';

const API_URL = 'http://localhost:5024/api/Program1/'; // Địa chỉ API của Program1Controller

// Fetch all Program1s (Admin, User, and NGO roles)
const getProgram1s = async (searchQuery = '') => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Vai trò người dùng
    try {
        if (!['Admin', 'User', 'NGO'].includes(role)) {
            throw new Error('Unauthorized: Access is restricted to Admins, Users, and NGOs.');
        }
        const response = await axios.get(API_URL, {
            params: { searchQuery },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Program1s:', error.response?.data || error.message);
        throw error;
    }
};

// Get Program1 by ID (Admin, User, and NGO roles)
const getProgram1ById = async (id) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    try {
        if (!['Admin', 'User', 'NGO'].includes(role)) {
            throw new Error('Unauthorized: Access is restricted to Admins, Users, and NGOs.');
        }
        const response = await axios.get(`${API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch Program1 with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Add Program1 (Admin role only)
const addProgram1 = async (program) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    try {
        if (role !== 'Admin') {
            throw new Error('Unauthorized: Only Admins can add Program1s.');
        }
        const response = await axios.post(API_URL, program, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add Program1:', error.response?.data || error.message);
        throw error;
    }
};

// Update Program1 (Admin and NGO roles)
const updateProgram1 = async (id, updatedProgram) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    try {
        if (!['Admin', 'NGO'].includes(role)) {
            throw new Error('Unauthorized: Only Admins and NGOs can update Program1 information.');
        }
        const response = await axios.put(`${API_URL}${id}`, updatedProgram, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to update Program1 with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Delete Program1 (Admin role only)
const deleteProgram1 = async (id) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    try {
        if (role !== 'Admin') {
            throw new Error('Unauthorized: Only Admins can delete Program1s.');
        }
        const response = await axios.delete(`${API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to delete Program1 with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export {
    getProgram1s,
    getProgram1ById,
    addProgram1,
    updateProgram1,
    deleteProgram1,
};
