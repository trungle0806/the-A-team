import React, { useState, useEffect } from "react";
import {
  addProgram,
  updateProgram,
  getProgramById,
  getNGOByAccountId, // Add this import
} from "../Service/programService";
import "./ProgramForm.css";

const ProgramForm = ({ editProgramId, setEditProgramId }) => {
  const [program, setProgram] = useState({
    NGOId: "", // Default value will be set here
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    targetAmount: "",
  });
  const [error, setError] = useState("");

  // Fetch NGOId from accountId (token) when the form loads
  useEffect(() => {
    const fetchNGOId = async () => {
      try {
        const ngo = await getNGOByAccountId(); // Get the NGO based on accountId
        console.log(ngo);
        setProgram((prevProgram) => ({
          ...prevProgram,
          NGOId: ngo.ngoId, // Set the NGOId in the form state
        }));
      } catch (error) {
        console.error("Error fetching NGO by accountId:", error);
        setError("Failed to load NGO information.");
      }
    };

    fetchNGOId();

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
    setError(""); // Clear previous error messages

    try {
      if (editProgramId) {
        // Update existing program
        await updateProgram(editProgramId, program);
      } else {
        // Add new program
        await addProgram(program);
      }
      // Reset form fields after successful submission
      setProgram({
        NGOId: "",
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        targetAmount: "",
      });
      setEditProgramId(null); // Close the form after submission
    } catch (error) {
      setError("Failed to save program.");
    }
  };

  return (
    <div className="Programadd">
      <h2>{editProgramId ? "Update Program" : "Add Program"}</h2>
      {error && <p className="error-message">{error}</p>}
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
            className="Program-Cancel"
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
