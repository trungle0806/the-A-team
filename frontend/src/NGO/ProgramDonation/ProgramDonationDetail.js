import React, { useEffect, useState } from "react";
import { getProgramDonationById } from "../Service/programDonationService";
import { useParams } from "react-router-dom";

const ProgramDonationDetail = () => {
  const { id } = useParams(); // Get donation ID from URL
  const [donationDetail, setDonationDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonationDetail = async () => {
      try {
        const data = await getProgramDonationById(id);
        setDonationDetail(data);
      } catch (err) {
        setError("Error fetching donation details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDonationDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="donation-detail">
      <h2>Donation Detail</h2>
      <table>
        <tbody>
          <tr>
            <th>Donor Name</th>
            <td>{donationDetail.donorName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{donationDetail.donorEmail}</td>
          </tr>
          <tr>
            <th>Amount</th>
            <td>{donationDetail.amount}</td>
          </tr>
          <tr>
            <th>Payment Status</th>
            <td>{donationDetail.paymentStatus}</td>
          </tr>
          <tr>
            <th>Donation Date</th>
            <td>{new Date(donationDetail.donationDate).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProgramDonationDetail;
