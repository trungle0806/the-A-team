import React from "react";  
import { Link } from "react-router-dom";  
import "./Footer.css";  

const Footer = () => {  
  const sections = [  
    {  
      title: "Resources",  
      links: [  
        { to: "/press-room", label: "Press Room" },  
        { to: "/financials", label: "Financials and Policies" },  
        { to: "/privacy", label: "Privacy Policy" },  
        { to: "/terms", label: "Terms of Use" },  
        { to: "/faqs", label: "FAQs/Contact Us" },  
      ],  
    },  
    {  
      title: "About Us",  
      links: [  
        { to: "/about", label: "Our Team" },  
        { to: "/careers", label: "Careers" },  
        { to: "/api", label: "API" },  
        { to: "/sponsorship", label: "Sponsorship" },  
      ],  
    },  
  ];  

  return (  
    <div className="footer">  
      <div className="footer-content">  
        <div className="footer-logo">  
          <h1>Charity Navigator</h1>  
          <p>299 Market Street, Suite 250 Saddle Brook, NJ 07663</p>  
        </div>  

        {sections.map((section, idx) => (  
          <div key={idx} className="footer-section">  
            <h3>{section.title}</h3>  
            <ul>  
              {section.links.map((link, idx) => (  
                <li key={idx}>  
                  <Link to={link.to}>{link.label}</Link>  
                </li>  
              ))}  
            </ul>  
          </div>  
        ))}  

        <div className="footer-section subscribe">  
          <h3>Sign up for donor tips and resources</h3>  
          <input type="text" placeholder="First name" />  
          <input type="text" placeholder="Last name" />  
          <input type="email" placeholder="Email" />  
          <button>Sign up now</button>  
        </div>         
      </div>  

      <div className="footer-bottom">  
        <p>&copy; 2024 Charity Navigator. All rights reserved.</p>  
      </div>  
    </div>  
  );  
};  

export default Footer;