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
          `https://charitynavigator-hma3agega6fwfgb2.canadacentral-01.azurewebsites.net/api/program1/${programId}`
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
        <div className="program-detail-buttons">
          <img
            src={program.ImageUrl || "/path-to-default-food-image.jpg"}
            alt={program.name}
            className="program-detail-image"
          />
        </div>
        <div className="program-content">
          <p>
            {program.description ||
              "This program aims to distribute food to those in need, ensuring no one goes hungry."}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(program.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(program.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="program-gallery">
          <h3>Gallery</h3>
          <div className="gallery-images">
            {program.galleryImages?.$values.map((image, index) => (
              <div key={index} className="gallery-item">
                <img
                  src={
                    `https://charitynavigator-hma3agega6fwfgb2.canadacentral-01.azurewebsites.net/images/${image.fileName}` ||
                    `/path-to-default-image.jpg`
                  } // Use a fallback image if no image URL is provided
                  alt={image.caption}
                  className="gallery-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgramListDetail;
