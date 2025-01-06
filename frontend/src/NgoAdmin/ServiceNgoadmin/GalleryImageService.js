import axios from 'axios';

const API_URL = 'http://localhost:5024/api/GalleryImage/'; // URL của GalleryImageController

// Lấy danh sách tất cả Gallery Images (có thể thêm query để tìm kiếm)
const getGalleryImages = async (searchQuery = '') => {
    try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!['Admin', 'User', 'NGO'].includes(role)) {
            throw new Error('Unauthorized: Chỉ các vai trò Admin, User, và NGO mới được truy cập.');
        }

        const response = await axios.get(API_URL, {
            params: { searchQuery },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Không thể lấy danh sách gallery images:', error.response?.data || error.message);
        throw error;
    }
};

// Lấy một Gallery Image cụ thể bằng ID
const getGalleryImageById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!['Admin', 'User', 'NGO'].includes(role)) {
            throw new Error('Unauthorized: Chỉ các vai trò Admin, User, và NGO mới được truy cập.');
        }

        const response = await axios.get(`${API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error(`Không thể lấy gallery image với ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Thêm một Gallery Image mới
const addGalleryImage = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!['Admin', 'NGO'].includes(role)) {
            throw new Error('Unauthorized: Chỉ các vai trò Admin và NGO mới có thể thêm gallery images.');
        }

        const response = await axios.post(API_URL, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Không thể thêm gallery image:', error.response?.data || error.message);
        throw error;
    }
};

// Cập nhật một Gallery Image
const updateGalleryImage = async (id, formData) => {
    try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!['Admin', 'NGO'].includes(role)) {
            throw new Error('Unauthorized: Chỉ các vai trò Admin và NGO mới có thể cập nhật gallery images.');
        }

        const response = await axios.put(`${API_URL}${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error(`Không thể cập nhật gallery image với ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Xóa một Gallery Image
const deleteGalleryImage = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (role !== 'Admin') {
            throw new Error('Unauthorized: Chỉ vai trò Admin mới có thể xóa gallery images.');
        }

        const response = await axios.delete(`${API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error(`Không thể xóa gallery image với ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export {
    getGalleryImages,
    getGalleryImageById,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
};
