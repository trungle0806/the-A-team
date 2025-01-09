import React, { useState, useEffect } from "react";
import { getNGOById } from "../Service/ngoService";  // Sử dụng named import

const NgoDetail = ({ ngoId }) => {
  const [ngo, setNgo] = useState(null);
  const [error, setError] = useState("");

  // Lấy thông tin chi tiết NGO
  useEffect(() => {
    const fetchNgo = async () => {
      try {
        const data = await getNGOById(ngoId);
        setNgo(data);
      } catch (err) {
        setError("Không thể tải thông tin chi tiết của NGO.");
      }
    };
    fetchNgo();
  }, [ngoId]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!ngo) {
    return <p>Đang tải thông tin...</p>;
  }

  return (
    <div>
      <h2>Thông tin NGO</h2>
      <p><strong>Tên:</strong> {ngo.name}</p>
      <p><strong>Mô tả:</strong> {ngo.description}</p>
      <p><strong>Mã:</strong> {ngo.code}</p>
      <p><strong>Logo URL:</strong> <a href={ngo.logoUrl} target="_blank" rel="noopener noreferrer">{ngo.logoUrl}</a></p>
      <p><strong>Sứ mệnh:</strong> {ngo.mission}</p>
      <p><strong>Đội ngũ:</strong> {ngo.team}</p>
      <p><strong>Công việc:</strong> {ngo.careers}</p>
      <p><strong>Thành tựu:</strong> {ngo.achievements}</p>
      <p><strong>Đã phê duyệt:</strong> {ngo.isApproved ? "Có" : "Không"}</p>
      <p><strong>Ngày tạo:</strong> {new Date(ngo.createdAt).toLocaleString()}</p>
      <p><strong>Cập nhật lần cuối:</strong> {new Date(ngo.updatedAt).toLocaleString()}</p>
    </div>
  );
};

export default NgoDetail;
