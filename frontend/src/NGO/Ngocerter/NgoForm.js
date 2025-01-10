import React, { useState, useEffect } from 'react';
import { getNGOById, updateNGO } from '../Service/ngoService'; // Import your API functions
import NGODetail from './NgoDetail'; // Import NGODetail to show the NGO data

const NGOEditForm = ({ id }) => {
  const [ngoData, setNgoData] = useState(null);
  const [updatedNGO, setUpdatedNGO] = useState({
    name: '',
    description: '',
    code: '',
    logoUrl: '',
    achievements: '',
    email: '',
    isApproved: true,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // New state to toggle form visibility

  useEffect(() => {
    const fetchNGOData = async () => {
      try {
        const data = await getNGOById(id);
        setNgoData(data);
        setUpdatedNGO({
          name: data.name,
          description: data.description,
          code: data.code,
          logoUrl: data.logoUrl,
          achievements: data.achievements,
          email: data.email,
          isApproved: data.isApproved,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNGOData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedNGO({
      ...updatedNGO,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateNGO(id, updatedNGO);
      setSuccess('NGO updated successfully!');
      setNgoData(updatedData); // Update the displayed NGO data
      setIsEditing(false); // Hide the form after successful submission
    } catch (error) {
      setError('Error updating NGO data');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); // Show the form when Edit button is clicked
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ngoData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display NGO details */}
      <NGODetail data={ngoData} />

      {/* Show Edit button if not editing */}
      {!isEditing && (
        <button onClick={handleEditClick}>Edit NGO</button>
      )}

      {/* Show form if editing */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="ngo-edit-form">
          <h2>Edit NGO</h2>
          {success && <div className="success-message">{success}</div>}
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={updatedNGO.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={updatedNGO.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Code:</label>
            <input
              type="text"
              name="code"
              value={updatedNGO.code}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Logo URL:</label>
            <input
              type="text"
              name="logoUrl"
              value={updatedNGO.logoUrl}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Achievements:</label>
            <input
              type="text"
              name="achievements"
              value={updatedNGO.achievements}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updatedNGO.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Approved:</label>
            <input
              type="checkbox"
              name="isApproved"
              checked={updatedNGO.isApproved}
              onChange={(e) => setUpdatedNGO({ ...updatedNGO, isApproved: e.target.checked })}
            />
          </div>
          <div>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NGOEditForm;
