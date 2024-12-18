import React, { useEffect } from "react";
import "./Home.css";
import Slider from "../../Components/Slider/Slider";
import ProductList from "../../Components/ProductList/ProductList";
// import Sale from "./Sale/Sale";
import Fifty from "./Fifty/Fifty"
import List from "./List/List";
import Promotions from "./Promotions/Promotions";
import Banner from "./Banner/Banner";
import Basics from "./Basics/Basics";
import Give from "./Give/Give";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  // useEffect(() => {
  //   const target = document.querySelector(".featured-product");
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           target.classList.add("active");
  //         }
  //       });
  //     },
  //     { threshold: 0.5 }
  //   );

  //   if (target) observer.observe(target);

  //   return () => {
  //     if (target) observer.unobserve(target);
  //   };
  // }, []);

  // const manufacturers = [
  //   {
  //     name: "Tác giả 1",
  //     logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu4En8GYWCWIReBHza7ivh8cECi5of8CTjeQ&s",
  //     birthDate: "12/04/1997",
  //     hometown: "Mỹ",
  //     currentJob: "Nhà Thiết kế",
  //   },
  //   {
  //     name: "Tác giả 2",
  //     logo: "https://thejulius.com.vn/wp-content/uploads/2021/07/nha-thiet-ke-thoi-trang6.webp",
  //     birthDate: "02/06/1989",
  //     hometown: "Canada",
  //     currentJob: "Người mẫu ",
  //   },
  //   {
  //     name: "Tác giả 3",
  //     logo: "https://m.yodycdn.com/products/ValentinoGaravani_lysfqsoyv23ih1rbph.jpg",
  //     birthDate: "15/09/1992",
  //     hometown: "Anh",
  //     currentJob: "Nhà sáng lập Zent Blog",
  //   },
  // ];

  // const allProducts = [
  //   {
  //     name: "Product 1",
  //     price: 99,
  //     image:
  //       "https://atinproduction.com/wp-content/uploads/2021/07/AWP01220-scaled-1280x1920.jpg",
  //   },
  //   {
  //     name: "Product 2",
  //     price: 79,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLPa8z6mwhHhWLfYm3VZeUhyOgFve0DJsZHUCf15JJlJ2Kw1a9JA1peYkLJ43Few1YFBA&usqp=CAU",
  //   },
  //   {
  //     name: "Product 3",
  //     price: 49,
  //     image:
  //       "https://hoanganhhalong.com.vn/sites/default/files/bi_quyet_chup_anh_san_pham_dep_dang_website_nhu_studio_chi_voi_01_chiec_dien_thoai.8.jpg",
  //   },
  //   { name: "Product 4", price: 199, image: "https://via.placeholder.com/150" },
  //   { name: "Product 5", price: 29, image: "https://via.placeholder.com/150" },
  //   { name: "Product 6", price: 59, image: "https://via.placeholder.com/150" },
  //   { name: "Product 7", price: 89, image: "https://via.placeholder.com/150" },
  //   { name: "Product 8", price: 109, image: "https://via.placeholder.com/150" },
  //   { name: "Product 9", price: 39, image: "https://via.placeholder.com/150" },
  //   { name: "Product 10", price: 69, image: "https://via.placeholder.com/150" },
  // ];

  return (
    <div>
      <Slider />
      <section className="featured-product">
        <Fifty/>
        {/* <Sale /> */}
        {/* <div className="product-image">
          <img
            className="product-image-1"
            alt={featuredProduct.name}
            src={featuredProduct.image}
          />
        </div>
        <div className="product-info">
          <h2>Featured Product</h2>

          <h3>{featuredProduct.name}</h3>
          <p>{featuredProduct.description}</p>
        </div> */}
      </section>
      <section className="manufacturers">
        <Promotions />
        {/* <h2>Famous Manufacturers</h2>
        <div className="manufacturer-list">
          {manufacturers.map((manufacturer, index) => (
            <div key={index} className="manufacturer">
              <img
                src={manufacturer.logo}
                alt={`Logo of ${manufacturer.name}`}
                className="manufacturer-logo"
              />
              <p>
                <strong>{manufacturer.name}</strong>
              </p>
              <p>Birth Date: {manufacturer.birthDate}</p>
              <p>Hometown: {manufacturer.hometown}</p>
              <p>Current Job: {manufacturer.currentJob}</p>
            </div>
          ))}
        </div> */}
      </section>
      {/* <ProductList title="All Products" products={allProducts} /> */}
      <List />
      <Banner />
      <Basics />
      <Give/>
      <Footer />
    </div>
  );
};

export default Home;
