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
          {paginatedDonations.length > 0 ? (
            <div className="donation-grid">
              <div className="donation-header">
                <div>Customer ID</div>
                <div>Name</div>
                <div>Amount</div>
                <div>Donation Date</div>
                <div>Payment Status</div>
                <div>Program ID</div>
              </div>
              {paginatedDonations.map((donation) => (
                <div className="donation-row" key={donation.donationId}>
                 {/* Customer ID */}
                 <div>{donation.customer?.customerId || donation.customerId || 'N/A'}</div>
                  {/* Name */}
                  <div>
                  {donation.customer 
                    ? `${donation.customer.firstName || 'Unknown'} ${donation.customer.lastName || ''}`.trim() 
                    : 'No name available'}
                  </div>


                  {/* Amount */}
                  <div>${donation.amount || '0.00'}</div>

                  {/* Donation Date */}
                  <div>
                    {donation.donationDate 
                      ? new Date(donation.donationDate).toLocaleDateString() 
                      : 'N/A'}
                  </div>

                  {/* Payment Status */}
                  <div>{donation.paymentStatus || 'N/A'}</div>

                  {/* Program ID */}
                  <div>{donation.program1?.name || `Program ID: ${donation.programId}` || 'N/A'}</div>
                </div>
              ))}
            </div>
          ) : (
            <p>No donations available.</p>
          )}
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
