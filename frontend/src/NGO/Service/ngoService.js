import axios from 'axios';

// Create axios instance for API calls
const api = axios.create({
  baseURL: 'http://localhost:5024/api/', // Adjust the URL based on your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the token from localStorage
const getToken = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authentication token is missing. Please log in again.');
  }
  return `Bearer ${token}`;
};

// Function to get NGO data by ID
export const getNGOById = async (id) => {
  try {
    const response = await api.get(`ngo/get-ngo-data`, {
      headers: {
        Authorization: getToken(),
      },
    });
    return response.data; // Assuming the backend returns the NGO data directly
  } catch (error) {
    console.error('Error fetching NGO data by ID:', error);
    throw error; // Re-throw error to be handled by the caller
  }
};

// Function to update NGO data by ID
export const updateNGO = async (id, updatedNGO) => {
  try {
    const response = await api.put(`ngo/${id}`, updatedNGO, {
      headers: {
        Authorization: getToken(),
      },
    });
    return response.data; // Return the updated NGO data from backend
  } catch (error) {
    console.error('Error updating NGO:', error);
    throw error; // Re-throw error to be handled by the caller
  }
};