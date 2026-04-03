import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const storedFavs = JSON.parse(localStorage.getItem(`favorites_${user.email}`)) || [];
      setFavorites(storedFavs);
    } else {
      setFavorites([]);
    }
  }, [user]);

  const addToFavorites = (shayri) => {
    if (!user) {
      toast.error('Please login to add favorites');
      return;
    }

    setFavorites((prev) => {
      const isFav = prev.some((fav) => fav._id === shayri._id || fav.text === shayri.text);
      if (isFav) return prev; // Prevent duplicates

      const newFavs = [...prev, shayri];
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(newFavs));
      toast.success('Added to Favorites ❤️');
      return newFavs;
    });
  };

  const removeFromFavorites = (id) => {
    if (!user) return;

    setFavorites((prev) => {
      const newFavs = prev.filter((fav) => fav._id !== id);
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(newFavs));
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
