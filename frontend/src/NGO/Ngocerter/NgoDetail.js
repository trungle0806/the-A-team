import React, { useEffect, useState } from "react";
import { getNGOById } from "../Service/ngoService";
import {
  FaEnvelope,
  FaInfoCircle,
  FaTrophy,
  FaCheckCircle,
  FaClock,
  FaEdit, // Thêm icon edit
} from "react-icons/fa";
import "./NgoForm.css";

const NGODetail = ({ id, onEditClick }) => {
  // Thêm onEditClick prop
  const [ngoData, setNgoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNGOData = async () => {
      try {
        const data = await getNGOById(id);
        setNgoData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNGOData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ngoData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="ngo-title">{ngoData.name}</h2>

      <div className="ngo-detail1">
        <div className="ngo-img">
          <img className="ngo-logo" src={ngoData.logoUrl} alt={ngoData.name} />
        </div>
        <div className="ngo-info1">
          <div className="ngo-item">
            <FaInfoCircle className="ngo-icon" />
            <strong>Description:</strong> {ngoData.description}
          </div>
          <div className="ngo-item">
            <FaEnvelope className="ngo-icon" />
            <strong>Email:</strong> {ngoData.email}
          </div>
          <div className="ngo-item">
            <FaTrophy className="ngo-icon" />
            <strong>Achievements:</strong> {ngoData.achievements}
          </div>
        </div>
        <div className="ngo-info2">
          <div className="ngo-item">
            <FaCheckCircle className="ngo-icon" />
            <strong>Approved:</strong> {ngoData.isApproved ? "Yes" : "No"}
          </div>
          <div className="ngo-item">
            <FaClock className="ngo-icon" />
            <strong>Created At:</strong>{" "}
            {new Date(ngoData.createdAt).toLocaleString()}
          </div>
          <div className="ngo-item">
            <FaClock className="ngo-icon" />
            <strong>Updated At:</strong>{" "}
            {new Date(ngoData.updatedAt).toLocaleString()}
          </div>
        </div>
        <button onClick={onEditClick} className="edit-btn-ngo">
          <FaEdit />
        </button>
      </div>
    </div>
  );
};

export default NGODetail;
