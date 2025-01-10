import React, { useEffect, useState } from "react";
import { getProgramDonations } from "../Service/programDonationService";

const ProgramDonationList = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Updated to show 10 items per page

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getProgramDonations();
        const donationList = data.$values || []; // Fallback to an empty array if `$values` is missing
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Program Donation History</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search amount..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
        }}
      />

      {/* Donation Table */}
      <table border="1">
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
              <td>{donation.amount}</td>
              <td>{donation.paymentStatus}</td>
              <td>{new Date(donation.donationDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              cursor: currentPage === index + 1 ? "not-allowed" : "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgramDonationList;
