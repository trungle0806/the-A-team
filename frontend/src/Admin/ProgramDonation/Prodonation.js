import React, { useState, useEffect } from 'react';
import { getProgramDonations, addProgramDonation, updateProgramDonation, deleteProgramDonation } from '../ServiceAdmin/DonationService';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import './Prodonation.css'

const ProgramDonationAdmin = () => {
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState({ name: '', description: '', amount: 0 });
  const [editingDonation, setEditingDonation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
      setShowForm(!showForm);
  };


  // Fetch program donations on component mount
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Or sessionStorage
        if (!token) {
          console.error('User is not authenticated');
          return; // Stop if no token is available
        }
        
        const data = await getProgramDonations(searchQuery, token); // Pass token to your service
        const donationList = data?.$values || [];
        setDonations(donationList);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error('Unauthorized: Please log in again.');
          // Optionally, redirect to login page
        } else {
          console.error('Error fetching donations:', error);
        }
      }
    };
  
    fetchDonations();
  }, [searchQuery]);   

  // Handle adding a new donation
  const handleAddDonation = async () => {
    try {
      await addProgramDonation(newDonation);
      setNewDonation({ name: '', description: '', amount: 0 });
      const data = await getProgramDonations(searchQuery);  // Refresh donation list
      setDonations(data);
    } catch (error) {
      console.error('Error adding donation:', error);
    }
  };

  // Handle updating an existing donation
  const handleUpdateDonation = async () => {
    if (editingDonation) {
      try {
        await updateProgramDonation(editingDonation.donationId, editingDonation);
        setEditingDonation(null);  // Reset after update
        const data = await getProgramDonations(searchQuery);  // Refresh donation list
        setDonations(data);
      } catch (error) {
        console.error('Error updating donation:', error);
      }
    }
  };

  // Handle deleting a donation
  const handleDeleteDonation = async (id) => {
    try {
      await deleteProgramDonation(id);
      const data = await getProgramDonations(searchQuery);  // Refresh donation list
      setDonations(data);
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  return (
    <div className="program-donation-admin">
      <h2 className="admin-title">Program Donations Management</h2>

      {/* Search Bar */}
      <div className="search-pro">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search donations..."
        />
        <button className="search-button">Search</button>
        <a className='donation-name' onClick={toggleForm}><FaUserPlus /></a>
      </div>

      {/* Add Donation Form */}
      <div className={`add-donation-form ${showForm ? 'show' : 'hide'}`}>
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
      </div>

      {/* Donation List */}
      <div className="donation-list">
        <h3>Existing Donations</h3>
        <ul>
          {donations.map((donation) => (
            <li key={donation.donationId} className="donation-item">
              <div>
                <h4>{donation.name}</h4>
                <p>{donation.description}</p>
                <p>Amount: ${donation.amount}</p>
                <p>Remaining Amount: ${donation.remainingAmount}</p>
                <p>Excess Amount: ${donation.excessAmount}</p>
                <p>Percentage Achieved: {donation.percentageAchieved}%</p>
                <p>Status: {donation.paymentStatus}</p>
                <p>Donation Date: {new Date(donation.donationDate).toLocaleDateString()}</p>
              </div>
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
          ))}
        </ul>
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
          <button className="update-button" onClick={handleUpdateDonation}>Update Donation</button>
        </div>
      )}
    </div>
  );
};

export default ProgramDonationAdmin;
