import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FaBullseye, FaHandHoldingHeart, FaClock, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { GoOrganization } from "react-icons/go";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import "./Donate.css";

const Donate = () => {
    const { programId } = useParams();
    const { auth } = useAuth();
    const [program, setProgram] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [isPaymentSelected, setIsPaymentSelected] = useState(false);
    const navigate = useNavigate();

    // Fetch program and customer details
    useEffect(() => {
        if (!auth.token) {
            navigate("/login"); // Redirect if not logged in
            return;
        }

        if (!programId) {
            navigate("/error"); // Redirect if programId is missing
            return;
        }

        const fetchProgram = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5024/api/program1/${programId}`
                );
                setProgram(response.data);
            } catch (err) {
                console.error("Failed to fetch program details.", err);
            }
        };

        const fetchCustomer = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5024/api/customer/get-customer-data`,
                    {
                        headers: { Authorization: `Bearer ${auth.token}` },
                    }
                );
                setCustomer(response.data);
            } catch (err) {
                console.error("Failed to fetch customer details.", err);
            }
        };

        fetchProgram();
        fetchCustomer();
    }, [programId, auth.token, navigate]);

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
            // Send donation details to the backend
            await axios.post(
                "http://localhost:5024/api/ProgramDonation",
                {
                    programId,
                    customerId: customer.customerId,
                    amount,
                    paymentStatus: "Completed",
                    transactionId: details.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );

            alert("Donation successful! Thank you for your support.");
            setAmount("");
            setIsPaymentSelected(false);

            // Navigate to Thank You Bill page
            navigate("/thank-you-bill", {
                state: {
                    donationData: {
                        donorName: `${customer.firstName || 'N/A'} ${customer.lastName || 'N/A'}`,
                        donorEmail: customer?.account?.email || 'N/A', // Ensure email is present
                        donationAmount: amount,
                        donationDate: new Date().toLocaleDateString(),
                        paymentMethod: "PayPal",
                        logoUrl: "https://path-to-your-logo",
                    },
                },
            });
        } catch (err) {
            console.error("Donation processing failed.", err);
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
        const donorIds = donationsArray.map((donation) => donation.customerId);
        return new Set(donorIds).size;
    };

    if (!program || !customer) return <div className="loading">Loading...</div>;

    const totalDonationDays = calculateDonationDays(program.startDate, program.endDate);
    const remainingDonationDays = calculateRemainingDays(program.endDate);
    const organizationName = program.ngo?.name || "No organization";
    const percentageAchieved =
        program.targetAmount > 0
            ? Math.min((program.totalDonatedAmount / program.targetAmount) * 100, 100)
            : 0;

    return (
        <PayPalScriptProvider
            options={{
                "client-id": "Aav1YKJFkaHRupG_cEWkSfWU0PhNiXEh0ejGI_0lstFJDzEQRvk-TQ9CzhdMytp_03I1JWJozf_YNSdd",
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
                        <div className="progress-bar" style={{ width: `${percentageAchieved}%` }}></div>
                    </div>
                    <p className="progress-percentage">
                        Percentage Achieved: {percentageAchieved.toFixed(2)}%
                    </p>
                    {program.excessAmount > 0 && (
                        <p className="excess-amount">
                            Excess Amount: ${program.excessAmount.toFixed(2)}
                        </p>
                    )}
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
                    <div className="payment-button">
                        <button onClick={() => setIsPaymentSelected(true)}>Donate Now</button>
                    </div>
                </div>
            </div>
            <Footer />
        </PayPalScriptProvider>
    );
};

export default Donate;
