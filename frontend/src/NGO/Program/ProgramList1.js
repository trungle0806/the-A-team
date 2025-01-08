import React, { useEffect, useState } from 'react';
import { getPrograms, deleteProgram } from '../Service/programService';
import ProgramForm from './ProgramForm';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const ProgramList1 = () => {
    const [programs, setPrograms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [editProgramId, setEditProgramId] = useState(null); // Track which program to edit
    const [showAddForm, setShowAddForm] = useState(false); // To toggle the Add Program form
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await getPrograms(searchQuery, page, pageSize);
                setPrograms(data.$values); // Assuming your data follows this structure
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        };
        fetchPrograms();
    }, [searchQuery, page, pageSize]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleAddProgramClick = () => {
        setShowAddForm(true);
        setEditProgramId(null); // Ensure it's a new program, not an edit
    };

    const handleDetailClick = (programId) => {
        navigate(`/ngo/program/${programId}`); // Navigate to the ProgramDetail page
    };

    const handleDeleteClick = async (programId) => {
        try {
            await deleteProgram(programId);
            setPrograms(programs.filter((program) => program.programId !== programId)); // Update state after deletion
        } catch (error) {
            console.error('Error deleting program:', error);
        }
    };

    return (
        <div>
            <h1>Program List</h1>

            {/* Button to add new program */}
            <button onClick={handleAddProgramClick}>Add Program</button>

            {/* Search bar */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Programs"
            />
             
            {/* Render ProgramForm if editProgramId is set or show Add Program form */}
            {editProgramId || showAddForm ? (
                <ProgramForm editProgramId={editProgramId} setEditProgramId={setEditProgramId} />
            ) : null}

            {/* Program list table */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Target</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {programs.map((program) => (
                        <tr key={program.programId}>
                            <td>{program.name}</td>
                            <td>{new Date(program.startDate).toLocaleDateString()}</td>
                            <td>{new Date(program.endDate).toLocaleDateString()}</td>
                            <td>{program.targetAmount}</td>
                            <td>{program.isUpcoming ? "Yes" : "No"}</td>
                            <td>
                                <button onClick={() => handleDetailClick(program.programId)}>
                                    Detail
                                </button>
                                <button onClick={() => setEditProgramId(program.programId)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteClick(program.programId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default ProgramList1;
