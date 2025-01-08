import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access the programId from the URL
import { getProgramById } from '../Service/programService'; // Assuming you have a function to fetch a single program
import {
    FaBullseye,
    FaHandHoldingHeart,
    FaClock,
    FaUsers,
    FaCalendarAlt,
  } from "react-icons/fa";
  import { AiOutlineDollarCircle } from "react-icons/ai";
  import { GoOrganization } from "react-icons/go";

const ProgramDetail = () => {
    const { id } = useParams(); // Get the programId from the URL
    const [program, setProgram] = useState(null);

    useEffect(() => {
        const fetchProgramDetails = async () => {
            try {
                const data = await getProgramById(id); // Fetch program by id
                setProgram(data); // Set program data
            } catch (error) {
                console.error('Error fetching program details:', error);
            }
        };
        fetchProgramDetails();
    }, [id]);

    if (!program) return <div>Loading...</div>;

    // Calculate percentage achieved based on target amount
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
    
      if (!program) return <div className="loading">Loading...</div>;
    
      const totalDonationDays = calculateDonationDays(
        program.startDate,
        program.endDate
      );
      const remainingDonationDays = calculateRemainingDays(program.endDate);
      const organizationName = program.ngo?.name || "No organization";
      const percentageAchieved =
        program.targetAmount > 0
          ? Math.min((program.totalDonatedAmount / program.targetAmount) * 100, 100)
          : 0;

    return (
        <div>
           <div className="target-progress">
                     <h1 className="donate-title">
                       <FaBullseye /> {program.name || "No name available."}
                     </h1>
                     <p className="donate-description">
                       <GoOrganization /> {organizationName}
                     </p>
                     <p className="donate-description">
                       <FaHandHoldingHeart />{" "}
                       {program.description || "No description available."}
                     </p>
                     <p className="target-amount">
                       <AiOutlineDollarCircle /> Target:{" "}
                       {program.targetAmount?.toFixed(2) || "0.00"}
                     </p>
                     <p className="total-donated">
                       <FaHandHoldingHeart /> Total Donated:{" "}
                       {program.totalDonatedAmount?.toFixed(2) || "0.00"}
                     </p>
                     <div className="progress-container">
                       <div
                         className="progress-bar"
                         style={{ width: `${percentageAchieved}%` }}
                       ></div>
                     </div>
           
                     <p className="progress-percentage">
                       Percentage Achieved: {percentageAchieved.toFixed(2)}%
                     </p>
                     {program.excessAmount > 0 && (
                       <p className="excess-amount">
                         Excess Amount: ${program.excessAmount.toFixed(2)}
                       </p>
                     )}
           
                     <div className="donation-stats">
                       <div className="stat-box">
                         <FaUsers className="icon" />
                         <span className="stat-label">Total Donors:</span>
                         <span className="stat-value">
                           {getUniqueDonorsCount(program.donations)}
                         </span>
                       </div>
                       <div className="stat-box">
                         <FaClock className="icon" />
                         <span className="stat-label">Total Days of Donation:</span>
                         <span className="stat-value">{totalDonationDays}</span>
                       </div>
                       <div className="stat-box">
                         <FaCalendarAlt className="icon" />
                         <span className="stat-label">Current Date:</span>
                         <span className="stat-value">
                           {new Date().toLocaleDateString()}
                         </span>
                       </div>
                       <div className="stat-box">
                         <FaCalendarAlt className="icon" />
                         <span className="stat-label">Donation End Date:</span>
                         <span className="stat-value">
                           {new Date(program.endDate).toLocaleDateString()}
                         </span>
                       </div>
                       <div className="stat-box">
                         <FaClock className="icon" />
                         <span className="stat-label">Remaining Days:</span>
                         <span className="stat-value">{remainingDonationDays}</span>
                       </div>
                     </div>
                   </div>
        </div>
    );
};

export default ProgramDetail;
