import React, { useEffect, useState } from "react";
import axios from "axios";
import './ProgramList.css';

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5024/api/program1"); // Update with your API URL
        // Extract programs from the nested response structure
        const programsData = response.data?.$values || [];
        setPrograms(programsData);
      } catch (err) {
        setError("Failed to fetch programs.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="program-list">
      <h1>Programs</h1>
      {programs.length === 0 ? (
        <p>No programs available.</p>
      ) : (
        <ul>
          {programs.map((program) => (
            <li key={program.programId} className="program-item">
              <h2>{program.name}</h2>
              <p>{program.description}</p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(program.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(program.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Is Upcoming:</strong> {program.isUpcoming ? "Yes" : "No"}
              </p>
              {program.ngo && (
                <p>
                  <strong>NGO:</strong> {program.ngo.name}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProgramList;
