import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    // <footer className="footer">
    //   <div className="footer-container">
    //     {/* Logo and Address Section */}
    //     <div className="footer-left">
    //       <img
    //         src="https://www.charitynavigator.org/content/dam/cn/cn/logos/CharityNav_Logo_Hor1.png"
    //         alt="Charity Navigator Logo"
    //         className="footer-logo"
    //       />
    //       <address className="footer-address">
    //         299 Market Street, Suite 250<br />
    //         Saddle Brook, NJ 07663
    //       </address>
    //       <div className="footer-certifications">
    //         <img
    //           src="https://via.placeholder.com/80x40?text=4-Star"
    //           alt="4-Star Rating"
    //           className="certification-badge"
    //         />
    //         <img
    //           src="https://via.placeholder.com/80x40?text=BBB"
    //           alt="BBB Accredited Charity"
    //           className="certification-badge"
    //         />
    //         <img
    //           src="https://via.placeholder.com/80x40?text=Platinum"
    //           alt="Platinum Transparency 2024"
    //           className="certification-badge"
    //         />
    //       </div>
    //     </div>

    //     <div className="footer-center1">
    //     {/* Signup Form Section */}
    //     <div className="footer-center">
    //       <h3 className="footer-title">Sign up for donor tips and resources</h3>
    //       <form className="footer-form">
    //         <input type="text" placeholder="First name" required />
    //         <input type="text" placeholder="Last name" required />
    //         <input type="email" placeholder="Email" required />
    //         <button type="submit">Sign up now</button>
    //       </form>
    //     {/* Links Section */}
    //     <div className="footer-right">
    //       <div className="footer-links-group">
    //         <ul className="footer-links">
    //           <li><a href="#">Press Room</a></li>
    //           <li><a href="#">Financials and Policies</a></li>
    //           <li><a href="#">Privacy Policy</a></li>
    //           <li><a href="#">Terms of Use</a></li>
    //         </ul>
    //         <ul className="footer-links1">
    //           <li><a href="#">FAQs/Contact Us</a></li>
    //           <li><a href="#">Our Team</a></li>
    //           <li><a href="#">Careers</a></li>
    //           <li><a href="#">API</a></li>
    //           <li><a href="#">Sponsorship</a></li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Social Media and Copyright Section */}
    //   <div className="footer-bottom">
    //     <div className="footer-social">
    //       <a href="#"><i className="fab fa-facebook-f"></i></a>
    //       <a href="#"><i className="fab fa-twitter"></i></a>
    //       <a href="#"><i className="fab fa-instagram"></i></a>
    //       <a href="#"><i className="fab fa-youtube"></i></a>
    //       <a href="#"><i className="fab fa-linkedin-in"></i></a>
    //     </div>
    //     <p className="footer-copyright">
    //       Copyright ©2024 | EIN 13-4148824 | Bridge ID 3108588923
    //     </p>
    //   </div>
    //   </div>
    //   </div>
    // </footer>
    <footer class="footer">
      <div class="footer-container">
        <div className="footer-container-inner">
          {/* <!-- Bên trái --> */}
          <div class="footer-left">
            <img
              src="https://www.charitynavigator.org/content/experience-fragments/cn/us/en/site/footer/master/_jcr_content/root/container/responsivegrid_480299858/image.coreimg.svg/1672845994119/charitynav-logo-stack-white.svg"
              alt="Charity Navigator Logo"
              class="footer-logo"
            />
            <address class="footer-address">
              299 Market Street, Suite 250
              <br />
              Saddle Brook, NJ 07663
            </address>
            <div class="footer-certifications">
              <img
                src="https://www.charitynavigator.org/content/experience-fragments/cn/us/en/site/footer/master/_jcr_content/root/container/responsivegrid/image_455696160.coreimg.svg/1683206826996/four-star-rating-badge.svg"
                alt="4-Star Rating"
                class="certification-badge"
              />
              <img
                src="https://www.charitynavigator.org/content/experience-fragments/cn/us/en/site/footer/master/_jcr_content/root/container/responsivegrid/image_455696160_copy.coreimg.svg/1657197394245/ac-s-cmyk-h-reversedwhite-w-url-01.svg"
                alt="BBB Accredited Charity"
                class="certification-badge"
              />
              <img
                src="https://www.charitynavigator.org/content/experience-fragments/cn/us/en/site/footer/master/_jcr_content/root/container/responsivegrid/image_455696160_copy_1447565194.coreimg.85.1600.png/1730747908297/candid-seal-platinum-2024.png"
                alt="Platinum Transparency 2024"
                class="certification-badge1"
                class="certification-badge"
              />
            </div>
          </div>
          {/* <!-- Bên phải --> */}
          <div class="footer-right">
            <h3 class="footer-title">Sign up for donor tips and resources</h3>
            <form class="footer-form">
              <input type="text" placeholder="First name" required />
              <input type="text" placeholder="Last name" required />
              <input type="email" placeholder="Email" required />
              <button type="submit">Sign up now</button>
            </form>
            <div class="footer-links-group">
              <ul class="footer-links">
                <li>
                  <a href="#">Press Room</a>
                </li>
                <li>
                  <a href="#">Financials and Policies</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
              </ul>
              <ul class="footer-links">
                <li>
                  <a href="#">FAQs/Contact Us</a>
                </li>
                <li>
                  <a href="#">Our Team</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">API</a>
                </li>
                <li>
                  <a href="#">Sponsorship</a>
                </li>
              </ul>
            </div>
            <div class="footer-social">
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-youtube"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        Copyright ©2024 | EIN 13-4148824 | Bridge ID 3108588923
      </div>
    </footer>
  );
};

export default Footer;
