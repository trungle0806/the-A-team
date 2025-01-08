import axios from "axios";

const API_URL = "http://localhost:5024/api/NGO"; // Thay bằng URL backend của bạn nếu khác

const NgoService = {
  // Lấy danh sách tất cả các NGOs (có hỗ trợ tìm kiếm)
  async getNGOs(searchQuery = "") {
    try {
      const response = await axios.get(API_URL, {
        params: { searchQuery }, // Truyền query string
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching NGOs:", error);
      throw error.response ? error.response.data : error;
    }
  },

  // Lấy thông tin chi tiết một NGO theo ID
  async getNGOById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching NGO with ID ${id}:`, error);
      throw error.response ? error.response.data : error;
    }
  },

  // Thêm mới một NGO (Admin role required)
  async addNGO(ngoData, token) {
    try {
      const response = await axios.post(API_URL, ngoData, {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token để xác thực
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding NGO:", error);
      throw error.response ? error.response.data : error;
    }
  },

  // Cập nhật thông tin NGO (Admin hoặc NGO role required)
  async updateNGO(id, ngoData, token) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, ngoData, {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token để xác thực
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating NGO with ID ${id}:`, error);
      throw error.response ? error.response.data : error;
    }
  },

  // Xóa một NGO theo ID (Admin role required)
  async deleteNGO(id, token) {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token để xác thực
        },
      });
    } catch (error) {
      console.error(`Error deleting NGO with ID ${id}:`, error);
      throw error.response ? error.response.data : error;
    }
  },
};

export default NgoService;
