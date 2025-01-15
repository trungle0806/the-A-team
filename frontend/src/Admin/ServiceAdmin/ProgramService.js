import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Tạo instance axios
const api = axios.create({
    baseURL: 'http://localhost:5024/api/', // Cập nhật URL backend của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

// Lấy accountId từ token
const getAccountIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token not found');
    }
    const decoded = jwtDecode(token);
    return decoded.id; // Lấy `id` (accountId) từ token
};

// Lấy thông tin NGO từ accountId
export const getNGOByAccountId = async () => {
    try {
        const accountId = getAccountIdFromToken(); // Lấy accountId từ token
        const response = await api.get(`NGO/account/${accountId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching NGO by accountId:', error);
        throw error;
    }
};

// Lấy danh sách các chương trình của NGO
export const getProgramsByNGO = async () => {
    try {
        const accountId = getAccountIdFromToken(); // Lấy accountId từ token
        const response = await api.get(`NGO/${accountId}/programs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching programs by NGO:', error);
        throw error;
    }
};

// Lấy danh sách tất cả các chương trình
export const getPrograms = async (searchQuery = '', page = 1, pageSize = 10) => {
    try {
        const response = await api.get('program1', {
            params: {
                searchQuery,
                page,
                pageSize,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching programs:', error);
        throw error;
    }
};

// Lấy thông tin chi tiết của chương trình theo ID
export const getProgramById = async (programId) => {
    try {
      console.log('Requesting program with ID:', programId);  // Log the programId
      const response = await axios.get(`/api/programs/${programId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching program by id:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

// Thêm một chương trình mới
export const addProgram = async (program) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Token is required');
        }
        const response = await api.post('program1', program, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding program:', error);
        throw error;
    }
};

// Cập nhật chương trình
export const updateProgram = async (programId, updatedProgram) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Token is required');
        }
        const response = await api.put(`program1/${programId}`, updatedProgram, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating program:', error);
        throw error;
    }
};

// API để duyệt chương trình
export const updateProgramStatus = async (programId, status) => {
    try {
      const response = await fetch(`/api/programs/${programId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating program status:', error);
    }
  };
  

// Xóa chương trình
export const deleteProgram = async (id) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Token is required');
        }
        const response = await api.delete(`program1/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting program:', error);
        throw error;
    }
};
