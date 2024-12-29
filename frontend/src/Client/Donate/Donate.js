import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FaBullseye, FaHandHoldingHeart, FaClock, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import "./Donate.css";
import { GoOrganization } from "react-icons/go";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Donate = () => {
    const { programId } = useParams();
    const { auth } = useAuth();
    const [program, setProgram] = useState(null);
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [isPaymentSelected, setIsPaymentSelected] = useState(false);

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5024/api/program1/${programId}`
                );
                setProgram(response.data);
            } catch (err) {
                console.error("Failed to fetch program details.");
            }
        };

        fetchProgram();
    }, [programId]);

    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value) || "";
        if (value < 0) {
            setError("Amount must be greater than zero.");
        } else {
            setError("");
        }
        setAmount(value);
    };

    const handleSuccess = async (details) => {
        try {
            await axios.post("http://localhost:5024/api/ProgramDonation", {
                programId,
                customerId: auth.token,
                amount,
                paymentStatus: "Completed",
                transactionId: details.id,
            });
            alert("Donation successful! Thank you for your support.");
            setAmount("");
            setIsPaymentSelected(false);
        } catch (err) {
            console.error("Donation processing failed.");
            alert("Donation processing failed. Please try again.");
        }
    };

    const calculateDonationDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate || new Date());
        return Math.ceil((end - start) / (1000 * 3600 * 24));
    };

    const calculateRemainingDays = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        return Math.ceil((end - today) / (1000 * 3600 * 24));
    };

    const getUniqueDonorsCount = (donations) => {
        const donationsArray = donations?.$values || [];
        const donorIds = donationsArray.map(donation => donation.customerId);
        return new Set(donorIds).size;
    };

    if (!program) return <div className="loading">Loading...</div>;

    const totalDonationDays = calculateDonationDays(program.startDate, program.endDate);
    const remainingDonationDays = calculateRemainingDays(program.endDate);
    const organizationName = program.ngo?.name || "No organization";

    return (
        <PayPalScriptProvider
            options={{
                "client-id": "AQV2ly1LbulZS2pYX3Vmdf2FB9kT3StwDS_sSXfMfKnQjplYj9ZvP8Y1PVY9VpB5jk_zi7ua81Vsty57",
                currency: "USD",
            }}
        >
            <Header />
            <div className="favorites-banner">
                <h1>Donate</h1>
            </div>
            <div className="donate-container">
                <div className="target-progress">
                    <h1 className="donate-title">
                        <FaBullseye /> {program.name || "No name available."}
                    </h1>
                    <p className="donate-description">
                        <GoOrganization /> {organizationName}
                    </p>
                    <p className="donate-description">
                        <FaHandHoldingHeart /> {program.description || "No description available."}
                    </p>
                    <p className="target-amount">
                        <AiOutlineDollarCircle /> Target: {program.targetAmount?.toFixed(2) || "0.00"}
                    </p>
                    <p className="total-donated">
                        <FaHandHoldingHeart /> Total Donated: {program.totalDonatedAmount?.toFixed(2) || "0.00"}
                    </p>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${program.percentageAchieved}%` }}></div>
                    </div>
                    <p className="progress-percentage">
                        Percentage Achieved: {program.percentageAchieved?.toFixed(2)}%
                    </p>

                    <div className="donation-stats">
                        <div className="stat-box">
                            <FaUsers className="icon" />
                            <span className="stat-label">Total Donors:</span>
                            <span className="stat-value">{getUniqueDonorsCount(program.donations)}</span>
                        </div>
                        <div className="stat-box">
                            <FaClock className="icon" />
                            <span className="stat-label">Total Days of Donation:</span>
                            <span className="stat-value">{totalDonationDays}</span>
                        </div>
                        <div className="stat-box">
                            <FaCalendarAlt className="icon" />
                            <span className="stat-label">Current Date:</span>
                            <span className="stat-value">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="stat-box">
                            <FaCalendarAlt className="icon" />
                            <span className="stat-label">Donation End Date:</span>
                            <span className="stat-value">{new Date(program.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="stat-box">
                            <FaClock className="icon" />
                            <span className="stat-label">Remaining Days:</span>
                            <span className="stat-value">{remainingDonationDays}</span>
                        </div>
                    </div>
                </div>

                <div className="donate-paypal">

                <div className="donation-input-section">
                    {isPaymentSelected && (
                        <>
                            <input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="Enter amount"
                                min="0.01"
                                step="0.01"
                                className="donation-amount-input"
                            />
                            {error && <p className="error-message">{error}</p>}
                        </>
                    )}
                </div>
                <div className="payment-button">
                    <button
                        onClick={() => setIsPaymentSelected(true)}
                        disabled={false} // Always enable this button to toggle the input visibility.
                    >
                        Donate Now
                    </button>
                </div>
                </div>




                {isPaymentSelected && amount > 0 && !error && (
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{ amount: { value: amount.toString() } }],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then(handleSuccess);
                        }}
                        onError={(err) => {
                            console.error("PayPal transaction error: ", err);
                            alert("An error occurred during the transaction. Please try again.");
                        }}
                    />
                )}
            </div>
            <Footer />
        </PayPalScriptProvider>
    );
};

export default Donate;
