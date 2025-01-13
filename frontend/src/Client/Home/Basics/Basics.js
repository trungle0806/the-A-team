import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Basics.css";

const Basics = () => {
  const [ngos, setNgos] = useState([]); // State để lưu trữ danh sách NGOs
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(""); // Trạng thái lỗi

  useEffect(() => {
    // Lấy dữ liệu từ API
    const fetchNgos = async () => {
      try {
        const response = await axios.get("http://localhost:5024/api/ngo");
        setNgos(response.data.$values.slice(0, 3)); // Chỉ lấy 3 mục đầu tiên
      } catch (error) {
        setError("Failed to load NGOs.");
      } finally {
        setLoading(false);
      }
    };

    fetchNgos();
  }, []);

  return (
    <div className="basics-aem">
      <div className="basics-list">
        <div className="basics-card">
          <div className="basics-warp">
            <div className="basics-header">
              <div className="basics-title">Featured NGOs</div>
              <div className="basics-button">
                <a className="basics-a" href="/ngos">
                  See All NGOs
                </a>
              </div>
            </div>
            <div className="basics-cards">
              {loading ? (
                <p>Loading NGOs...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <ul className="basics-active">
                  {ngos.map((ngo) => (
                    <li className="basics-Item" key={ngo.NGOId}>
                      <div className="basics-content">
                        <div className="basics-image">
                          <img
                            className="basics-anh"
                            src={ngo.image} // Assuming `image` is a property in the API response
                            alt={ngo.name}
                          />
                          <div className="basics-overlay">
                            <div className="basics-title-overlay">
                              {ngo.name}
                            </div>
                          </div>
                        </div>
                        <div className="basics-description">
                          <div className="promp-ton">{ngo.name}</div>
                          <div className="basics-date">{ngo.description}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basics;
