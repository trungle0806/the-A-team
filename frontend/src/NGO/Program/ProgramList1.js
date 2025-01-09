import React, { useEffect, useState } from "react";
import { getProgramsByNGO, deleteProgram } from "../Service/programService";
import ProgramForm from "./ProgramForm";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ProgramList.css";

const ProgramList1 = () => {
  const [programs, setPrograms] = useState([]);
  const [editProgramId, setEditProgramId] = useState(null); // Track which program to edit
  const [showAddForm, setShowAddForm] = useState(false); // To toggle the Add Program form
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getProgramsByNGO(); // Fetch programs by NGO
        setPrograms(data.$values); // Assuming your data follows this structure
      } catch (error) {
        console.error("Error fetching programs by NGO:", error);
      }
    };
    fetchPrograms();
  }, []);

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
      setPrograms(
        programs.filter((program) => program.programId !== programId)
      ); // Update state after deletion
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  return (
    <div>
      <h1 className="Program-List-h1">Program List</h1>
      <div className="Program-icon">
        {/* Button to add new program */}
        <button className="Program-add" onClick={handleAddProgramClick}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </div>
      {/* Render ProgramForm if editProgramId is set or show Add Program form */}
      {editProgramId || showAddForm ? (
        <ProgramForm
          editProgramId={editProgramId}
          setEditProgramId={setEditProgramId}
        />
      ) : null}

      {/* Program list table */}
      <table className="Program-table">
        <thead>
          <tr className="Program-tr">
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
            <tr className="Program-tr1" key={program.programId}>
              <td>{program.name}</td>
              <td>{new Date(program.startDate).toLocaleDateString()}</td>
              <td>{new Date(program.endDate).toLocaleDateString()}</td>
              <td className="Program-td">{program.targetAmount}</td>
              <td>{program.isUpcoming ? "Yes" : "No"}</td>
              <td>
                <div className="Program-icon1">
                  <button
                    className="Program-Detail"
                    onClick={() => handleDetailClick(program.programId)}
                  >
                    <FontAwesomeIcon
                      className="Program-Detail-icon"
                      icon={faInfoCircle}
                      title="Detail"
                    />
                  </button>
                  <button
                    className="Program-Edit"
                    onClick={() => setEditProgramId(program.programId)}
                  >
                    <FontAwesomeIcon
                      className="Program-Edit-icon"
                      icon={faEdit}
                      title="Edit"
                    />
                  </button>
                  <button
                    className="Program-Delete"
                    onClick={() => handleDeleteClick(program.programId)}
                  >
                    <FontAwesomeIcon
                      className="Program-Delete-icon"
                      icon={faTrash}
                      title="Delete"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramList1;
