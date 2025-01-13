import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NgoDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Nếu id không có giá trị
  if (!id) {
    return <p>No NGO ID provided. Please go back and select a valid NGO.</p>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchNgoDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5024/api/ngo/${id}`);
        setNgo(response.data);
      } catch (error) {
        setError("Failed to load NGO details.");
      } finally {
        setLoading(false);
      }
    };

    fetchNgoDetail();
  }, [id]);

  if (loading) return <p>Loading NGO details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{ngo.name}</h1>
      <img src={ngo.logoUrl} alt={ngo.name} />
      <p>{ngo.description}</p>
      {/* Thêm cả thông tin khác mà bạn muốn hiển thị về NGO */}
    </div>
  );
};

export default NgoDetail;
