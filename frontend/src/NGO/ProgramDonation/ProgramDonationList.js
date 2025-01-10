import React, { useEffect, useState } from "react";
import { getProgramDonations } from "../Service/programDonationService";
import "./ProgramDonationList.css";

const ProgramDonationList = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getProgramDonations();
        const donationList = data.$values || [];
        setDonations(donationList);
        setFilteredDonations(donationList); // Initialize filtered list
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Failed to fetch program donations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filtered = donations.filter((donation) =>
      Object.values(donation)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredDonations(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, donations]);

  // Calculate the displayed donations for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonations = filteredDonations.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

  if (loading) return <p className="ProgramDonationList-loading">Loading...</p>;
  if (error) return <p className="ProgramDonationList-error">{error}</p>;

  return (
    <div className="ProgramDonationList-container">
      <h2 className="ProgramDonationList-title">Program Donation History</h2>

      {/* Search Bar */}
      <div className="ProgramDonationList-search-container">
        <input
          type="text"
          placeholder="Search amount..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ProgramDonationList-search-input"
        />
      </div>

      {/* Donation Table */}
      <div className="ProgramDonationList-table-container">
        <table className="ProgramDonationList-table">
          <thead>
            <tr>
              <th>Donation ID</th>
              <th>Program ID</th>
              <th>Customer ID</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Donation Date</th>
            </tr>
          </thead>
          <tbody>
            {currentDonations.map((donation) => (
              <tr key={donation.donationId}>
                <td>{donation.donationId}</td>
                <td>{donation.programId}</td>
                <td>{donation.customerId}</td>
                <td className="ProgramDonationList-td">{donation.amount}</td>
                <td>{donation.paymentStatus}</td>
                <td>{new Date(donation.donationDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="ProgramDonationList-pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
            className={`ProgramDonationList-pagination-button ${
              currentPage === index + 1 ? "disabled" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgramDonationList;
