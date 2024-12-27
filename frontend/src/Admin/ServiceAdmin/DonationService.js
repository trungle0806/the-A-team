import axios from 'axios';

const API_URL = 'http://localhost:5024/api/ProgramDonation/'; // Adjusted to match the ProgramDonationController route

// Utility function to get token and role
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
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

// Fetch all Program Donations with an optional search query (Admin, User, NGO roles)
const getProgramDonations = async (searchQuery = '') => {
    const { token, role, headers } = getAuthHeaders();
    console.log('Token:', token); // Check if token is available and valid
    console.log('Role:', role); // Check if the role matches the expected roles

    try {
        if (!['Admin', 'User', 'NGO'].includes(role)) {
            throw new Error('Unauthorized: Access is restricted to Admin, User, and NGO roles.');
        }

        const response = await axios.get(API_URL, {
            params: { searchQuery },
            headers,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch program donations:', error.response?.data || error.message);
        throw error;
    }
};

// Fetch Program Donation by ID (Admin, User, NGO roles)
const getProgramDonationById = async (id) => {
    const { token, role, headers } = getAuthHeaders();
    console.log('Token:', token); // Check if token is available and valid
    console.log('Role:', role); // Check if the role matches the expected roles

    try {
        if (!['Admin', 'User', 'NGO'].includes(role)) {
            throw new Error('Unauthorized: Access is restricted to Admin, User, and NGO roles.');
        }

        const response = await axios.get(`${API_URL}${id}`, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch program donation with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Add a new Program Donation (Admin, NGO roles)
const addProgramDonation = async (donation) => {
    const { token, role, headers } = getAuthHeaders();
    console.log('Token:', token); // Check if token is available and valid
    console.log('Role:', role); // Check if the role matches the expected roles

    try {
        if (!['Admin', 'NGO'].includes(role)) {
            throw new Error('Unauthorized: Only Admin and NGO roles can add program donations.');
        }

        const response = await axios.post(API_URL, donation, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add program donation:', error.response?.data || error.message);
        throw error;
    }
};

// Update an existing Program Donation (Admin, NGO roles)
const updateProgramDonation = async (id, updatedDonation) => {
    const { token, role, headers } = getAuthHeaders();
    console.log('Token:', token); // Check if token is available and valid
    console.log('Role:', role); // Check if the role matches the expected roles

    try {
        if (!['Admin', 'NGO'].includes(role)) {
            throw new Error('Unauthorized: Only Admin and NGO roles can update program donations.');
        }

        const response = await axios.put(`${API_URL}${id}`, updatedDonation, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to update program donation with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Delete a Program Donation (Admin role only)
const deleteProgramDonation = async (id) => {
    const { token, role, headers } = getAuthHeaders();
    console.log('Token:', token); // Check if token is available and valid
    console.log('Role:', role); // Check if the role matches the expected roles

    try {
        if (role !== 'Admin') {
            throw new Error('Unauthorized: Only Admin role can delete program donations.');
        }

        const response = await axios.delete(`${API_URL}${id}`, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to delete program donation with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export {
    getProgramDonations,
    getProgramDonationById,
    addProgramDonation,
    updateProgramDonation,
    deleteProgramDonation,
};
