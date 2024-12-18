import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageCustomer.css";
import "./CustomerResponsive.css";


const API_URL = "http://localhost:5024/api/customers"

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   // Lấy danh sách khách hàng từ API
   const fetchCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
        },
      });
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid response data format");
      }
      setCustomers(response.data);
    } catch (err) {
      setError("Failed to load customers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Xóa khách hàng
  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCustomers(customers.filter((customer) => customer.customerId !== id));
    } catch (err) {
      alert("Failed to delete customer. Please try again.");
    }
  };

  // Lọc khách hàng theo tìm kiếm
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customer-container">
      {/* Tiêu đề */}
      <header className="customer-header">
        <h1>Customer Management</h1>
        <p>Manage your customers effectively here.</p>
      </header>

      {/* Thanh tìm kiếm */}
      <div className="customer-search">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Xử lý trạng thái */}
      {loading ? (
        <div className="loading">Loading customers...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="customer-list">
          {filteredCustomers.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.customerId}>
                    <td>{customer.customerId}</td>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{new Date(customer.dateOfBirth).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => deleteCustomer(customer.customerId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-customers">No customers found. Try searching with a different term.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Customer;  