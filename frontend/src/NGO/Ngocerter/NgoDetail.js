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
          <img
            className="ngo-logo-img"
            src={ngoData.logoUrl}
            alt={ngoData.name}
          />
          <div className="ngo-item">
            <div>
              <strong className="ngo-item-strong">Description:</strong>
            </div>{" "}
            <div className="ngo-item-description">{ngoData.description}</div>
          </div>
        </div>
        <div className="ngo-infor1">
          <div className="ngo-item1">
            <div>
              <strong className="ngo-item-strong">Achievements:</strong>{" "}
            </div>
            <div className="ngo-item-description">{ngoData.achievements}</div>
          </div>
        </div>
        <div className="ngo-itemm">
          <div className="ngo-item">
            <strong className="ngo-item-strong">Email:</strong>{" "}
            <div className="ngo-item-description">{ngoData.email}</div>
          </div>
          <div className="ngo-item">
            <strong className="ngo-item-strong">Approved:</strong>{" "}
            <div className="ngo-item-description">
              {ngoData.isApproved ? "Yes" : "No"}
            </div>
          </div>
          <div className="ngo-item">
            <strong className="ngo-item-strong">Created At:</strong>{" "}
            <div className="ngo-item-description">
              {new Date(ngoData.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="ngo-item">
            <strong className="ngo-item-strong">Updated At:</strong>{" "}
            <div className="ngo-item-description">
              {new Date(ngoData.updatedAt).toLocaleString()}
            </div>
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
