import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { useFavorites } from "../../Context/FavoritesContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./ProgramList.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5024/api/program1");
        const programsData = response.data?.$values || [];
        setPrograms(programsData);
      } catch (err) {
        setError("Failed to fetch programs.");
        toast.error("Failed to load programs.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Toggle favorite status for a program
  const toggleFavorite = (program) => {
    const isFavorite = favorites.some(
      (fav) => fav.programId === program.programId
    );
    if (isFavorite) {
      removeFromFavorites(program.programId);
      toast.success("Program removed from your favorites.");
    } else {
      addToFavorites(program);
      toast.success(
        "Congratulations! You've added this program to your favorites."
      );
    }
  };

  // Handle donation click
  const handleDonateClick = (programId) => {
    navigate(`/donate/${programId}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <Header />
      <div className="program-header">
        <div className="program-list1">
          <h1 className="program-list">PROGRAM LIST</h1>
          <div className="program-to">
            <div className="program-to2">
              <div className="program-to3">
                <div className="program-sidebar">
                  <h1 className="program-title">Charity</h1>
                  <div className="program-border"></div>
                  <ul className="program-categor">
                    <li className="program-li">
                      <a href="#">Child support charity</a>
                    </li>
                    <li className="program-li">
                      <a href="#">Education charity</a>
                    </li>
                  </ul>
                </div>
                <div className="program-col">
                  <div className="program-grid">
                    {programs.length === 0 ? (
                      <p>No programs available.</p>
                    ) : (
                      programs.map((program) => (
                        <div key={program.programId} className="program-card">
                          <div className="program-image">
                            <img
                              src={program.image || "default-image.jpg"}
                              alt={program.name}
                            />
                          </div>
                          <div className="program-details">
                            <h2>{program.name}</h2>
                            <p>{program.description}</p>
                            <p>
                              <strong>Start date:</strong>{" "}
                              {new Date(program.startDate).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>End date:</strong>{" "}
                              {new Date(program.endDate).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Is about to happen:</strong>{" "}
                              {program.isUpcoming ? "Yes" : "No"}
                            </p>
                            <CiHeart
                              className={`program-heart ${
                                favorites.some(
                                  (fav) => fav.programId === program.programId
                                )
                                  ? "favorite"
                                  : ""
                              }`}
                              onClick={() => toggleFavorite(program)}
                              aria-label="Toggle favorite"
                            />
                            <button
                              className="program-donate-btn"
                              onClick={() =>
                                handleDonateClick(program.programId)
                              }
                              aria-label="Donate to program"
                            >
                              Donate
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </div>
  );
};

export default ProgramList;