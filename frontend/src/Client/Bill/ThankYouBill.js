import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ThankYouBill.css";

const ThankYouBill = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
    console.log("State:", state);
    console.log("Donation Data:", state?.donationData);
      try{
        if (!state || !state.donationData) {
            const timer = setTimeout(() => {
                navigate("/"); // Redirect to home if no valid data
            }, 3000);
            return () => clearTimeout(timer);
         } // Cleanup timeout
        } catch (error) {
            console.error("Error during redirect or data fetching:", error);
        }
    }, [state, navigate]);

    if (!state || !state.donationData) {
        return (
            <div className="thank-you-container">
                <p>Invalid data. Redirecting to home...</p>
            </div>
        );
    }

    const { donationData } = state;

    const goToHome = () => {
        navigate("/"); // Navigate to home
    };

    return (
        <div className="thank-you-container">
            <div className="logo-charity">
                <img src={donationData.logoUrl || 'default-logo.png'} alt="Give-AID Logo" />
            </div>
            <div className="thank-you-header">
                <h1>Thank You!</h1>
                <p>Your donation helps us make a positive change.</p>
            </div>
            <div className="donation-details">
                <p>
                    <span className="label">Donor:</span> {donationData.donorName}
                </p>
                <p>
                    <span className="label">Donor Email:</span> {donationData.donorEmail}
                </p>
                <p>
                    <span className="label">Organization:</span> Give-AID
                </p>
                <p>
                    <span className="label">Donation Amount:</span> {donationData.donationAmount} $
                </p>
                <p>
                    <span className="label">Donation Date:</span> {donationData.donationDate}
                </p>
                <p>
                    <span className="label">Payment Method:</span> {donationData.paymentMethod}
                </p>
            </div>
            <div className="thank-you-note">
                <p>Thank you for trusting us, we wish you all the best.</p>
                <button onClick={goToHome} className="go-home-btn">
                    Go Back to Home
                </button>
            </div>
            <div className="thank-you-footer">
                <p>
                    Visit <a href="https://give-aid.org" target="_blank" rel="noopener noreferrer">Give-AID.org</a> to learn more about our activities.
                </p>
                <p>Once again, we sincerely thank you!</p>
            </div>
        </div>
    );
};

export default ThankYouBill;
