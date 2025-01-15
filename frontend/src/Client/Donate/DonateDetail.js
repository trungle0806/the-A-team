import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProgramDonationsForNGOAndProgram } from "../../NGO/Service/programDonationService";

const DonateDetail = () => {
  const { ngoId, programId } = useParams();
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
          const data = await getProgramDonationsForNGOAndProgram(ngoId, programId);
          console.log("Fetched donations:", data); // Debugging
          const donationsArray = Array.isArray(data) ? data : data.$values || [];
          setDonations(donationsArray);
          setFilteredDonations(donationsArray);
        } catch (err) {
          console.error("Error fetching donations:", err);
          setError("Failed to fetch program donations.");
        } finally {
          setLoading(false);
        }
      };
      

    fetchDonations();
  }, [ngoId, programId]);

  useEffect(() => {
    const filtered = donations.filter((donation) =>
      Object.values(donation)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredDonations(filtered);
    setCurrentPage(1);
  }, [searchTerm, donations]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDonations = filteredDonations.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="donation-list">
      <h2>Program Donation History</h2>
      <input
        type="text"
        placeholder="Search donations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Donation Date</th>
            <th>Donor Name</th>
            <th>Donor Email</th>
            <th>Program Name</th>
          </tr>
        </thead>
        <tbody>
          {currentDonations.map((donation) => (
            <tr key={donation.donationId}>
              <td>{donation.donationId}</td>
              <td>{donation.amount.toLocaleString()}</td>
              <td>{donation.paymentStatus}</td>
              <td>{new Date(donation.donationDate).toLocaleString()}</td>
              <td>{donation.donorName}</td>
              <td>{donation.donorEmail}</td>
              <td>{donation.programName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DonateDetail;
