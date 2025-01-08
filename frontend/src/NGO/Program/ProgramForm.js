import React, { useState, useEffect } from "react";
import {
  addProgram,
  updateProgram,
  getProgramById,
} from "../Service/programService";
import "./ProgramForm.css";

const ProgramForm = ({ editProgramId, setEditProgramId }) => {
  const [program, setProgram] = useState({
    NGOId: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    targetAmount: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editProgramId) {
      const fetchProgram = async () => {
        try {
          const fetchedProgram = await getProgramById(editProgramId);
          setProgram(fetchedProgram); // Assuming the API returns the correct program object
        } catch (error) {
          console.error("Error fetching program:", error);
          setError("Failed to load program data.");
        }
      };
      fetchProgram();
    }
  }, [editProgramId]);

  const handleChange = (e) => {
    setProgram({
      ...program,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProgramId) {
        // Update existing program
        await updateProgram(editProgramId, program);
      } else {
        // Add new program
        await addProgram(program);
      }
      setProgram({
        NGOId: "",
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        targetAmount: "",
      });
      setEditProgramId(null);
    } catch (error) {
      setError("Failed to save program.");
    }
  };

  return (
    <div className="Programadd">
      <h2>{editProgramId ? "Update Program" : "Add Program"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={program.name}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={program.description}
          onChange={handleChange}
        />
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={program.startDate}
          onChange={handleChange}
          required
        />
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={program.endDate}
          onChange={handleChange}
          required
        />
        <label>Target Amount:</label>
        <input
          type="number"
          name="targetAmount"
          value={program.targetAmount}
          onChange={handleChange}
          required
        />
        <div className="Program-Save-Cancel">
          <button className="Program-submit" type="submit">
            Save
          </button>
          <button
            className="Program-Cance"
            type="button"
            onClick={() => setEditProgramId(null)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgramForm;
