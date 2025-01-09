import React, { useState, useEffect } from "react";
import { getNGOById, addNGO, updateNGO } from "../Service/ngoService";
import "./NgoForm.css";

const NgoForm = ({ editNgoId, setEditNgoId, token }) => {
  const [ngoData, setNgoData] = useState({
    name: "",
    description: "",
    code: "",
    logoUrl: "",
    mission: "",
    team: "",
    careers: "",
    achievements: "",
    isApproved: false,
    email: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editNgoId) {
      const fetchNGO = async () => {
        try {
          const fetchedNgo = await getNGOById(editNgoId, token);
          setNgoData(fetchedNgo); // Assuming the API returns the correct NGO object
        } catch (error) {
          console.error("Error fetching NGO:", error);
          setError("Failed to load NGO details.");
        }
      };
      fetchNGO();
    }
  }, [editNgoId, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNgoData({
      ...ngoData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token || token === "") {
      setError("Authentication token is missing or invalid.");
      return;
    }

    try {
      if (editNgoId) {
        await updateNGO(editNgoId, ngoData, token); // Update existing NGO
      } else {
        await addNGO(ngoData, token); // Add new NGO
      }
      setNgoData({
        name: "",
        description: "",
        code: "",
        logoUrl: "",
        mission: "",
        team: "",
        careers: "",
        achievements: "",
        isApproved: false,
        email: "",
      });
      setEditNgoId(null);
    } catch (error) {
      setError("Failed to save NGO details. Please try again.");
    }
  };

  return (
    <div className="NgoAdd">
      <h2>{editNgoId ? "Update NGO" : "Add NGO"}</h2>
      {error && <p className="ngo-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={ngoData.name}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={ngoData.description}
          onChange={handleChange}
        />
        <label>Code:</label>
        <input
          type="text"
          name="code"
          value={ngoData.code}
          onChange={handleChange}
          required
        />
        <label>Logo URL:</label>
        <input
          type="text"
          name="logoUrl"
          value={ngoData.logoUrl}
          onChange={handleChange}
        />
        <label>Mission:</label>
        <textarea
          name="mission"
          value={ngoData.mission}
          onChange={handleChange}
        />
        <label>Team:</label>
        <input
          type="text"
          name="team"
          value={ngoData.team}
          onChange={handleChange}
        />
        <label>Careers:</label>
        <textarea
          name="careers"
          value={ngoData.careers}
          onChange={handleChange}
        />
        <label>Achievements:</label>
        <textarea
          name="achievements"
          value={ngoData.achievements}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={ngoData.email}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="isApproved"
            checked={ngoData.isApproved}
            onChange={handleChange}
          />
          Approve
        </label>
        <div className="Ngo-Save-Cancel">
          <button className="Ngo-submit" type="submit">
            Save
          </button>
          <button
            className="Ngo-Cancel"
            type="button"
            onClick={() => setEditNgoId(null)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NgoForm;
