import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Favorites context
const FavoritesContext = createContext();

// Custom hook to access the context
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

// Provider component to wrap the app
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  // Add a program to favorites
  const addToFavorites = (program) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, program];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
      return updatedFavorites;
    });
  };

  // Remove a program from favorites
  const removeFromFavorites = (programId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (fav) => fav.programId !== programId
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
