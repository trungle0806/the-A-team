import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { IoSearch } from "react-icons/io5";
import "./News.css";

const New = () => {
  // Danh sách dữ liệu bài viết
  const newItems = [
    {
      id: 1,
      title: "Juneteenth: A Call to Action for Donors",
      description:
        "Consider donating to Black-founded nonprofits in support of Juneteenth.",
      image:
        "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--b95df872-67bd-42e9-8019-84eb7d632c09/juneteenth.jpg.webp?width=760&preferwebp=true",
      link: "/product/1",
    },
    {
      id: 2,
      title: "Factoring COVID-19 into Charity Ratings",
      description:
        "Learn how COVID-19 impacts charity ratings and what steps you can take.",
      image:
        "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--80aaa591-befc-46e9-8153-dbdb3ca184c5/covid-people.jpg.webp?preferwebp=true&width=760",
      link: "/blog/1",
    },
    {
      id: 3,
      title: "Finding and Evaluating Effective Nonprofits",
      description:
        "Explore how to evaluate nonprofits effectively and make informed decisions.",
      image:
        "https://www.charitynavigator.org/about-us/news-thought-leadership/2024-finding-and-evaluating-effective-nonprofits/_jcr_content/root/container/container/container/image.coreimg.85.1600.png/1730397665040.png",
      link: "/product/2",
    },
    {
      id: 4,
      title: "Embracing Iteration: Fall Methodology Update 2023",
      description:
        "Charity Navigator is thrilled to unveil its revamped Accountability & Finance methodology.",
      image:
        "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--b8d1c55f-3528-4e65-b743-d8f016b9a698/financials.jpg.webp?preferwebp=true&width=760",
      link: "/blog/2",
    },
    {
      id: 5,
      title: "How do Charity Navigator Users Plan to Give in 2023?",
      description: "Helpful donating insights from 356 individuals.",
      image:
        "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--661ee443-92f4-4507-aa70-64f4d9eab691/plantogive23.jpg.webp?preferwebp=true&width=760",
      link: "/blog/3",
    },
    {
      id: 6,
      title: "Reflecting on 2023: A Year of Challenges and Growth",
      description:
        "A message from Michael Thatcher, President & CEO, Charity Navigator.",
      image:
      "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--0c905c98-aa8a-41a7-aa22-6cb502751975/Michael-and-Dugans-Edit.png.webp?preferwebp=true&width=760",
      link: "/blog/4",
    },
    {
      id: 7,
      title: "Donors Prefer Charities that Earn All Four Beacons",
      description:
        "Two years ago, Charity Navigator introduced the Encompass Rating System.",
        image:"https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--80b14e07-c5b7-401c-903f-8585e4da2582/donor-prefs.jpg.webp?preferwebp=true&width=760",
      link: "/blog/5",
    },
    {
      id: 8,
      title: "Advisories are now Alerts: Here’s Why…",
      description:
        "Alerts ensure donors have the relevant information to make more informed choices about their charitable support..",
      image:"https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--d1f36a8d-557e-4d8c-8ff0-eed8176dab29/woman_laptop.png.webp?preferwebp=true&width=760",
      link: "/blog/5",
    },
    {
      id: 9,
      title: " 2022 Holiday Giving Insights",
      description:
        "Charity Navigator surveyed 3011 donors and 853 charities to gain insights into how the 2022 giving season compared to 2021. These findings are not a comprehensive assessment of giving, but they can provide a window into the trends that shaped the season..",
      image:"https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--7881faca-a891-4771-83e2-abef405674cf/donate-for-the-holidays.jpg.webp?preferwebp=true&width=760",
      link: "/blog/5",
    },
  ];
  
  
  // State để quản lý số lượng bài viết hiển thị
  const [visibleCount, setVisibleCount] = useState(3);
  // State tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(newItems);

  // State để hiển thị gợi ý
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Hàm xử lý Load More
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.trim() === "") {
      setFilteredItems(newItems);
    } else {
      const results = newItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(results);
    }
  };

  // Hàm xử lý khi nhấp vào gợi ý
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false); // Ẩn gợi ý sau khi chọn
    const results = newItems.filter((item) =>
      item.title.toLowerCase().includes(suggestion.toLowerCase())
    );
    setFilteredItems(results);
  };


  return (
    <div>
      <Header />
      <div className="new-header">
      {/* Breadcrumb */}
      <div className="color">
      
        <div className="brand">
        <div className="search">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/about">About Us</a>
            <span>/</span>
            <span>Thought Leadership & News</span>             
          </div>        
          
          {/* <div className="search-bar-container">
              <input type="text" className="search-bar" placeholder="Tìm kiếm..." />
              <IoSearch className="search-icon-new" />                
          </div>          
          </div>    
        </div> */}
        {/* Thanh tìm kiếm */}
        <div className="search-bar-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setShowSuggestions(true)} // Hiển thị gợi ý khi focus
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Ẩn gợi ý khi blur (có delay để nhận click)
              />
              <IoSearch className="search-icon-new" />
              <div className="search-bar-container-1">
              {showSuggestions && searchTerm && (
                <ul className="suggestions-dropdown">
                  {newItems
                    .filter((item) =>
                      item.title.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .slice(0, 5) 
                    .map((item) => (
                      <li
                        key={item.id}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(item.title)}
                      >
                        {item.title}
                      </li>
                    ))}
                  {newItems.filter((item) =>
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length === 0 && (
                    <li className="no-suggestions">Không có gợi ý phù hợp</li>
                  )}
                </ul>
              )}
              </div>
            </div>
          </div>
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
              Beyond ratings, we want to ensure that you have access to essential
              information about the nonprofit sector and our work. Read our
              commentaries.
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
                  <a href={item.link} className="btn">
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </section>

          {/* Load More Button */}
          {visibleCount < newItems.length && (
            <div className="load-more-container">
              <button className="btn load-more" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </div>        
      </div>

      <Footer />
      </div>
    </div>
  );
};

export default New;