import React from "react";
import "./Slider.css"; // Đảm bảo bạn import file CSS ở đây
import Header from "../Header/Header";

const Slider = () => {
  const sliderRef = React.useRef(null);

  const activate = (e) => {
    const items = sliderRef.current.querySelectorAll(".item-slider");
    if (e.target.classList.contains("next-slider")) {
      sliderRef.current.append(items[0]);
    } else if (e.target.classList.contains("prev-slider")) {
      sliderRef.current.prepend(items[items.length - 1]);
    }
  };

  return (
    <div className="slider-container-slider">
      <Header />
      <ul className="slider-slider" ref={sliderRef}>
        {[
          {
            title: "Together, We Can Transform Lives",
            description:
              "Aim for community strength in supporting difficult situations.",
            image:
              "https://scontent.xx.fbcdn.net/v/t1.15752-9/472336735_1493795368186907_432249080599126556_n.png?stp=dst-png_s640x640&_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_ohc=EJfMkW0PG54Q7kNvgEAmmYG&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1gG52HYc5eFyoQTAVLcLILiHB61mWuRkbNzGyBAu6xBGew&oe=67A62C40",
          },
          {
            title:
              "Building a Brighter Tomorrow, One Act of Kindness at a Time",
            description: "Emphasize positive change through each small action",
            image:
              "https://scontent.xx.fbcdn.net/v/t1.15752-9/472303340_3828393274139217_1243827506585040785_n.png?stp=dst-png_s552x414&_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_ohc=mf-nZgs0Hv0Q7kNvgFv4SKV&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1gHAmtZJ4GJI9DBYelZiS01_L-0zetD5Xe2W6ED-1tTsAg&oe=67A61454",
          },
          {
            title: "Every Gift Counts Empowering Lives Through Generosity",
            description:
              "Celebrate the meaning and value of contributions, no matter how small or large.",
            image:
              "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--65e211ef-5bb7-4985-b3c6-c60ae21c37a4/human-trafficking.jpg.webp?preferwebp=true&width=760",
          },
          {
            title: "Creating a World Where No One Is Left Behind",
            description:
              "Aiming for a mission to eliminate inequality and bring opportunities to all.",
            image:
              "https://amity.keydesign.xyz/ngo/wp-content/uploads/sites/9/2024/03/home-ngo-donation-1.jpg",
          },
          {
            title: "Hope in Every Heart, Help in Every Hand",
            description:
              "Encourage the spirit of contribution from each individual to make a difference.",
            image:
              "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--ff9d8ac6-4055-413b-9856-8f44237efd59/mentoring-charities.jpg.webp?preferwebp=true&width=760",
          },
          {
            title: "Your Compassion, Their Hope",
            description: "Connect supporters with people receiving help.",
            image:
              "https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--ed426efd-bbb0-44ce-b7e1-0155fbbd71c1/girl_leaf_env.png.webp?preferwebp=true&width=760",
          },
        ].map((slide, index) => (
          <li
            className="item-slider"
            key={index}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="content-slider">
              <h2 className="title-slider">{slide.title}</h2>
              <p className="description-slider">{slide.description}</p>
              <button className="slider-more-slider">Read More</button>
            </div>
          </li>
        ))}
      </ul>
      <nav className="nav-slider">
        <button className="btn prev-slider" onClick={activate}>
          ❮
        </button>
        <button className="btn next-slider" onClick={activate}>
          ❯
        </button>
      </nav>
    </div>
  );
};

export default Slider;
