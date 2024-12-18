import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./News.css";

const New = () => {
  const newItems = [
    {
      id: 1,
      title: "New Product 1",
      description:
        "This is a detailed description of the new product. It has amazing features and offers great value for the price. You can check it out now to see all its features.",
      image: "https://via.placeholder.com/400x250", // Thêm hình ảnh cho sản phẩm
      date: "2024-11-20",
      link: "/product/1",
    },
    {
      id: 2,
      title: "New Blog Post 1",
      description:
        "Learn more about the latest trends in technology, how AI is shaping the future, and what steps you can take to prepare for this change. Don't miss this insightful post!",
      image: "https://via.placeholder.com/400x250", // Thêm hình ảnh cho bài viết
      date: "2024-11-19",
      link: "/blog/1",
    },
    {
      id: 3,
      title: "New Product 2",
      description:
        "Explore our new product with amazing features and benefits. This product is designed to help you achieve better results and save time. Perfect for professionals and enthusiasts alike.",
      image: "https://via.placeholder.com/400x250", // Thêm hình ảnh cho sản phẩm
      date: "2024-11-18",
      link: "/product/2",
    },
  ];

  return (
    <div>
      <Header />
      <div className="new-about-banner">
        <h1>What's New</h1>
      </div>
      <div className="new-container">
        <section className="new-items">
          {newItems.map((item) => (
            <div className="new-item" key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className="new-item-image"
              />
              <div className="new-item-content">
                <h2>{item.title}</h2>
                <p className="date">{item.date}</p>
                <p>{item.description}</p>
                <a href={item.link} className="btn">
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default New;
