import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import "./Ngos.css";

const Ngos = () => {
  // Danh sách dữ liệu bài viết
  const newItems = [
    // Thêm dữ liệu bài viết của bạn tại đây
  
  ];

  // State để quản lý số lượng bài viết hiển thị
  const [visibleCount] = useState(3);

  return (
    <div>
      <Header />
      <div className="new-header">
        {/* Breadcrumb */}
        <div className="color">
          <div className="brand">
            <h1 className="new-h1">Ngos</h1>
          </div>

          {/* Header */}
          <div className="news-header">
            <div className="banner-image">
              <img
                src="https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--68b4c6a2-17fb-459c-b85e-17e5ee2c57d0/hivan-arvizu-soyhivan-MAnhvw0nDDY-unsplash.jpg.webp?preferwebp=true&width=760"
                alt="Banner"
              />
            </div>
            <div className="header-content">
              <h1>Thought Leadership & News</h1>
              <p>
                Beyond ratings, we want to ensure that you have access to
                essential information about the nonprofit sector and our work.
                Read our commentaries.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="new-container">
            <section className="new-items">
              {newItems.slice(0, visibleCount).map((item) => (
                <div className="new-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="new-item-image"
                  />
                  <div className="new-item-content">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Ngos;
