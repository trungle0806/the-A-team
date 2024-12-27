import React from "react";
import "./Contact.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="contact-section">
        <div className="contact-container">
          {/* Form liên hệ */}
          <div className="contact-form-section">
            <h3 className="contact-title">Contact Us</h3>
            <form className="contact-form">
              <div className="contact-name">
                {/* Name */}
                <div className="contact-field">
                  <label htmlFor="fullName" className="contact-label">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Name"
                    className="contact-input"
                  />
                </div>
                {/* Email */}
                <div className="contact-field">
                  <label htmlFor="email" className="contact-label">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="contact-input"
                  />
                </div>
              </div>
              {/* Subject */}
              <div className="contact-field">
                <label htmlFor="subject" className="contact-label">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  className="contact-input"
                />
              </div>
              {/* Message */}
              <div className="contact-field">
                <label htmlFor="message" className="contact-label">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  className="contact-textarea"
                ></textarea>
              </div>
              {/* Submit Button */}
              <button type="submit" className="contact-submit">
                Send Message
              </button>
            </form>
          </div>

          {/* Phần bản đồ */}
          <div className="contact-info-section">
            <div className="contact-map-error">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.09648430204!2d105.77971641151625!3d21.028825087694138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cd376479b%3A0xbc2e0bb9db373ed2!2zOGEgVMO0biBUaOG6pXQgVGh1eeG6v3QsIE3hu7kgxJDDrG5oLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSAxMDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1735056169933!5m2!1svi!2s"
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <div>
            <FaMapLocationDot className="contact-map" />

            <p>Address:</p>
            <span>8a tôn thất thuyết</span>
          </div>
          <div>
            <FaPhoneAlt className="contact-phone" />

            <p>Phone:</p>
            <span>+1235 2355 98</span>
          </div>
          <div>
            <MdEmail className="contact-email" />

            <p>Email:</p>
            <a href="mailto:info@yoursite.com">info@yoursite.com</a>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
