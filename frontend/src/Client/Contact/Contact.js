import React, { useState } from "react";
import "./Contact.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { TiSocialGooglePlus } from "react-icons/ti";
import { FaFacebookF } from "react-icons/fa";
import { RiLinkedinLine } from "react-icons/ri";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    // Kiểm tra nếu không có token thì hiển thị lỗi
    if (!token) {
      alert("Please login to send the message.");
      return;
    }

    // Gửi dữ liệu tới backend API
    try {
      const response = await fetch("http://localhost:5024/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
        body: JSON.stringify(formData), // Chuyển formData thành JSON
      });

      // Log phản hồi từ backend
      const responseData = await response.json();
      console.log("Response Data: ", responseData); // Để xem chi tiết

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(
          "Failed to send message: " + responseData.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message.");
    }
  };

  return (
    <div>
      <Header />
      <div className="contact-section">
        <div className="contact-banner">
          <h1>Contact Us</h1>
        </div>
        <div className="contact-container">
          <div className="contact-wrapper">
            <div className="contact-text">
              <div className="contact-address">
                <h3 className="contact-address1">ADDRESS</h3>
                <p className="contact-8a">8a Ton That Thuyet, Ha Noi</p>
              </div>
            </div>
            <div className="contact-text">
              <div className="contact-address">
                <h3 className="contact-address1">PHONE</h3>
                <p className="contact-8a">(+84)123456789</p>
              </div>
            </div>
            <div className="contact-text">
              <div className="contact-address">
                <h3 className="contact-address1">EMAIL</h3>
                <p className="contact-8a">Trung@gamil.com</p>
              </div>
            </div>
            <div className="contact-text">
              <h3 className="contact-info">Follow us on</h3>
              <ul className="contact-social">
                <li className="contact-line">
                  <a className="contact-ant" href="">
                    <i className="contact-face">
                      <FaFacebookF />
                    </i>
                  </a>
                </li>
                <li className="contact-line">
                  <a className="contact-ant" href="">
                    <i className="contact-face">
                      <RiLinkedinLine />
                    </i>
                  </a>
                </li>
                <li className="contact-line">
                  <a className="contact-ant" href="">
                    <i className="contact-face">
                      <BsInstagram />
                    </i>
                  </a>
                </li>
                <li className="contact-line">
                  <a className="contact-ant" href="">
                    <i className="contact-face">
                      <TiSocialGooglePlus />
                    </i>
                  </a>
                </li>
                <li className="contact-line">
                  <a className="contact-ant" href="">
                    <i className="contact-face">
                      <BsTwitterX />
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Phần bản đồ */}
          <div className="contact-info-section">
            <div className="contact-map-error">
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="contact-form-section1">
            <h3 className="contact-title">Contact Us</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form1">
                <div className="contact-name">
                  <div className="contact-field">
                    <label htmlFor="fullName" className="contact-label">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="contact-input"
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="email" className="contact-label">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="contact-input"
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="subject" className="contact-label">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject"
                      className="contact-input"
                    />
                  </div>
                </div>
                <div className="contact-field">
                  <label htmlFor="message" className="contact-label">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Message"
                    className="contact-textarea"
                  ></textarea>
                </div>
                <div className="contact-form2">
                  <button type="submit" className="contact-submit">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
