import React, { useEffect, useState, useContext } from 'react';
import { Typography, Spin } from 'antd';
import { LocationContext } from "../context/LocationContext";
import { LoadingOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import "../styles/MeteoToday.css"

const WeatherWidget = () => {
  const { location, city, error } = useContext(LocationContext);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "9fcceb30181120bf5de8049bd3bbc152";

  useEffect(() => {
    if (!location?.lat || !location?.lon) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&lang=fr`
        );
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Erreur météo:", error);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (loading) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
  }

  if (!weather || weather.cod !== 200) {
    return <Text type="danger">Impossible de charger la météo</Text>;
  }

  // Extraire les données utiles
  const { main, weather: descArr, wind } = weather;
  const desc = descArr[0];
  const temperature = Math.round(main.temp);
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const description = desc.description;

  // Pour la date locale formatée
  const now = new Date();
  const formattedDate = now.toLocaleString('fr-FR', { weekday: 'long', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="container day-mode">
      <div className="header">
        <div className="city-info">
          <h1 className="city-name">{city || weather.name}</h1>
          <p className="date-time">{formattedDate}</p>
        </div>
      </div>

      <div className="main-content">
        <div className="current-weather">
          <div className="temperature">
            {temperature}°C
          </div>
          <div className="weather-condition">
            <img
              src={`https://openweathermap.org/img/wn/${desc.icon}@2x.png`}
              alt={description}
              className="weather-icon"
            />
            <p className="text-details">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-card">
            <div className="detail-value">{humidity}%</div>
            <div className="detail-label">Humidité</div>
          </div>
          <div className="detail-card">
            <div className="detail-value">{windSpeed} m/s</div>
            <div className="detail-label">Vent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
