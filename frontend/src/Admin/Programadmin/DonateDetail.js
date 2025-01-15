import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProgramDonationsForNGOAndProgram } from "../../NGO/Service/programDonationService";

const DonateDetail = () => {
  const { ngoId, programId } = useParams(); // Lấy ngoId và programId từ URL
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch donations từ API
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getProgramDonationsForNGOAndProgram(
          ngoId,
          programId
        );
        console.log("Fetched donations:", data);

        // Kiểm tra nếu API trả về một mảng hoặc dữ liệu phù hợp
        const donationsArray = Array.isArray(data) ? data : data.$values || [];
        if (!Array.isArray(donationsArray)) {
          throw new Error("Invalid data format");
        }

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

  // Xử lý tìm kiếm
  useEffect(() => {
    const filtered = Array.isArray(donations)
      ? donations.filter((donation) =>
          Object.values(donation)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : [];
    setFilteredDonations(filtered);
    setCurrentPage(1); // Reset lại trang hiện tại khi tìm kiếm
  }, [searchTerm, donations]);

  // Tính toán cho phân trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonations = Array.isArray(filteredDonations)
    ? filteredDonations.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil((filteredDonations.length || 0) / itemsPerPage);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="donation-list1">
      <h2 className="donation-h2">Program Donation History</h2>

      {/* Thanh tìm kiếm */}
      <div className="donation-search-container">
        <input
          type="text"
          placeholder="Search donations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="donation-search-input"
        />
      </div>

      {/* Bảng quyên góp */}
      <div className="table-container">
        <table className="donation-table1">
          <thead className="donation-table1-thead">
            <tr className="donation-table1-tr">
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
              <tr className="donation-table1-tr2" key={donation.donationId}>
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
      </div>

      {/* Phân trang */}
      <div className="Program-pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
            className={`Program-pagination-button ${
              currentPage === index + 1 ? "disabled1" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DonateDetail;
