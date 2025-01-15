import axios from 'axios';

const API_URL = 'https://charitynavigator-hma3agega6fwfgb2.canadacentral-01.azurewebsites.net/api'; // URL backend của bạn

// Hàm lấy tất cả các NGO, có thể tìm kiếm qua query string
export const getNGOs = async (searchQuery = '') => {
  try {
    const response = await axios.get(`${API_URL}/ngo?searchQuery=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching NGOs:', error);
    throw error;
  }
};

// Hàm lấy một NGO theo ID
export const getNGOById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/ngo/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching NGO by ID:', error);
    throw error;
  }
};

// Hàm thêm một NGO mới
export const addNGO = async (ngoData) => {
  try {
    const response = await axios.post(`${API_URL}/ngo`, ngoData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}` // Thêm token nếu cần
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding NGO:', error);
    throw error;
  }
};

// Hàm cập nhật một NGO
export const updateNGO = async (id, ngoData) => {
  try {
    const response = await axios.put(`${API_URL}/ngo/${id}`, ngoData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating NGO:', error);
    throw error;
  }
};

// Hàm xóa một NGO
export const deleteNGO = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/ngo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting NGO:', error);
    throw error;
  }
};

// Hàm tìm kiếm NGO theo nhiều tiêu chí
export const searchNGOs = async (name, code, isApproved) => {
  try {
    const response = await axios.get(`${API_URL}/ngo/search`, {
      params: { name, code, isApproved }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching NGOs:', error);
    throw error;
  }
};

// Hàm duyệt NGO (Admin duyệt)
// Hàm duyệt NGO (Admin duyệt)
export const approveNGO = async (id) => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Gửi yêu cầu PATCH để duyệt NGO với token xác thực
    const response = await axios.patch(
      `${API_URL}/ngo/${id}/approval`,
      {}, // Giả sử yêu cầu không cần dữ liệu body, có thể thêm nếu cần
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      }
    );

    // Kiểm tra phản hồi xem có chứa dữ liệu và isApproved
    if (response && response.data && response.data.isApproved !== undefined) {
      if (response.data.isApproved === true) {
        console.log(`NGO with ID: ${id} has been approved successfully.`);
        return response.data; // Trả về dữ liệu nếu duyệt thành công
      } else {
        // Nếu isApproved là false, cho thông báo lỗi chi tiết hơn
        throw new Error('NGO approval failed: isApproved is false');
      }
    } else {
      throw new Error('Failed to approve NGO: Response data is incorrect or missing isApproved field');
    }
  } catch (error) {
    // Xử lý lỗi chi tiết
    if (error.response) {
      // Lỗi từ server, có thể là dữ liệu phản hồi không hợp lệ hoặc lỗi API
      console.error('Error approving NGO:', error.response.data);
      alert(`Error: ${error.response.data.message || 'An error occurred while approving NGO'}`);
    } else if (error.request) {
      // Không nhận được phản hồi từ server
      console.error('No response received from server:', error.request);
      alert('No response from server. Please check your network connection.');
    } else {
      // Lỗi trong cấu hình yêu cầu
      console.error('Error in request:', error.message);
      alert(`Error: ${error.message}`);
    }
    throw error; // Ném lại lỗi để frontend có thể xử lý thêm nếu cần
  }
};
