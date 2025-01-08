import axios from 'axios';

// Tạo instance axios
const api = axios.create({
    baseURL: 'http://localhost:5024/api/',  // Cập nhật URL backend của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

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
export const getProgramById = async (id) => {
    try {
        const response = await api.get(`program1/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching program by id:', error);
        throw error;
    }
};

// Thêm một chương trình mới
export const addProgram = async (program) => {
    try {
        const response = await api.post('program1', program, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding program:', error);
        throw error;
    }
};

// Cập nhật chương trình
export const updateProgram = async (id, updatedProgram) => {
    try {
        const response = await api.put(`program1/${id}`, updatedProgram, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating program:', error);
        throw error;
    }
};

// Xóa chương trình
export const deleteProgram = async (id) => {
    try {
        const response = await api.delete(`program1/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting program:', error);
        throw error;
    }
};
