import { useState } from 'react';
import React from 'react';
import './Share.css'

const Share = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const values = [
        {
        title: "Leadership",
        content:
            "We dream big and strive toward making the seemingly impossible possible, lifting the sector as we go.",
        },
        { title: "Collaboration", content: "We collaborate internally and externally to accelerate our work and achieve more together." },
        { title: "Equity", content: "We stand for equity, diversity, and inclusion within our organization and through our evaluations and guidance." },
        { title: "Usefulness", content: "We provide fair, transparent evaluations, and valuable tools to enable a diverse set of donors to find and support an ever-greater number of nonprofits they can trust." },
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div>
            <div className='share-container'>
                <div className='share-cmp'>
                    <div className='share-aem'>
                        <div className='share-card'>
                            <div className='share-cardrow'>
                               <div className='share-wrapper'>
                                <div className='share-header'>
                                    <div className='share-title'></div>
                                </div>
                                <div className='share-row'>
                                    <ul className='share-active'>
                                        <li className='share-Item'>
                                            <div className='share-content'>
                                                <a className='share-discover' href=''></a>
                                                <div className='share-image'>
                                                <picture className=''>
                                                    <img className='share-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--c144907a-b0c4-4d7e-83e7-757f241e2c40/methodology.jpg.webp?preferwebp=true&width=760'
                                                    alt="Charity Navigator team in discussion"></img>
                                                </picture>
                                                </div>
                                                <div className='share-description'>
                                                    <div className='share-ton'>Our Methodology</div>
                                                    <div className='share-date'> Find out how we rate charities, issue Advisories, and curate lists of organizations working across various causes and issues.</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='share-Item'>
                                            <div className='share-content'>
                                                <a className='share-discover' href=''></a>
                                                <div className='share-image'>
                                                <picture className=''>
                                                    <img className='share-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--d4335958-80ac-4a76-abe5-63cd1cb650cf/CharityNavGC-46.jpg.webp?preferwebp=true&width=760'
                                                    alt="Charity Navigator staff with logo"></img>
                                                </picture>
                                                </div>
                                                <div className='share-description'>
                                                    <div className='share-ton'>Our Team</div>
                                                    <div className='share-date'> Get to know the people who keep Charity Navigator moving ahead.</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='share-Item'>
                                            <div className='share-content'>
                                                <a className='share-discover' href=''></a>
                                                <div className='share-image'>
                                                <picture className=''>
                                                    <img className='share-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--a8cf0f75-86a5-41b4-a8e4-ffb9ba485af0/thought-leadership.jpg.webp?preferwebp=true&width=760'
                                                    alt="Charity Navigator President & CEO providing direction"></img>
                                                </picture>
                                                </div>
                                                <div className='share-description'>
                                                    <div className='share-ton'>Thought Leadership & News</div>
                                                    <div className='share-date'>Find out what’s new at Charity Navigator—and get an insightful look at the future of charitable giving.</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='share-Item'>
                                            <div className='share-content'>
                                                <a className='share-discover' href=''></a>
                                                <div className='share-image'>
                                                <picture className=''>
                                                    <img className='share-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--b8d1c55f-3528-4e65-b743-d8f016b9a698/financials.jpg.webp?preferwebp=true&width=760'
                                                    alt="People reviewing financial performance"></img>
                                                </picture>
                                                </div>
                                                <div className='share-description'>
                                                    <div className='share-ton'>Financials and Policies</div>
                                                    <div className='share-date'> Learn how we steward your contribution to advance the ratings and resources millions of donors use to inform their giving.</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='share-Item'>
                                            <div className='share-content'>
                                                <a className='share-discover' href=''></a>
                                                <div className='share-image'>
                                                <picture className=''>
                                                    <img className='share-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--cf7cff4b-e519-4e77-a040-bde7f23d76b7/careers_apply.jpg.webp?preferwebp=true&width=760'
                                                    alt="Woman applying for a job"></img>
                                                </picture>
                                                </div>
                                                <div className='share-description'>
                                                    <div className='share-ton'>Careers</div>
                                                    <div className='share-date'>Discover opportunities to work at Charity Navigator and apply today.</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='share-Item'>
                                            <div className='share-content'>
                                                <a className='share-discover' href=''></a>
                                                <div className='share-image'>
                                                <picture className=''>
                                                    <img className='share-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--1c6a4273-631d-4cd5-ac29-29f41e0ac6ca/press-room.jpg.webp?preferwebp=true&width=760'
                                                    alt="Podcast host interviewing person"></img>
                                                </picture>
                                                </div>
                                                <div className='share-description'>
                                                    <div className='share-ton'>Press Room</div>
                                                    <div className='share-date'> Explore our recent press coverage.</div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='our-container'>
                <div className='our-cmp'>
                    <div className='our-aem'>
                        <div className='our-text'>
                            <div className='our-data'>
                                <h2 className='our-about'>Our Values</h2>
                                <p></p>
                                <p>
                                    <span className='our-para'>These are the beliefs and principles that guide Charity Navigator and our team.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion">
           {values.map((value, index) => (
           <div className="accordion-item" key={index}>
             <div
               className="accordion-title"
               onClick={() => toggleAccordion(index)}
             >
               <h3>{value.title}</h3>
               <span>{activeIndex === index ? "–" : "+"}</span>
             </div>
             {activeIndex === index && (
               <div className="accordion-content">
                 <p>{value.content}</p>
               </div>
             )}
           </div>
         ))}
       </div>

        </div>
    );
};

export default Share;

// import React, { useState } from "react";
// import "./ValuesAccordion.css";

// const ValuesAccordion = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const values = [
//     {
//       title: "Khả năng lãnh đạo",
//       content:
//         "Chúng tôi có những ước mơ lớn và nỗ lực biến điều không thể thành có thể, đồng thời thúc đẩy ngành này phát triển.",
//     },
//     { title: "Sự hợp tác", content: "Chúng tôi đề cao tinh thần hợp tác và đoàn kết trong mọi hoạt động." },
//     { title: "Công bằng", content: "Chúng tôi đảm bảo sự công bằng và minh bạch trong mọi quyết định." },
//     { title: "Tính hữu ích", content: "Chúng tôi luôn hướng tới giá trị mang lại lợi ích thiết thực nhất cho cộng đồng." },
//   ];

//   const toggleAccordion = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="values-section">
//       <h2>Giá trị của chúng tôi</h2>
//       <p>
//         Đây là những niềm tin và nguyên tắc hướng dẫn Charity Navigator và nhóm của chúng tôi.
//       </p>
//       <div className="accordion">
//         {values.map((value, index) => (
//           <div className="accordion-item" key={index}>
//             <div
//               className="accordion-title"
//               onClick={() => toggleAccordion(index)}
//             >
//               <h3>{value.title}</h3>
//               <span>{activeIndex === index ? "–" : "+"}</span>
//             </div>
//             {activeIndex === index && (
//               <div className="accordion-content">
//                 <p>{value.content}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ValuesAccordion;