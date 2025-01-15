import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProgramById } from '../ServiceAdmin/ProgramService';
import './Programadminform.css';

const ProgramDetail = () => {
  const { programId } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!programId) {
      console.error('Program ID is undefined');
      setLoading(false);
      return;
    }

    const fetchProgram = async () => {
      try {
        const programData = await getProgramById(programId);
        setProgram(programData);
      } catch (error) {
        console.error('Error fetching program:', error);
      }
      setLoading(false);
    };

    fetchProgram();
  }, [programId]);

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (!program) {
    return <p className="error-message">Program not found</p>;
  }

  return (
    <div className="program-detail-container">
      <h3>Program Details</h3>
      <div className="program-header">
        <div>
          <label><strong>Name:</strong></label>
          <p>{program.name}</p>
        </div>
        <div>
          <label><strong>Description:</strong></label>
          <p>{program.description}</p>
        </div>
        <div>
          <label><strong>Start Date:</strong></label>
          <p>{program.startDate}</p>
        </div>
        <div>
          <label><strong>End Date:</strong></label>
          <p>{program.endDate}</p>
        </div>
        <div>
          <label><strong>Status:</strong></label>
          <p>{program.status}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
