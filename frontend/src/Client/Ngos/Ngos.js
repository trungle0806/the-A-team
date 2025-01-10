import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import axios from "axios";
import "./Ngos.css";

const Ngos = () => {
  const [ngos, setNgos] = useState([]); // State to hold the list of NGOs
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State to capture any errors

  useEffect(() => {
    // Fetch the list of NGOs when the component mounts
    const fetchNgos = async () => {
      try {
        const response = await axios.get(" http://localhost:5024/api/ngo"); // Make API call to fetch NGOs
        setNgos(response.data); // Set the fetched NGOs in the state
      } catch (error) {
        setError("Failed to load NGOs.");
      } finally {
        setLoading(false); // Set loading to false once the request is completed
      }
    };

    fetchNgos();
  }, []);

  return (
    <div>
      <Header />
      <div className="new-header">
        {/* Breadcrumb */}
        <div className="color">
          <div className="brand">
            <h1 className="new-h1">NGOs</h1>
          </div>

          {/* Header */}
          <div className="news-header">
            <div className="banner-image">
              <img
                src="https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--68b4c6a2-17fb-459c-b85e-17e5ee2c57d0/hivan-arvizu-soyhivan-MAnhvw0nDDY-unsplash.jpg.webp?preferwebp=true&width=760"
                alt="Banner"
              />
            </div>
            <div className="header-content">
              <h1>Thought Leadership & News</h1>
              <p>
                Beyond ratings, we want to ensure that you have access to
                essential information about the nonprofit sector and our work.
                Read our commentaries.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="new-container">
            {loading ? (
              <p>Loading NGOs...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <section className="new-items">
                {ngos.$values.map((ngo) => (
                  <div className="new-item" key={ngo.NGOId}>
                    <img
                      src={ngo.image} // Assuming each NGO has an 'image' property
                      alt={ngo.name}
                      className="new-item-image"
                    />
                    <div className="new-item-content">
                      <h2>{ngo.name}</h2>
                      <p>{ngo.description}</p>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Ngos;
