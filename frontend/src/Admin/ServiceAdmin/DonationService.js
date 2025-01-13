import axios from 'axios';

const API_URL = 'http://localhost:5024/api/ProgramDonation/';

// Utility function to get authorization headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');

    if (!token) {
        throw new Error('Authorization token is missing.');
    }

    if (!role) {
        throw new Error('User role is missing.');
    }

    return { headers: { Authorization: `Bearer ${token}` } };
};

// Fetch all Program Donations with an optional search query
const getProgramDonations = async (searchQuery = '') => {
    try {
        const response = await axios.get(API_URL, {
            params: { searchQuery },
            ...getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch program donations:', error.response?.data || error.message);
        throw error;
    }
};

// Fetch a specific Program Donation by ID
const getProgramDonationById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch program donation with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Add a new Program Donation
const addProgramDonation = async (donation) => {
    try {
        const response = await axios.post(API_URL, donation, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Failed to add program donation:', error.response?.data || error.message);
        throw error;
    }
};

// Update an existing Program Donation
const updateProgramDonation = async (id, updatedDonation) => {
    try {
        const response = await axios.put(`${API_URL}${id}`, updatedDonation, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Failed to update program donation with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Delete a Program Donation
const deleteProgramDonation = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Failed to delete program donation with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// ServiceAdmin/DonationService.js
export const getCustomerById = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:5024/api/Customer/${customerId}`);
       // Kiểm tra xem phản hồi có phải là 404 hay không
    if (!response.ok) {
        throw new Error(`Customer with ID ${customerId} not found`);
      }
      return await response.json(); // Trả về thông tin customer
    } catch (error) {
      console.error("Error fetching customer:", error);
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
