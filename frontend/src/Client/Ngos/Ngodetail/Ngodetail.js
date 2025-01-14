import React, { useState, useEffect } from "react";  
import { useParams, Link } from "react-router-dom";  
import axios from "axios";  
import "./NgoDetail.css"; // Đảm bảo đã import file CSS  
import Header from "../../Components/Header/Header";  
import Footer from "../../Components/Footer/Footer";  

const NgoDetail = () => {  
  const { id } = useParams(); // Lấy id từ URL  
  const [ngo, setNgo] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState("");  
  const [ngos, setNgos] = useState([]); // State để lưu trữ danh sách NGO khác  
  const [currentIndex, setCurrentIndex] = useState(0); // State để theo dõi chỉ số hiện tại  

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

    const fetchNgos = async () => {  
      try {  
        const response = await axios.get("http://localhost:5024/api/ngo");  
        if (Array.isArray(response.data.$values)) {  
          setNgos(response.data.$values); // Lưu danh sách NGO vào state  
        } else {  
          setNgos([]); // Nếu không có dữ liệu, khởi tạo danh sách trống  
        }  
      } catch (error) {  
        console.error("Failed to load NGOs:", error);  
      }  
    };  

    fetchNgoDetail(); // Gọi API khi component mount  
    fetchNgos(); // Gọi API để lấy danh sách NGOs  

  }, [id]); // Dependency array để gọi lại API khi id thay đổi  

  if (loading) return <p>Loading NGO details...</p>; // Hiển thị khi đang tải dữ liệu  
  if (error) return <p>{error}</p>; // Hiển thị khi có lỗi  

  const nextPage = () => {  
    if (currentIndex < ngos.length - 3) {  
      setCurrentIndex(currentIndex + 3);  
    }  
  };  

  const prevPage = () => {  
    if (currentIndex > 0) {  
      setCurrentIndex(currentIndex - 3);  
    }  
  };  

  return (  
    <div className="NgoDetail-container">  
      <Header />  
      <div className="NgoDetail-big">  
        <div className="NgoDetail-main">  
          <div className="NgoDetail-img">  
            <img src={ngo?.logoUrl} alt={ngo?.name} className="NgoDetail-logo" />  
          </div>  
          <div className="NgoDetail-info">  
            <h1 className="NgoDetail-name">{ngo?.name}</h1>  
            <p className="NgoDetail-description">{ngo?.description}</p>  
          </div>  
        </div>  
      </div>  
      
      <div className="NgoDetail-section2">  
        <div className="NgoDetail-section1">  
          <div className="NgoDetail-section">  
            <h3>Achievements:</h3>  
            <p>{ngo?.achievements}</p>  
          </div>  
          <div className="NgoDetail-section">  
            <h3>Mission:</h3>  
            <p>{ngo?.mission || "Not available"}</p>  
          </div>  
          <div className="NgoDetail-section">  
            <h3>Team:</h3>  
            <p>{ngo?.team || "Not available"}</p>  
          </div>  
          <div className="NgoDetail-section">  
            <h3>Careers:</h3>  
            <p>{ngo?.careers || "Not available"}</p>  
          </div>  
          <div className="NgoDetail-section">  
            <h3>Email:</h3>  
            <p>{ngo?.email}</p>  
          </div>  
          <div className="NgoDetail-section">  
            <h3>Approved:</h3>  
            <p>{ngo?.isApproved ? "Yes" : "No"}</p>  
          </div>  
        </div>  
      </div>  

      {/* Phần danh sách NGOs khác với điều hướng */} 
      <section className="new-itemss">  
        <h2>Other NGOs</h2>  
        <div className="ngo-slider">  
          <button   
            className="arrow arrow-left"   
            onClick={prevPage}   
            disabled={currentIndex === 0}  
          >  
            &#10094; {/* Mũi tên trái */}  
          </button>  
          <div   
            className="ngo-slider-content"   
            style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }} // Di chuyển nội dung  
          >  
            {ngos.map((ngoItem) => {  
              const ngoId = ngoItem.ngoId;   
              return (  
                <div className="new-item" key={ngoId}> 
                  {/* <div className="news-itemss"></div>  */}
                  <Link to={`/ngos/${ngoId}`}>  
                    <img  
                      src={ngoItem.logoUrl || "fallback-image-url.jpg"}  
                      alt={ngoItem.name}  
                      className="new-item-image"  
                    />  
                    <div className="new-item-content">  
                      <h2>{ngoItem.name}</h2>  
                      <p>{ngoItem.description}</p>  
                    </div>  
                  </Link>  
                </div>  
              );  
            })}  
          </div>  
          <button   
            className="arrow arrow-right"   
            onClick={nextPage}   
            disabled={currentIndex + 3 >= ngos.length}  
          >  
            &#10095; {/* Mũi tên phải */}  
          </button>  
        </div>  
      </section>  

      <Footer />  
    </div>  
  );  
};  

export default NgoDetail;