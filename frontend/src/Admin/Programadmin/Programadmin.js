import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProgramsByNGO, deleteProgram, updateProgramStatus } from '../ServiceAdmin/ProgramService';
import './Programadmin.css';

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const programsData = await getProgramsByNGO();
      console.log("Fetched programs:", programsData); // Kiểm tra dữ liệu trả về
      if (programsData && Array.isArray(programsData)) {
        setPrograms(programsData);
      } else if (programsData && programsData.$values && Array.isArray(programsData.$values)) {
        setPrograms(programsData.$values);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
    setLoading(false);
  };  

  const handleDonateProgram = (programId) => {
    console.log("Navigating to program with ID:", programId);
    navigate(`/admin/program/${programId}`);
  };
  

  const handleDeleteProgram = async (programId) => {
    try {
      await deleteProgram(programId);
      loadPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const handleApproveProgram = async (programId) => {
    try {
      await updateProgramStatus(programId, 'Approved');
      loadPrograms();
    } catch (error) {
      console.error('Error approving program:', error);
    }
  };

  const handleRejectProgram = async (programId) => {
    try {
      await updateProgramStatus(programId, 'Rejected');
      loadPrograms();
    } catch (error) {
      console.error('Error rejecting program:', error);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  return (
    <div className="program-list-container">
      <h2 className="program-list-heading">Chương trình của NGO</h2>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <div className="program-table-container">
          <table className="program-table">
            <thead>
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Organization</th>
                <th className="table-header">Start Date</th>
                <th className="table-header">End Date</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.length > 0 ? (
                programs.map((program) => (
                  <tr key={program.id} className="program-row">
                    <td className="program-name">{program.name}</td>
                    <td className="program-organization">
                      {program.organization ? program.organization.name : 'No organization'}
                    </td>
                    <td className="program-start-date">{program.startDate}</td>
                    <td className="program-end-date">{program.endDate}</td>
                    <td className="program-status">{program.status}</td>
                    <td className="program-actions">
                      <button 
                        onClick={() => handleDonateProgram(program.id)} 
                        className="donate-button"
                      >
                        view
                      </button>
                      <button 
                        onClick={() => handleDeleteProgram(program.id)} 
                        className="delete-button"
                      >
                        Delete
                      </button>
                      {program.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleApproveProgram(program.id)} 
                            className="approve-button"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleRejectProgram(program.id)} 
                            className="reject-button"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-programs">No programs available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProgramList;
