import React, { createContext, useEffect, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  const fetchCityName = async (lat, lon) => {
    const apiKey = "084fd4e049d4421596aaaf75ffe01463";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&language=fr`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const result = data.results[0]?.components;
      const foundCity = result?.city || result?.town || result?.village || "Ville inconnue";
      setCity(foundCity);
    } catch (err) {
      console.error("Erreur lors du géocodage inverse :", err);
      setCity("Ville inconnue");
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });

          await fetchCityName(lat, lon); 
        },
        (err) => {
          setError("Impossible d’obtenir la localisation");
          console.error(err);
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée.");
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, city, error }}>
      {children}
    </LocationContext.Provider>
  );
};
