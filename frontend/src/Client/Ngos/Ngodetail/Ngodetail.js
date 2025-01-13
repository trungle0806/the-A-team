import React from 'react';
import './Ngodetail.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function Ngodetail() {
  const ngo = {
    name: "Hope Food Charity Organization",
    logoUrl: "https://example.com/logo.jpg", // Thay bằng URL logo thực tế
  };

  // Giả sử ngos là một mảng dữ liệu từ API hoặc từ state
  const ngos = {
    $values: [
      {
        NGOId: 1,
        name: "Love and Care Foundation",
        logoUrl: "https://example.com/logo1.jpg",
        description: "Providing shelter and education to orphaned children."
      },
      {
        NGOId: 2,
        name: "Green Earth Initiative",
        logoUrl: "https://example.com/logo2.jpg",
        description: "Promoting environmental sustainability and awareness."
      },
      {
        NGOId: 3,
        name: "Health for All",
        logoUrl: "https://example.com/logo3.jpg",
        description: "Ensuring access to basic healthcare in underdeveloped regions."
      }
    ]
  };

  return (
    <div>
      <Header />
      <div className="ngo-detail-container">
        <div className="ngodetail-img">
          <header className="ngo-header">
            <h1 className="ngo-title">{ngo.name}</h1>
            <p className="ngo-subtitle">
              Providing food and hope to those less fortunate.
            </p>
          </header>
          <div className="ngo-image">
            <img
              src={ngo.logoUrl}
              alt={ngo.name}
              className="new-item-image"
            />
          </div>
        </div>
        <div className="ngo-content">
          <div className="ngo-text">
            <h2>Our Mission</h2>
            <p>
              Hope Food Charity Organization was established with the goal of supporting those in need by providing free and safe food. We are committed to ensuring that no one has to go hungry.
            </p>
            <p>
              We work tirelessly to distribute food to communities in need while also raising awareness about nutrition and food safety.
            </p>
          </div>
          <div className="ngo-text">
            <h2>Notable Projects</h2>
            <ul>
              <li>
                <strong>"Meal of Love" Project</strong>: Providing hot meals every day to the homeless and elderly without caregivers.
              </li>
              <li>
                <strong>"Food for All" Program</strong>: Distributing essential food every week to underprivileged families in rural areas.
              </li>
              <li>
                <strong>"Emergency Food Box" Campaign</strong>: Providing emergency food supplies to areas affected by natural disasters or economic crises.
              </li>
            </ul>
          </div>
          <div className="ngo-text">
            <h2>We Need You</h2>
            <p>
              Every contribution, no matter how big or small, helps us continue our mission. Join us in providing food and hope to those who need it most.
            </p>
            <a href="http://localhost:3000/donate/3" className="donate-button">Donate Now</a>
          </div>

        </div>
        <div className="ngo-text">
            <h1>Other Charitable Organizations</h1>
            <section className="new-items">
              {ngos.$values.map((ngo) => (
                <div className="new-item" key={ngo.NGOId}>
                  <img
                    src={ngo.logoUrl} 
                    alt={ngo.name}
                    className="new-item-image"
                  />
                  <div className="new-item-content">
                    <h2>{ngo.name}</h2>
                    <p>{ngo.description}</p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        <Footer />
      </div>
    </div>
  );
}

export default Ngodetail;
