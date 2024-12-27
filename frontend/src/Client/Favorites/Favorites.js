import React from "react";
import PropTypes from "prop-types"; // For prop validation
import "./Favorites.css";

const Favorites = ({ favorites = [], removeFromFavorites }) => {
  return (
    <div className="favorites-container">
      <h2>Your Favorite Organizations</h2>
      {favorites.length === 0 ? (
        <p className="empty-message">You haven't added any favorites yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((org) => (
            <div key={org.id} className="favorite-card">
              <div className="org-details">
                <h3>{org.name}</h3>
                <p>{org.description}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromFavorites(org.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Validate props with PropTypes
Favorites.propTypes = {
  favorites: PropTypes.array, // Array of favorite items
  removeFromFavorites: PropTypes.func.isRequired, // Function to remove items
};

export default Favorites;
