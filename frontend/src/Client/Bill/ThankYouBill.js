import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./ThankYouBill.css";

const ThankYouBill = () => {
  const { state } = useLocation();
  const { donationData } = state || {};
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  if (!donationData) {
    return <div>Loading...</div>;
  }

  const goToHome = () => {
    navigate("/home"); // Navigate to the home page
  };

  return (
    <div className="container">
      <div className="logo-chartity">
        <img src={donationData.logoUrl} alt="Give-AID Logo" />
      </div>
      <div className="header">
        <h1>Thank You!</h1>
        <p>Your donation helps us make a positive change.</p>
      </div>
      <div className="details">
        <p>
          <span className="label">Donor:</span>{" "}
          {donationData.donorName}
        </p>
        <p>
          <span className="label">Email:</span> {donationData.donorEmail}
        </p>
        <p>
          <span className="label">Organization:</span> Give-AID
        </p>
        <p>
          <span className="label">Donation Amount:</span>{" "}
          {donationData.donationAmount} $
        </p>
        <p>
          <span className="label">Donation Date:</span>{" "}
          {donationData.donationDate}
        </p>
        <p>
          <span className="label">Payment Method:</span>{" "}
          {donationData.paymentMethod}
        </p>
      </div>
      <div className="thank-ted">
      <p>
        Thank you for trusting us, we wish you all the best.
        </p>
        <a onClick={goToHome} className="go-home-btn">
          Go Back to Home
        </a>
      </div>
      <div className="footer1">
        <p>
          Visit <a href="https://give-aid.org">Give-AID.org</a> to learn more
          about our activities.
        </p>
        <p>Once again, we sincerely thank you!</p>
      </div>
    </div>
  );
};

export default ThankYouBill;
