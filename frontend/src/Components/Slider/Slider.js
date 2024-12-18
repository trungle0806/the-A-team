import React from "react";
import "./Slider.css"; // Đảm bảo bạn import file CSS ở đây
import Header from "../Header/Header";

const Slider = () => {
  const sliderRef = React.useRef(null);

  const activate = (e) => {
    const items = sliderRef.current.querySelectorAll(".item");
    if (e.target.classList.contains("next")) {
      sliderRef.current.append(items[0]);
    } else if (e.target.classList.contains("prev")) {
      sliderRef.current.prepend(items[items.length - 1]);
    }
  };

  return (
    <div className="slider-container">
      <Header />
      <ul className="slider" ref={sliderRef}>
        {[
          {
            title: "Together, We Can Transform Lives",
            description: "Aim for community strength in supporting difficult situations.",
            image:
              "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--1f13ca08-8080-4f0a-bbc8-e2cf06e045f0/hunger-services.png.webp?preferwebp=true&width=760",
          },
          {
            title: "Hope in Every Heart, Help in Every Hand",
            description: "Encourage the spirit of contribution from each individual to make a difference.",
            image:
              "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--97b706a2-b2d3-4d82-97e9-c337dad377e0/homeless_giving.png.webp?preferwebp=true&width=760",
          },
          {
            title: "Building a Brighter Tomorrow, One Act of Kindness at a Time",
            description: "Emphasize positive change through each small action",
            image:
              "https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/fsmsy/2024_06_16/ttxvn-tre-em-gaza-1855.jpg.webp",
          },
          {
            title: "Every Gift Counts Empowering Lives Through Generosity",
            description: "Celebrate the meaning and value of contributions, no matter how small or large.",
            image:
              "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--65e211ef-5bb7-4985-b3c6-c60ae21c37a4/human-trafficking.jpg.webp?preferwebp=true&width=760",
          },
          {
            title: "Creating a World Where No One Is Left Behind",
            description: "Aiming for a mission to eliminate inequality and bring opportunities to all.",
            image:
              "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--79434f55-4f45-4108-a045-1728c7d23bba/larm-rmah-AEaTUnvneik-unsplash1.jpg.webp?preferwebp=true&width=760",
          },
          {
            title: "Your Compassion, Their Hope",
            description: "Connect supporters with people receiving help.",
            image:
              "https://cdn.tuoitrethudo.vn/stores/news_dataimages/2023/032023/23/10/in_article/bai-nguoi-tre-120230323105950.jpg?rt=20230323105959",
          },
        ].map((slide, index) => (
          <li
            className="item"
            key={index}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="content">
              <h2 className="title">{slide.title}</h2>
              <p className="description">{slide.description}</p>
              <button className="slider-more">Read More</button>
            </div>
          </li>
        ))}
      </ul>
      <nav className="nav">
        <button className="btn prev" onClick={activate}>
          ❮
        </button>
        <button className="btn next" onClick={activate}>
          ❯
        </button>
      </nav>
    </div>
  );
};

export default Slider;
