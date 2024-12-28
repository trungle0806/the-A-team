import React from "react";
import { useFavorites } from "../../Context/FavoritesContext"; // Correct import for accessing the context
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div>
      <Header />

      {/* Full-Width Banner with Text Overlay */}
      <div className="favorites-banner">
        <h1>Your Favorite Programs</h1>
      </div>

      <div className="favorites-container">
        {favorites.length === 0 ? (
          <p className="empty-message">You haven't added any favorites yet.</p>
        ) : (
          <div className="favorites-list">
            <div className="favorites-header">
              <div className="favorites-column">Name</div>
              <div className="favorites-column">Details</div>
              <div className="favorites-column">Location</div>
            </div>
            {favorites.map((program) => (
              <div key={program.programId} className="favorite-card">
                <div className="favorites-column">{program.name}</div>
                <div className="favorites-column">{program.details}</div>
                <div className="favorites-column">{program.location}</div>
                <div className="remove-column">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromFavorites(program.programId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;
