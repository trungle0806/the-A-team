import React, { useEffect, useState } from 'react';
import { getPartners, addPartner, updatePartner, deletePartner } from '../ServiceAdmin/PartnerService';
import './Partner.css';

const AdminPartnersManagement = () => {
    const [partners, setPartners] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newPartner, setNewPartner] = useState({ name: '', description: '', contact: '' });
    const [selectedPartner, setSelectedPartner] = useState(null);

    // Fetch Partners on component mount or when searchQuery changes
    useEffect(() => {
        fetchPartners();
    }, [searchQuery]);

    const fetchPartners = async () => {
        try {
            const data = await getPartners(searchQuery);
            const partnerList = data?.$values || [];
            setPartners(partnerList);
        } catch (error) {
            console.error('Error fetching partners:', error.message);
        }
    };

    const handleAddPartner = async () => {
        try {
            await addPartner(newPartner);
            setNewPartner({ name: '', description: '', contact: '' });
            fetchPartners();
        } catch (error) {
            console.error('Error adding partner:', error.message);
        }
    };

    const handleUpdatePartner = async () => {
        try {
            if (selectedPartner) {
                await updatePartner(selectedPartner.id, selectedPartner);
                setSelectedPartner(null);
                fetchPartners();
            }
        } catch (error) {
            console.error('Error updating partner:', error.message);
        }
    };

    const handleDeletePartner = async (id) => {
        try {
            await deletePartner(id);
            fetchPartners();
        } catch (error) {
            console.error('Error deleting partner:', error.message);
        }
    };

    return (
        <div className="admin-partners-management">
            <h1 className="management-title">Partner Management</h1>

            {/* Search Section */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search Partners..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input-field"
                />
                <button onClick={fetchPartners} className="search-button">Search</button>
            </div>

            {/* Add New Partner Section */}
            <div className="add-partner-section">
                <h2 className="section-title">Add New Partner</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newPartner.name}
                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newPartner.description}
                    onChange={(e) => setNewPartner({ ...newPartner, description: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Contact"
                    value={newPartner.contact}
                    onChange={(e) => setNewPartner({ ...newPartner, contact: e.target.value })}
                    className="input-field"
                />
                <button onClick={handleAddPartner} className="add-button">Add Partner</button>
            </div>

            {/* Partners List Section */}
            <div className="partners-list-section">
                <h2 className="section-title">Partners List</h2>
                <ul className="partners-list">
                    {partners.map((partner) => (
                        <li key={partner.id} className="partner-item">
                            <h3 className="partner-name">{partner.name}</h3>
                            <p className="partner-description">{partner.description}</p>
                            <p className="partner-contact">{partner.contact}</p>
                            <button onClick={() => setSelectedPartner(partner)} className="edit-button">Edit</button>
                            <button onClick={() => handleDeletePartner(partner.id)} className="delete-button">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Edit Partner Section */}
            {selectedPartner && (
                <div className="edit-partner-section">
                    <h2 className="section-title">Edit Partner</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={selectedPartner.name}
                        onChange={(e) => setSelectedPartner({ ...selectedPartner, name: e.target.value })}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={selectedPartner.description}
                        onChange={(e) => setSelectedPartner({ ...selectedPartner, description: e.target.value })}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Contact"
                        value={selectedPartner.contact}
                        onChange={(e) => setSelectedPartner({ ...selectedPartner, contact: e.target.value })}
                        className="input-field"
                    />
                    <button onClick={handleUpdatePartner} className="update-button">Update Partner</button>
                </div>
            )}
        </div>
    );
};

export default AdminPartnersManagement;
