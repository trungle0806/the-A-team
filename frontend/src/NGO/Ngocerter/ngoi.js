import React, { useState, useEffect } from 'react';
import { 
  getProgramDonations, 
  addProgramDonation, 
  updateProgramDonation, 
  deleteProgramDonation 
} from '../ServiceAdmin/DonationService.js';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import './Prodonation.css';

const ITEMS_PER_PAGE = 9; // 3 hàng x 3 sản phẩm

const ProgramDonationAdmin = () => {
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState({ name: '', description: '', amount: 0 });
  const [editingDonation, setEditingDonation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(''); // Optional: To display errors to the user
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

  const toggleForm = () => {
      setShowForm(!showForm);
  };

  // Fetch program donations on component mount and when searchQuery changes
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getProgramDonations(searchQuery);
        console.log('Fetched donations:', data);  // Kiểm tra dữ liệu trả về

        // Kiểm tra xem dữ liệu có chứa $values không và lấy mảng từ đó
        if (data && data.$values) {
          setDonations(data.$values);  // Set donations từ mảng $values
        } else {
          setDonations([]);  // Nếu không có $values, set là mảng rỗng
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
        setError('Failed to fetch donations.');
      }
    };
  
    fetchDonations();
  }, [searchQuery]);  

   // Pagination logic
   const totalPages = Math.ceil(donations.length / ITEMS_PER_PAGE);
   const paginatedDonations = donations.slice(
     (currentPage - 1) * ITEMS_PER_PAGE,
     currentPage * ITEMS_PER_PAGE
   );
 
   const handlePageChange = (newPage) => {
     setCurrentPage(newPage);
   };

  // Handle adding a new donation
  const handleAddDonation = async () => {
    try {
      await addProgramDonation(newDonation);
      setNewDonation({ name: '', description: '', amount: 0 });
      const data = await getProgramDonations(searchQuery);  // Refresh donation list
      setDonations(data || []);
      setShowForm(false); // Optionally hide the form after adding
    } catch (error) {
      console.error('Error adding donation:', error);
      setError('Failed to add donation.');
    }
  };

  // Handle updating an existing donation
  const handleUpdateDonation = async () => {
    if (editingDonation) {
      try {
        await updateProgramDonation(editingDonation.donationId, editingDonation);
        setEditingDonation(null);  // Reset after update
        const data = await getProgramDonations(searchQuery);  // Refresh donation list
        setDonations(data || []);
      } catch (error) {
        console.error('Error updating donation:', error);
        setError('Failed to update donation.');
      }
    }
  };

  // Handle deleting a donation
  const handleDeleteDonation = async (id) => {
    try {
      await deleteProgramDonation(id);
      const data = await getProgramDonations(searchQuery);  // Refresh donation list
      setDonations(data || []);
    } catch (error) {
      console.error('Error deleting donation:', error);
      setError('Failed to delete donation.');
    }
  };

  // Function to retrieve all transactions for a donation
  const getDonationTransactions = (donation) => {
    if (donation.transactions && donation.transactions.$values) {
      return donation.transactions.$values;
    }
    return [];
  };

  return (
    <div className="program-donation-admin">
      <h2 className="admin-title">Program Donations Management</h2>

      {/* Display Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Search Bar */}
      <div className="search-pro">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search donations..."
        />
        <button className="search-button">Search</button>
        <button className='donation-name' onClick={toggleForm}><FaUserPlus /></button>
      </div>

      {/* Add Donation Form */}
      {showForm && (
        <div className="add-donation-form show">
          <h3>Add New Donation</h3>
          <input
            type="text"
            placeholder="Donation Name"
            value={newDonation.name}
            onChange={(e) => setNewDonation({ ...newDonation, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newDonation.description}
            onChange={(e) => setNewDonation({ ...newDonation, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newDonation.amount}
            onChange={(e) => setNewDonation({ ...newDonation, amount: parseFloat(e.target.value) })}
          />
          <button className="add-button" onClick={handleAddDonation}>Add Donation</button>
          <button className="cancel-button" onClick={toggleForm}>Cancel</button>
        </div>
      )}

      {/* Donation List */}
      <div className="donation-list">
        <h3>Existing Donations</h3>
        <ul>
        {paginatedDonations.length > 0 ? (
          paginatedDonations.map((donation) => (
              <li key={donation.donationId} className="donation-item">
                <div className="donation-details">
                  {/* Check and display donation details */}
                  <p>Name: {donation.customer?.firstName && donation.customer?.lastName 
                    ? `${donation.customer.firstName} ${donation.customer.lastName}` 
                    : 'No name available'}</p>
                  <p>Amount: ${donation.amount}</p>
                  <p>Donation Date: {donation.donationDate ? new Date(donation.donationDate).toLocaleDateString() : 'N/A'}</p>
                  <p>Payment Status: {donation.paymentStatus}</p>

                  {/* Display Program Info */}
                  {donation.program1 && donation.program1.name && (
                    <p>Program: {donation.program1.name}</p>
                  )}

                  {/* Display Customer Info */}
                  {donation.customer && donation.customer.customerId && (
                    <p>Customer ID: {donation.customer.customerId}</p>
                  )}

                  {/* Display Account ID */}
                  {donation.customer && donation.customer.accountId && (
                    <p>Account ID: {donation.customer.accountId}</p>
                  )}
                </div>

                {/* Transactions Section */}
                <div className="transactions">
                  <h4>Transactions:</h4>
                  <ul>
                    {getDonationTransactions(donation).map((transaction, index) => (
                      <li key={index}>
                        <p>Transaction ID: {transaction.$id}</p>
                        <p>Amount: ${transaction.amount}</p>
                        <p>Status: {transaction.paymentStatus}</p>
                        <p>Transaction Date: {transaction.donationDate ? new Date(transaction.donationDate).toLocaleDateString() : 'N/A'}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Edit and Delete Buttons */}
                <button
                  className="edit-button"
                  onClick={() => setEditingDonation(donation)}
                >
                  <FiEdit />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteDonation(donation.donationId)}
                >
                  <RiDeleteBin6Line />
                </button>
              </li>
            ))
          ) : (
            <p>No donations found.</p>
          )}
        </ul>
      </div>

       {/* Pagination Controls */}
       <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Edit Donation Form */}
      {editingDonation && (
        <div className="edit-donation-form">
          <h3>Edit Donation</h3>
          <input
            type="text"
            placeholder="Donation Name"
            value={editingDonation.name}
            onChange={(e) => setEditingDonation({ ...editingDonation, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingDonation.description}
            onChange={(e) => setEditingDonation({ ...editingDonation, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={editingDonation.amount}
            onChange={(e) => setEditingDonation({ ...editingDonation, amount: parseFloat(e.target.value) })}
          />
          <button className="update-button" onClick={handleUpdateDonation}>
            Update Donation
          </button>
          <button className="cancel-button" onClick={() => setEditingDonation(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgramDonationAdmin;
