import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerById } from "../../../Admin/ServiceAdmin/CustomerService";

const CustomerDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const data = await getCustomerById(id);
        setCustomer(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  if (loading) return <p>Loading customer details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!customer) return <p>Customer not found.</p>;

  return (
    <div className="customer-details">
      <h1>Customer Details</h1>
      <p>
        <strong>ID:</strong> {customer.id}
      </p>
      <p>
        <strong>Name:</strong> {customer.name}
      </p>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>
      <p>
        <strong>Phone:</strong> {customer.phone}
      </p>
      <p>
        <strong>Address:</strong> {customer.address}
      </p>
      {/* Thêm các thông tin khác nếu cần */}
    </div>
  );
};

export default CustomerDetails;
