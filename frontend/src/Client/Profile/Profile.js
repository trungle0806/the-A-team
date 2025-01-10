import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerData = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // or sessionStorage depending on where you store it
        if (!token) {
          setError('Authentication token is missing');
          setLoading(false);
          return;
        }

        // Decode the token to extract the user ID (assuming the token includes "id" claim)
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const accountId = decodedToken.id;

        const response = await axios.get(`http://localhost:5024/api/customer/get-customer-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCustomerData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching customer data:", err);
        setError('Failed to load customer data');
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Customer Information</h2>
      <div>
        <strong>Customer ID:</strong> {customerData.customerId}
      </div>
      <div>
        <strong>Account ID:</strong> {customerData.accountId}
      </div>
      <div>
        <strong>First Name:</strong> {customerData.firstName}
      </div>
      <div>
        <strong>Last Name:</strong> {customerData.lastName}
      </div>
      <div>
        <strong>Date of Birth:</strong> {new Date(customerData.dateOfBirth).toLocaleDateString()}
      </div>
      <div>
        <strong>Phone Number:</strong> {customerData.phoneNumber || 'Not provided'}
      </div>
      <div>
        <strong>Address:</strong> {customerData.address || 'Not provided'}
      </div>
      <div>
        <strong>Gender:</strong> {customerData.gender}
      </div>
      <div>
        <strong>Created At:</strong> {new Date(customerData.createdAt).toLocaleString()}
      </div>
      <div>
        <strong>Updated At:</strong> {new Date(customerData.updatedAt).toLocaleString()}
      </div>
      <div>
        <strong>Program Donations:</strong> {customerData.programDonations?.$values?.length || 'No donations'}
      </div>
      <div>
        <strong>Queries:</strong> {customerData.queries?.$values?.length || 'No queries'}
      </div>
    </div>
  );
};

export default CustomerData;
