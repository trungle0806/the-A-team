import React, { useEffect, useState } from "react";
import { getProgramsByNGO, deleteProgram } from "../Service/programService";
import ProgramForm from "./ProgramForm";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faInfoCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./ProgramList.css";

const ProgramList1 = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [editProgramId, setEditProgramId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [programsPerPage] = useState(5); // Number of programs per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getProgramsByNGO();
        const sortedPrograms = data.$values.sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate) // Sort by startDate descending
        );
        setPrograms(sortedPrograms);
        setFilteredPrograms(sortedPrograms);
      } catch (error) {
        console.error("Error fetching programs by NGO:", error);
      }
    };
    fetchPrograms();
  }, []);

  const handleAddProgramClick = () => {
    setShowAddForm(true);
    setEditProgramId(null);
  };

  const handleDetailClick = (programId) => {
    navigate(`/ngo/program/${programId}`);
  };

  const handleDeleteClick = async (programId) => {
    try {
      await deleteProgram(programId);
      const updatedPrograms = programs.filter(
        (program) => program.programId !== programId
      );
      setPrograms(updatedPrograms);
      setFilteredPrograms(updatedPrograms);
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  const handleFilters = () => {
    let filtered = [...programs];
    if (searchQuery) {
      filtered = filtered.filter((program) =>
        program.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterStartDate) {
      filtered = filtered.filter(
        (program) => new Date(program.startDate) >= new Date(filterStartDate)
      );
    }
    if (filterEndDate) {
      filtered = filtered.filter(
        (program) => new Date(program.endDate) <= new Date(filterEndDate)
      );
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter((program) =>
        filterStatus === "upcoming" ? program.isUpcoming : !program.isUpcoming
      );
    }
    setFilteredPrograms(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  useEffect(() => {
    handleFilters();
  }, [searchQuery, filterStartDate, filterEndDate, filterStatus]);

  // Pagination logic
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = filteredPrograms.slice(
    indexOfFirstProgram,
    indexOfLastProgram
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className="Program-List-h1">Program List</h1>
      <div className="Program-filters-Search1">
        <div className="Program-filters">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="Program-search"
          />

          <button className="Program-add" onClick={handleAddProgramClick}>
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </div>
        <div className="Program-Search1">
          <input
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            className="Program-date"
          />
          <input
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            className="Program-date"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="Program-status"
          >
            <option value="all">Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      {editProgramId || showAddForm ? (
        <ProgramForm
          editProgramId={editProgramId}
          setEditProgramId={setEditProgramId}
        />
      ) : null}

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
          {currentPrograms.map((program) => (
            <tr className="Program-tr1" key={program.programId}>
              <td>{program.name}</td>
              <td>{new Date(program.startDate).toLocaleDateString()}</td>
              <td>{new Date(program.endDate).toLocaleDateString()}</td>
              <td className="Program-td">{program.targetAmount}</td>
              <td>{program.isUpcoming ? "Upcoming" : "Completed"}</td>
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

      {/* Pagination */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredPrograms.length / programsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProgramList1;
