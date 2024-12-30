// File: AdminProgramManagement.js

import React, { useEffect, useState } from 'react';
import { getProgram1s, addProgram1, updateProgram1, deleteProgram1 } from '../ServiceAdmin/ProgramService';
import './Program1.css';

const AdminProgramManagement = () => {
    const [programs, setPrograms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newProgram, setNewProgram] = useState({ name: '', description: '', startDate: '', endDate: '', isUpcoming: false });
    const [selectedProgram, setSelectedProgram] = useState(null);

    useEffect(() => {
        fetchPrograms();
    }, [searchQuery]);

    const fetchPrograms = async () => {
        try {
            const data = await getProgram1s(searchQuery);
            setPrograms(data?.$values || []);
        } catch (error) {
            console.error('Error fetching programs:', error.message);
        }
    };

    const handleAddProgram = async () => {
        try {
            await addProgram1(newProgram);
            setNewProgram({ name: '', description: '', startDate: '', endDate: '', isUpcoming: false });
            fetchPrograms();
        } catch (error) {
            console.error('Error adding program:', error.message);
        }
    };

    const handleUpdateProgram = async () => {
        try {
            if (selectedProgram) {
                await updateProgram1(selectedProgram.id, selectedProgram);
                setSelectedProgram(null);
                fetchPrograms();
            }
        } catch (error) {
            console.error('Error updating program:', error.message);
        }
    };

    const handleDeleteProgram = async (id) => {
        try {
            await deleteProgram1(id);
            fetchPrograms();
        } catch (error) {
            console.error('Error deleting program:', error.message);
        }
    };

    return (
        <div className="admin-program-management">
            <h1 className="management-title1">Program Management</h1>

            {/* Search Section */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search Programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button onClick={fetchPrograms} className="search-button">Search</button>
            </div>

            {/* Add New Program Section */}
            <div className="add-program-section">
                <h2 className="section-title">Add New Program</h2>
                <input
                    type="text"
                    placeholder="Program Name"
                    value={newProgram.name}
                    onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Program Description"
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                    className="input-field"
                />
                <input
                    type="date"
                    value={newProgram.startDate}
                    onChange={(e) => setNewProgram({ ...newProgram, startDate: e.target.value })}
                    className="input-field"
                />
                <input
                    type="date"
                    value={newProgram.endDate}
                    onChange={(e) => setNewProgram({ ...newProgram, endDate: e.target.value })}
                    className="input-field"
                />
                <label className="checkbox-container">
                    Is Upcoming?
                    <input
                        type="checkbox"
                        checked={newProgram.isUpcoming}
                        onChange={(e) => setNewProgram({ ...newProgram, isUpcoming: e.target.checked })}
                    />
                </label>
                <button onClick={handleAddProgram} className="add-button">Add Program</button>
            </div>

            {/* Programs List Section */}
            <div className="programs-list-section">
                <h2 className="section-title">Programs List</h2>
                <ul className="programs-list">
                    {programs.map((program) => (
                        <li key={program.id} className="program-item">
                            <h3 className="program-name">{program.name}</h3>
                            <p className="program-description">{program.description}</p>
                            <p className="program-date">
                                Start Date: {new Date(program.startDate).toLocaleDateString()} <br />
                                End Date: {new Date(program.endDate).toLocaleDateString()}
                            </p>
                            <p className="program-status">
                                Status: {program.isUpcoming ? 'Upcoming' : 'Completed'}
                            </p>
                            <button onClick={() => setSelectedProgram(program)} className="edit-button">Edit</button>
                            <button onClick={() => handleDeleteProgram(program.id)} className="delete-button">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Edit Program Section */}
            {selectedProgram && (
                <div className="edit-program-section">
                    <h2 className="section-title">Edit Program</h2>
                    <input
                        type="text"
                        placeholder="Program Name"
                        value={selectedProgram.name}
                        onChange={(e) => setSelectedProgram({ ...selectedProgram, name: e.target.value })}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Program Description"
                        value={selectedProgram.description}
                        onChange={(e) => setSelectedProgram({ ...selectedProgram, description: e.target.value })}
                        className="input-field"
                    />
                    <input
                        type="date"
                        value={selectedProgram.startDate}
                        onChange={(e) => setSelectedProgram({ ...selectedProgram, startDate: e.target.value })}
                        className="input-field"
                    />
                    <input
                        type="date"
                        value={selectedProgram.endDate}
                        onChange={(e) => setSelectedProgram({ ...selectedProgram, endDate: e.target.value })}
                        className="input-field"
                    />
                    <label className="checkbox-container">
                        Is Upcoming?
                        <input
                            type="checkbox"
                            checked={selectedProgram.isUpcoming}
                            onChange={(e) => setSelectedProgram({ ...selectedProgram, isUpcoming: e.target.checked })}
                        />
                    </label>
                    <button onClick={handleUpdateProgram} className="update-button">Update Program</button>
                </div>
            )}
        </div>
    );
};

export default AdminProgramManagement;
