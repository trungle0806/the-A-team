import axios from 'axios';

// Tạo instance axios
const api = axios.create({
    baseURL: 'http://localhost:5024/api/', // Cập nhật URL backend của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

// Hàm lấy token từ localStorage
const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication token is missing. Please log in again.');
    }
    return `Bearer ${token}`;
};

// Lấy danh sách tất cả các NGO
export const getNGOs = async (searchQuery = '', page = 1, pageSize = 10) => {
    try {
        const response = await api.get('ngo', {
            params: {
                searchQuery,
                page,
                pageSize,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching NGOs:', error);
        throw error;
    }
};

// Lấy thông tin chi tiết của NGO theo ID
export const getNGOById = async (id) => {
    try {
        const response = await api.get(`ngo/${id}`, {
            headers: {
                Authorization: getToken(),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching NGO by id:', error);
        throw error;
    }
};

// Thêm một NGO mới
export const addNGO = async (ngo) => {
    try {
        const response = await api.post('ngo', ngo, {
            headers: {
                Authorization: getToken(),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding NGO:', error);
        throw error;
    }
};

// Cập nhật thông tin NGO
export const updateNGO = async (id, updatedNGO) => {
    try {
        const response = await api.put(`ngo/${id}`, updatedNGO, {
            headers: {
                Authorization: getToken(),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating NGO:', error);
        throw error;
    }
};

// Xóa NGO
export const deleteNGO = async (id) => {
    try {
        const response = await api.delete(`ngo/${id}`, {
            headers: {
                Authorization: getToken(),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting NGO:', error);
        throw error;
    }
};
