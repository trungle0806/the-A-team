import React, { useState, useEffect } from "react";
import {
  getAllNGOs,
  addNGO,
  updateNGO,
  deleteNGO,
} from "../ServiceNgoadmin/NgosService.js";
import { useNavigate } from "react-router-dom";
import "./Ngos.css";

const AdminNGOManagement = () => {
  const [ngos, setNgos] = useState([]);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state cho tìm kiếm
  const [isAddFormVisible, setIsAddFormVisible] = useState(false); // Điều khiển hiển thị form thêm NGO
  const navigate = useNavigate();

  useEffect(() => {
    fetchNGOs();
  }, []);

  const fetchNGOs = async () => {
    try {
      const data = await getAllNGOs();
      const NGOList = data?.$values || [];
      setNgos(NGOList);
    } catch (error) {
      console.error("Failed to fetch NGOs:", error.message);
    }
  };

  const handleAddOrUpdateNGO = async (e) => {
    e.preventDefault();
    try {
      if (selectedNGO) {
        await updateNGO(selectedNGO.id, formData);
        alert("NGO updated successfully");
      } else {
        await addNGO(formData);
        alert("NGO added successfully");
      }
      fetchNGOs();
      setFormData({ name: "", description: "" });
      setSelectedNGO(null);
      setIsAddFormVisible(false); // Ẩn form sau khi thêm tổ chức
    } catch (error) {
      console.error("Failed to add/update NGO:", error.message);
    }
  };

  const handleEdit = (ngo) => {
    setSelectedNGO(ngo);
    setFormData({ name: ngo.name, description: ngo.description });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this NGO?")) return;

    try {
      await deleteNGO(id);
      alert("NGO deleted successfully");
      fetchNGOs();
    } catch (error) {
      console.error("Failed to delete NGO:", error.message);
    }
  };

  const viewDetails = (id) => {
    navigate(`/ngo-details/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách NGO dựa trên tìm kiếm
  const filteredNgos = ngos.filter((ngo) =>
    ngo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-ngo-management">
      <h1>Admin NGO Management</h1>
      <div className="search-icon1">
        {/* Tìm kiếm NGO */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Icon để hiển thị form thêm tổ chức */}
        <button
          onClick={() => setIsAddFormVisible(true)}
          className="icon-btn-add"
        >
          <i className="fas fa-user-plus"></i> {/* Icon người và dấu cộng */}
        </button>
      </div>

      {/* Form thêm tổ chức, ẩn/hiện khi nhấn vào icon */}
      {isAddFormVisible && (
        <form onSubmit={handleAddOrUpdateNGO} className="ngo-form">
          <input
            type="text"
            placeholder="NGO Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="NGO Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>
          <button type="submit">
            {selectedNGO ? "Update NGO" : "Add NGO"}
          </button>
          <button type="button" onClick={() => setIsAddFormVisible(false)}>
            Cancel
          </button>
        </form>
      )}

      {/* Bảng hiển thị NGO */}
      <table className="ngo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Code</th>
            <th>Logo</th>
            <th>Achievements</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNgos.map((ngo) => (
            <tr key={ngo.id}> {/* Đảm bảo ngo.id là duy nhất */}
              <td>{ngo.id}</td>
              <td className="ngo-name">{ngo.name}</td>
              <td className="ngo-description">{ngo.description}</td>
              <td className="ngo-code">{ngo.code}</td>
              <td>
                <img
                  src={ngo.logoUrl}
                  alt={ngo.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td className="ngo-achievements">{ngo.achievements}</td>
              <td className="ngo-icon">
                <button onClick={() => handleEdit(ngo)} className="icon-btn1">
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleDelete(ngo.id)}
                  className="icon-btn2"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button
                  onClick={() => viewDetails(ngo.id)}
                  className="icon-btn3"
                >
                  <i className="fas fa-eye"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminNGOManagement;
