import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NgoDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNgoDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5024/api/ngo/${id}`);
        setNgo(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        setError("Failed to load NGO details.");
      } finally {
        setLoading(false);
      }
    };

    fetchNgoDetail(); // Gọi API khi component mount
  }, [id]); // Dependency array để gọi lại API khi id thay đổi

  if (loading) return <p>Loading NGO details...</p>; // Hiển thị khi đang tải dữ liệu
  if (error) return <p>{error}</p>; // Hiển thị khi có lỗi

  return (
    <div>
      <h1>{ngo?.name}</h1>
      <img src={ngo?.logoUrl} alt={ngo?.name} width="200" />
      <p>{ngo?.description}</p>
      <h3>Achievements:</h3>
      <p>{ngo?.achievements}</p>
      <h3>Mission:</h3>
      <p>{ngo?.mission || "Not available"}</p>
      <h3>Team:</h3>
      <p>{ngo?.team || "Not available"}</p>
      <h3>Careers:</h3>
      <p>{ngo?.careers || "Not available"}</p>
      <h3>Email:</h3>
      <p>{ngo?.email}</p>
      <h3>Approved:</h3>
      <p>{ngo?.isApproved ? "Yes" : "No"}</p>
    </div>
  );
};

export default NgoDetail;
