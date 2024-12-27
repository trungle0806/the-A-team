import React, { useState, useEffect } from 'react';
import {
  getAllNGOs,
  addNGO,
  updateNGO,
  deleteNGO,
} from '../ServiceAdmin/NgosService';
import './Ngos.css';

const AdminNGOManagement = () => {
  const [ngos, setNgos] = useState([]);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchNGOs();
  }, []);

  const fetchNGOs = async () => {
    try {
      const data = await getAllNGOs();
      const NGOList = data?.$values || [];
      setNgos(NGOList);
    } catch (error) {
      console.error('Failed to fetch NGOs:', error.message);
    }
  };

  const handleAddOrUpdateNGO = async (e) => {
    e.preventDefault();
    try {
      if (selectedNGO) {
        await updateNGO(selectedNGO.id, formData);
        alert('NGO updated successfully');
      } else {
        await addNGO(formData);
        alert('NGO added successfully');
      }
      fetchNGOs();
      setFormData({ name: '', description: '' });
      setSelectedNGO(null);
    } catch (error) {
      console.error('Failed to add/update NGO:', error.message);
    }
  };

  const handleEdit = (ngo) => {
    setSelectedNGO(ngo);
    setFormData({ name: ngo.name, description: ngo.description });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this NGO?')) return;

    try {
      await deleteNGO(id);
      alert('NGO deleted successfully');
      fetchNGOs();
    } catch (error) {
      console.error('Failed to delete NGO:', error.message);
    }
  };

  return (
    <div className="admin-ngo-management">
      <h1>Admin NGO Management</h1>

      <form onSubmit={handleAddOrUpdateNGO} className="ngo-form">
        <input
          type="text"
          placeholder="NGO Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="NGO Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        ></textarea>
        <button type="submit">{selectedNGO ? 'Update NGO' : 'Add NGO'}</button>
        {selectedNGO && (
          <button type="button" onClick={() => setSelectedNGO(null)}>
            Cancel
          </button>
        )}
      </form>

      <table className="ngo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Code</th>
            <th>Logo</th>
            <th>Mission</th>
            <th>Team</th>
            <th>Careers</th>
            <th>Achievements</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ngos.map((ngo) => (
            <tr key={ngo.id}>
              <td>{ngo.id}</td>
              <td>{ngo.name}</td>
              <td>{ngo.description}</td>
              <td>{ngo.code}</td>
              <td>
                <img
                    src={ngo.logoUrl}
                    alt={ngo.name}
                    style={{ width: '50px', height: '50px' }}
                />
              </td>
              <td>{ngo.mission}</td>
              <td>{ngo.team}</td>
              <td>{ngo.careers}</td>
              <td>{ngo.achievements}</td>
              <td>{ngo.isApproved ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(ngo)}>Edit</button>
                <button onClick={() => handleDelete(ngo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminNGOManagement;
