import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProgramsByNGO, deleteProgram, updateProgramStatus } from '../ServiceAdmin/ProgramService';
import './Programadmin.css';

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingPrograms, setPendingPrograms] = useState([]);  // Danh sách chương trình "Pending"
  const navigate = useNavigate();

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const programsData = await getProgramsByNGO();
      console.log("Fetched programs:", programsData); // Kiểm tra dữ liệu trả về

      if (programsData && Array.isArray(programsData)) {
        setPrograms(programsData);
        setPendingPrograms(programsData.filter(program => program.status === 'Pending')); // Lọc ra chương trình Pending
      } else if (programsData && programsData.$values && Array.isArray(programsData.$values)) {
        setPrograms(programsData.$values);
        setPendingPrograms(programsData.$values.filter(program => program.status === 'Pending'));
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
    setLoading(false);
  };

  const handleDonateProgram = (programId) => {
    if (!programId) {
      console.error("Invalid programId:", programId);
      return;
    }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');  // Định dạng ngày theo kiểu Việt Nam (dd/mm/yyyy)
  };

  return (
    <div className="program-list-container">
      <h2 className="program-list-heading">NGO Program</h2>
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
                      {program.ngo && program.ngo.name ? program.ngo.name : 'No organization'}
                    </td>
                    <td className="program-start-date">{formatDate(program.startDate)}</td>
                    <td className="program-end-date">{formatDate(program.endDate)}</td>
                    <td className="program-status">{program.status}</td>
                    <td className="program-actions">
                      <button 
                        onClick={() => handleDonateProgram(program.programId)} 
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

                      {pendingPrograms.length > 0 && (
                        <div className="pending-programs-actions">
                          <h3>Chương trình cần duyệt:</h3>
                          <div className="pending-programs-list">
                            {pendingPrograms.map((program) => (
                              <div key={program.id} className="pending-program-item">
                                <h4>{program.name}</h4>
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
                              </div>
                            ))}
                          </div>
                        </div>
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

      {/* Hiển thị các chương trình Pending ngoài bảng */}
    </div>
  );
};

export default ProgramList;
