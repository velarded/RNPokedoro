// GifContext.js
import React, { createContext, useState } from 'react';

export const PokemonGifContext = createContext();

export const PokemonGifProvider = ({ children }) => {
  const [gifToLoad, setGifToLoad] = useState(null);
  const [hatchedPokemonName, setHatchedPokemonName] = useState(null);


  return (
    <PokemonGifContext.Provider value={{ gifToLoad, setGifToLoad, hatchedPokemonName, setHatchedPokemonName }}>
      {children}
    </PokemonGifContext.Provider>
  );
};