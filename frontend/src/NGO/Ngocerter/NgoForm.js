import React, { useState, useEffect } from "react";
import "./NgoForm.css";
import NgoService from "../Service/ngoService";

const NgoForm = ({ ngoId = null, onSuccess, token }) => {
  const [ngoData, setNgoData] = useState({
    name: "",
    description: "",
    code: "",
    logoUrl: "",
    mission: "",
    team: "",
    careers: "",
    achievements: "",
    isApproved: false,
    email: "",
  });

  const [error, setError] = useState("");
  const [isViewMode, setIsViewMode] = useState(false); // Chế độ xem hoặc chỉnh sửa

  useEffect(() => {
    const fetchNgo = async () => {
      if (ngoId) {
        try {
          const data = await NgoService.getNGOById(ngoId);
          setNgoData(data);
          setIsViewMode(true); // Nếu có ID thì mặc định là chế độ xem
        } catch (err) {
          setError("Không thể tải thông tin NGO.");
        }
      }
    };
    fetchNgo();
  }, [ngoId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNgoData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ngoId) {
        await NgoService.updateNGO(ngoId, ngoData, token); // Cập nhật NGO
      } else {
        await NgoService.addNGO(ngoData, token); // Thêm NGO mới
      }
      onSuccess(); // Callback khi thành công
    } catch (err) {
      setError("Không thể lưu NGO. Vui lòng thử lại.");
    }
  };  

  // Chuyển chế độ từ "Xem" sang "Chỉnh sửa"
  const toggleEditMode = () => {
    setIsViewMode(!isViewMode);
  };

  return (
    <div className="ngo-form-container">
      <h1 className="ngo-form-title">NGO Details</h1>
      <div className="ngo-form-body">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isViewMode ? (
          // Chế độ xem thông tin NGO
          <div className="ngo-details">
            <h2>{ngoData.name}</h2>
            <p><strong>Description:</strong> {ngoData.description}</p>
            <p><strong>Code:</strong> {ngoData.code}</p>
            <p><strong>Achievements:</strong> {ngoData.achievements}</p>
            <p><strong>Logo:</strong> <img src={ngoData.logoUrl} alt="NGO Logo" /></p>
            <p><strong>Approved:</strong> {ngoData.isApproved ? "Yes" : "No"}</p>
            <p><strong>Email:</strong> {ngoData.email}</p>
            <button onClick={toggleEditMode} className="ngo-btn">Edit</button>
          </div>
        ) : (
          // Chế độ chỉnh sửa thông tin NGO
          <form onSubmit={handleSubmit} className="ngo-edit-form">
            <div className="ngo-form-group">
              <label className="ngo-label">Name:</label>
              <input
                className="ngo-input"
                type="text"
                name="name"
                value={ngoData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ngo-form-group">
              <label className="ngo-label">Description:</label>
              <textarea
                className="ngo-textarea"
                name="description"
                value={ngoData.description}
                onChange={handleChange}
              />
            </div>
            <div className="ngo-form-group">
              <label className="ngo-label">Code:</label>
              <input
                className="ngo-input"
                type="text"
                name="code"
                value={ngoData.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ngo-form-group">
              <label className="ngo-label">Logo URL:</label>
              <input
                className="ngo-input"
                type="text"
                name="logoUrl"
                value={ngoData.logoUrl}
                onChange={handleChange}
              />
            </div>
            <div className="ngo-form-group">
              <label className="ngo-label">Achievements:</label>
              <textarea
                className="ngo-textarea"
                name="achievements"
                value={ngoData.achievements}
                onChange={handleChange}
              />
            </div>
            <div className="ngo-form-group">
              <label className="ngo-label">Email:</label>
              <input
                className="ngo-input"
                type="email"
                name="email"
                value={ngoData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ngo-form-group">
              <label className="ngo-label">
                <input
                  className="ngo-checkbox"
                  type="checkbox"
                  name="isApproved"
                  checked={ngoData.isApproved}
                  onChange={handleChange}
                />
                Approve
              </label>
            </div>
            <button className="ngo-btn" type="submit">Save</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NgoForm;
