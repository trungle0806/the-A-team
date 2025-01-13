import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./ProgramListDetail.css";

const ProgramListDetail = () => {
  const { programId } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5024/api/program1/${programId}`
        );
        setProgram(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Program not found.");
        } else {
          setError("Error fetching program details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProgramDetails();
  }, [programId]);

  if (loading) return <p>Loading program details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header />
      <div className="program-detail">
        <h1>{program.name}</h1>
        <img src={program.ImageUrl} alt={program.name} />
        <p>{program.description}</p>
        <p>Start Date: {new Date(program.startDate).toLocaleDateString()}</p>
        <p>End Date: {new Date(program.endDate).toLocaleDateString()}</p>
        <p>{program.aboutFund}</p>
      </div>
      <Footer />
    </div>
  );
};

export default ProgramListDetail;
