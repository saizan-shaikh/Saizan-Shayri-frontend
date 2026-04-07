import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const STORAGE_KEY = 'favorites_guest';

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setFavorites(storedFavs);
  }, []);

  const addToFavorites = (shayri) => {
    setFavorites((prev) => {
      const isFav = prev.some((fav) => fav._id === shayri._id || fav.text === shayri.text);
      if (isFav) return prev; // Prevent duplicates

      const newFavs = [...prev, shayri];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
      toast.success('Added to Favorites ❤️');
      return newFavs;
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => {
      const newFavs = prev.filter((fav) => fav._id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
      toast.info('Removed from Favorites');
      return newFavs;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
