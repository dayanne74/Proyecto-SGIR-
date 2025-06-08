import React, { createContext, useState, useContext } from 'react';
import { Place } from '../data/places';

interface FavoritesContextProps {
  favorites: Place[];
  toggleFavorite: (place: Place) => void;
}

const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  toggleFavorite: () => {},
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Place[]>([]);

  const toggleFavorite = (place: Place) => {
    setFavorites((prev) =>
      prev.find((p) => p.id === place.id)
        ? prev.filter((p) => p.id !== place.id)
        : [...prev, place]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
