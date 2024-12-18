import React, { useState } from "react"; // Đảm bảo import useState từ React
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./Contact.css";

const Contact = () => {
  // Khai báo state cho form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Hàm xử lý sự kiện thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm xử lý khi form được gửi
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form (ví dụ: gọi API gửi email hoặc lưu vào cơ sở dữ liệu)
    console.log("Form Data:", formData);
  };

  return (
    <div>
      <Header />
      {/* Section for the image and the contact text */}
      <div className="contact-banner">
        <h1 className="contact-title">Contact Us</h1>
      </div>

      <div className="contact-container">
        <div className="contact-line">
          <section className="contact-info">
            <div className="contact-details">
              <h2>Our Contact Information</h2>
              <p>Address: 123 Main Street, City, Country</p>
              <p>Email: contact@company.com</p>
              <p>Phone: +123 456 7890</p>
            </div>
          </section>

          <section className="contact-form">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn-submit" type="submit">
                Send Message
              </button>
            </form>
          </section>
        </div>
        <div className="contact-map">
          <iframe
            width="800"
            height="500"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.09726409829!2d105.78011607503147!3d21.02879388062048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cd0c66f05%3A0xea31563511af2e54!2zOCBUw7RuIFRo4bqldCBUaHV54bq_dCwgTeG7uSDEkMOsbmgsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1732174599749!5m2!1sen!2s"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
